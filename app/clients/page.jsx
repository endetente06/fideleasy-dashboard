"use client";
import { useState, useEffect } from 'react';

const API = 'https://fideleasy-backend-production.up.railway.app';

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [saving, setSaving] = useState(false);

  const shopId = typeof window !== 'undefined' 
    ? (JSON.parse(localStorage.getItem('shop') || '{}').id || 'a23f70ea-db85-46b4-9bd1-c650831b134a')
    : 'a23f70ea-db85-46b4-9bd1-c650831b134a';

  useEffect(() => {
    fetch(`${API}/customers/${shopId}`)
      .then(r => r.json())
      .then(d => { setClients(d.data || []); setLoading(false); });
  }, []);

  const addClient = async () => {
    setSaving(true);
    await fetch(`${API}/customers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, shop_id: shopId })
    });
    const d = await fetch(`${API}/customers/${shopId}`).then(r => r.json());
    setClients(d.data || []);
    setForm({ name: '', email: '', phone: '' });
    setShowForm(false);
    setSaving(false);
  };

  const navItems = [
    { icon: '📊', label: 'Dashboard', href: '/dashboard' },
    { icon: '👥', label: 'Clients', href: '/clients', active: true },
    { icon: '🔔', label: 'Notifications', href: '/notifications' },
    { icon: '📱', label: 'QR Code', href: '/qrcode' },
  ];

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#07070f',color:'white',fontFamily:'system-ui,sans-serif'}}>
      {/* Sidebar */}
      <div style={{width:'240px',background:'#0a0a18',borderRight:'1px solid #1e1e35',padding:'24px 0',display:'flex',flexDirection:'column',position:'fixed',height:'100vh'}}>
        <div style={{padding:'0 24px 32px'}}>
          <h1 style={{fontSize:'22px',fontWeight:'800',margin:0}}>
            Fidel<span style={{color:'#059669'}}>Easy</span>
          </h1>
        </div>
        {navItems.map(item => (
          <a key={item.href} href={item.href} style={{
            display:'flex',alignItems:'center',gap:'12px',padding:'12px 24px',
            color: item.active ? '#4f6ef7' : '#8080b0',
            background: item.active ? 'rgba(79,110,247,0.1)' : 'transparent',
            borderLeft: item.active ? '3px solid #4f6ef7' : '3px solid transparent',
            textDecoration:'none',fontSize:'14px',fontWeight: item.active ? '600' : '400',
          }}>
            <span style={{fontSize:'18px'}}>{item.icon}</span>
            {item.label}
          </a>
        ))}
      </div>

      {/* Main */}
      <div style={{marginLeft:'240px',flex:1,padding:'32px'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'32px'}}>
          <div>
            <h2 style={{fontSize:'24px',fontWeight:'700',margin:'0 0 4px'}}>Mes clients</h2>
            <p style={{color:'#6060a0',margin:0,fontSize:'14px'}}>{clients.length} client{clients.length > 1 ? 's' : ''} au total</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} style={{background:'#4f6ef7',color:'white',border:'none',borderRadius:'10px',padding:'10px 20px',cursor:'pointer',fontSize:'14px',fontWeight:'600'}}>
            + Ajouter un client
          </button>
        </div>

        {/* Formulaire */}
        {showForm && (
          <div style={{background:'#0f0f1c',border:'1px solid #1e1e35',borderRadius:'16px',padding:'24px',marginBottom:'24px'}}>
            <h3 style={{margin:'0 0 16px',fontSize:'16px'}}>Nouveau client</h3>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'12px',marginBottom:'16px'}}>
              {[['Nom', 'name', 'Jean Dupont'], ['Email', 'email', 'jean@email.fr'], ['Téléphone', 'phone', '06 XX XX XX XX']].map(([label, key, placeholder]) => (
                <div key={key}>
                  <div style={{fontSize:'11px',color:'#6060a0',marginBottom:'6px',textTransform:'uppercase',letterSpacing:'0.8px'}}>{label}</div>
                  <input placeholder={placeholder} value={form[key]} onChange={e => setForm({...form, [key]: e.target.value})}
                    style={{width:'100%',background:'#161625',border:'1px solid #1e1e35',borderRadius:'8px',padding:'10px 12px',color:'white',fontSize:'14px',boxSizing:'border-box'}}/>
                </div>
              ))}
            </div>
            <div style={{display:'flex',gap:'12px'}}>
              <button onClick={addClient} disabled={saving || !form.name}
                style={{background:'#4f6ef7',color:'white',border:'none',borderRadius:'8px',padding:'10px 24px',cursor:'pointer',fontSize:'14px',fontWeight:'600'}}>
                {saving ? 'Enregistrement...' : '✅ Enregistrer'}
              </button>
              <button onClick={() => setShowForm(false)}
                style={{background:'transparent',color:'#6060a0',border:'1px solid #1e1e35',borderRadius:'8px',padding:'10px 24px',cursor:'pointer',fontSize:'14px'}}>
                Annuler
              </button>
            </div>
          </div>
        )}

        {/* Liste clients */}
        {loading ? (
          <div style={{textAlign:'center',padding:'60px',color:'#6060a0'}}>Chargement...</div>
        ) : clients.length === 0 ? (
          <div style={{textAlign:'center',padding:'60px',background:'#0f0f1c',border:'1px solid #1e1e35',borderRadius:'16px'}}>
            <div style={{fontSize:'48px',marginBottom:'16px'}}>👥</div>
            <p style={{color:'#6060a0',fontSize:'16px'}}>Aucun client pour l'instant</p>
            <button onClick={() => setShowForm(true)} style={{background:'#4f6ef7',color:'white',border:'none',borderRadius:'10px',padding:'10px 24px',cursor:'pointer',marginTop:'12px'}}>
              Ajouter mon premier client
            </button>
          </div>
        ) : (
          <div style={{background:'#0f0f1c',border:'1px solid #1e1e35',borderRadius:'16px',overflow:'hidden'}}>
            <table style={{width:'100%',borderCollapse:'collapse'}}>
              <thead>
                <tr style={{borderBottom:'1px solid #1e1e35'}}>
                  {['Client', 'Email', 'Téléphone', 'Actions'].map(h => (
                    <th key={h} style={{padding:'14px 20px',textAlign:'left',fontSize:'11px',color:'#6060a0',textTransform:'uppercase',letterSpacing:'0.8px',fontWeight:'600'}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {clients.map((client, i) => (
                  <tr key={client.id} style={{borderBottom: i < clients.length-1 ? '1px solid #1e1e35' : 'none'}}>
                    <td style={{padding:'16px 20px'}}>
                      <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                        <div style={{width:'36px',height:'36px',borderRadius:'50%',background:'rgba(79,110,247,0.2)',display:'flex',alignItems:'center',justifyContent:'center',color:'#4f6ef7',fontWeight:'700',fontSize:'14px'}}>
                          {client.name?.charAt(0).toUpperCase()}
                        </div>
                        <span style={{fontWeight:'500'}}>{client.name}</span>
                      </div>
                    </td>
                    <td style={{padding:'16px 20px',color:'#8080b0',fontSize:'14px'}}>{client.email || '—'}</td>
                    <td style={{padding:'16px 20px',color:'#8080b0',fontSize:'14px'}}>{client.phone || '—'}</td>
                    <td style={{padding:'16px 20px'}}>
                      <a href="#" style={{background:'rgba(79,110,247,0.1)',color:'#4f6ef7',borderRadius:'6px',padding:'6px 12px',fontSize:'12px',textDecoration:'none',fontWeight:'600'}}>
                        Voir carte
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}