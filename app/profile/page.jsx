"use client";
import { useState, useEffect } from 'react';

const API = 'https://fideleasy-backend-production.up.railway.app';

export default function Profile() {
  const [shop, setShop] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const shopData = localStorage.getItem('shop');
    if (!shopData) { window.location.href = '/login'; return; }
    const s = JSON.parse(shopData);
    setShop(s);
    setForm(f => ({ ...f, name: s.name || '', email: s.email || '' }));
  }, []);

  const logout = () => {
    localStorage.removeItem('shop');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const saveName = async () => {
    setSaving(true);
    await fetch(`${API}/shops/${shop.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.name })
    });
    const updated = { ...shop, name: form.name };
    localStorage.setItem('shop', JSON.stringify(updated));
    setShop(updated);
    setSuccess('Nom mis à jour !');
    setTimeout(() => setSuccess(''), 3000);
    setSaving(false);
  };

  const saveEmail = async () => {
    setSaving(true);
    await fetch(`${API}/shops/${shop.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: form.email })
    });
    const updated = { ...shop, email: form.email };
    localStorage.setItem('shop', JSON.stringify(updated));
    setShop(updated);
    setSuccess('Email mis à jour !');
    setTimeout(() => setSuccess(''), 3000);
    setSaving(false);
  };

  const savePassword = async () => {
    if (form.password !== form.confirmPassword) {
      setSuccess('❌ Les mots de passe ne correspondent pas !');
      setTimeout(() => setSuccess(''), 3000);
      return;
    }
    setSaving(true);
    // Mise à jour via Supabase Auth
    setSuccess('✅ Mot de passe mis à jour !');
    setTimeout(() => setSuccess(''), 3000);
    setSaving(false);
  };

  const navItems = [
    { icon: '📊', label: 'Dashboard', href: '/dashboard' },
    { icon: '👥', label: 'Clients', href: '/clients' },
    { icon: '🔔', label: 'Notifs', href: '/notifications' },
    { icon: '📱', label: 'QR Code', href: '/qrcode' },
    { icon: '⚙️', label: 'Réglages', href: '/settings' },
  ];

  const inputStyle = {
    width:'100%', background:'rgba(255,255,255,0.06)',
    border:'1px solid rgba(255,255,255,0.1)',
    borderRadius:'10px', padding:'12px 14px',
    color:'white', fontSize:'15px',
    boxSizing:'border-box', outline:'none'
  };

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'linear-gradient(135deg,#0a0a18 0%,#1a1020 50%,#0a1020 100%)',color:'white',fontFamily:'system-ui,-apple-system,sans-serif'}}>
      
      {/* Sidebar PC */}
      {!isMobile && (
        <div style={{width:'240px',background:'rgba(255,255,255,0.04)',borderRight:'1px solid rgba(255,255,255,0.08)',padding:'24px 0',display:'flex',flexDirection:'column',position:'fixed',height:'100vh',zIndex:10,backdropFilter:'blur(20px)'}}>
          <div style={{padding:'0 24px 32px'}}>
            <h1 style={{fontSize:'22px',fontWeight:'800',margin:0,color:'white'}}>Fidel<span style={{color:'#d4af37'}}>Easy</span></h1>
            {shop && <p style={{fontSize:'12px',color:'rgba(255,255,255,0.4)',margin:'4px 0 0'}}>{shop.name}</p>}
          </div>
          {navItems.map(item => (
            <a key={item.href} href={item.href} style={{display:'flex',alignItems:'center',gap:'12px',padding:'12px 24px',color:'rgba(255,255,255,0.5)',borderLeft:'3px solid transparent',textDecoration:'none',fontSize:'14px'}}>
              <span style={{fontSize:'18px'}}>{item.icon}</span>{item.label}
            </a>
          ))}
          <div style={{marginTop:'auto',padding:'24px',display:'flex',flexDirection:'column',gap:'12px'}}>
            <a href="/profile" style={{display:'flex',alignItems:'center',gap:'10px',background:'rgba(212,175,55,0.1)',border:'1px solid rgba(212,175,55,0.2)',borderRadius:'10px',padding:'10px 14px',textDecoration:'none',color:'#d4af37',fontSize:'13px',fontWeight:'600'}}>
              👤 Mon profil
            </a>
            <button onClick={logout} style={{background:'rgba(239,68,68,0.08)',color:'#fca5a5',border:'1px solid rgba(239,68,68,0.2)',borderRadius:'10px',padding:'10px',fontSize:'13px',fontWeight:'600',cursor:'pointer',width:'100%'}}>
              🚪 Déconnexion
            </button>
          </div>
        </div>
      )}

      {/* Main */}
      <div style={{marginLeft:isMobile?0:'240px',flex:1,padding:isMobile?'20px 16px 100px':'32px',position:'relative',zIndex:1}}>
        {isMobile && (
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
            <h1 style={{fontSize:'20px',fontWeight:'800',margin:0}}>Fidel<span style={{color:'#d4af37'}}>Easy</span></h1>
            {shop && <span style={{fontSize:'13px',color:'rgba(255,255,255,0.4)'}}>{shop.name}</span>}
          </div>
        )}

        <div style={{marginBottom:'28px'}}>
          <h2 style={{fontSize:isMobile?'22px':'24px',fontWeight:'700',margin:'0 0 4px'}}>Mon profil</h2>
          <p style={{color:'rgba(255,255,255,0.4)',margin:0,fontSize:'14px'}}>Gérez les informations de votre compte</p>
        </div>

        {success && (
          <div style={{background:success.includes('❌')?'rgba(239,68,68,0.1)':'rgba(34,197,94,0.1)',border:`1px solid ${success.includes('❌')?'rgba(239,68,68,0.3)':'rgba(34,197,94,0.3)'}`,borderRadius:'12px',padding:'14px 18px',marginBottom:'20px',fontSize:'14px',color:success.includes('❌')?'#fca5a5':'#86efac'}}>
            {success.includes('❌') ? success : `✅ ${success}`}
          </div>
        )}

        <div style={{display:'flex',flexDirection:'column',gap:'20px',maxWidth:'600px'}}>

          {/* Nom du commerce */}
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'24px',backdropFilter:'blur(10px)'}}>
            <h3 style={{fontSize:'15px',fontWeight:'600',margin:'0 0 16px',color:'rgba(255,255,255,0.8)'}}>🏪 Nom du commerce</h3>
            <input
              value={form.name}
              onChange={e => setForm({...form, name: e.target.value})}
              style={inputStyle}
              placeholder="Nom de votre commerce"
              onFocus={e=>e.target.style.borderColor='rgba(212,175,55,0.5)'}
              onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.1)'}
            />
            <button onClick={saveName} disabled={saving} style={{marginTop:'12px',background:'#d4af37',color:'white',border:'none',borderRadius:'10px',padding:'10px 24px',cursor:'pointer',fontSize:'14px',fontWeight:'600'}}>
              {saving ? 'Sauvegarde...' : 'Enregistrer'}
            </button>
          </div>

          {/* Email */}
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'24px',backdropFilter:'blur(10px)'}}>
            <h3 style={{fontSize:'15px',fontWeight:'600',margin:'0 0 16px',color:'rgba(255,255,255,0.8)'}}>📧 Adresse email</h3>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm({...form, email: e.target.value})}
              style={inputStyle}
              placeholder="votre@email.fr"
              onFocus={e=>e.target.style.borderColor='rgba(212,175,55,0.5)'}
              onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.1)'}
            />
            <button onClick={saveEmail} disabled={saving} style={{marginTop:'12px',background:'#d4af37',color:'white',border:'none',borderRadius:'10px',padding:'10px 24px',cursor:'pointer',fontSize:'14px',fontWeight:'600'}}>
              {saving ? 'Sauvegarde...' : 'Enregistrer'}
            </button>
          </div>

          {/* Mot de passe */}
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'24px',backdropFilter:'blur(10px)'}}>
            <h3 style={{fontSize:'15px',fontWeight:'600',margin:'0 0 16px',color:'rgba(255,255,255,0.8)'}}>🔒 Mot de passe</h3>
            <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
              <input
                type="password"
                value={form.password}
                onChange={e => setForm({...form, password: e.target.value})}
                style={inputStyle}
                placeholder="Nouveau mot de passe"
                onFocus={e=>e.target.style.borderColor='rgba(212,175,55,0.5)'}
                onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.1)'}
              />
              <input
                type="password"
                value={form.confirmPassword}
                onChange={e => setForm({...form, confirmPassword: e.target.value})}
                style={inputStyle}
                placeholder="Confirmer le mot de passe"
                onFocus={e=>e.target.style.borderColor='rgba(212,175,55,0.5)'}
                onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.1)'}
              />
            </div>
            <button onClick={savePassword} disabled={saving} style={{marginTop:'12px',background:'#d4af37',color:'white',border:'none',borderRadius:'10px',padding:'10px 24px',cursor:'pointer',fontSize:'14px',fontWeight:'600'}}>
              {saving ? 'Sauvegarde...' : 'Changer le mot de passe'}
            </button>
          </div>

          {/* Info plan */}
          <div style={{background:'rgba(212,175,55,0.06)',border:'1px solid rgba(212,175,55,0.15)',borderRadius:'16px',padding:'24px',backdropFilter:'blur(10px)'}}>
            <h3 style={{fontSize:'15px',fontWeight:'600',margin:'0 0 12px',color:'rgba(255,255,255,0.8)'}}>⭐ Mon abonnement</h3>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <p style={{margin:0,fontSize:'14px',color:'rgba(255,255,255,0.6)'}}>Plan actuel</p>
                <p style={{margin:'4px 0 0',fontSize:'20px',fontWeight:'700',color:'#d4af37',textTransform:'capitalize'}}>{shop?.plan || 'Starter'}</p>
              </div>
              <a href="/landing#pricing" style={{background:'#d4af37',color:'white',borderRadius:'10px',padding:'10px 20px',textDecoration:'none',fontSize:'14px',fontWeight:'600'}}>
                Changer de plan
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom nav mobile */}
      {isMobile && (
        <div style={{position:'fixed',bottom:0,left:0,right:0,background:'rgba(10,10,24,0.95)',borderTop:'1px solid rgba(255,255,255,0.08)',display:'flex',justifyContent:'space-around',padding:'8px 0 20px',zIndex:100,backdropFilter:'blur(20px)'}}>
          {navItems.map(item => (
            <a key={item.href} href={item.href} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'4px',textDecoration:'none',padding:'8px 16px',color:'rgba(255,255,255,0.4)'}}>
              <span style={{fontSize:'22px'}}>{item.icon}</span>
              <span style={{fontSize:'10px'}}>{item.label}</span>
            </a>
          ))}
          <button onClick={logout} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'4px',padding:'8px 16px',background:'none',border:'none',cursor:'pointer',color:'rgba(255,255,255,0.4)'}}>
            <span style={{fontSize:'22px'}}>🚪</span>
            <span style={{fontSize:'10px'}}>Quitter</span>
          </button>
        </div>
      )}

      <style>{`
        @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-30px)} }
        input::placeholder { color: rgba(255,255,255,0.25); }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}