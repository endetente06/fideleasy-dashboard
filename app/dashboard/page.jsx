"use client";
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    clients: 0,
    cartes: 0,
    notifications: 0,
    points: 0
  });

  useEffect(() => {
    fetch('http://localhost:3000/shops')
      .then(res => res.json())
      .then(data => {
        setStats(prev => ({ ...prev, clients: data.data?.length || 0 }));
      });

    fetch('http://localhost:3000/cards/all')
      .then(res => res.json())
      .then(data => {
        setStats(prev => ({ ...prev, cartes: data.data?.length || 0 }));
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
        <h1 style={{fontSize:'24px',fontWeight:'bold',marginBottom:'32px'}}>Tableau de bord</h1>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4, 1fr)',gap:'16px',marginBottom:'32px'}}>
          {[
            {label:'Clients actifs',value:stats.clients,icon:'👥'},
            {label:'Cartes émises',value:stats.cartes,icon:'💳'},
            {label:'Notifications',value:stats.notifications,icon:'🔔'},
            {label:'Points distribués',value:stats.points,icon:'⭐'},
          ].map((stat)=>(
            <div key={stat.label} style={{background:'#0f0f1c',border:'1px solid #1e1e35',borderRadius:'16px',padding:'20px'}}>
              <div style={{fontSize:'24px',marginBottom:'8px'}}>{stat.icon}</div>
              <div style={{fontSize:'12px',color:'#6060a0',marginBottom:'8px'}}>{stat.label}</div>
              <div style={{fontSize:'28px',fontWeight:'bold'}}>{stat.value}</div>
            </div>
          ))}
        </div>
        <div style={{background:'#0f0f1c',border:'1px solid #1e1e35',borderRadius:'16px',padding:'32px',textAlign:'center'}}>
          <div style={{fontSize:'48px',marginBottom:'16px'}}>🚀</div>
          <h2 style={{fontSize:'20px',fontWeight:'bold',marginBottom:'8px'}}>Bienvenue sur FidelEasy !</h2>
          <p style={{color:'#6060a0'}}>Votre dashboard est prêt. Commencez par créer votre première carte de fidélité.</p>
        </div>
      </div>
    </div>
  );
}