"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const API = 'https://fideleasy-backend-production.up.railway.app';

export default function Register() {
  const [form, setForm] = useState({ shop_name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    if (!form.shop_name.trim() || !form.email.trim() || !form.password.trim()) {
      setError('Tous les champs sont requis.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else if (data.shop) {
        localStorage.setItem('shop', JSON.stringify(data.shop[0]));
        router.push('/dashboard');
      }
    } catch (err) {
      setError('Une erreur est survenue. Réessayez.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    background: '#f5f4f1',
    border: '0.5px solid #e4e2dc',
    borderRadius: '6px',
    padding: '11px 14px',
    fontSize: '14px',
    color: '#18181b',
    outline: 'none',
    boxSizing: 'border-box',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f12', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui,-apple-system,sans-serif', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '380px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: '500', color: '#ffffff', margin: '0 0 6px' }}>
            Fidel<span style={{ color: '#d4af37' }}>Easy</span>
          </h1>
          <p style={{ fontSize: '13px', color: '#71717a', margin: 0 }}>Créez votre compte commerçant</p>
        </div>

        {/* Form */}
        <div style={{ background: '#18181b', border: '0.5px solid #27272a', borderRadius: '12px', padding: '28px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

            <div>
              <label style={{ fontSize: '11px', color: '#71717a', display: 'block', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Nom du commerce</label>
              <input
                type="text"
                placeholder="Café de la Plage"
                value={form.shop_name}
                onChange={e => setForm({ ...form, shop_name: e.target.value })}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#d4af37'}
                onBlur={e => e.target.style.borderColor = '#e4e2dc'}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', color: '#71717a', display: 'block', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Email</label>
              <input
                type="email"
                placeholder="contact@moncommerce.fr"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#d4af37'}
                onBlur={e => e.target.style.borderColor = '#e4e2dc'}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', color: '#71717a', display: 'block', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Mot de passe</label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                onKeyDown={e => e.key === 'Enter' && handleRegister()}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#d4af37'}
                onBlur={e => e.target.style.borderColor = '#e4e2dc'}
              />
            </div>

            {error && (
              <p style={{ margin: 0, fontSize: '12px', color: '#ef4444', padding: '10px 12px', background: 'rgba(239,68,68,0.1)', borderRadius: '6px' }}>
                {error}
              </p>
            )}

            <button
              onClick={handleRegister}
              disabled={loading}
              style={{ background: '#d4af37', border: 'none', borderRadius: '6px', padding: '12px', fontSize: '14px', color: '#000', fontWeight: '500', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, marginTop: '4px' }}
            >
              {loading ? 'Création...' : 'Créer mon compte'}
            </button>

          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p style={{ fontSize: '13px', color: '#71717a', margin: '0 0 8px' }}>
            Déjà un compte ?{' '}
            <a href="/login" style={{ color: '#d4af37', textDecoration: 'none' }}>Se connecter</a>
          </p>
          <a href="/" style={{ fontSize: '12px', color: '#52525b', textDecoration: 'none' }}>← Retour au site</a>
        </div>

      </div>
    </div>
  );
}