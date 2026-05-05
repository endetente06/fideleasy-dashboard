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
    <div style={{minHeight:'100vh',background:'#07070f',color:'white',fontFamily:'sans-serif',display:'flex',alignItems:'center',justifyContent:'center',padding:'24px'}}>
      <div style={{width:'100%',maxWidth:'400px'}}>
        <div style={{textAlign:'center',marginBottom:'40px'}}>
          <h1 style={{fontSize:'32px',fontWeight:'bold',marginBottom:'8px'}}>
            Fidel<span style={{color:'#059669'}}>Easy</span>
          </h1>
          <p style={{color:'#6060a0'}}>Connectez-vous à votre dashboard</p>
        </div>

        <div style={{background:'#0f0f1c',border:'1px solid #1e1e35',borderRadius:'16px',padding:'32px'}}>
          {error && (
            <div style={{background:'rgba(247,92,126,0.1)',border:'1px solid rgba(247,92,126,0.3)',borderRadius:'8px',padding:'12px',marginBottom:'16px',color:'#f75c7e',fontSize:'14px'}}>
              {error}
            </div>
          )}

          <div style={{fontSize:'11px',color:'#6060a0',marginBottom:'6px',textTransform:'uppercase',letterSpacing:'0.8px'}}>Email</div>
          <input placeholder="votre@email.fr" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}
            style={{width:'100%',background:'#161625',border:'1px solid #1e1e35',borderRadius:'8px',padding:'12px',color:'white',marginBottom:'16px',fontSize:'14px',boxSizing:'border-box'}}/>

          <div style={{fontSize:'11px',color:'#6060a0',marginBottom:'6px',textTransform:'uppercase',letterSpacing:'0.8px'}}>Mot de passe</div>
          <input type="password" placeholder="••••••••" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}
            style={{width:'100%',background:'#161625',border:'1px solid #1e1e35',borderRadius:'8px',padding:'12px',color:'white',marginBottom:'24px',fontSize:'14px',boxSizing:'border-box'}}/>

          <button onClick={login} disabled={loading || !form.email || !form.password}
            style={{width:'100%',background:'#4f6ef7',color:'white',border:'none',borderRadius:'10px',padding:'14px',cursor:'pointer',fontSize:'15px',fontWeight:'600'}}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>

          <div style={{textAlign:'center',marginTop:'16px',fontSize:'13px',color:'#6060a0'}}>
            Pas encore de compte ? <span style={{color:'#4f6ef7',cursor:'pointer'}} onClick={()=>window.location.href='/register'}>Créer un compte</span>
          </div>
        </div>
      </div>
    </div>
  );
}