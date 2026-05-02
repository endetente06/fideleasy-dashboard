"use client";
import { useEffect, useState } from 'react';

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  const SHOP_ID = 'a23f70ea-db85-46b4-9bd1-c650831b134a';

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = () => {
    fetch(`http://localhost:3000/customers/${SHOP_ID}`)
      .then(res => res.json())
      .then(data => {
        setClients(data.data || []);
        setLoading(false);
      });
  };

  const addClient = () => {
    fetch('http://localhost:3000/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, shop_id: SHOP_ID })
    })
      .then(res => res.json())
      .then(() => {
        setShowForm(false);
        setForm({ name: '', email: '', phone: '' });
        fetchClients();
      });
  };

  return (
    <div style={{minHeight:'100vh',background:'#07070f',color:'white',fontFamily:'sans-serif',display:'flex'}}>
      <div style={{width:'240px',background:'#0f0f1c',borderRight:'1px solid #1e1e35',padding:'28px 0',display:'flex',flexDirection:'column'}}>
        <div style={{padding:'0 24px 32px',fontSize:'22px',fontWeight:'bold'}}>
          Fidel<span style={{color:'#4f6ef7'}}>Easy</span>
        </div>
        {['📊 Tableau de bord','💳 Ma carte','👥 Clients','🔔 Notifications','🎁 Promotions','⚙️ Réglages'].map((item)=>(
          <div key={item} style={{padding:'12px 24px',cursor:'pointer',fontSize:'14px',color:'#6060a0'}}>
            {item}
          </div>
        ))}
      </div>

      <div style={{flex:1,padding:'32px'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'32px'}}>
          <h1 style={{fontSize:'24px',fontWeight:'bold'}}>Clients</h1>
          <button onClick={()=>setShowForm(!showForm)} style={{background:'#4f6ef7',color:'white',border:'none',borderRadius:'10px',padding:'10px 20px',cursor:'pointer',fontSize:'14px',fontWeight:'600'}}>
            + Nouveau client
          </button>
        </div>

        {showForm && (
          <div style={{background:'#0f0f1c',border:'1px solid #1e1e35',borderRadius:'16px',padding:'24px',marginBottom:'24px'}}>
            <h2 style={{fontSize:'16px',fontWeight:'bold',marginBottom:'16px'}}>Ajouter un client</h2>
            <input placeholder="Nom complet" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}
              style={{width:'100%',background:'#161625',border:'1px solid #1e1e35',borderRadius:'8px',padding:'10px',color:'white',marginBottom:'12px',fontSize:'14px'}}/>
            <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}
              style={{width:'100%',background:'#161625',border:'1px solid #1e1e35',borderRadius:'8px',padding:'10px',color:'white',marginBottom:'12px',fontSize:'14px'}}/>
            <input placeholder="Téléphone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}
              style={{width:'100%',background:'#161625',border:'1px solid #1e1e35',borderRadius:'8px',padding:'10px',color:'white',marginBottom:'16px',fontSize:'14px'}}/>
            <button onClick={addClient} style={{background:'#4f6ef7',color:'white',border:'none',borderRadius:'8px',padding:'10px 24px',cursor:'pointer',fontSize:'14px',fontWeight:'600'}}>
              Ajouter
            </button>
          </div>
        )}

        <div style={{background:'#0f0f1c',border:'1px solid #1e1e35',borderRadius:'16px',overflow:'hidden'}}>
          <div style={{display:'grid',gridTemplateColumns:'2fr 2fr 1fr',padding:'12px 24px',borderBottom:'1px solid #1e1e35',fontSize:'11px',color:'#6060a0',textTransform:'uppercase',letterSpacing:'1px'}}>
            <div>Client</div>
            <div>Email</div>
            <div>Téléphone</div>
          </div>
          {loading ? (
            <div style={{padding:'32px',textAlign:'center',color:'#6060a0'}}>Chargement...</div>
          ) : clients.length === 0 ? (
            <div style={{padding:'32px',textAlign:'center',color:'#6060a0'}}>Aucun client pour l'instant</div>
          ) : clients.map((client) => (
            <div key={client.id} style={{display:'grid',gridTemplateColumns:'2fr 2fr 1fr',padding:'16px 24px',borderBottom:'1px solid #1e1e35',fontSize:'14px',alignItems:'center'}}>
              <div style={{fontWeight:'600'}}>{client.name}</div>
              <div style={{color:'#6060a0'}}>{client.email}</div>
              <div style={{color:'#6060a0'}}>{client.phone}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}