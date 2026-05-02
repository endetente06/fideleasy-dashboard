"use client";
import { useEffect, useState, use } from 'react';

export default function JoinPage({ params }) {
  const { shop_id } = use(params);
  const [shop, setShop] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`https://fideleasy-backend-production.up.railway.app/shops/${shop_id}`)
      .then(res => res.json())
      .then(data => setShop(data.data));
  }, [shop_id]);

  const join = () => {
    setLoading(true);
    fetch('https://fideleasy-backend-production.up.railway.app/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, shop_id })
    })
      .then(res => res.json())
      .then(() => {
        setSubmitted(true);
        setLoading(false);
      });
  };

  if (submitted) return (
    <div style={{minHeight:'100vh',background:'#07070f',color:'white',fontFamily:'sans-serif',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{textAlign:'center',padding:'32px'}}>
        <div style={{fontSize:'64px',marginBottom:'16px'}}>🎉</div>
        <h1 style={{fontSize:'28px',fontWeight:'bold',marginBottom:'8px'}}>Bienvenue !</h1>
        <p style={{color:'#6060a0',fontSize:'16px',marginBottom:'24px'}}>
          Votre carte de fidélité a été créée avec succès !
        </p>
        <div style={{background:'#0f0f1c',border:'1px solid #1e1e35',borderRadius:'16px',padding:'24px'}}>
          <div style={{fontSize:'14px',color:'#6060a0',marginBottom:'8px'}}>Prochaine étape</div>
          <div style={{fontSize:'16px',fontWeight:'600'}}>Ajoutez votre carte à votre wallet 📱</div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{minHeight:'100vh',background:'#07070f',color:'white',fontFamily:'sans-serif',display:'flex',alignItems:'center',justifyContent:'center',padding:'24px'}}>
      <div style={{width:'100%',maxWidth:'400px'}}>
        <div style={{textAlign:'center',marginBottom:'32px'}}>
          <div style={{width:'64px',height:'64px',borderRadius:'16px',background:'linear-gradient(135deg,#4f6ef7,#7c8ff7)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',margin:'0 auto 16px'}}>
            🏪
          </div>
          <h1 style={{fontSize:'24px',fontWeight:'bold',marginBottom:'8px'}}>
            {shop ? shop.name : 'Chargement...'}
          </h1>
          <p style={{color:'#6060a0',fontSize:'14px'}}>
            Rejoignez le programme de fidélité et gagnez des récompenses !
          </p>
        </div>

        <div style={{background:'#0f0f1c',border:'1px solid #1e1e35',borderRadius:'16px',padding:'24px'}}>
          <div style={{fontSize:'11px',color:'#6060a0',marginBottom:'6px',textTransform:'uppercase',letterSpacing:'0.8px'}}>Nom complet</div>
          <input placeholder="Ex: Sophie Martin" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}
            style={{width:'100%',background:'#161625',border:'1px solid #1e1e35',borderRadius:'8px',padding:'12px',color:'white',marginBottom:'16px',fontSize:'14px',boxSizing:'border-box'}}/>

          <div style={{fontSize:'11px',color:'#6060a0',marginBottom:'6px',textTransform:'uppercase',letterSpacing:'0.8px'}}>Email</div>
          <input placeholder="exemple@email.fr" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}
            style={{width:'100%',background:'#161625',border:'1px solid #1e1e35',borderRadius:'8px',padding:'12px',color:'white',marginBottom:'16px',fontSize:'14px',boxSizing:'border-box'}}/>

          <div style={{fontSize:'11px',color:'#6060a0',marginBottom:'6px',textTransform:'uppercase',letterSpacing:'0.8px'}}>Téléphone</div>
          <input placeholder="+33 6 00 00 00 00" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}
            style={{width:'100%',background:'#161625',border:'1px solid #1e1e35',borderRadius:'8px',padding:'12px',color:'white',marginBottom:'24px',fontSize:'14px',boxSizing:'border-box'}}/>

          <button onClick={join} disabled={loading || !form.name || !form.email}
            style={{width:'100%',background:'#4f6ef7',color:'white',border:'none',borderRadius:'10px',padding:'14px',cursor:'pointer',fontSize:'15px',fontWeight:'600'}}>
            {loading ? 'Inscription...' : '🎉 Rejoindre le programme'}
          </button>
        </div>

        <div style={{textAlign:'center',marginTop:'16px',fontSize:'12px',color:'#6060a0'}}>
          Fidel<span style={{color:'#4f6ef7'}}>Easy</span> · Carte de fidélité digitale
        </div>
      </div>
    </div>
  );
}