"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '../context/ThemeContext';
import Sidebar from '../components/Sidebar';
import Loader from '../components/Loader';

const API = 'https://fideleasy-backend-production.up.railway.app';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ title: '', message: '', target: 'all' });
  const [success, setSuccess] = useState('');
  const [isMobile, setIsMobile] = useState(false);
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
    fetch(`${API}/notifications/${s.id}`)
      .then(r => r.json())
      .then(d => setNotifications(d.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const sendNotification = async () => {
    if (!form.title.trim() || !form.message.trim()) return;
    setSending(true);
    setSuccess('');
    try {
      const res = await fetch(`${API}/notifications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, shop_id: shop.id })
      });
      const data = await res.json();
      if (data.message) {
        setSuccess('Notification envoyée avec succès !');
        setForm({ title: '', message: '', target: 'all' });
        const res2 = await fetch(`${API}/notifications/${shop.id}`);
        const d2 = await res2.json();
        setNotifications(d2.data || []);
        setTimeout(() => setSuccess(''), 4000);
      }
    } catch (err) {
      setSuccess('Erreur lors de l\'envoi.');
    } finally {
      setSending(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: bg, color: text, fontFamily: 'system-ui,-apple-system,sans-serif' }}>
      <Sidebar activePage="/notifications" />

      <div style={{ marginLeft: isMobile ? 0 : '240px', flex: 1, padding: isMobile ? '20px 16px 100px' : '40px 32px', maxWidth: '1200px' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: '500', margin: '0 0 4px', color: text }}>Notifications</h1>
          <p style={{ margin: 0, fontSize: '13px', color: textMuted }}>Envoyez des messages push à vos clients</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px', alignItems: 'start' }}>

          {/* Formulaire */}
          <div style={{ background: surface, border: `0.5px solid ${border}`, borderRadius: '8px', padding: '24px' }}>
            <p style={{ margin: '0 0 20px', fontSize: '13px', fontWeight: '500', color: text }}>Nouvelle notification</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '11px', color: textMuted, display: 'block', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Titre *</label>
                <input
                  type="text"
                  placeholder="Offre spéciale ce weekend"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  style={{ width: '100%', background: isDark ? '#27272a' : '#f5f4f1', border: `0.5px solid ${border}`, borderRadius: '6px', padding: '10px 12px', fontSize: '13px', color: text, outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', color: textMuted, display: 'block', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Message *</label>
                <textarea
                  placeholder="Venez profiter de -20% sur toute la carte..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  style={{ width: '100%', background: isDark ? '#27272a' : '#f5f4f1', border: `0.5px solid ${border}`, borderRadius: '6px', padding: '10px 12px', fontSize: '13px', color: text, outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', color: textMuted, display: 'block', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Destinataires</label>
                <select
                  value={form.target}
                  onChange={e => setForm({ ...form, target: e.target.value })}
                  style={{ width: '100%', background: isDark ? '#27272a' : '#f5f4f1', border: `0.5px solid ${border}`, borderRadius: '6px', padding: '10px 12px', fontSize: '13px', color: text, outline: 'none', boxSizing: 'border-box' }}
                >
                  <option value="all">Tous les clients</option>
                  <option value="inactive">Clients inactifs</option>
                </select>
              </div>

              {success && (
                <p style={{ fontSize: '13px', color: success.includes('succès') ? '#22c55e' : '#ef4444', margin: 0, padding: '10px 12px', background: success.includes('succès') ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', borderRadius: '6px' }}>
                  {success}
                </p>
              )}

              <button
                onClick={sendNotification}
                disabled={sending || !form.title.trim() || !form.message.trim()}
                style={{ background: accent, border: 'none', borderRadius: '6px', padding: '11px', fontSize: '13px', color: '#000', fontWeight: '500', cursor: sending || !form.title.trim() || !form.message.trim() ? 'not-allowed' : 'pointer', opacity: sending || !form.title.trim() || !form.message.trim() ? 0.6 : 1 }}
              >
                {sending ? 'Envoi en cours...' : 'Envoyer la notification'}
              </button>
            </div>
          </div>

          {/* Historique */}
          <div style={{ background: surface, border: `0.5px solid ${border}`, borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: `0.5px solid ${border}` }}>
              <p style={{ margin: 0, fontSize: '13px', fontWeight: '500', color: text }}>Historique</p>
            </div>
            {notifications.length === 0 ? (
              <div style={{ padding: '40px 24px', textAlign: 'center', color: textMuted, fontSize: '13px' }}>
                Aucune notification envoyée
              </div>
            ) : (
              notifications.map((notif, i) => (
                <div key={notif.id} style={{ padding: '16px 24px', borderBottom: i < notifications.length - 1 ? `0.5px solid ${border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: '0 0 3px', fontSize: '13px', fontWeight: '500', color: text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{notif.title}</p>
                      <p style={{ margin: 0, fontSize: '12px', color: textMuted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{notif.message}</p>
                    </div>
                    <span style={{ fontSize: '11px', color: textMuted, flexShrink: 0 }}>
                      {new Date(notif.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}