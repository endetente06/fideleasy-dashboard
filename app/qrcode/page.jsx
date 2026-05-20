"use client";
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import Sidebar from '../components/Sidebar';

const API = 'https://fideleasy-backend-production.up.railway.app';

export default function QRCode() {
  const [qrData, setQrData] = useState(null);
  const [loading, setLoading] = useState(true);
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
    const shopId = shopData ? JSON.parse(shopData).id : null;
    if (!shopId) { setLoading(false); return; }
    fetch(`${API}/qrcode/${shopId}`)
      .then(r => r.json())
      .then(d => { setQrData(d); setLoading(false); });
  }, []);

  return (
    <div style={{display:'flex',minHeight:'100vh',background:theme.bg,color:theme.color,fontFamily:'system-ui,-apple-system,sans-serif',position:'relative'}}>
      <div style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:0}}>
        <div style={{position:'absolute',top:'10%',left:'5%',width:'400px',height:'400px',borderRadius:'50%',background:'rgba(212,175,55,0.04)',animation:'float1 8s ease-in-out infinite'}}/>
        <div style={{position:'absolute',bottom:'10%',right:'5%',width:'300px',height:'300px',borderRadius:'50%',background:'rgba(212,175,55,0.03)',animation:'float2 10s ease-in-out infinite'}}/>
      </div>

      <Sidebar activePage="/qrcode" />

      <div style={{marginLeft:isMobile?0:'240px',flex:1,padding:isMobile?'20px 16px 100px':'32px',position:'relative',zIndex:1}}>
        {isMobile && (
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
            <h1 style={{fontSize:'20px',fontWeight:'800',margin:0}}>Fidel<span style={{color:'#d4af37'}}>Easy</span></h1>
          </div>
        )}

        <div style={{marginBottom:'24px'}}>
          <h2 style={{fontSize:isMobile?'20px':'24px',fontWeight:'700',margin:'0 0 4px'}}>Mon QR Code</h2>
          <p style={{color:theme.textMuted,margin:0,fontSize:'14px'}}>Affichez ce code dans votre commerce</p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'1fr 1fr',gap:'20px',maxWidth:'900px'}}>
          <div style={{background:theme.cardBg,border:`1px solid ${theme.cardBorder}`,borderRadius:'16px',padding:'32px',textAlign:'center',backdropFilter:'blur(10px)'}}>
            <h3 style={{margin:'0 0 24px',fontSize:'15px',fontWeight:'600',color:theme.textSecondary}}>📱 QR Code d'inscription</h3>
            {loading ? (
              <div style={{padding:'60px',color:theme.textMuted}}>Génération...</div>
            ) : (
              <>
                <div style={{background:'white',borderRadius:'16px',padding:'16px',display:'inline-block',marginBottom:'24px',boxShadow:'0 8px 30px rgba(0,0,0,0.3)'}}>
                  <img src={qrData?.qrCode} alt="QR Code" style={{width:isMobile?'180px':'200px',height:isMobile?'180px':'200px',display:'block'}}/>
                </div>
                <p style={{color:theme.textMuted,fontSize:'13px',marginBottom:'20px'}}>Les clients scannent ce code pour rejoindre votre programme</p>
                <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
                  <button onClick={() => window.print()} style={{background:'#d4af37',color:'white',border:'none',borderRadius:'10px',padding:'10px 20px',cursor:'pointer',fontSize:'14px',fontWeight:'600',boxShadow:'0 4px 16px rgba(212,175,55,0.3)'}}>
                    🖨️ Imprimer
                  </button>
                  <a href={qrData?.qrCode} download="qrcode-fideleasy.png" style={{background:'rgba(212,175,55,0.1)',color:'#d4af37',border:'1px solid rgba(212,175,55,0.3)',borderRadius:'10px',padding:'10px 20px',fontSize:'14px',fontWeight:'600',textDecoration:'none'}}>
                    ⬇️ Télécharger
                  </a>
                </div>
              </>
            )}
          </div>

          <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
            <div style={{background:theme.cardBg,border:`1px solid ${theme.cardBorder}`,borderRadius:'16px',padding:'24px',backdropFilter:'blur(10px)'}}>
              <h3 style={{margin:'0 0 16px',fontSize:'15px',fontWeight:'600',color:theme.textSecondary}}>💡 Comment l'utiliser ?</h3>
              {[
                { num:'1', title:'Imprimez le QR code', desc:'Affichez-le à la caisse ou à l\'entrée' },
                { num:'2', title:'Le client scanne', desc:'Avec son téléphone' },
                { num:'3', title:'Inscription automatique', desc:'En quelques secondes' },
                { num:'4', title:'Carte dans le wallet', desc:'Apple ou Google Wallet' },
              ].map(step => (
                <div key={step.num} style={{display:'flex',gap:'12px',marginBottom:'14px',alignItems:'flex-start'}}>
                  <div style={{width:'26px',height:'26px',borderRadius:'50%',background:'rgba(212,175,55,0.15)',color:'#d4af37',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'12px',fontWeight:'700',flexShrink:0}}>
                    {step.num}
                  </div>
                  <div>
                    <p style={{fontWeight:'600',margin:'0 0 2px',fontSize:'13px'}}>{step.title}</p>
                    <p style={{color:theme.textMuted,margin:0,fontSize:'12px'}}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{background:'rgba(212,175,55,0.05)',border:'1px solid rgba(212,175,55,0.15)',borderRadius:'14px',padding:'18px',backdropFilter:'blur(10px)'}}>
              <p style={{fontSize:'12px',color:theme.textMuted,margin:'0 0 8px'}}>🔗 Lien direct</p>
              <p style={{fontSize:'12px',color:'#d4af37',wordBreak:'break-all',margin:0}}>{qrData?.url}</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-30px)} }
        @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(20px)} }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}