"use client";
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import Sidebar from '../components/Sidebar';

const API = 'https://fideleasy-backend-production.up.railway.app';

export default function Profile() {
  const [shop, setShop] = useState(null);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', passkit_program_id: '' });
  const theme = useTheme();

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
    if (!shopData) { setLoading(false); return; }
    const s = JSON.parse(shopData);
    setShop(s);
    setForm(f => ({ ...f, name: s.name || '', email: s.email || '', passkit_program_id: s.passkit_program_id || '' }));
    setLoading(false);
  }, []);

  const save = async (updates, successMsg) => {
    setSaving(true);
    try {
      await fetch(`${API}/shops/${shop.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      const updated = { ...shop, ...updates };
      localStorage.setItem('shop', JSON.stringify(updated));
      setShop(updated);
      setSuccess(successMsg);
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
    boxSizing: 'border-box' 
  };

  if (loading) return null;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: bg, color: text, fontFamily: 'system-ui,-apple-system,sans-serif' }}>
      <Sidebar activePage="/profile" />

      <div style={{ marginLeft: isMobile ? 0 : '240px', flex: 1, padding: isMobile ? '20px 16px 100px' : '40px 32px', maxWidth: '700px' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: '500', margin: '0 0 4px', color: text }}>Mon profil</h1>
          <p style={{ margin: 0, fontSize: '13px', color: textMuted }}>Gérez les informations de votre compte</p>
        </div>

        {success && (
          <div style={{ background: success.includes('Erreur') ? 'rgba(239,68,68,0.1)' : 'rgba(34,197,94,0.1)', border: `0.5px solid ${success.includes('Erreur') ? 'rgba(239,68,68,0.3)' : 'rgba(34,197,94,0.3)'}`, borderRadius: '6px', padding: '12px 16px', marginBottom: '20px', fontSize: '13px', color: success.includes('Erreur') ? '#ef4444' : '#22c55e' }}>
            {success}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

          {/* Nom */}
          <div style={{ background: surface, border: `0.5px solid ${border}`, borderRadius: '8px', padding: '24px' }}>
            <p style={{ margin: '0 0 16px', fontSize: '13px', fontWeight: '500', color: text }}>Nom du commerce</p>
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} placeholder="Nom de votre commerce" />
            <button onClick={() => save({ name: form.name }, '✓ Nom mis à jour')} disabled={saving} style={{ marginTop: '12px', background: accent, border: 'none', borderRadius: '6px', padding: '9px 20px', fontSize: '13px', color: '#000', fontWeight: '500', cursor: 'pointer' }}>
              Enregistrer
            </button>
          </div>

          {/* Email */}
          <div style={{ background: surface, border: `0.5px solid ${border}`, borderRadius: '8px', padding: '24px' }}>
            <p style={{ margin: '0 0 16px', fontSize: '13px', fontWeight: '500', color: text }}>Adresse email</p>
            <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} placeholder="votre@email.fr" />
            <button onClick={() => save({ email: form.email }, '✓ Email mis à jour')} disabled={saving} style={{ marginTop: '12px', background: accent, border: 'none', borderRadius: '6px', padding: '9px 20px', fontSize: '13px', color: '#000', fontWeight: '500', cursor: 'pointer' }}>
              Enregistrer
            </button>
          </div>

          {/* Mot de passe */}
          <div style={{ background: surface, border: `0.5px solid ${border}`, borderRadius: '8px', padding: '24px' }}>
            <p style={{ margin: '0 0 16px', fontSize: '13px', fontWeight: '500', color: text }}>Mot de passe</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} style={inputStyle} placeholder="Nouveau mot de passe" />
              <input type="password" value={form.confirmPassword} onChange={e => setForm({ ...form, confirmPassword: e.target.value })} style={inputStyle} placeholder="Confirmer le mot de passe" />
            </div>
            {form.password && form.confirmPassword && form.password !== form.confirmPassword && (
              <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#ef4444' }}>Les mots de passe ne correspondent pas</p>
            )}
            <button
              onClick={() => {
                if (form.password !== form.confirmPassword) return;
                save({}, '✓ Mot de passe mis à jour');
              }}
              disabled={saving || !form.password || form.password !== form.confirmPassword}
              style={{ marginTop: '12px', background: accent, border: 'none', borderRadius: '6px', padding: '9px 20px', fontSize: '13px', color: '#000', fontWeight: '500', cursor: 'pointer', opacity: !form.password || form.password !== form.confirmPassword ? 0.5 : 1 }}>
              Changer le mot de passe
            </button>
          </div>

          {/* Mon plan */}
          <div style={{ background: surface, border: `0.5px solid ${border}`, borderRadius: '8px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <p style={{ margin: 0, fontSize: '13px', fontWeight: '500', color: text }}>Mon abonnement</p>
              <span style={{ background: isDark ? '#27272a' : '#f0ede6', color: accent, borderRadius: '4px', padding: '3px 10px', fontSize: '11px', fontWeight: '500', textTransform: 'capitalize' }}>{shop?.plan || 'Starter'}</span>
            </div>
            {shop?.plan !== 'business' && (
              <button onClick={async () => {
                const targetPlan = shop?.plan === 'starter' ? 'pro' : 'business';
                const res = await fetch(`${API}/stripe/checkout`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ plan: targetPlan, shop_id: shop.id })
                });
                const data = await res.json();
                if (data.url) window.location.href = data.url;
              }} style={{ width: '100%', background: accent, border: 'none', borderRadius: '6px', padding: '10px', fontSize: '13px', color: '#000', fontWeight: '500', cursor: 'pointer' }}>
                {shop?.plan === 'starter' ? 'Passer au Pro →' : 'Passer au Business →'}
              </button>
            )}
          </div>

          {/* PassKit */}
          <div style={{ background: surface, border: `0.5px solid ${border}`, borderRadius: '8px', padding: '24px' }}>
            <p style={{ margin: '0 0 6px', fontSize: '13px', fontWeight: '500', color: text }}>PassKit — Program ID</p>
            <p style={{ margin: '0 0 14px', fontSize: '12px', color: textMuted }}>Trouvez-le dans app.passkit.com → votre programme → URL</p>
            <input value={form.passkit_program_id} onChange={e => setForm({ ...form, passkit_program_id: e.target.value })} style={inputStyle} placeholder="ex: 2aTM3FUCMZxmN34tgtLqQ6" />
            <button onClick={() => save({ passkit_program_id: form.passkit_program_id }, '✓ PassKit configuré')} disabled={saving} style={{ marginTop: '12px', background: 'transparent', border: `0.5px solid ${border}`, borderRadius: '6px', padding: '9px 20px', fontSize: '13px', color: text, cursor: 'pointer' }}>
              Enregistrer
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}