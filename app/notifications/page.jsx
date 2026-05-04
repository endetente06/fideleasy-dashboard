"use client";
import { useState, useEffect } from 'react';

const API = 'https://fideleasy-backend-production.up.railway.app';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '', message: '', target: 'all' });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const shopId = typeof window !== 'undefined'
    ? (JSON.parse(localStorage.getItem('shop') || '{}').id || 'a23f70ea-db85-46b4-9bd1-c650831b134a')
    : 'a23f70ea-db85-46b4-9bd1-c650831b134a';

  useEffect(() => {
    fetch(`${API}/notifications/${shopId}`)
      .then(r => r.json())
      .then(d => { setNotifications(d.data || []); setLoading(false); });
  }, []);

  const sendNotification = async () => {
    setSending(true);
    await fetch(`${API}/notifications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, shop_id: shopId })
    });
    const d = await fetch(`${API}/notifications/${shopId}`).then(r => r.json());
    setNotifications(d.data || []);
    setForm({ title: '', message: '', target: 'all' });
    setSending(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const navItems = [
    { icon: '📊', label: 'Dashboard', href: '/dashboard' },
    { icon: '👥', label: 'Clients', href: '/clients' },
    { icon: '🔔', label: 'Notifications', href: '/notifications', active: true },
    { icon: '📱', label: 'QR Code', href: '/qrcode' },
  ];

  const timeAgo = (date) => {
    const diff = Math.floor((Date.now() - new Date(date)) / 60000);
    if (diff < 60) return `Il y a ${diff} min`;
    if (diff < 1440) return `Il y a ${Math.floor(diff/60)}h`;
    return `Il y a ${Math.floor(diff/1440)}j`;
  };

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#07070f',color:'white',fontFamily:'system-ui,sans-serif'}}>
      {/* Sidebar */}
      <div style={{width:'240px',background:'#0a0a18',borderRight:'1px solid #1e1e35',padding:'24px 0',display:'flex',flexDirection:'column',position:'fixed',height:'100vh'}}>
        <div style={{padding:'0 24px 32px'}}>
          <h1 style={{fontSize:'22px',fontWeight:'800',margin:0}}>
            Fidel<span style={{color:'#4f6ef7'}}>Easy</span>
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
        <div style={{marginBottom:'32px'}}>
          <h2 style={{fontSize:'24px',fontWeight:'700',margin:'0 0 4px'}}>Notifications</h2>
          <p style={{color:'#6060a0',margin:0,fontSize:'14px'}}>Envoyez des messages à vos clients</p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px'}}>
          {/* Formulaire */}
          <div style={{background:'#0f0f1c',border:'1px solid #1e1e35',borderRadius:'16px',padding:'24px'}}>
            <h3 style={{margin:'0 0 20px',fontSize:'16px',fontWeight:'600'}}>✉️ Nouvelle notification</h3>
            
            {success && (
              <div style={{background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:'8px',padding:'12px',marginBottom:'16px',color:'#22c55e',fontSize:'14px'}}>
                ✅ Notification envoyée avec succès !
              </div>
            )}

            <div style={{marginBottom:'16px'}}>
              <div style={{fontSize:'11px',color:'#6060a0',marginBottom:'6px',textTransform:'uppercase',letterSpacing:'0.8px'}}>Titre</div>
              <input placeholder="Ex: Offre spéciale ce weekend !" value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                style={{width:'100%',background:'#161625',border:'1px solid #1e1e35',borderRadius:'8px',padding:'10px 12px',color:'white',fontSize:'14px',boxSizing:'border-box'}}/>
            </div>

            <div style={{marginBottom:'16px'}}>
              <div style={{fontSize:'11px',color:'#6060a0',marginBottom:'6px',textTransform:'uppercase',letterSpacing:'0.8px'}}>Message</div>
              <textarea placeholder="Votre message..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} rows={4}
                style={{width:'100%',background:'#161625',border:'1px solid #1e1e35',borderRadius:'8px',padding:'10px 12px',color:'white',fontSize:'14px',boxSizing:'border-box',resize:'vertical'}}/>
            </div>

            <div style={{marginBottom:'20px'}}>
              <div style={{fontSize:'11px',color:'#6060a0',marginBottom:'6px',textTransform:'uppercase',letterSpacing:'0.8px'}}>Destinataires</div>
              <select value={form.target} onChange={e => setForm({...form, target: e.target.value})}
                style={{width:'100%',background:'#161625',border:'1px solid #1e1e35',borderRadius:'8px',padding:'10px 12px',color:'white',fontSize:'14px',boxSizing:'border-box'}}>
                <option value="all">Tous les clients</option>
                <option value="active">Clients actifs</option>
                <option value="inactive">Clients inactifs</option>
              </select>
            </div>

            <button onClick={sendNotification} disabled={sending || !form.title || !form.message}
              style={{width:'100%',background:'#4f6ef7',color:'white',border:'none',borderRadius:'10px',padding:'12px',cursor:'pointer',fontSize:'15px',fontWeight:'600'}}>
              {sending ? 'Envoi en cours...' : '🚀 Envoyer la notification'}
            </button>
          </div>

          {/* Historique */}
          <div style={{background:'#0f0f1c',border:'1px solid #1e1e35',borderRadius:'16px',padding:'24px'}}>
            <h3 style={{margin:'0 0 20px',fontSize:'16px',fontWeight:'600'}}>📋 Historique</h3>
            
            {loading ? (
              <div style={{textAlign:'center',padding:'40px',color:'#6060a0'}}>Chargement...</div>
            ) : notifications.length === 0 ? (
              <div style={{textAlign:'center',padding:'40px',color:'#6060a0'}}>
                <div style={{fontSize:'40px',marginBottom:'12px'}}>🔔</div>
                <p>Aucune notification envoyée</p>
              </div>
            ) : (
              <div style={{display:'flex',flexDirection:'column',gap:'12px',maxHeight:'400px',overflowY:'auto'}}>
                {notifications.map(notif => (
                  <div key={notif.id} style={{background:'rgba(255,255,255,0.03)',border:'1px solid #1e1e35',borderRadius:'12px',padding:'16px'}}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:'6px'}}>
                      <span style={{fontWeight:'600',fontSize:'14px'}}>{notif.title}</span>
                      <span style={{fontSize:'11px',color:'#6060a0'}}>{timeAgo(notif.created_at)}</span>
                    </div>
                    <p style={{color:'#8080b0',fontSize:'13px',margin:'0 0 8px'}}>{notif.message}</p>
                    <span style={{background:'rgba(79,110,247,0.1)',color:'#4f6ef7',borderRadius:'4px',padding:'2px 8px',fontSize:'11px'}}>
                      {notif.target === 'all' ? 'Tous les clients' : notif.target}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}