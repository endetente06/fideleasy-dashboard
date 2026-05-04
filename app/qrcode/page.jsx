"use client";
import { useState, useEffect } from 'react';

const API = 'https://fideleasy-backend-production.up.railway.app';

export default function QRCode() {
  const [qrData, setQrData] = useState(null);
  const [loading, setLoading] = useState(true);

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
    { icon: '🔔', label: 'Notifications', href: '/notifications' },
    { icon: '📱', label: 'QR Code', href: '/qrcode', active: true },
  ];

  const print = () => window.print();

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
          <h2 style={{fontSize:'24px',fontWeight:'700',margin:'0 0 4px'}}>Mon QR Code</h2>
          <p style={{color:'#6060a0',margin:0,fontSize:'14px'}}>Affichez ce QR code dans votre commerce</p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px',maxWidth:'900px'}}>
          {/* QR Code */}
          <div style={{background:'#0f0f1c',border:'1px solid #1e1e35',borderRadius:'16px',padding:'32px',textAlign:'center'}}>
            <h3 style={{margin:'0 0 24px',fontSize:'16px',fontWeight:'600'}}>📱 QR Code d'inscription</h3>
            
            {loading ? (
              <div style={{padding:'60px',color:'#6060a0'}}>Génération...</div>
            ) : (
              <>
                <div style={{background:'white',borderRadius:'16px',padding:'16px',display:'inline-block',marginBottom:'24px'}}>
                  <img src={qrData?.qrCode} alt="QR Code" style={{width:'200px',height:'200px',display:'block'}}/>
                </div>
                <p style={{color:'#6060a0',fontSize:'13px',marginBottom:'20px'}}>
                  Les clients scannent ce code pour rejoindre votre programme de fidélité
                </p>
                <div style={{display:'flex',gap:'12px',justifyContent:'center'}}>
                  <button onClick={print} style={{background:'#4f6ef7',color:'white',border:'none',borderRadius:'10px',padding:'10px 20px',cursor:'pointer',fontSize:'14px',fontWeight:'600'}}>
                    🖨️ Imprimer
                  </button>
                  <a href={qrData?.qrCode} download="qrcode-fideleasy.png" style={{background:'rgba(79,110,247,0.1)',color:'#4f6ef7',border:'1px solid rgba(79,110,247,0.3)',borderRadius:'10px',padding:'10px 20px',fontSize:'14px',fontWeight:'600',textDecoration:'none'}}>
                    ⬇️ Télécharger
                  </a>
                </div>
              </>
            )}
          </div>

          {/* Instructions */}
          <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
            <div style={{background:'#0f0f1c',border:'1px solid #1e1e35',borderRadius:'16px',padding:'24px'}}>
              <h3 style={{margin:'0 0 16px',fontSize:'16px',fontWeight:'600'}}>💡 Comment l'utiliser ?</h3>
              {[
                { num:'1', title:'Imprimez le QR code', desc:'Imprimez et affichez-le à la caisse ou à l\'entrée' },
                { num:'2', title:'Le client scanne', desc:'Le client scanne avec son téléphone' },
                { num:'3', title:'Inscription automatique', desc:'Il rejoint votre programme en quelques secondes' },
                { num:'4', title:'Carte dans le wallet', desc:'Sa carte de fidélité est ajoutée à Apple/Google Wallet' },
              ].map(step => (
                <div key={step.num} style={{display:'flex',gap:'12px',marginBottom:'16px',alignItems:'flex-start'}}>
                  <div style={{width:'28px',height:'28px',borderRadius:'50%',background:'rgba(79,110,247,0.2)',color:'#4f6ef7',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'13px',fontWeight:'700',flexShrink:0}}>
                    {step.num}
                  </div>
                  <div>
                    <p style={{fontWeight:'600',margin:'0 0 2px',fontSize:'14px'}}>{step.title}</p>
                    <p style={{color:'#6060a0',margin:0,fontSize:'13px'}}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{background:'rgba(79,110,247,0.05)',border:'1px solid rgba(79,110,247,0.2)',borderRadius:'16px',padding:'20px'}}>
              <p style={{fontSize:'13px',color:'#6060a0',margin:'0 0 8px'}}>🔗 Lien direct</p>
              <p style={{fontSize:'12px',color:'#4f6ef7',wordBreak:'break-all',margin:0}}>{qrData?.url}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}