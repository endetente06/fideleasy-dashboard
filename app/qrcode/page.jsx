"use client";
import { useState, useEffect } from 'react';

const API = 'https://fideleasy-backend-production.up.railway.app';

export default function QRCode() {
  const [qrData, setQrData] = useState(null);
  const [loading, setLoading] = useState(true);
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
    fetch(`${API}/qrcode/${shopId}`)
      .then(r => r.json())
      .then(d => { setQrData(d); setLoading(false); });
  }, []);

  const navItems = [
    { icon: '📊', label: 'Dashboard', href: '/dashboard' },
    { icon: '👥', label: 'Clients', href: '/clients' },
    { icon: '🔔', label: 'Notifs', href: '/notifications' },
    { icon: '📱', label: 'QR Code', href: '/qrcode', active: true },
  ];

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
          <h2 style={{fontSize: isMobile ? '20px' : '24px',fontWeight:'700',margin:'0 0 4px'}}>Mon QR Code</h2>
          <p style={{color:'rgba(255,255,255,0.4)',margin:0,fontSize:'14px'}}>Affichez ce code dans votre commerce</p>
        </div>

        <div style={{
          display:'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap:'20px',maxWidth:'900px'
        }}>
          {/* QR Code */}
          <div style={{
            background:'rgba(255,255,255,0.04)',
            border:'1px solid rgba(255,255,255,0.08)',
            borderRadius:'16px',padding:'32px',
            textAlign:'center',backdropFilter:'blur(10px)'
          }}>
            <h3 style={{margin:'0 0 24px',fontSize:'15px',fontWeight:'600',color:'rgba(255,255,255,0.8)'}}>📱 QR Code d'inscription</h3>

            {loading ? (
              <div style={{padding:'60px',color:'rgba(255,255,255,0.3)'}}>Génération...</div>
            ) : (
              <>
                <div style={{
                  background:'white',borderRadius:'16px',
                  padding:'16px',display:'inline-block',marginBottom:'24px',
                  boxShadow:'0 8px 30px rgba(0,0,0,0.3)'
                }}>
                  <img src={qrData?.qrCode} alt="QR Code" style={{width: isMobile ? '180px' : '200px',height: isMobile ? '180px' : '200px',display:'block'}}/>
                </div>
                <p style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',marginBottom:'20px'}}>
                  Les clients scannent ce code pour rejoindre votre programme
                </p>
                <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
                  <button onClick={() => window.print()} style={{
                    background:'#d4af37',color:'white',border:'none',
                    borderRadius:'10px',padding:'10px 20px',cursor:'pointer',
                    fontSize:'14px',fontWeight:'600',
                    boxShadow:'0 4px 16px rgba(212,175,55,0.3)'
                  }}>
                    🖨️ Imprimer
                  </button>
                  <a href={qrData?.qrCode} download="qrcode-fideleasy.png" style={{
                    background:'rgba(212,175,55,0.1)',color:'#d4af37',
                    border:'1px solid rgba(212,175,55,0.3)',
                    borderRadius:'10px',padding:'10px 20px',
                    fontSize:'14px',fontWeight:'600',textDecoration:'none'
                  }}>
                    ⬇️ Télécharger
                  </a>
                </div>
              </>
            )}
          </div>

          {/* Instructions */}
          <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
            <div style={{
              background:'rgba(255,255,255,0.04)',
              border:'1px solid rgba(255,255,255,0.08)',
              borderRadius:'16px',padding:'24px',backdropFilter:'blur(10px)'
            }}>
              <h3 style={{margin:'0 0 16px',fontSize:'15px',fontWeight:'600',color:'rgba(255,255,255,0.8)'}}>💡 Comment l'utiliser ?</h3>
              {[
                { num:'1', title:'Imprimez le QR code', desc:'Affichez-le à la caisse ou à l\'entrée' },
                { num:'2', title:'Le client scanne', desc:'Avec son téléphone' },
                { num:'3', title:'Inscription automatique', desc:'En quelques secondes' },
                { num:'4', title:'Carte dans le wallet', desc:'Apple ou Google Wallet' },
              ].map(step => (
                <div key={step.num} style={{display:'flex',gap:'12px',marginBottom:'14px',alignItems:'flex-start'}}>
                  <div style={{
                    width:'26px',height:'26px',borderRadius:'50%',
                    background:'rgba(212,175,55,0.15)',color:'#d4af37',
                    display:'flex',alignItems:'center',justifyContent:'center',
                    fontSize:'12px',fontWeight:'700',flexShrink:0
                  }}>
                    {step.num}
                  </div>
                  <div>
                    <p style={{fontWeight:'600',margin:'0 0 2px',fontSize:'13px'}}>{step.title}</p>
                    <p style={{color:'rgba(255,255,255,0.4)',margin:0,fontSize:'12px'}}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              background:'rgba(212,175,55,0.05)',
              border:'1px solid rgba(212,175,55,0.15)',
              borderRadius:'14px',padding:'18px',backdropFilter:'blur(10px)'
            }}>
              <p style={{fontSize:'12px',color:'rgba(255,255,255,0.4)',margin:'0 0 8px'}}>🔗 Lien direct</p>
              <p style={{fontSize:'12px',color:'#d4af37',wordBreak:'break-all',margin:0}}>{qrData?.url}</p>
            </div>
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
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}