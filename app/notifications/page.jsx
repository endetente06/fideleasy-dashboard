"use client";
import { useEffect, useState } from 'react';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [form, setForm] = useState({ title: '', message: '', target: 'tous' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const SHOP_ID = 'a23f70ea-db85-46b4-9bd1-c650831b134a';

  useEffect(() => {
    fetch(`http://localhost:3000/notifications/${SHOP_ID}`)
      .then(res => res.json())
      .then(data => setNotifications(data.data || []));
  }, []);

  const sendNotif = () => {
    setSending(true);
    fetch('http://localhost:3000/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, shop_id: SHOP_ID })
    })
      .then(res => res.json())
      .then(() => {
        setSending(false);
        setSent(true);
        setForm({ title: '', message: '', target: 'tous' });
        setTimeout(() => setSent(false), 3000);
        fetch(`http://localhost:3000/notifications/${SHOP_ID}`)
          .then(res => res.json())
          .then(data => setNotifications(data.data || []));
      });
  };

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
        <h1 style={{fontSize:'24px',fontWeight:'bold',marginBottom:'32px'}}>🔔 Notifications</h1>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px'}}>

          {/* FORMULAIRE */}
          <div style={{background:'#0f0f1c',border:'1px solid #1e1e35',borderRadius:'16px',padding:'24px'}}>
            <h2 style={{fontSize:'16px',fontWeight:'bold',marginBottom:'20px'}}>Envoyer une notification</h2>

            {/* PREVIEW */}
            <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid #1e1e35',borderRadius:'12px',padding:'14px',display:'flex',gap:'12px',marginBottom:'20px'}}>
              <div style={{width:'40px',height:'40px',borderRadius:'10px',background:'linear-gradient(135deg,#4f6ef7,#7c8ff7)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'18px',flexShrink:0}}>🏪</div>
              <div style={{flex:1}}>
                <div style={{fontSize:'10px',color:'#6060a0',marginBottom:'3px'}}>Votre Commerce · FidelEasy</div>
                <div style={{fontSize:'13px',fontWeight:'600',marginBottom:'2px'}}>{form.title || 'Titre de la notification'}</div>
                <div style={{fontSize:'12px',color:'rgba(255,255,255,0.5)'}}>{form.message || 'Votre message apparaîtra ici...'}</div>
              </div>
            </div>

            <div style={{fontSize:'11px',color:'#6060a0',marginBottom:'6px',textTransform:'uppercase',letterSpacing:'0.8px'}}>Titre</div>
            <input placeholder="Ex: Happy Hour -20% 🎉" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}
              style={{width:'100%',background:'#161625',border:'1px solid #1e1e35',borderRadius:'8px',padding:'10px',color:'white',marginBottom:'12px',fontSize:'14px',boxSizing:'border-box'}}/>

            <div style={{fontSize:'11px',color:'#6060a0',marginBottom:'6px',textTransform:'uppercase',letterSpacing:'0.8px'}}>Message</div>
            <textarea placeholder="Décrivez votre promotion..." value={form.message} onChange={e=>setForm({...form,message:e.target.value})}
              style={{width:'100%',background:'#161625',border:'1px solid #1e1e35',borderRadius:'8px',padding:'10px',color:'white',marginBottom:'12px',fontSize:'14px',boxSizing:'border-box',resize:'none',height:'80px'}}/>

            <div style={{fontSize:'11px',color:'#6060a0',marginBottom:'8px',textTransform:'uppercase',letterSpacing:'0.8px'}}>Cibler</div>
            <div style={{display:'flex',gap:'8px',marginBottom:'20px'}}>
              {['tous','vip','inactifs','nouveaux'].map(t=>(
                <div key={t} onClick={()=>setForm({...form,target:t})}
                  style={{padding:'6px 12px',borderRadius:'20px',fontSize:'11px',fontWeight:'600',cursor:'pointer',
                    background:form.target===t?'rgba(79,110,247,0.2)':'#161625',
                    border:form.target===t?'1px solid #4f6ef7':'1px solid #1e1e35',
                    color:form.target===t?'#4f6ef7':'#6060a0'}}>
                  {t}
                </div>
              ))}
            </div>

            <button onClick={sendNotif} disabled={sending || !form.title}
              style={{width:'100%',background:sent?'#43e97b':'#4f6ef7',color:'white',border:'none',borderRadius:'10px',padding:'12px',cursor:'pointer',fontSize:'14px',fontWeight:'600'}}>
              {sent ? '✓ Envoyée !' : sending ? 'Envoi...' : '🚀 Envoyer'}
            </button>
          </div>

          {/* HISTORIQUE */}
          <div style={{background:'#0f0f1c',border:'1px solid #1e1e35',borderRadius:'16px',padding:'24px'}}>
            <h2 style={{fontSize:'16px',fontWeight:'bold',marginBottom:'20px'}}>Historique</h2>
            {notifications.length === 0 ? (
              <div style={{textAlign:'center',color:'#6060a0',padding:'32px'}}>
                <div style={{fontSize:'32px',marginBottom:'8px'}}>🔔</div>
                <div>Aucune notification envoyée</div>
              </div>
            ) : notifications.map(notif => (
              <div key={notif.id} style={{background:'rgba(255,255,255,0.03)',border:'1px solid #1e1e35',borderRadius:'12px',padding:'14px',marginBottom:'12px'}}>
                <div style={{fontWeight:'600',fontSize:'14px',marginBottom:'4px'}}>{notif.title}</div>
                <div style={{fontSize:'12px',color:'#6060a0',marginBottom:'8px'}}>{notif.message}</div>
                <div style={{display:'flex',gap:'12px'}}>
                  <span style={{fontSize:'11px',color:'#43e97b'}}>✓ Envoyée</span>
                  <span style={{fontSize:'11px',color:'#6060a0'}}>Cible: {notif.target}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}