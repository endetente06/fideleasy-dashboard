"use client";
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Sidebar({ activePage }) {
  const [shop, setShop] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const shopData = localStorage.getItem('shop');
    if (shopData) setShop(JSON.parse(shopData));
  }, []);

  const logout = () => {
    localStorage.removeItem('shop');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const navItems = [
    { icon: '📊', label: 'Dashboard', href: '/dashboard' },
    { icon: '👥', label: 'Clients', href: '/clients' },
    { icon: '🔔', label: 'Notifs', href: '/notifications' },
    { icon: '📱', label: 'QR Code', href: '/qrcode' },
    { icon: '⚙️', label: 'Réglages', href: '/settings' },
  ];

  return (
    <>
      {/* Sidebar PC */}
      {!isMobile && (
        <div style={{width:'240px',background:theme.sidebarBg,borderRight:`1px solid ${theme.sidebarBorder}`,padding:'24px 0',display:'flex',flexDirection:'column',position:'fixed',height:'100vh',zIndex:10,backdropFilter:'blur(20px)'}}>
          <div style={{padding:'0 24px 32px'}}>
            <h1 style={{fontSize:'22px',fontWeight:'800',margin:0,color:theme.color}}>Fidel<span style={{color:'#d4af37'}}>Easy</span></h1>
            {shop && <p style={{fontSize:'12px',color:theme.textMuted,margin:'4px 0 0'}}>{shop.name}</p>}
          </div>
          {navItems.map(item => (
            <a key={item.href} href={item.href} style={{display:'flex',alignItems:'center',gap:'12px',padding:'12px 24px',color:activePage===item.href?'#d4af37':theme.textMuted,background:activePage===item.href?'rgba(212,175,55,0.1)':'transparent',borderLeft:activePage===item.href?'3px solid #d4af37':'3px solid transparent',textDecoration:'none',fontSize:'14px',fontWeight:activePage===item.href?'600':'400',transition:'all 0.2s'}}>
              <span style={{fontSize:'18px'}}>{item.icon}</span>{item.label}
            </a>
          ))}
          <div style={{marginTop:'auto',padding:'24px',display:'flex',flexDirection:'column',gap:'12px'}}>
            <div style={{background:'rgba(212,175,55,0.08)',border:'1px solid rgba(212,175,55,0.2)',borderRadius:'12px',padding:'16px'}}>
              <p style={{fontSize:'12px',color:theme.textMuted,margin:'0 0 4px'}}>Plan actuel</p>
              <p style={{fontSize:'14px',fontWeight:'600',color:'#d4af37',margin:'0 0 12px',textTransform:'capitalize'}}>{shop?.plan || 'Starter'}</p>
              <a href="/landing#pricing" style={{display:'block',textAlign:'center',background:'#d4af37',color:'white',borderRadius:'8px',padding:'8px',fontSize:'12px',textDecoration:'none',fontWeight:'600'}}>Mettre à niveau</a>
            </div>
            <button onClick={theme.toggleTheme} style={{display:'flex',alignItems:'center',gap:'10px',background:theme.cardBg,border:`1px solid ${theme.cardBorder}`,borderRadius:'10px',padding:'10px 14px',cursor:'pointer',color:theme.textSecondary,fontSize:'13px',fontWeight:'500',width:'100%'}}>
              <span>{theme.darkMode ? '☀️' : '🌙'}</span>
              {theme.darkMode ? 'Mode clair' : 'Mode sombre'}
            </button>
            <a href="/profile" style={{display:'flex',alignItems:'center',gap:'10px',background:theme.cardBg,border:`1px solid ${theme.cardBorder}`,borderRadius:'10px',padding:'10px 14px',textDecoration:'none',color:theme.textSecondary,fontSize:'13px',fontWeight:'500'}}>
              <span>👤</span> Mon profil
            </a>
            <button onClick={logout} style={{background:'rgba(239,68,68,0.08)',color:'#fca5a5',border:'1px solid rgba(239,68,68,0.2)',borderRadius:'10px',padding:'10px',fontSize:'13px',fontWeight:'600',cursor:'pointer',width:'100%'}}>
              🚪 Déconnexion
            </button>
          </div>
        </div>
      )}

      {/* Bottom nav mobile */}
      {isMobile && (
        <div style={{position:'fixed',bottom:0,left:0,right:0,background:theme.navBg,borderTop:`1px solid ${theme.navBorder}`,display:'flex',justifyContent:'space-around',padding:'8px 0 20px',zIndex:100,backdropFilter:'blur(20px)'}}>
          {navItems.map(item => (
            <a key={item.href} href={item.href} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'4px',textDecoration:'none',padding:'6px 8px',color:activePage===item.href?'#d4af37':theme.textMuted}}>
              <span style={{fontSize:'20px'}}>{item.icon}</span>
              <span style={{fontSize:'9px',fontWeight:activePage===item.href?'600':'400'}}>{item.label}</span>
            </a>
          ))}
          <a href="/profile" style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'4px',textDecoration:'none',padding:'6px 8px',color:activePage==='/profile'?'#d4af37':theme.textMuted}}>
            <span style={{fontSize:'20px'}}>👤</span>
            <span style={{fontSize:'9px'}}>Profil</span>
          </a>
          <button onClick={theme.toggleTheme} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'4px',padding:'6px 8px',background:'none',border:'none',cursor:'pointer',color:theme.textMuted}}>
            <span style={{fontSize:'20px'}}>{theme.darkMode ? '☀️' : '🌙'}</span>
            <span style={{fontSize:'9px'}}>Thème</span>
          </button>
        </div>
      )}
    </>
  );
}