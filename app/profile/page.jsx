"use client";
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import Sidebar from '../components/Sidebar';

const API = 'https://fideleasy-backend-production.up.railway.app';

export default function Profile() {
  const [shop, setShop] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', passkit_program_id: '' });
  const theme = useTheme();

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
    setSuccess('✅ Nom mis à jour !');
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
    setSuccess('✅ Email mis à jour !');
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
    setSuccess('✅ Mot de passe mis à jour !');
    setTimeout(() => setSuccess(''), 3000);
    setSaving(false);
  };

  const savePassKit = async () => {
    setSaving(true);
    await fetch(`${API}/shops/${shop.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passkit_program_id: form.passkit_program_id })
    });
    const updated = { ...shop, passkit_program_id: form.passkit_program_id };
    localStorage.setItem('shop', JSON.stringify(updated));
    setShop(updated);
    setSuccess('✅ PassKit configuré !');
    setTimeout(() => setSuccess(''), 3000);
    setSaving(false);
  };

  const inputStyle = {
    width:'100%', background:theme.inputBg,
    border:`1px solid ${theme.inputBorder}`,
    borderRadius:'10px', padding:'12px 14px',
    color:theme.color, fontSize:'15px',
    boxSizing:'border-box', outline:'none'
  };

  if (loading) return (
    <div style={{minHeight:'100vh',background:theme.bg,display:'flex',alignItems:'center',justifyContent:'center',color:theme.color}}>
      <p>Chargement...</p>
    </div>
  );

  if (!shop) return (
    <div style={{minHeight:'100vh',background:theme.bg,display:'flex',alignItems:'center',justifyContent:'center',color:theme.color,flexDirection:'column',gap:'16px'}}>
      <p>Vous devez être connecté pour accéder à cette page.</p>
      <a href="/login" style={{background:'#d4af37',color:'white',borderRadius:'10px',padding:'10px 24px',textDecoration:'none',fontWeight:'600'}}>Se connecter</a>
    </div>
  );

  return (
    <div style={{display:'flex',minHeight:'100vh',background:theme.bg,color:theme.color,fontFamily:'system-ui,-apple-system,sans-serif'}}>

      <Sidebar activePage="/profile" />

      <div style={{marginLeft:isMobile?0:'240px',flex:1,padding:isMobile?'20px 16px 100px':'32px',position:'relative',zIndex:1}}>
        {isMobile && (
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
            <h1 style={{fontSize:'20px',fontWeight:'800',margin:0}}>Fidel<span style={{color:'#d4af37'}}>Easy</span></h1>
            {shop && <span style={{fontSize:'13px',color:theme.textMuted}}>{shop.name}</span>}
          </div>
        )}

        <div style={{marginBottom:'28px'}}>
          <h2 style={{fontSize:isMobile?'22px':'24px',fontWeight:'700',margin:'0 0 4px'}}>Mon profil</h2>
          <p style={{color:theme.textMuted,margin:0,fontSize:'14px'}}>Gérez les informations de votre compte</p>
        </div>

        {success && (
          <div style={{background:success.includes('❌')?'rgba(239,68,68,0.1)':'rgba(34,197,94,0.1)',border:`1px solid ${success.includes('❌')?'rgba(239,68,68,0.3)':'rgba(34,197,94,0.3)'}`,borderRadius:'12px',padding:'14px 18px',marginBottom:'20px',fontSize:'14px',color:success.includes('❌')?'#fca5a5':'#86efac'}}>
            {success}
          </div>
        )}

        <div style={{display:'flex',flexDirection:'column',gap:'20px',maxWidth:'600px'}}>
          <div style={{background:theme.cardBg,border:`1px solid ${theme.cardBorder}`,borderRadius:'16px',padding:'24px',backdropFilter:'blur(10px)'}}>
            <h3 style={{fontSize:'15px',fontWeight:'600',margin:'0 0 16px',color:theme.textSecondary}}>🏪 Nom du commerce</h3>
            <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={inputStyle} placeholder="Nom de votre commerce" onFocus={e=>e.target.style.borderColor='rgba(212,175,55,0.5)'} onBlur={e=>e.target.style.borderColor=theme.inputBorder}/>
            <button onClick={saveName} disabled={saving} style={{marginTop:'12px',background:'#d4af37',color:'white',border:'none',borderRadius:'10px',padding:'10px 24px',cursor:'pointer',fontSize:'14px',fontWeight:'600'}}>
              {saving ? 'Sauvegarde...' : 'Enregistrer'}
            </button>
          </div>

          <div style={{background:theme.cardBg,border:`1px solid ${theme.cardBorder}`,borderRadius:'16px',padding:'24px',backdropFilter:'blur(10px)'}}>
            <h3 style={{fontSize:'15px',fontWeight:'600',margin:'0 0 16px',color:theme.textSecondary}}>📧 Adresse email</h3>
            <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} style={inputStyle} placeholder="votre@email.fr" onFocus={e=>e.target.style.borderColor='rgba(212,175,55,0.5)'} onBlur={e=>e.target.style.borderColor=theme.inputBorder}/>
            <button onClick={saveEmail} disabled={saving} style={{marginTop:'12px',background:'#d4af37',color:'white',border:'none',borderRadius:'10px',padding:'10px 24px',cursor:'pointer',fontSize:'14px',fontWeight:'600'}}>
              {saving ? 'Sauvegarde...' : 'Enregistrer'}
            </button>
          </div>

          <div style={{background:theme.cardBg,border:`1px solid ${theme.cardBorder}`,borderRadius:'16px',padding:'24px',backdropFilter:'blur(10px)'}}>
            <h3 style={{fontSize:'15px',fontWeight:'600',margin:'0 0 16px',color:theme.textSecondary}}>🔒 Mot de passe</h3>
            <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
              <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} style={inputStyle} placeholder="Nouveau mot de passe" onFocus={e=>e.target.style.borderColor='rgba(212,175,55,0.5)'} onBlur={e=>e.target.style.borderColor=theme.inputBorder}/>
              <input type="password" value={form.confirmPassword} onChange={e => setForm({...form, confirmPassword: e.target.value})} style={inputStyle} placeholder="Confirmer le mot de passe" onFocus={e=>e.target.style.borderColor='rgba(212,175,55,0.5)'} onBlur={e=>e.target.style.borderColor=theme.inputBorder}/>
            </div>
            <button onClick={savePassword} disabled={saving} style={{marginTop:'12px',background:'#d4af37',color:'white',border:'none',borderRadius:'10px',padding:'10px 24px',cursor:'pointer',fontSize:'14px',fontWeight:'600'}}>
              {saving ? 'Sauvegarde...' : 'Changer le mot de passe'}
            </button>
          </div>

          <div style={{background:'rgba(212,175,55,0.06)',border:'1px solid rgba(212,175,55,0.15)',borderRadius:'16px',padding:'24px',backdropFilter:'blur(10px)'}}>
            <h3 style={{fontSize:'15px',fontWeight:'600',margin:'0 0 12px',color:theme.textSecondary}}>⭐ Mon abonnement</h3>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <p style={{margin:0,fontSize:'14px',color:theme.textMuted}}>Plan actuel</p>
                <p style={{margin:'4px 0 0',fontSize:'20px',fontWeight:'700',color:'#d4af37',textTransform:'capitalize'}}>{shop?.plan || 'Starter'}</p>
              </div>
              <a href="/landing#pricing" style={{background:'#d4af37',color:'white',borderRadius:'10px',padding:'10px 20px',textDecoration:'none',fontSize:'14px',fontWeight:'600'}}>Changer de plan</a>
            </div>
          </div>

          <div style={{background:'rgba(59,130,246,0.06)',border:'1px solid rgba(59,130,246,0.2)',borderRadius:'16px',padding:'24px',backdropFilter:'blur(10px)'}}>
            <h3 style={{fontSize:'15px',fontWeight:'600',margin:'0 0 6px',color:theme.textSecondary}}>💳 PassKit — Carte de fidélité</h3>
            <p style={{fontSize:'12px',color:theme.textMuted,margin:'0 0 16px'}}>
              Collez votre Program ID PassKit pour activer les cartes Apple & Google Wallet personnalisées.
              Trouvez-le dans <strong style={{color:'#93c5fd'}}>app.passkit.com → votre programme → URL</strong>.
            </p>
            <input
              value={form.passkit_program_id}
              onChange={e => setForm({...form, passkit_program_id: e.target.value})}
              style={inputStyle}
              placeholder="ex: 2aTM3FUCMZxmN34tgtLqQ6"
              onFocus={e=>e.target.style.borderColor='rgba(59,130,246,0.5)'}
              onBlur={e=>e.target.style.borderColor=theme.inputBorder}
            />
            <button onClick={savePassKit} disabled={saving} style={{marginTop:'12px',background:'#3b82f6',color:'white',border:'none',borderRadius:'10px',padding:'10px 24px',cursor:'pointer',fontSize:'14px',fontWeight:'600'}}>
              {saving ? 'Sauvegarde...' : 'Enregistrer'}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        input::placeholder { color: rgba(255,255,255,0.25); }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}