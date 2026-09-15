"use client";
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '../context/ThemeContext';
import Sidebar from '../components/Sidebar';
import Loader from '../components/Loader';
import Confetti from '../components/Confetti';

const API = 'https://fideleasy-backend-production.up.railway.app';

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [cards, setCards] = useState([]);
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showStampModal, setShowStampModal] = useState(false);
  const [showScanModal, setShowScanModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [stampMessage, setStampMessage] = useState('');
  const [stampLoading, setStampLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [addForm, setAddForm] = useState({ name: '', email: '', phone: '' });
  const [addLoading, setAddLoading] = useState(false);
  const [scanResult, setScanResult] = useState('');
  const [scanning, setScanning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scannerRef = useRef(null);
  const scannerInstanceRef = useRef(null);
  const theme = useTheme();
  const router = useRouter();

  const isDark = theme.bg === '#0a0a18' || theme.bg?.includes('0a0a');
  const bg = isDark ? '#0f0f12' : '#f5f4f1';
  const surface = isDark ? '#18181b' : '#ffffff';
  const surfaceHover = isDark ? '#1f1f23' : '#f9f8f6';
  const border = isDark ? '#27272a' : '#e4e2dc';
  const text = isDark ? '#fafafa' : '#18181b';
  const textMuted = isDark ? '#71717a' : '#a1a1aa';
  const accent = '#d4af37';

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const shopData = localStorage.getItem('shop');
    if (!shopData) { router.push('/login'); return; }
    const s = JSON.parse(shopData);
    setShop(s);
    loadData(s.id);
  }, []);

  useEffect(() => {
    if (showScanModal) {
      startScanner();
    } else {
      stopScanner();
    }
    return () => stopScanner();
  }, [showScanModal]);

  const startScanner = async () => {
    try {
      const { Html5Qrcode } = await import('html5-qrcode');
      setScanning(true);
      setScanResult('');
      const scanner = new Html5Qrcode('qr-reader');
      scannerInstanceRef.current = scanner;
      await scanner.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 220, height: 220 } },
        async (decodedText) => {
          await scanner.stop();
          setScanning(false);
          handleQRScan(decodedText);
        },
        () => {}
      );
    } catch (err) {
      setScanning(false);
      setScanResult('Impossible d\'accéder à la caméra.');
    }
  };

  const stopScanner = async () => {
    if (scannerInstanceRef.current) {
      try {
        await scannerInstanceRef.current.stop();
        scannerInstanceRef.current = null;
      } catch (e) {}
    }
    setScanning(false);
  };

  const handleQRScan = async (qrText) => {
    setScanResult('Recherche du client...');
    try {
      // Le QR PassKit contient l'ID du membre
      const memberId = qrText.split('/').pop()?.replace('.pkpass', '').replace('.gpay', '');
      const card = cards.find(c => c.passkit_member_id === memberId);
      if (!card) {
        setScanResult('Client introuvable. Vérifiez que la carte est bien enregistrée.');
        return;
      }
      const client = clients.find(c => c.id === card.customer_id);
      if (client) {
        setSelectedClient(client);
        setShowScanModal(false);
        setShowStampModal(true);
        setStampMessage('');
      }
    } catch (err) {
      setScanResult('Erreur lors du scan. Réessayez.');
    }
  };

  const loadData = async (shopId) => {
    try {
      const [customersRes, cardsRes] = await Promise.all([
        fetch(`${API}/customers/${shopId}`),
        fetch(`${API}/cards/all`)
      ]);
      const customersData = await customersRes.json();
      const cardsData = await cardsRes.json();
      setClients(customersData.data || []);
      setCards(cardsData.data?.filter(c => c.shop_id === shopId) || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getClientCard = (clientId) => cards.find(c => c.customer_id === clientId);

  const handleStamp = async () => {
    if (!selectedClient) return;
    const card = getClientCard(selectedClient.id);
    if (!card) { setStampMessage('Aucune carte trouvée pour ce client.'); return; }
    setStampLoading(true);
    setStampMessage('');
    try {
      const res = await fetch(`${API}/cards/${card.id}/stamp`, { method: 'POST' });
      const data = await res.json();
      if (res.status === 429) {
        setStampMessage(data.error);
      } else if (data.message) {
        setStampMessage('✓ ' + data.message);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
        await loadData(shop.id);
      }
    } catch (err) {
      setStampMessage('Erreur lors du tampon.');
    } finally {
      setStampLoading(false);
    }
  };

  const handleAddClient = async () => {
    if (!addForm.name.trim()) return;
    setAddLoading(true);
    try {
      const customerRes = await fetch(`${API}/customers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...addForm, shop_id: shop.id })
      });
      const customerData = await customerRes.json();
      const customer = customerData.data?.[0];
      if (customer) {
        await fetch(`${API}/cards`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ customer_id: customer.id, shop_id: shop.id, wallet_type: 'manual' })
        });
        await loadData(shop.id);
        setAddForm({ name: '', email: '', phone: '' });
        setShowAddModal(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAddLoading(false);
    }
  };

  const filteredClients = clients.filter(c =>
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase()) ||
    c.phone?.includes(search)
  );

  if (loading) return <Loader />;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: bg, color: text, fontFamily: 'system-ui,-apple-system,sans-serif' }}>
      {showConfetti && <Confetti />}
      <Sidebar activePage="/clients" />

      <div style={{ marginLeft: isMobile ? 0 : '240px', flex: 1, padding: isMobile ? '20px 16px 100px' : '40px 32px', maxWidth: '1200px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: '500', margin: '0 0 4px', color: text }}>Clients</h1>
            <p style={{ margin: 0, fontSize: '13px', color: textMuted }}>{clients.length} client{clients.length > 1 ? 's' : ''} au total</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setShowScanModal(true)} style={{ background: 'transparent', border: `0.5px solid ${border}`, borderRadius: '6px', padding: '8px 16px', fontSize: '13px', color: text, cursor: 'pointer' }}>
              Scanner QR
            </button>
            <button onClick={() => setShowAddModal(true)} style={{ background: accent, border: 'none', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', color: '#000', fontWeight: '500', cursor: 'pointer' }}>
              + Ajouter
            </button>
          </div>
        </div>

        {/* Search */}
        <div style={{ marginBottom: '16px' }}>
          <input
            type="text"
            placeholder="Rechercher par nom, email ou téléphone..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', background: surface, border: `0.5px solid ${border}`, borderRadius: '6px', padding: '10px 14px', fontSize: '13px', color: text, outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        {/* Liste clients */}
        <div style={{ background: surface, border: `0.5px solid ${border}`, borderRadius: '8px', overflow: 'hidden' }}>
          {filteredClients.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: textMuted, fontSize: '13px' }}>
              {search ? 'Aucun client trouvé' : 'Aucun client pour l\'instant'}
            </div>
          ) : (
            filteredClients.map((client, i) => {
              const card = getClientCard(client.id);
              return (
                <div key={client.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px', borderBottom: i < filteredClients.length - 1 ? `0.5px solid ${border}` : 'none' }}
                  onMouseEnter={e => e.currentTarget.style.background = surfaceHover}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: isDark ? '#27272a' : '#f0ede6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '500', color: accent, flexShrink: 0 }}>
                    {client.name?.charAt(0).toUpperCase()}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: '13px', fontWeight: '500', color: text }}>{client.name}</p>
                    <p style={{ margin: 0, fontSize: '11px', color: textMuted }}>{client.email || client.phone || '—'}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                    {card && (
                      <span style={{ fontSize: '12px', color: textMuted }}>{card.stamps || 0}/{shop?.card_stamps_required || 10}</span>
                    )}
                    <button onClick={() => { setSelectedClient(client); setShowStampModal(true); setStampMessage(''); }}
                      style={{ background: accent, border: 'none', borderRadius: '5px', padding: '6px 14px', fontSize: '12px', color: '#000', fontWeight: '500', cursor: 'pointer' }}>
                      Tamponner
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Modal Scanner QR */}
      {showScanModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '16px' }}>
          <div style={{ background: surface, border: `0.5px solid ${border}`, borderRadius: '12px', padding: '28px', width: '100%', maxWidth: '400px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '500', margin: 0, color: text }}>Scanner la carte client</h2>
              <button onClick={() => setShowScanModal(false)} style={{ background: 'transparent', border: 'none', color: textMuted, cursor: 'pointer', fontSize: '18px', padding: 0 }}>×</button>
            </div>
            <div id="qr-reader" style={{ width: '100%', borderRadius: '8px', overflow: 'hidden', marginBottom: '16px' }} />
            {scanResult && (
              <p style={{ fontSize: '13px', color: scanResult.includes('introuvable') || scanResult.includes('Erreur') || scanResult.includes('Impossible') ? '#ef4444' : textMuted, margin: 0, textAlign: 'center' }}>
                {scanResult}
              </p>
            )}
            {!scanning && !scanResult && (
              <p style={{ fontSize: '13px', color: textMuted, margin: 0, textAlign: 'center' }}>Pointez la caméra vers le QR code de la carte client</p>
            )}
            <button onClick={() => setShowScanModal(false)} style={{ width: '100%', marginTop: '16px', background: 'transparent', border: `0.5px solid ${border}`, borderRadius: '6px', padding: '10px', fontSize: '13px', color: text, cursor: 'pointer' }}>
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Modal Tampon */}
      {showStampModal && selectedClient && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '16px' }}>
          <div style={{ background: surface, border: `0.5px solid ${border}`, borderRadius: '12px', padding: '28px', width: '100%', maxWidth: '380px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '500', margin: '0 0 4px', color: text }}>Tamponner</h2>
            <p style={{ fontSize: '13px', color: textMuted, margin: '0 0 20px' }}>{selectedClient.name}</p>
            {(() => {
              const card = getClientCard(selectedClient.id);
              return card ? (
                <div style={{ background: isDark ? '#27272a' : '#f5f4f1', borderRadius: '8px', padding: '16px', marginBottom: '20px', textAlign: 'center' }}>
                  <p style={{ margin: '0 0 4px', fontSize: '28px', fontWeight: '500', color: accent }}>{card.stamps || 0}</p>
                  <p style={{ margin: 0, fontSize: '12px', color: textMuted }}>sur {shop?.card_stamps_required || 10} tampons</p>
                  <div style={{ height: '4px', background: isDark ? '#3f3f46' : '#e4e2dc', borderRadius: '2px', margin: '12px 0 0', overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: accent, width: `${Math.min(((card.stamps || 0) / (shop?.card_stamps_required || 10)) * 100, 100)}%`, borderRadius: '2px' }} />
                  </div>
                </div>
              ) : (
                <p style={{ color: textMuted, fontSize: '13px', marginBottom: '20px' }}>Aucune carte trouvée</p>
              );
            })()}
            {stampMessage && (
              <p style={{ fontSize: '13px', color: stampMessage.includes('✓') ? '#22c55e' : '#ef4444', margin: '0 0 16px', padding: '10px 12px', background: stampMessage.includes('✓') ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', borderRadius: '6px' }}>
                {stampMessage}
              </p>
            )}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => { setShowStampModal(false); setStampMessage(''); }} style={{ flex: 1, background: 'transparent', border: `0.5px solid ${border}`, borderRadius: '6px', padding: '10px', fontSize: '13px', color: text, cursor: 'pointer' }}>
                Annuler
              </button>
              <button onClick={handleStamp} disabled={stampLoading} style={{ flex: 1, background: accent, border: 'none', borderRadius: '6px', padding: '10px', fontSize: '13px', color: '#000', fontWeight: '500', cursor: stampLoading ? 'not-allowed' : 'pointer', opacity: stampLoading ? 0.7 : 1 }}>
                {stampLoading ? 'En cours...' : 'Tamponner'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Ajouter client */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '16px' }}>
          <div style={{ background: surface, border: `0.5px solid ${border}`, borderRadius: '12px', padding: '28px', width: '100%', maxWidth: '380px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '500', margin: '0 0 20px', color: text }}>Ajouter un client</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              {[
                { label: 'Prénom *', key: 'name', type: 'text', placeholder: 'Sophie' },
                { label: 'Email', key: 'email', type: 'email', placeholder: 'sophie@email.fr' },
                { label: 'Téléphone', key: 'phone', type: 'tel', placeholder: '06 XX XX XX XX' },
              ].map(field => (
                <div key={field.key}>
                  <label style={{ fontSize: '11px', color: textMuted, display: 'block', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>{field.label}</label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={addForm[field.key]}
                    onChange={e => setAddForm({ ...addForm, [field.key]: e.target.value })}
                    style={{ width: '100%', background: isDark ? '#27272a' : '#f5f4f1', border: `0.5px solid ${border}`, borderRadius: '6px', padding: '10px 12px', fontSize: '13px', color: text, outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => { setShowAddModal(false); setAddForm({ name: '', email: '', phone: '' }); }} style={{ flex: 1, background: 'transparent', border: `0.5px solid ${border}`, borderRadius: '6px', padding: '10px', fontSize: '13px', color: text, cursor: 'pointer' }}>
                Annuler
              </button>
              <button onClick={handleAddClient} disabled={addLoading || !addForm.name.trim()} style={{ flex: 1, background: accent, border: 'none', borderRadius: '6px', padding: '10px', fontSize: '13px', color: '#000', fontWeight: '500', cursor: addLoading || !addForm.name.trim() ? 'not-allowed' : 'pointer', opacity: addLoading || !addForm.name.trim() ? 0.6 : 1 }}>
                {addLoading ? 'Création...' : 'Ajouter'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}