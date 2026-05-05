"use client";
import { useState } from 'react';

export default function Register() {
  const [form, setForm] = useState({ email: '', password: '', shop_name: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const register = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('https://fideleasy-backend-production.up.railway.app/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setSuccess(true);
      setTimeout(() => window.location.href = '/login', 2000);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  if (success) return (
    <div style={{
      minHeight:'100vh',
      background:'linear-gradient(135deg,#0a0a18 0%,#1a1020 50%,#0a1020 100%)',
      display:'flex',alignItems:'center',justifyContent:'center',
      fontFamily:'system-ui,sans-serif'
    }}>
      <div style={{textAlign:'center'}}>
        <div style={{fontSize:'72px',marginBottom:'20px'}}>🎉</div>
        <h2 style={{fontSize:'28px',fontWeight:'800',color:'white',marginBottom:'8px'}}>Compte créé !</h2>
        <p style={{color:'rgba(255,255,255,0.5)'}}>Redirection vers la connexion...</p>
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight:'100vh',
      background:'linear-gradient(135deg,#0a0a18 0%,#1a1020 50%,#0a1020 100%)',
      display:'flex',alignItems:'center',justifyContent:'center',
      fontFamily:'system-ui,-apple-system,sans-serif',
      position:'relative',overflow:'hidden',padding:'24px'
    }}>
      {/* Formes animées fond */}
      <div style={{position:'absolute',inset:0,pointerEvents:'none'}}>
        <div style={{position:'absolute',top:'10%',left:'5%',width:'400px',height:'400px',borderRadius:'50%',background:'rgba(212,175,55,0.05)',animation:'float1 8s ease-in-out infinite'}}/>
        <div style={{position:'absolute',bottom:'10%',right:'5%',width:'300px',height:'300px',borderRadius:'50%',background:'rgba(212,175,55,0.04)',animation:'float2 10s ease-in-out infinite'}}/>
        <div style={{position:'absolute',top:'40%',right:'20%',width:'150px',height:'150px',borderRadius:'50%',background:'rgba(255,255,255,0.02)',animation:'float3 6s ease-in-out infinite'}}/>
      </div>

      {/* Formulaire */}
      <div style={{
        width:'100%',maxWidth:'440px',
        background:'rgba(255,255,255,0.04)',
        border:'1px solid rgba(255,255,255,0.1)',
        borderRadius:'24px',padding:'40px',
        backdropFilter:'blur(20px)',
        position:'relative',zIndex:10,
        boxShadow:'0 20px 60px rgba(0,0,0,0.4)'
      }}>
        {/* Logo */}
        <div style={{textAlign:'center',marginBottom:'32px'}}>
          <a href="/" style={{textDecoration:'none'}}>
            <h1 style={{fontSize:'28px',fontWeight:'800',margin:'0 0 8px',color:'white'}}>
              Fidel<span style={{color:'#d4af37'}}>Easy</span>
            </h1>
          </a>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',margin:0}}>Créez votre compte commerçant</p>
        </div>

        {error && (
          <div style={{
            background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.3)',
            borderRadius:'10px',padding:'12px 16px',marginBottom:'20px',
            color:'#fca5a5',fontSize:'14px'
          }}>
            {error}
          </div>
        )}

        {[
          { label:'Nom du commerce', key:'shop_name', type:'text', placeholder:'Ex: Café de la Plage' },
          { label:'Email', key:'email', type:'email', placeholder:'votre@email.fr' },
          { label:'Mot de passe', key:'password', type:'password', placeholder:'••••••••' },
        ].map(field => (
          <div key={field.key} style={{marginBottom:'16px'}}>
            <label style={{fontSize:'12px',color:'rgba(255,255,255,0.5)',fontWeight:'600',textTransform:'uppercase',letterSpacing:'0.8px',display:'block',marginBottom:'8px'}}>
              {field.label}
            </label>
            <input
              type={field.type}
              placeholder={field.placeholder}
              value={form[field.key]}
              onChange={e => setForm({...form, [field.key]: e.target.value})}
              style={{
                width:'100%',background:'rgba(255,255,255,0.06)',
                border:'1px solid rgba(255,255,255,0.1)',
                borderRadius:'10px',padding:'12px 16px',
                color:'white',fontSize:'15px',boxSizing:'border-box',
                outline:'none',transition:'border-color 0.2s'
              }}
              onFocus={e=>e.target.style.borderColor='rgba(212,175,55,0.5)'}
              onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.1)'}
            />
          </div>
        ))}

        <div style={{marginBottom:'24px',marginTop:'8px'}}>
          <p style={{fontSize:'12px',color:'rgba(255,255,255,0.3)',margin:0,lineHeight:'1.6'}}>
            En créant un compte vous acceptez nos{' '}
            <a href="/legal" style={{color:'#d4af37',textDecoration:'none'}}>CGV</a>
            {' '}et notre{' '}
            <a href="/legal" style={{color:'#d4af37',textDecoration:'none'}}>politique de confidentialité</a>.
          </p>
        </div>

        <button
          onClick={register}
          disabled={loading || !form.email || !form.password || !form.shop_name}
          style={{
            width:'100%',background:'#d4af37',color:'white',
            border:'none',borderRadius:'12px',padding:'14px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize:'15px',fontWeight:'700',
            opacity: loading || !form.email || !form.password || !form.shop_name ? 0.6 : 1,
            transition:'transform 0.2s,box-shadow 0.2s',
            boxShadow:'0 4px 20px rgba(212,175,55,0.3)'
          }}
          onMouseEnter={e=>{if(!loading)e.target.style.transform='translateY(-1px)'}}
          onMouseLeave={e=>e.target.style.transform='translateY(0)'}
        >
          {loading ? 'Création...' : '🚀 Créer mon compte'}
        </button>

        <div style={{textAlign:'center',marginTop:'20px',fontSize:'14px',color:'rgba(255,255,255,0.4)'}}>
          Déjà un compte ?{' '}
          <a href="/login" style={{color:'#d4af37',textDecoration:'none',fontWeight:'600'}}>
            Se connecter
          </a>
        </div>

        <div style={{textAlign:'center',marginTop:'16px'}}>
          <a href="/" style={{color:'rgba(255,255,255,0.3)',textDecoration:'none',fontSize:'13px'}}>
            ← Retour au site
          </a>
        </div>
      </div>

      <style>{`
        @keyframes float1 {
          0%,100% { transform:translateY(0) scale(1); }
          50% { transform:translateY(-30px) scale(1.05); }
        }
        @keyframes float2 {
          0%,100% { transform:translateY(0); }
          50% { transform:translateY(20px); }
        }
        @keyframes float3 {
          0%,100% { transform:translateY(0) rotate(0deg); }
          50% { transform:translateY(-15px) rotate(10deg); }
        }
        input::placeholder { color: rgba(255,255,255,0.25); }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}