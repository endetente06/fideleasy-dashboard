"use client";
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import Sidebar from '../components/Sidebar';

const API = 'https://fideleasy-backend-production.up.railway.app';

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [saving, setSaving] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [shopId, setShopId] = useState(null);
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
    const id = JSON.parse(shopData).id;
    if (!id) { setLoading(false); return; }
    setShopId(id);
    fetch(`${API}/customers/${id}`)
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

  const tamponner = async (clientId) => {
    const res = await fetch(`${API}/cards/all`);
    const data = await res.json();
    const card = data.data?.find(c => c.customer_id === clientId);
    if (card) {
      const r = await fetch(`${API}/cards/${card.id}/stamp`, { method: 'POST' });
      const d = await r.json();
      if (d.error) { alert(d.error); }
      else { alert(`✅ Tampon ajouté ! Total: ${d.data[0].stamps}`); }
    } else { alert('Aucune carte trouvée pour ce client'); }
  };

  const voirCarte = async (clientId) => {
    const res = await fetch(`${API}/cards/all`);
    const data = await res.json();
    const card = data.data?.find(c => c.customer_id === clientId);
    if (card) { window.open(`${API}/pass/apple/${card.id}`, '_blank'); }
    else { alert('Aucune carte trouvée pour ce client'); }
  };

  return (
    <div style={{display:'flex',minHeight:'100vh',background:theme.bg,color:theme.color,fontFamily:'system-ui,-apple-system,sans-serif',position:'relative'}}>
      <div style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:0}}>
        <div style={{position:'absolute',top:'10%',left:'5%',width:'400px',height:'400px',borderRadius:'50%',background:'rgba(212,175,55,0.04)',animation:'float1 8s ease-in-out infinite'}}/>
        <div style={{position:'absolute',bottom:'10%',right:'5%',width:'300px',height:'300px',borderRadius:'50%',background:'rgba(212,175,55,0.03)',animation:'float2 10s ease-in-out infinite'}}/>
      </div>

      <Sidebar activePage="/clients" />

      <div style={{marginLeft:isMobile?0:'240px',flex:1,padding:isMobile?'20px 16px 100px':'32px',position:'relative',zIndex:1}}>
        {isMobile && (
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
            <h1 style={{fontSize:'20px',fontWeight:'800',margin:0}}>Fidel<span style={{color:'#d4af37'}}>Easy</span></h1>
          </div>
        )}

        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'24px',flexWrap:'wrap',gap:'12px'}}>
          <div>
            <h2 style={{fontSize:isMobile?'20px':'24px',fontWeight:'700',margin:'0 0 4px'}}>Mes clients</h2>
            <p style={{color:theme.textMuted,margin:0,fontSize:'14px'}}>{clients.length} client{clients.length > 1 ? 's' : ''}</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} style={{background:'#d4af37',color:'white',border:'none',borderRadius:'10px',padding:'10px 20px',cursor:'pointer',fontSize:'14px',fontWeight:'600',boxShadow:'0 4px 16px rgba(212,175,55,0.3)'}}>
            + Ajouter
          </button>
        </div>

        {showForm && (
          <div style={{background:theme.cardBg,border:`1px solid ${theme.cardBorder}`,borderRadius:'16px',padding:'20px',marginBottom:'20px',backdropFilter:'blur(10px)'}}>
            <h3 style={{margin:'0 0 16px',fontSize:'15px',color:theme.textSecondary}}>Nouveau client</h3>
            <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'repeat(3,1fr)',gap:'12px',marginBottom:'16px'}}>
              {[['Nom', 'name', 'Jean Dupont'], ['Email', 'email', 'jean@email.fr'], ['Téléphone', 'phone', '06 XX XX XX XX']].map(([label, key, placeholder]) => (
                <div key={key}>
                  <div style={{fontSize:'11px',color:theme.textMuted,marginBottom:'6px',textTransform:'uppercase',letterSpacing:'0.8px'}}>{label}</div>
                  <input placeholder={placeholder} value={form[key]} onChange={e => setForm({...form, [key]: e.target.value})} style={{width:'100%',background:theme.inputBg,border:`1px solid ${theme.inputBorder}`,borderRadius:'8px',padding:'10px 12px',color:theme.color,fontSize:'14px',boxSizing:'border-box',outline:'none'}} onFocus={e=>e.target.style.borderColor='rgba(212,175,55,0.5)'} onBlur={e=>e.target.style.borderColor=theme.inputBorder}/>
                </div>
              ))}
            </div>
            <div style={{display:'flex',gap:'10px'}}>
              <button onClick={addClient} disabled={saving || !form.name} style={{background:'#d4af37',color:'white',border:'none',borderRadius:'8px',padding:'10px 24px',cursor:'pointer',fontSize:'14px',fontWeight:'600'}}>
                {saving ? 'Enregistrement...' : '✅ Enregistrer'}
              </button>
              <button onClick={() => setShowForm(false)} style={{background:theme.cardBg,color:theme.textMuted,border:`1px solid ${theme.cardBorder}`,borderRadius:'8px',padding:'10px 24px',cursor:'pointer',fontSize:'14px'}}>
                Annuler
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div style={{textAlign:'center',padding:'60px',color:theme.textMuted}}>Chargement...</div>
        ) : clients.length === 0 ? (
          <div style={{textAlign:'center',padding:'60px',background:theme.cardBg,border:`1px solid ${theme.cardBorder}`,borderRadius:'16px',backdropFilter:'blur(10px)'}}>
            <div style={{fontSize:'48px',marginBottom:'16px'}}>👥</div>
            <p style={{color:theme.textMuted,fontSize:'16px'}}>Aucun client pour l'instant</p>
            <button onClick={() => setShowForm(true)} style={{background:'#d4af37',color:'white',border:'none',borderRadius:'10px',padding:'10px 24px',cursor:'pointer',marginTop:'12px',fontWeight:'600'}}>
              Ajouter mon premier client
            </button>
          </div>
        ) : isMobile ? (
          <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            {clients.map(client => (
              <div key={client.id} style={{background:theme.cardBg,border:`1px solid ${theme.cardBorder}`,borderRadius:'14px',padding:'16px',backdropFilter:'blur(10px)',display:'flex',alignItems:'center',gap:'14px'}}>
                <div style={{width:'42px',height:'42px',borderRadius:'50%',background:'rgba(212,175,55,0.2)',display:'flex',alignItems:'center',justifyContent:'center',color:'#d4af37',fontWeight:'700',fontSize:'16px',flexShrink:0}}>
                  {client.name?.charAt(0).toUpperCase()}
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <p style={{fontWeight:'600',margin:'0 0 2px',fontSize:'15px'}}>{client.name}</p>
                  <p style={{color:theme.textMuted,margin:'0 0 8px',fontSize:'12px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{client.email || client.phone || '—'}</p>
                  <div style={{display:'flex',gap:'8px'}}>
                    <span onClick={() => voirCarte(client.id)} style={{background:'rgba(212,175,55,0.1)',color:'#d4af37',borderRadius:'6px',padding:'6px 12px',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>Voir carte</span>
                    <span onClick={() => tamponner(client.id)} style={{background:'rgba(34,197,94,0.1)',color:'#22c55e',borderRadius:'6px',padding:'6px 12px',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>🎫 Tamponner</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{background:theme.cardBg,border:`1px solid ${theme.cardBorder}`,borderRadius:'16px',overflow:'hidden',backdropFilter:'blur(10px)'}}>
            <table style={{width:'100%',borderCollapse:'collapse'}}>
              <thead>
                <tr style={{borderBottom:`1px solid ${theme.cardBorder}`}}>
                  {['Client','Email','Téléphone','Actions'].map(h => (
                    <th key={h} style={{padding:'14px 20px',textAlign:'left',fontSize:'11px',color:theme.textMuted,textTransform:'uppercase',letterSpacing:'0.8px',fontWeight:'600'}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {clients.map((client, i) => (
                  <tr key={client.id} style={{borderBottom:i < clients.length-1?`1px solid ${theme.cardBorder}`:'none'}}>
                    <td style={{padding:'16px 20px'}}>
                      <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                        <div style={{width:'36px',height:'36px',borderRadius:'50%',background:'rgba(212,175,55,0.2)',display:'flex',alignItems:'center',justifyContent:'center',color:'#d4af37',fontWeight:'700',fontSize:'14px'}}>
                          {client.name?.charAt(0).toUpperCase()}
                        </div>
                        <span style={{fontWeight:'500'}}>{client.name}</span>
                      </div>
                    </td>
                    <td style={{padding:'16px 20px',color:theme.textMuted,fontSize:'14px'}}>{client.email || '—'}</td>
                    <td style={{padding:'16px 20px',color:theme.textMuted,fontSize:'14px'}}>{client.phone || '—'}</td>
                    <td style={{padding:'16px 20px'}}>
                      <div style={{display:'flex',gap:'8px'}}>
                        <span onClick={() => voirCarte(client.id)} style={{background:'rgba(212,175,55,0.1)',color:'#d4af37',borderRadius:'6px',padding:'6px 12px',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>Voir carte</span>
                        <span onClick={() => tamponner(client.id)} style={{background:'rgba(34,197,94,0.1)',color:'#22c55e',borderRadius:'6px',padding:'6px 12px',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>🎫 Tamponner</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style>{`
        @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-30px)} }
        @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(20px)} }
        input::placeholder { color: rgba(255,255,255,0.25); }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}