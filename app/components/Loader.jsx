"use client";
import { useTheme } from '../context/ThemeContext';

export default function Loader() {
  const theme = useTheme();

  return (
    <div style={{minHeight:'100vh',background:theme.bg,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:'24px'}}>
      
      {/* Logo animé */}
      <div style={{position:'relative',width:'80px',height:'80px'}}>
        <div style={{position:'absolute',inset:0,borderRadius:'50%',border:'3px solid rgba(212,175,55,0.2)'}}/>
        <div style={{position:'absolute',inset:0,borderRadius:'50%',border:'3px solid transparent',borderTopColor:'#d4af37',animation:'spin 1s linear infinite'}}/>
        <div style={{position:'absolute',inset:'8px',borderRadius:'50%',border:'2px solid transparent',borderTopColor:'rgba(212,175,55,0.5)',animation:'spin 1.5s linear infinite reverse'}}/>
        <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px'}}>
          💳
        </div>
      </div>

      {/* Texte */}
      <div style={{textAlign:'center'}}>
        <p style={{fontSize:'18px',fontWeight:'800',margin:'0 0 4px',color:theme.color}}>
          Fidel<span style={{color:'#d4af37'}}>Easy</span>
        </p>
        <p style={{fontSize:'13px',color:theme.textMuted,margin:0,animation:'pulse 1.5s ease-in-out infinite'}}>
          Chargement...
        </p>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%,100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}