"use client";
import { useState, useEffect } from 'react';

const API = 'https://fideleasy-backend-production.up.railway.app';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '', message: '', target: 'all' });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    { icon: '🔔', label: 'Notifs', href: '/notifications', active: true },
    { icon: '📱', label: 'QR Code', href: '/qrcode' },
    { icon: '⚙️', label: 'Réglages', href: '/settings' },
  ];

  const timeAgo = (date) => {
    const diff = Math.floor((Date.now() - new Date(date)) / 60000);
    if (diff < 60) return `Il y a ${diff} min`;
    if (diff < 1440) return `Il y a ${Math.floor(diff/60)}h`;
    return `Il y a ${Math.floor(diff/1440)}j`;
  };

  return (
    <div style={{
      display:'flex',minHeight:'100vh',
      background:'linear-gradient(135deg,#0a0a18 0%,#1a1020 50%,#0a1020 100%)',
      color:'white',fontFamily:'system-ui,-apple-system,sans-serif',
      position:'relative'
    }}>
      {/* Formes fond */}
      <div style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:0}}>
        <div style={{position:'absolute',top:'10%',left:'5%',width:'400px',height:'400px',borderRadius:'50%',background:'rgba(212,175,55,0.04)',animation:'float1 8s ease-in-out infinite'}}/>
        <div style={{position:'absolute',bottom:'10%',right:'5%',width:'300px',height:'300px',borderRadius:'50%',background:'rgba(212,175,55,0.03)',animation:'float2 10s ease-in-out infinite'}}/>
      </div>

      {/* Sidebar PC */}
      {!isMobile && (
        <div style={{
          width:'240px',background:'rgba(255,255,255,0.04)',
          borderRight:'1px solid rgba(255,255,255,0.08)',
          padding:'24px 0',display:'flex',flexDirection:'column',
          position:'fixed',height:'100vh',zIndex:10,backdropFilter:'blur(20px)'
        }}>
          <div style={{padding:'0 24px 32px'}}>
            <h1 style={{fontSize:'22px',fontWeight:'800',margin:0,color:'white'}}>
              Fidel<span style={{color:'#d4af37'}}>Easy</span>
            </h1>
          </div>
          {navItems.map(item => (
            <a key={item.href} href={item.href} style={{
              display:'flex',alignItems:'center',gap:'12px',padding:'12px 24px',
              color: item.active ? '#d4af37' : 'rgba(255,255,255,0.5)',
              background: item.active ? 'rgba(212,175,55,0.1)' : 'transparent',
              borderLeft: item.active ? '3px solid #d4af37' : '3px solid transparent',
              textDecoration:'none',fontSize:'14px',fontWeight: item.active ? '600' : '400',
            }}>
              <span style={{fontSize:'18px'}}>{item.icon}</span>
              {item.label}
            </a>
          ))}
        </div>
      )}

      {/* Main */}
      <div style={{
        marginLeft: isMobile ? 0 : '240px',
        flex:1,padding: isMobile ? '20px 16px 100px' : '32px',
        position:'relative',zIndex:1
      }}>
        {isMobile && (
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
            <h1 style={{fontSize:'20px',fontWeight:'800',margin:0}}>
              Fidel<span style={{color:'#d4af37'}}>Easy</span>
            </h1>
          </div>
        )}

        <div style={{marginBottom:'24px'}}>
          <h2 style={{fontSize: isMobile ? '20px' : '24px',fontWeight:'700',margin:'0 0 4px'}}>Notifications</h2>
          <p style={{color:'rgba(255,255,255,0.4)',margin:0,fontSize:'14px'}}>Envoyez des messages à vos clients</p>
        </div>

        <div style={{
          display:'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap:'20px'
        }}>
          {/* Formulaire */}
          <div style={{
            background:'rgba(255,255,255,0.04)',
            border:'1px solid rgba(255,255,255,0.08)',
            borderRadius:'16px',padding:'24px',backdropFilter:'blur(10px)'
          }}>
            <h3 style={{margin:'0 0 20px',fontSize:'15px',fontWeight:'600',color:'rgba(255,255,255,0.8)'}}>✉️ Nouvelle notification</h3>

            {success && (
              <div style={{
                background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',
                borderRadius:'8px',padding:'12px',marginBottom:'16px',
                color:'#86efac',fontSize:'14px'
              }}>
                ✅ Notification envoyée !
              </div>
            )}

            <div style={{marginBottom:'14px'}}>
              <div style={{fontSize:'11px',color:'rgba(255,255,255,0.4)',marginBottom:'6px',textTransform:'uppercase',letterSpacing:'0.8px'}}>Titre</div>
              <input
                placeholder="Ex: Offre spéciale ce weekend !"
                value={form.title}
                onChange={e => setForm({...form, title: e.target.value})}
                style={{width:'100%',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'8px',padding:'10px 12px',color:'white',fontSize:'14px',boxSizing:'border-box',outline:'none'}}
                onFocus={e=>e.target.style.borderColor='rgba(212,175,55,0.5)'}
                onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.1)'}
              />
            </div>

            <div style={{marginBottom:'14px'}}>
              <div style={{fontSize:'11px',color:'rgba(255,255,255,0.4)',marginBottom:'6px',textTransform:'uppercase',letterSpacing:'0.8px'}}>Message</div>
              <textarea
                placeholder="Votre message..."
                value={form.message}
                onChange={e => setForm({...form, message: e.target.value})}
                rows={4}
                style={{width:'100%',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'8px',padding:'10px 12px',color:'white',fontSize:'14px',boxSizing:'border-box',resize:'vertical',outline:'none'}}
                onFocus={e=>e.target.style.borderColor='rgba(212,175,55,0.5)'}
                onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.1)'}
              />
            </div>

            <div style={{marginBottom:'20px'}}>
              <div style={{fontSize:'11px',color:'rgba(255,255,255,0.4)',marginBottom:'6px',textTransform:'uppercase',letterSpacing:'0.8px'}}>Destinataires</div>
              <select
                value={form.target}
                onChange={e => setForm({...form, target: e.target.value})}
                style={{width:'100%',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'8px',padding:'10px 12px',color:'white',fontSize:'14px',boxSizing:'border-box',outline:'none'}}
              >
                <option value="all">Tous les clients</option>
                <option value="active">Clients actifs</option>
                <option value="inactive">Clients inactifs</option>
              </select>
            </div>

            <button
              onClick={sendNotification}
              disabled={sending || !form.title || !form.message}
              style={{
                width:'100%',background:'#d4af37',color:'white',
                border:'none',borderRadius:'10px',padding:'12px',
                cursor:'pointer',fontSize:'15px',fontWeight:'600',
                opacity: sending || !form.title || !form.message ? 0.6 : 1,
                boxShadow:'0 4px 16px rgba(212,175,55,0.3)'
              }}
            >
              {sending ? 'Envoi...' : '🚀 Envoyer'}
            </button>
          </div>

          {/* Historique */}
          <div style={{
            background:'rgba(255,255,255,0.04)',
            border:'1px solid rgba(255,255,255,0.08)',
            borderRadius:'16px',padding:'24px',backdropFilter:'blur(10px)'
          }}>
            <h3 style={{margin:'0 0 20px',fontSize:'15px',fontWeight:'600',color:'rgba(255,255,255,0.8)'}}>📋 Historique</h3>

            {loading ? (
              <div style={{textAlign:'center',padding:'40px',color:'rgba(255,255,255,0.3)'}}>Chargement...</div>
            ) : notifications.length === 0 ? (
              <div style={{textAlign:'center',padding:'40px',color:'rgba(255,255,255,0.3)'}}>
                <div style={{fontSize:'40px',marginBottom:'12px'}}>🔔</div>
                <p>Aucune notification envoyée</p>
              </div>
            ) : (
              <div style={{display:'flex',flexDirection:'column',gap:'10px',maxHeight:'400px',overflowY:'auto'}}>
                {notifications.map(notif => (
                  <div key={notif.id} style={{
                    background:'rgba(255,255,255,0.03)',
                    border:'1px solid rgba(255,255,255,0.06)',
                    borderRadius:'12px',padding:'14px'
                  }}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:'6px'}}>
                      <span style={{fontWeight:'600',fontSize:'14px'}}>{notif.title}</span>
                      <span style={{fontSize:'11px',color:'rgba(255,255,255,0.3)'}}>{timeAgo(notif.created_at)}</span>
                    </div>
                    <p style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',margin:'0 0 8px'}}>{notif.message}</p>
                    <span style={{background:'rgba(212,175,55,0.1)',color:'#d4af37',borderRadius:'4px',padding:'2px 8px',fontSize:'11px'}}>
                      {notif.target === 'all' ? 'Tous les clients' : notif.target}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom nav mobile */}
      {isMobile && (
        <div style={{
          position:'fixed',bottom:0,left:0,right:0,
          background:'rgba(10,10,24,0.95)',
          borderTop:'1px solid rgba(255,255,255,0.08)',
          display:'flex',justifyContent:'space-around',
          padding:'8px 0 20px',zIndex:100,backdropFilter:'blur(20px)'
        }}>
          {navItems.map(item => (
            <a key={item.href} href={item.href} style={{
              display:'flex',flexDirection:'column',alignItems:'center',gap:'4px',
              textDecoration:'none',padding:'8px 16px',
              color: item.active ? '#d4af37' : 'rgba(255,255,255,0.4)',
            }}>
              <span style={{fontSize:'22px'}}>{item.icon}</span>
              <span style={{fontSize:'10px',fontWeight: item.active ? '600' : '400'}}>{item.label}</span>
            </a>
          ))}
        </div>
      )}

      <style>{`
        @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-30px)} }
        @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(20px)} }
        input::placeholder,textarea::placeholder { color: rgba(255,255,255,0.25); }
        select option { background: #1a1a2e; color: white; }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}