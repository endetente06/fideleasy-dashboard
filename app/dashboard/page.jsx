"use client";
import { useState, useEffect } from 'react';

const API = 'https://fideleasy-backend-production.up.railway.app';

export default function Dashboard() {
  const [stats, setStats] = useState({ clients: 0, cards: 0, notifications: 0 });
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);

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
    { icon: '🔔', label: 'Notifications', href: '/notifications' },
    { icon: '📱', label: 'QR Code', href: '/qrcode' },
  ];

  const statCards = [
    { icon: '👥', label: 'Clients actifs', value: stats.clients, color: '#d4af37', bg: 'rgba(212,175,55,0.1)' },
    { icon: '💳', label: 'Cartes émises', value: stats.cards, color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
    { icon: '🔔', label: 'Notifications', value: stats.notifications, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
    { icon: '⭐', label: 'Plan actuel', value: shop?.plan || 'starter', color: '#a855f7', bg: 'rgba(168,85,247,0.1)' },
  ];

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#07070f',color:'white',fontFamily:'system-ui,sans-serif'}}>
      {/* Sidebar */}
      <div style={{width:'240px',background:'#0a0a18',borderRight:'1px solid #1e1e35',padding:'24px 0',display:'flex',flexDirection:'column',position:'fixed',height:'100vh'}}>
        <div style={{padding:'0 24px 32px'}}>
          <h1 style={{fontSize:'22px',fontWeight:'800',margin:0}}>
            Fidel<span style={{color:'#d4af37'}}>Easy</span>
          </h1>
          {shop && <p style={{fontSize:'12px',color:'#6060a0',margin:'4px 0 0'}}>{shop.name}</p>}
        </div>
        
        {navItems.map(item => (
          <a key={item.href} href={item.href} style={{
            display:'flex',alignItems:'center',gap:'12px',padding:'12px 24px',
            color: item.active ? '#d4af37' : '#8080b0',
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
          <div style={{background:'rgba(212,175,55,0.1)',border:'1px solid rgba(212,175,55,0.2)',borderRadius:'12px',padding:'16px'}}>
            <p style={{fontSize:'12px',color:'#6060a0',margin:'0 0 4px'}}>Plan actuel</p>
            <p style={{fontSize:'14px',fontWeight:'600',color:'#d4af37',margin:'0 0 12px',textTransform:'capitalize'}}>{shop?.plan || 'Starter'}</p>
            <a href="#" style={{display:'block',textAlign:'center',background:'#d4af37',color:'white',borderRadius:'8px',padding:'8px',fontSize:'12px',textDecoration:'none',fontWeight:'600'}}>
              Mettre à niveau
            </a>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{marginLeft:'240px',flex:1,padding:'32px'}}>
        {/* Header */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'32px'}}>
          <div>
            <h2 style={{fontSize:'24px',fontWeight:'700',margin:'0 0 4px'}}>Tableau de bord</h2>
            <p style={{color:'#6060a0',margin:0,fontSize:'14px'}}>Bienvenue sur FidelEasy 👋</p>
          </div>
          <div style={{display:'flex',gap:'12px'}}>
            <a href="/qrcode" style={{background:'rgba(212,175,55,0.1)',border:'1px solid rgba(212,175,55,0.3)',color:'#d4af37',borderRadius:'10px',padding:'10px 20px',textDecoration:'none',fontSize:'14px',fontWeight:'600'}}>
              📱 Mon QR Code
            </a>
            <a href="/clients" style={{background:'#d4af37',color:'white',borderRadius:'10px',padding:'10px 20px',textDecoration:'none',fontSize:'14px',fontWeight:'600'}}>
              + Ajouter un client
            </a>
          </div>
        </div>

        {/* Stats */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'16px',marginBottom:'32px'}}>
          {statCards.map(card => (
            <div key={card.label} style={{background:'#0f0f1c',border:'1px solid #1e1e35',borderRadius:'16px',padding:'20px'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'12px'}}>
                <span style={{fontSize:'11px',color:'#6060a0',textTransform:'uppercase',letterSpacing:'0.8px'}}>{card.label}</span>
                <div style={{width:'36px',height:'36px',borderRadius:'10px',background:card.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'18px'}}>
                  {card.icon}
                </div>
              </div>
              <p style={{fontSize:'28px',fontWeight:'700',margin:0,color:card.color}}>{loading ? '...' : card.value}</p>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div style={{background:'#0f0f1c',border:'1px solid #1e1e35',borderRadius:'16px',padding:'24px'}}>
          <h3 style={{fontSize:'16px',fontWeight:'600',margin:'0 0 16px'}}>Actions rapides</h3>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'12px'}}>
            {[
              { icon:'👥', label:'Voir mes clients', href:'/clients', color:'#d4af37' },
              { icon:'🔔', label:'Envoyer une notification', href:'/notifications', color:'#f59e0b' },
              { icon:'📱', label:'Afficher le QR Code', href:'/qrcode', color:'#22c55e' },
            ].map(action => (
              <a key={action.href} href={action.href} style={{
                display:'flex',alignItems:'center',gap:'12px',
                background:'rgba(255,255,255,0.03)',border:'1px solid #1e1e35',
                borderRadius:'12px',padding:'16px',textDecoration:'none',
                color:'white',transition:'all 0.2s'
              }}>
                <div style={{width:'40px',height:'40px',borderRadius:'10px',background:`${action.color}20`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px'}}>
                  {action.icon}
                </div>
                <span style={{fontSize:'14px',fontWeight:'500'}}>{action.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}