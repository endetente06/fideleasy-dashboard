"use client";
import { useEffect, useState } from 'react';

export default function QRCodePage() {
  const [qrCode, setQrCode] = useState('');
  const [url, setUrl] = useState('');

  const SHOP_ID = 'a23f70ea-db85-46b4-9bd1-c650831b134a';

  useEffect(() => {
    fetch(`https://fideleasy-backend-production.up.railway.app/qrcode/${SHOP_ID}`)
      .then(res => res.json())
      .then(data => {
        setQrCode(data.qrCode);
        setUrl(data.url);
      });
  }, []);

  return (
    <div style={{minHeight:'100vh',background:'#07070f',color:'white',fontFamily:'sans-serif',display:'flex'}}>
      <div style={{width:'240px',background:'#0f0f1c',borderRight:'1px solid #1e1e35',padding:'28px 0',display:'flex',flexDirection:'column'}}>
        <div style={{padding:'0 24px 32px',fontSize:'22px',fontWeight:'bold'}}>
          Fidel<span style={{color:'#4f6ef7'}}>Easy</span>
        </div>
        {['📊 Tableau de bord','💳 Ma carte','👥 Clients','🔔 Notifications','🎁 Promotions','⚙️ Réglages'].map((item)=>(
          <div key={item} style={{padding:'12px 24px',cursor:'pointer',fontSize:'14px',color:'#6060a0'}}>
            {item}
          </div>
        ))}
      </div>

      <div style={{flex:1,padding:'32px'}}>
        <h1 style={{fontSize:'24px',fontWeight:'bold',marginBottom:'32px'}}>📱 QR Code d'inscription</h1>

        <div style={{display:'flex',gap:'24px',alignItems:'flex-start'}}>
          <div style={{background:'#0f0f1c',border:'1px solid #1e1e35',borderRadius:'16px',padding:'32px',textAlign:'center'}}>
            <div style={{fontSize:'14px',color:'#6060a0',marginBottom:'20px'}}>
              Affichez ce QR code en caisse — vos clients scannent et ajoutent la carte à leur wallet !
            </div>
            {qrCode ? (
              <img src={qrCode} alt="QR Code" style={{width:'200px',height:'200px',borderRadius:'12px'}}/>
            ) : (
              <div style={{width:'200px',height:'200px',background:'#161625',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',color:'#6060a0'}}>
                Chargement...
              </div>
            )}
            <div style={{marginTop:'16px',fontSize:'12px',color:'#6060a0',wordBreak:'break-all'}}>{url}</div>
            <button onClick={()=>window.print()}
              style={{marginTop:'16px',background:'#4f6ef7',color:'white',border:'none',borderRadius:'10px',padding:'10px 24px',cursor:'pointer',fontSize:'14px',fontWeight:'600'}}>
              🖨️ Imprimer
            </button>
          </div>

          <div style={{background:'#0f0f1c',border:'1px solid #1e1e35',borderRadius:'16px',padding:'24px',flex:1}}>
            <h2 style={{fontSize:'16px',fontWeight:'bold',marginBottom:'16px'}}>Comment ça marche ?</h2>
            {[
              {num:'1',title:'Affichez le QR code',desc:'Imprimez-le et placez-le sur votre comptoir ou caisse'},
              {num:'2',title:'Le client scanne',desc:'Il utilise son appareil photo ou une app QR code'},
              {num:'3',title:'Ajout au wallet',desc:'En un clic la carte s\'ajoute à Apple ou Google Wallet'},
              {num:'4',title:'C\'est parti !',desc:'Le client accumule des tampons à chaque visite'},
            ].map(step => (
              <div key={step.num} style={{display:'flex',gap:'14px',marginBottom:'20px',alignItems:'flex-start'}}>
                <div style={{width:'32px',height:'32px',borderRadius:'50%',background:'rgba(79,110,247,0.15)',border:'1px solid #4f6ef7',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'bold',color:'#4f6ef7',flexShrink:0}}>
                  {step.num}
                </div>
                <div>
                  <div style={{fontWeight:'600',fontSize:'14px',marginBottom:'4px'}}>{step.title}</div>
                  <div style={{fontSize:'13px',color:'#6060a0'}}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}