"use client";
import { useTheme } from './context/ThemeContext';

export default function NotFound() {
  const theme = useTheme();

  return (
    <div style={{minHeight:'100vh',background:theme.bg,color:theme.color,fontFamily:'system-ui,-apple-system,sans-serif',display:'flex',alignItems:'center',justifyContent:'center',padding:'24px'}}>
      <div style={{textAlign:'center',maxWidth:'480px'}}>
        
        {/* Animation */}
        <div style={{fontSize:'80px',marginBottom:'24px',animation:'bounce 2s ease-in-out infinite'}}>💳</div>
        
        {/* 404 */}
        <h1 style={{fontSize:'96px',fontWeight:'900',margin:'0 0 8px',color:'#d4af37',lineHeight:1}}>404</h1>
        
        {/* Titre */}
        <h2 style={{fontSize:'24px',fontWeight:'700',margin:'0 0 12px'}}>Page introuvable</h2>
        
        {/* Description */}
        <p style={{color:theme.textMuted,fontSize:'15px',margin:'0 0 32px',lineHeight:'1.6'}}>
          Oups ! Cette page n'existe pas ou a été déplacée. Retournez sur le dashboard pour continuer.
        </p>

        {/* Boutons */}
        <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
          <a href="/dashboard" style={{background:'#d4af37',color:'white',borderRadius:'12px',padding:'12px 28px',textDecoration:'none',fontSize:'15px',fontWeight:'700',boxShadow:'0 4px 20px rgba(212,175,55,0.3)'}}>
            📊 Dashboard
          </a>
          <a href="/" style={{background:theme.cardBg,color:theme.textSecondary,border:`1px solid ${theme.cardBorder}`,borderRadius:'12px',padding:'12px 28px',textDecoration:'none',fontSize:'15px',fontWeight:'600'}}>
            🏠 Accueil
          </a>
        </div>

        {/* Logo */}
        <p style={{marginTop:'48px',fontSize:'18px',fontWeight:'800',color:theme.textMuted}}>
          Fidel<span style={{color:'#d4af37'}}>Easy</span>
        </p>
      </div>

      <style>{`
        @keyframes bounce {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}