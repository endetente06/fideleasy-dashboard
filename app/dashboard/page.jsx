"use client";
import { useState, useEffect } from 'react';

const API = 'https://fideleasy-backend-production.up.railway.app';

export default function Dashboard() {
  const [stats, setStats] = useState({ clients: 0, cards: 0, notifications: 0 });
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const shopData = localStorage.getItem('shop');
    if (shopData) setShop(JSON.parse(shopData));
    const shopId = shopData ? JSON.parse(shopData).id : 'a23f70ea-db85-46b4-9bd1-c650831b134a';
    Promise.all([
      fetch(`${API}/customers/${shopId}`).then(r => r.json()),
      fetch(`${API}/cards/all`).then(r => r.json()),
      fetch(`${API}/notifications/${shopId}`).then(r => r.json()),
    ]).then(([customers, cards, notifs]) => {
      setStats({
        clients: customers.data?.length || 0,
        cards: cards.data?.length || 0,
        notifications: notifs.data?.length || 0,
      });
      setLoading(false);
    });
  }, []);

  const navItems = [
    { icon: '📊', label: 'Dashboard', href: '/dashboard', active: true },
    { icon: '👥', label: 'Clients', href: '/clients' },
    { icon: '🔔', label: 'Notifs', href: '/notifications' },
    { icon: '📱', label: 'QR Code', href: '/qrcode' },
  ];

  const statCards = [
    { icon: '👥', label: 'Clients actifs', value: stats.clients, color: '#d4af37', bg: 'rgba(212,175,55,0.1)' },
    { icon: '💳', label: 'Cartes émises', value: stats.cards, color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
    { icon: '🔔', label: 'Notifications', value: stats.notifications, color: '#a855f7', bg: 'rgba(168,85,247,0.1)' },
    { icon: '⭐', label: 'Plan actuel', value: shop?.plan || 'starter', color: '#d4af37', bg: 'rgba(212,175,55,0.1)' },
  ];

  return (
    <div style={{
      display:'flex',minHeight:'100vh',
      background:'linear-gradient(135deg,#0a0a18 0%,#1a1020 50%,#0a1020 100%)',
      color:'white',fontFamily:'system-ui,-apple-system,sans-serif',
      position:'relative'
    }}>
      {/* Formes animées fond */}
      <div style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:0}}>
        <div style={{position:'absolute',top:'10%',left:'5%',width:'400px',height:'400px',borderRadius:'50%',background:'rgba(212,175,55,0.04)',animation:'float1 8s ease-in-out infinite'}}/>
        <div style={{position:'absolute',bottom:'10%',right:'5%',width:'300px',height:'300px',borderRadius:'50%',background:'rgba(212,175,55,0.03)',animation:'float2 10s ease-in-out infinite'}}/>
      </div>

      {/* Sidebar PC */}
      {!isMobile && (
        <div style={{
          width:'240px',
          background:'rgba(255,255,255,0.04)',
          borderRight:'1px solid rgba(255,255,255,0.08)',
          padding:'24px 0',
          display:'flex',flexDirection:'column',
          position:'fixed',height:'100vh',zIndex:10,
          backdropFilter:'blur(20px)'
        }}>
          <div style={{padding:'0 24px 32px'}}>
            <h1 style={{fontSize:'22px',fontWeight:'800',margin:0,color:'white'}}>
              Fidel<span style={{color:'#d4af37'}}>Easy</span>
            </h1>
            {shop && <p style={{fontSize:'12px',color:'rgba(255,255,255,0.4)',margin:'4px 0 0'}}>{shop.name}</p>}
          </div>

          {navItems.map(item => (
            <a key={item.href} href={item.href} style={{
              display:'flex',alignItems:'center',gap:'12px',padding:'12px 24px',
              color: item.active ? '#d4af37' : 'rgba(255,255,255,0.5)',
              background: item.active ? 'rgba(212,175,55,0.1)' : 'transparent',
              borderLeft: item.active ? '3px solid #d4af37' : '3px solid transparent',
              textDecoration:'none',fontSize:'14px',fontWeight: item.active ? '600' : '400',
              transition:'all 0.2s'
            }}>
              <span style={{fontSize:'18px'}}>{item.icon}</span>
              {item.label}
            </a>
          ))}

          <div style={{marginTop:'auto',padding:'24px'}}>
            <div style={{
              background:'rgba(212,175,55,0.08)',
              border:'1px solid rgba(212,175,55,0.2)',
              borderRadius:'12px',padding:'16px'
            }}>
              <p style={{fontSize:'12px',color:'rgba(255,255,255,0.4)',margin:'0 0 4px'}}>Plan actuel</p>
              <p style={{fontSize:'14px',fontWeight:'600',color:'#d4af37',margin:'0 0 12px',textTransform:'capitalize'}}>{shop?.plan || 'Starter'}</p>
              <a href="#" style={{
                display:'block',textAlign:'center',
                background:'#d4af37',color:'white',
                borderRadius:'8px',padding:'8px',
                fontSize:'12px',textDecoration:'none',fontWeight:'600'
              }}>
                Mettre à niveau
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div style={{
        marginLeft: isMobile ? 0 : '240px',
        flex:1,
        padding: isMobile ? '20px 16px 100px' : '32px',
        position:'relative',zIndex:1
      }}>
        {/* Header */}
        <div style={{
          display:'flex',justifyContent:'space-between',
          alignItems: isMobile ? 'flex-start' : 'center',
          flexDirection: isMobile ? 'column' : 'row',
          gap:'16px',marginBottom:'32px'
        }}>
          {isMobile && (
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%'}}>
              <h1 style={{fontSize:'20px',fontWeight:'800',margin:0}}>
                Fidel<span style={{color:'#d4af37'}}>Easy</span>
              </h1>
              {shop && <span style={{fontSize:'13px',color:'rgba(255,255,255,0.4)'}}>{shop.name}</span>}
            </div>
          )}
          <div>
            <h2 style={{fontSize: isMobile ? '22px' : '24px',fontWeight:'700',margin:'0 0 4px'}}>Tableau de bord</h2>
            <p style={{color:'rgba(255,255,255,0.4)',margin:0,fontSize:'14px'}}>Bienvenue sur FidelEasy 👋</p>
          </div>
          {!isMobile && (
            <div style={{display:'flex',gap:'12px'}}>
              <a href="/qrcode" style={{
                background:'rgba(212,175,55,0.1)',border:'1px solid rgba(212,175,55,0.3)',
                color:'#d4af37',borderRadius:'10px',padding:'10px 20px',
                textDecoration:'none',fontSize:'14px',fontWeight:'600'
              }}>
                📱 Mon QR Code
              </a>
              <a href="/clients" style={{
                background:'#d4af37',color:'white',
                borderRadius:'10px',padding:'10px 20px',
                textDecoration:'none',fontSize:'14px',fontWeight:'600'
              }}>
                + Ajouter un client
              </a>
            </div>
          )}
        </div>

        {/* Stats */}
        <div style={{
          display:'grid',
          gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)',
          gap:'12px',marginBottom:'24px'
        }}>
          {statCards.map(card => (
            <div key={card.label} style={{
              background:'rgba(255,255,255,0.04)',
              border:'1px solid rgba(255,255,255,0.08)',
              borderRadius:'16px',padding: isMobile ? '16px' : '20px',
              backdropFilter:'blur(10px)'
            }}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'10px'}}>
                <span style={{fontSize:'10px',color:'rgba(255,255,255,0.4)',textTransform:'uppercase',letterSpacing:'0.8px'}}>{card.label}</span>
                <div style={{width:'32px',height:'32px',borderRadius:'8px',background:card.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'16px'}}>
                  {card.icon}
                </div>
              </div>
              <p style={{fontSize: isMobile ? '24px' : '28px',fontWeight:'700',margin:0,color:card.color}}>
                {loading ? '...' : card.value}
              </p>
            </div>
          ))}
        </div>

        {/* Actions rapides */}
        <div style={{
          background:'rgba(255,255,255,0.04)',
          border:'1px solid rgba(255,255,255,0.08)',
          borderRadius:'16px',padding:'20px',
          backdropFilter:'blur(10px)',marginBottom:'16px'
        }}>
          <h3 style={{fontSize:'15px',fontWeight:'600',margin:'0 0 14px',color:'rgba(255,255,255,0.8)'}}>Actions rapides</h3>
          <div style={{
            display:'grid',
            gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(3,1fr)',
            gap:'10px'
          }}>
            {[
              { icon:'👥', label:'Mes clients', href:'/clients', color:'#d4af37' },
              { icon:'🔔', label:'Notifications', href:'/notifications', color:'#a855f7' },
              { icon:'📱', label:'QR Code', href:'/qrcode', color:'#22c55e' },
              ...(isMobile ? [{ icon:'⭐', label:'Mon plan', href:'#', color:'#d4af37' }] : []),
            ].map(action => (
              <a key={action.href+action.label} href={action.href} style={{
                display:'flex',alignItems:'center',gap:'10px',
                background:'rgba(255,255,255,0.03)',
                border:'1px solid rgba(255,255,255,0.06)',
                borderRadius:'12px',padding:'14px',
                textDecoration:'none',color:'white',
                transition:'all 0.2s'
              }}>
                <div style={{
                  width:'36px',height:'36px',borderRadius:'10px',
                  background:`${action.color}20`,
                  display:'flex',alignItems:'center',justifyContent:'center',fontSize:'18px',flexShrink:0
                }}>
                  {action.icon}
                </div>
                <span style={{fontSize:'13px',fontWeight:'500'}}>{action.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Bouton mobile ajouter client */}
        {isMobile && (
          <a href="/clients" style={{
            display:'block',textAlign:'center',
            background:'#d4af37',color:'white',
            borderRadius:'12px',padding:'14px',
            textDecoration:'none',fontSize:'15px',fontWeight:'700',
            boxShadow:'0 4px 20px rgba(212,175,55,0.3)'
          }}>
            + Ajouter un client
          </a>
        )}
      </div>

      {/* Bottom nav mobile */}
      {isMobile && (
        <div style={{
          position:'fixed',bottom:0,left:0,right:0,
          background:'rgba(10,10,24,0.95)',
          borderTop:'1px solid rgba(255,255,255,0.08)',
          display:'flex',justifyContent:'space-around',
          padding:'8px 0 20px',zIndex:100,
          backdropFilter:'blur(20px)'
        }}>
          {navItems.map(item => (
            <a key={item.href} href={item.href} style={{
              display:'flex',flexDirection:'column',alignItems:'center',gap:'4px',
              textDecoration:'none',padding:'8px 16px',
              color: item.active ? '#d4af37' : 'rgba(255,255,255,0.4)',
              transition:'color 0.2s'
            }}>
              <span style={{fontSize:'22px'}}>{item.icon}</span>
              <span style={{fontSize:'10px',fontWeight: item.active ? '600' : '400'}}>{item.label}</span>
            </a>
          ))}
        </div>
      )}

      <style>{`
        @keyframes float1 {
          0%,100% { transform:translateY(0); }
          50% { transform:translateY(-30px); }
        }
        @keyframes float2 {
          0%,100% { transform:translateY(0); }
          50% { transform:translateY(20px); }
        }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}