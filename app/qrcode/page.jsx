"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '../context/ThemeContext';
import Sidebar from '../components/Sidebar';
import Loader from '../components/Loader';

const API = 'https://fideleasy-backend-production.up.railway.app';

export default function QRCode() {
  const [shop, setShop] = useState(null);
  const [qrCode, setQrCode] = useState('');
  const [qrUrl, setQrUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [copied, setCopied] = useState(false);
  const theme = useTheme();
  const router = useRouter();

  const isDark = theme.bg === '#0a0a18' || theme.bg?.includes('0a0a');
  const bg = isDark ? '#0f0f12' : '#f5f4f1';
  const surface = isDark ? '#18181b' : '#ffffff';
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
    fetch(`${API}/qrcode/${s.id}`)
      .then(r => r.json())
      .then(d => {
        setQrCode(d.qrCode || '');
        setQrUrl(d.url || '');
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const copyLink = () => {
    navigator.clipboard.writeText(qrUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadQR = () => {
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = `qrcode-${shop?.name || 'fideleasy'}.png`;
    link.click();
  };

  if (loading) return <Loader />;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: bg, color: text, fontFamily: 'system-ui,-apple-system,sans-serif' }}>
      <Sidebar activePage="/qrcode" />

      <div style={{ marginLeft: isMobile ? 0 : '240px', flex: 1, padding: isMobile ? '20px 16px 100px' : '40px 32px', maxWidth: '1200px' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: '500', margin: '0 0 4px', color: text }}>Mon QR Code</h1>
          <p style={{ margin: 0, fontSize: '13px', color: textMuted }}>Affichez ce QR code en caisse pour que vos clients s'inscrivent</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px', alignItems: 'start' }}>

          {/* QR Code */}
          <div style={{ background: surface, border: `0.5px solid ${border}`, borderRadius: '8px', padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            {qrCode ? (
              <div style={{ background: '#ffffff', borderRadius: '8px', padding: '16px' }}>
                <img src={qrCode} alt="QR Code" style={{ width: '200px', height: '200px', display: 'block' }} />
              </div>
            ) : (
              <div style={{ width: '200px', height: '200px', background: isDark ? '#27272a' : '#f5f4f1', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: textMuted, fontSize: '13px' }}>
                Chargement...
              </div>
            )}
            <p style={{ margin: 0, fontSize: '14px', fontWeight: '500', color: text, textAlign: 'center' }}>{shop?.name}</p>
            <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
              <button onClick={downloadQR} style={{ flex: 1, background: accent, border: 'none', borderRadius: '6px', padding: '10px', fontSize: '13px', color: '#000', fontWeight: '500', cursor: 'pointer' }}>
                Télécharger
              </button>
              <button onClick={copyLink} style={{ flex: 1, background: 'transparent', border: `0.5px solid ${border}`, borderRadius: '6px', padding: '10px', fontSize: '13px', color: text, cursor: 'pointer' }}>
                {copied ? '✓ Copié !' : 'Copier le lien'}
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ background: surface, border: `0.5px solid ${border}`, borderRadius: '8px', padding: '24px' }}>
              <p style={{ margin: '0 0 16px', fontSize: '13px', fontWeight: '500', color: text }}>Comment ça marche</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { step: '1', text: 'Affichez ce QR code à votre caisse ou comptoir' },
                  { step: '2', text: 'Le client le scanne avec son téléphone' },
                  { step: '3', text: 'Il remplit son prénom et ajoute sa carte au Wallet' },
                  { step: '4', text: 'Tamponnez sa carte à chaque visite' },
                ].map(item => (
                  <div key={item.step} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: isDark ? '#27272a' : '#f0ede6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '500', color: accent, flexShrink: 0 }}>
                      {item.step}
                    </div>
                    <p style={{ margin: 0, fontSize: '13px', color: textMuted, lineHeight: '1.5' }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: surface, border: `0.5px solid ${border}`, borderRadius: '8px', padding: '24px' }}>
              <p style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: '500', color: text }}>Lien d'inscription</p>
              <div style={{ background: isDark ? '#27272a' : '#f5f4f1', border: `0.5px solid ${border}`, borderRadius: '6px', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                <p style={{ margin: 0, fontSize: '12px', color: textMuted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{qrUrl}</p>
                <button onClick={copyLink} style={{ background: 'transparent', border: 'none', color: accent, cursor: 'pointer', fontSize: '12px', flexShrink: 0, padding: 0 }}>
                  {copied ? '✓' : 'Copier'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}