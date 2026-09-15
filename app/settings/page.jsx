"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '../context/ThemeContext';
import Sidebar from '../components/Sidebar';
import Loader from '../components/Loader';

const API = 'https://fideleasy-backend-production.up.railway.app';

export default function Settings() {
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [form, setForm] = useState({
    card_stamps_required: 10,
    loyalty_type: 'stamps',
    card_color: '#0a0a18',
  });
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
    setForm({
      card_stamps_required: s.card_stamps_required || 10,
      loyalty_type: s.loyalty_type || 'stamps',
      card_color: s.card_color || '#0a0a18',
    });
    setLoading(false);
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      await fetch(`${API}/shops/${shop.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const updated = { ...shop, ...form };
      localStorage.setItem('shop', JSON.stringify(updated));
      setShop(updated);
      setSuccess('✓ Réglages sauvegardés');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setSuccess('Erreur lors de la sauvegarde.');
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = {
    width: '100%',
    background: isDark ? '#27272a' : '#f5f4f1',
    border: `0.5px solid ${border}`,
    borderRadius: '6px',
    padding: '10px 12px',
    fontSize: '13px',
    color: text,
    outline: 'none',
    boxSizing: 'border-box',
  };

  if (loading) return <Loader />;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: bg, color: text, fontFamily: 'system-ui,-apple-system,sans-serif' }}>
      <Sidebar activePage="/settings" />

      <div style={{ marginLeft: isMobile ? 0 : '240px', flex: 1, padding: isMobile ? '20px 16px 100px' : '40px 32px', maxWidth: '700px' }}>

        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: '500', margin: '0 0 4px', color: text }}>Réglages</h1>
          <p style={{ margin: 0, fontSize: '13px', color: textMuted }}>Configurez votre programme de fidélité</p>
        </div>

        {success && (
          <div style={{ background: success.includes('Erreur') ? 'rgba(239,68,68,0.1)' : 'rgba(34,197,94,0.1)', border: `0.5px solid ${success.includes('Erreur') ? 'rgba(239,68,68,0.3)' : 'rgba(34,197,94,0.3)'}`, borderRadius: '6px', padding: '12px 16px', marginBottom: '20px', fontSize: '13px', color: success.includes('Erreur') ? '#ef4444' : '#22c55e' }}>
            {success}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

          <div style={{ background: surface, border: `0.5px solid ${border}`, borderRadius: '8px', padding: '24px' }}>
            <p style={{ margin: '0 0 6px', fontSize: '13px', fontWeight: '500', color: text }}>Type de programme</p>
            <p style={{ margin: '0 0 16px', fontSize: '12px', color: textMuted }}>Choisissez comment récompenser vos clients</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {[
                { value: 'stamps', label: 'Tampons', desc: 'Une récompense après X visites' },
                { value: 'points', label: 'Points', desc: 'Points accumulés par achat' },
              ].map(opt => (
                <div key={opt.value} onClick={() => setForm({ ...form, loyalty_type: opt.value })}
                  style={{ border: `0.5px solid ${form.loyalty_type === opt.value ? accent : border}`, borderRadius: '6px', padding: '14px', cursor: 'pointer', background: form.loyalty_type === opt.value ? (isDark ? 'rgba(212,175,55,0.08)' : 'rgba(212,175,55,0.06)') : 'transparent' }}>
                  <p style={{ margin: '0 0 4px', fontSize: '13px', fontWeight: '500', color: form.loyalty_type === opt.value ? accent : text }}>{opt.label}</p>
                  <p style={{ margin: 0, fontSize: '11px', color: textMuted }}>{opt.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: surface, border: `0.5px solid ${border}`, borderRadius: '8px', padding: '24px' }}>
            <p style={{ margin: '0 0 6px', fontSize: '13px', fontWeight: '500', color: text }}>
              {form.loyalty_type === 'stamps' ? 'Tampons pour une récompense' : 'Points pour une récompense'}
            </p>
            <p style={{ margin: '0 0 16px', fontSize: '12px', color: textMuted }}>
              Nombre de {form.loyalty_type === 'stamps' ? 'tampons' : 'points'} nécessaires pour débloquer une récompense
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <input
                type="number"
                min="1"
                max="50"
                value={form.card_stamps_required}
                onChange={e => setForm({ ...form, card_stamps_required: parseInt(e.target.value) || 10 })}
                style={{ ...inputStyle, width: '100px' }}
              />
              <span style={{ fontSize: '13px', color: textMuted }}>{form.loyalty_type === 'stamps' ? 'tampons' : 'points'}</span>
            </div>
          </div>

          <button onClick={save} disabled={saving} style={{ background: accent, border: 'none', borderRadius: '6px', padding: '12px', fontSize: '13px', color: '#000', fontWeight: '500', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}>
            {saving ? 'Sauvegarde...' : 'Enregistrer les réglages'}
          </button>

        </div>
      </div>
    </div>
  );
}