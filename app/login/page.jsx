"use client";
import { useState } from 'react';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('https://fideleasy-backend-production.up.railway.app/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      localStorage.setItem('token', data.token);
      localStorage.setItem('shop', JSON.stringify(data.shop));
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

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
        <div style={{position:'absolute',top:'50%',left:'50%',width:'200px',height:'200px',borderRadius:'50%',background:'rgba(255,255,255,0.02)',animation:'float3 6s ease-in-out infinite'}}/>
      </div>

      {/* Carte flottante gauche */}
      <div style={{
        position:'absolute',left:'8%',top:'30%',
        width:'180px',background:'linear-gradient(135deg,#1a1a2e,#2a1a3e)',
        borderRadius:'16px',padding:'18px',
        border:'1px solid rgba(212,175,55,0.3)',
        boxShadow:'0 20px 60px rgba(0,0,0,0.5)',
        animation:'floatCard1 7s ease-in-out infinite',
        display:'none'
      }}>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:'14px'}}>
          <span style={{fontSize:'10px',color:'rgba(255,255,255,0.6)',fontWeight:'600'}}>FidelEasy</span>
          <span style={{fontSize:'16px'}}>🍎</span>
        </div>
        <div style={{fontSize:'22px',fontWeight:'800',color:'#d4af37',marginBottom:'4px'}}>7</div>
        <div style={{fontSize:'10px',color:'rgba(255,255,255,0.5)',marginBottom:'10px'}}>Tampons</div>
        <div style={{display:'flex',gap:'4px',flexWrap:'wrap'}}>
          {[...Array(10)].map((_,i) => (
            <div key={i} style={{width:'12px',height:'12px',borderRadius:'50%',background: i < 7 ? '#d4af37' : 'rgba(255,255,255,0.1)'}}/>
          ))}
        </div>
      </div>

      {/* Formulaire */}
      <div style={{
        width:'100%',maxWidth:'420px',
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
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',margin:0}}>Connectez-vous à votre dashboard</p>
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

        <div style={{marginBottom:'16px'}}>
          <label style={{fontSize:'12px',color:'rgba(255,255,255,0.5)',fontWeight:'600',textTransform:'uppercase',letterSpacing:'0.8px',display:'block',marginBottom:'8px'}}>
            Email
          </label>
          <input
            type="email"
            placeholder="votre@email.fr"
            value={form.email}
            onChange={e => setForm({...form, email: e.target.value})}
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

        <div style={{marginBottom:'24px'}}>
          <label style={{fontSize:'12px',color:'rgba(255,255,255,0.5)',fontWeight:'600',textTransform:'uppercase',letterSpacing:'0.8px',display:'block',marginBottom:'8px'}}>
            Mot de passe
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={e => setForm({...form, password: e.target.value})}
            onKeyDown={e => e.key === 'Enter' && login()}
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

        <button
          onClick={login}
          disabled={loading || !form.email || !form.password}
          style={{
            width:'100%',background:'#d4af37',color:'white',
            border:'none',borderRadius:'12px',padding:'14px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize:'15px',fontWeight:'700',
            opacity: loading || !form.email || !form.password ? 0.6 : 1,
            transition:'transform 0.2s,box-shadow 0.2s',
            boxShadow:'0 4px 20px rgba(212,175,55,0.3)'
          }}
          onMouseEnter={e=>{if(!loading)e.target.style.transform='translateY(-1px)'}}
          onMouseLeave={e=>e.target.style.transform='translateY(0)'}
        >
          {loading ? 'Connexion...' : 'Se connecter →'}
        </button>

        <div style={{textAlign:'center',marginTop:'20px',fontSize:'14px',color:'rgba(255,255,255,0.4)'}}>
          Pas encore de compte ?{' '}
          <a href="/register" style={{color:'#d4af37',textDecoration:'none',fontWeight:'600'}}>
            Créer un compte
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
        @keyframes floatCard1 {
          0%,100% { transform:translateY(0) rotate(-3deg); }
          50% { transform:translateY(-20px) rotate(-1deg); }
        }
        input::placeholder { color: rgba(255,255,255,0.25); }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}