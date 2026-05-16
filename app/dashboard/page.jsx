"use client";
import { useState, useEffect } from 'react';

const API = 'https://fideleasy-backend-production.up.railway.app';

export default function Dashboard() {
  const [stats, setStats] = useState({ clients: 0, cards: 0, notifications: 0, stamps: 0 });
  const [recentClients, setRecentClients] = useState([]);
  const [proStats, setProStats] = useState(null);
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const shopData = localStorage.getItem('shop');
    if (!shopData) return;
    const s = JSON.parse(shopData);
    setShop(s);
    const shopId = s.id;

    Promise.all([
      fetch(`${API}/customers/${shopId}`).then(r => r.json()),
      fetch(`${API}/cards/all`).then(r => r.json()),
      fetch(`${API}/notifications/${shopId}`).then(r => r.json()),
    ]).then(([customers, cards, notifs]) => {
      const shopCards = cards.data?.filter(c => c.shop_id === shopId) || [];
      const totalStamps = shopCards.reduce((acc, c) => acc + (c.stamps || 0), 0);
      setStats({
        clients: customers.data?.length || 0,
        cards: shopCards.length,
        notifications: notifs.data?.length || 0,
        stamps: totalStamps,
      });
      setRecentClients(customers.data?.slice(-5).reverse() || []);
      setLoading(false);
    });

    if (s.plan === 'pro' || s.plan === 'business') {
      fetch(`${API}/stats/${shopId}`)
        .then(r => r.json())
        .then(d => setProStats(d));
    }
  }, []);

  const navItems = [
    { icon: '📊', label: 'Dashboard', href: '/dashboard', active: true },
    { icon: '👥', label: 'Clients', href: '/clients' },
    { icon: '🔔', label: 'Notifs', href: '/notifications' },
    { icon: '📱', label: 'QR Code', href: '/qrcode' },
    { icon: '⚙️', label: 'Réglages', href: '/settings' },
  ];

  const statCards = [
    { icon: '👥', label: 'Clients', value: stats.clients, color: '#d4af37', bg: 'rgba(212,175,55,0.1)' },
    { icon: '💳', label: 'Cartes actives', value: stats.cards, color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
    { icon: '🎫', label: 'Tampons total', value: stats.stamps, color: '#a855f7', bg: 'rgba(168,85,247,0.1)' },
    { icon: '🔔', label: 'Notifications', value: stats.notifications, color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
  ];

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'linear-gradient(135deg,#0a0a18 0%,#1a1020 50%,#0a1020 100%)',color:'white',fontFamily:'system-ui,-apple-system,sans-serif',position:'relative'}}>
      <div style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:0}}>
        <div style={{position:'absolute',top:'10%',left:'5%',width:'400px',height:'400px',borderRadius:'50%',background:'rgba(212,175,55,0.04)',animation:'float1 8s ease-in-out infinite'}}/>
        <div style={{position:'absolute',bottom:'10%',right:'5%',width:'300px',height:'300px',borderRadius:'50%',background:'rgba(212,175,55,0.03)',animation:'float2 10s ease-in-out infinite'}}/>
      </div>

      {!isMobile && (
        <div style={{width:'240px',background:'rgba(255,255,255,0.04)',borderRight:'1px solid rgba(255,255,255,0.08)',padding:'24px 0',display:'flex',flexDirection:'column',position:'fixed',height:'100vh',zIndex:10,backdropFilter:'blur(20px)'}}>
          <div style={{padding:'0 24px 32px'}}>
            <h1 style={{fontSize:'22px',fontWeight:'800',margin:0,color:'white'}}>Fidel<span style={{color:'#d4af37'}}>Easy</span></h1>
            {shop && <p style={{fontSize:'12px',color:'rgba(255,255,255,0.4)',margin:'4px 0 0'}}>{shop.name}</p>}
          </div>
          {navItems.map(item => (
            <a key={item.href} href={item.href} style={{display:'flex',alignItems:'center',gap:'12px',padding:'12px 24px',color:item.active?'#d4af37':'rgba(255,255,255,0.5)',background:item.active?'rgba(212,175,55,0.1)':'transparent',borderLeft:item.active?'3px solid #d4af37':'3px solid transparent',textDecoration:'none',fontSize:'14px',fontWeight:item.active?'600':'400',transition:'all 0.2s'}}>
              <span style={{fontSize:'18px'}}>{item.icon}</span>{item.label}
            </a>
          ))}
          <div style={{marginTop:'auto',padding:'24px'}}>
            <div style={{background:'rgba(212,175,55,0.08)',border:'1px solid rgba(212,175,55,0.2)',borderRadius:'12px',padding:'16px'}}>
              <p style={{fontSize:'12px',color:'rgba(255,255,255,0.4)',margin:'0 0 4px'}}>Plan actuel</p>
              <p style={{fontSize:'14px',fontWeight:'600',color:'#d4af37',margin:'0 0 12px',textTransform:'capitalize'}}>{shop?.plan || 'Starter'}</p>
              <a href="/landing#pricing" style={{display:'block',textAlign:'center',background:'#d4af37',color:'white',borderRadius:'8px',padding:'8px',fontSize:'12px',textDecoration:'none',fontWeight:'600'}}>Mettre à niveau</a>
            </div>
          </div>
        </div>
      )}

      <div style={{marginLeft:isMobile?0:'240px',flex:1,padding:isMobile?'20px 16px 100px':'32px',position:'relative',zIndex:1}}>
        {isMobile && (
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
            <h1 style={{fontSize:'20px',fontWeight:'800',margin:0}}>Fidel<span style={{color:'#d4af37'}}>Easy</span></h1>
            {shop && <span style={{fontSize:'13px',color:'rgba(255,255,255,0.4)'}}>{shop.name}</span>}
          </div>
        )}

        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'28px',flexWrap:'wrap',gap:'12px'}}>
          <div>
            <h2 style={{fontSize:isMobile?'22px':'24px',fontWeight:'700',margin:'0 0 4px'}}>Tableau de bord</h2>
            <p style={{color:'rgba(255,255,255,0.4)',margin:0,fontSize:'14px'}}>Bienvenue sur FidelEasy 👋</p>
          </div>
          {!isMobile && (
            <div style={{display:'flex',gap:'12px'}}>
              <a href="/qrcode" style={{background:'rgba(212,175,55,0.1)',border:'1px solid rgba(212,175,55,0.3)',color:'#d4af37',borderRadius:'10px',padding:'10px 20px',textDecoration:'none',fontSize:'14px',fontWeight:'600'}}>📱 Mon QR Code</a>
              <a href="/clients" style={{background:'#d4af37',color:'white',borderRadius:'10px',padding:'10px 20px',textDecoration:'none',fontSize:'14px',fontWeight:'600'}}>+ Ajouter un client</a>
            </div>
          )}
        </div>

        {/* Stats */}
        <div style={{display:'grid',gridTemplateColumns:isMobile?'repeat(2,1fr)':'repeat(4,1fr)',gap:'12px',marginBottom:'24px'}}>
          {statCards.map(card => (
            <div key={card.label} style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:isMobile?'16px':'20px',backdropFilter:'blur(10px)'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'10px'}}>
                <span style={{fontSize:'10px',color:'rgba(255,255,255,0.4)',textTransform:'uppercase',letterSpacing:'0.8px'}}>{card.label}</span>
                <div style={{width:'32px',height:'32px',borderRadius:'8px',background:card.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'16px'}}>{card.icon}</div>
              </div>
              <p style={{fontSize:isMobile?'24px':'28px',fontWeight:'700',margin:0,color:card.color}}>
                {loading ? '...' : card.value}
              </p>
            </div>
          ))}
        </div>

        {/* Grille principale */}
        <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'1fr 1fr',gap:'16px',marginBottom:'16px'}}>
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'20px',backdropFilter:'blur(10px)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
              <h3 style={{fontSize:'15px',fontWeight:'600',margin:0,color:'rgba(255,255,255,0.8)'}}>👥 Derniers clients</h3>
              <a href="/clients" style={{fontSize:'12px',color:'#d4af37',textDecoration:'none',fontWeight:'600'}}>Voir tous →</a>
            </div>
            {loading ? (
              <p style={{color:'rgba(255,255,255,0.3)',fontSize:'14px'}}>Chargement...</p>
            ) : recentClients.length === 0 ? (
              <p style={{color:'rgba(255,255,255,0.3)',fontSize:'14px'}}>Aucun client pour l'instant</p>
            ) : (
              <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                {recentClients.map(client => (
                  <div key={client.id} style={{display:'flex',alignItems:'center',gap:'12px',padding:'10px',background:'rgba(255,255,255,0.03)',borderRadius:'10px'}}>
                    <div style={{width:'34px',height:'34px',borderRadius:'50%',background:'rgba(212,175,55,0.2)',display:'flex',alignItems:'center',justifyContent:'center',color:'#d4af37',fontWeight:'700',fontSize:'14px',flexShrink:0}}>
                      {client.name?.charAt(0).toUpperCase()}
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <p style={{margin:0,fontWeight:'600',fontSize:'13px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{client.name}</p>
                      <p style={{margin:0,fontSize:'11px',color:'rgba(255,255,255,0.4)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{client.email || client.phone || '—'}</p>
                    </div>
                    <span style={{fontSize:'11px',color:'rgba(255,255,255,0.3)',flexShrink:0}}>Nouveau</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
            <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'20px',backdropFilter:'blur(10px)'}}>
              <h3 style={{fontSize:'15px',fontWeight:'600',margin:'0 0 14px',color:'rgba(255,255,255,0.8)'}}>⚡ Actions rapides</h3>
              <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                {[
                  { icon:'👥', label:'Gérer mes clients', href:'/clients', color:'#d4af37' },
                  { icon:'🎫', label:'Tamponner un client', href:'/clients', color:'#22c55e' },
                  { icon:'🔔', label:'Envoyer une notification', href:'/notifications', color:'#a855f7' },
                  { icon:'📱', label:'Afficher mon QR Code', href:'/qrcode', color:'#3b82f6' },
                ].map(action => (
                  <a key={action.label} href={action.href} style={{display:'flex',alignItems:'center',gap:'10px',background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:'10px',padding:'12px',textDecoration:'none',color:'white'}}>
                    <div style={{width:'32px',height:'32px',borderRadius:'8px',background:`${action.color}20`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'16px',flexShrink:0}}>{action.icon}</div>
                    <span style={{fontSize:'13px',fontWeight:'500'}}>{action.label}</span>
                    <span style={{marginLeft:'auto',color:'rgba(255,255,255,0.3)',fontSize:'12px'}}>→</span>
                  </a>
                ))}
              </div>
            </div>

            <div style={{background:'rgba(212,175,55,0.06)',border:'1px solid rgba(212,175,55,0.15)',borderRadius:'16px',padding:'20px',backdropFilter:'blur(10px)'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'12px'}}>
                <h3 style={{fontSize:'15px',fontWeight:'600',margin:0,color:'rgba(255,255,255,0.8)'}}>⭐ Mon plan</h3>
                <span style={{background:'rgba(212,175,55,0.2)',color:'#d4af37',borderRadius:'20px',padding:'4px 12px',fontSize:'12px',fontWeight:'700',textTransform:'capitalize'}}>{shop?.plan || 'Starter'}</span>
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:'6px',marginBottom:'14px'}}>
                {[
                  '✓ Apple & Google Wallet',
                  '✓ QR Code d\'inscription',
                  '✓ Notifications push',
                  shop?.plan === 'pro' || shop?.plan === 'business' ? '✓ Carte personnalisée' : '✗ Carte personnalisée (Pro)',
                ].map((f,i) => (
                  <p key={i} style={{margin:0,fontSize:'12px',color:f.startsWith('✗')?'rgba(255,255,255,0.3)':'rgba(255,255,255,0.6)'}}>{f}</p>
                ))}
              </div>
              {shop?.plan === 'starter' && (
                <a href="/landing#pricing" style={{display:'block',textAlign:'center',background:'#d4af37',color:'white',borderRadius:'8px',padding:'10px',fontSize:'13px',textDecoration:'none',fontWeight:'700'}}>
                  Passer au Pro 🚀
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Dashboard Pro & Business */}
{(shop?.plan === 'pro' || shop?.plan === 'business') && proStats && (
  <div style={{display:'flex',flexDirection:'column',gap:'16px',marginTop:'16px'}}>
    
    {/* Stats rapides Pro */}
    <div style={{display:'grid',gridTemplateColumns:isMobile?'repeat(2,1fr)':'repeat(4,1fr)',gap:'12px'}}>
      {[
        { icon:'📈', label:'Tampons cette semaine', value: proStats.weekStamps, color:'#22c55e', bg:'rgba(34,197,94,0.1)', suffix:'' },
        { icon:'🔄', label:'Taux de rétention', value: proStats.retentionRate, color:'#a855f7', bg:'rgba(168,85,247,0.1)', suffix:'%' },
        { icon:'🏆', label:'Cartes complétées', value: proStats.completedCards, color:'#d4af37', bg:'rgba(212,175,55,0.1)', suffix:'' },
        { icon:'📅', label:'Tampons ce mois', value: proStats.monthStamps, color:'#3b82f6', bg:'rgba(59,130,246,0.1)', suffix:'' },
      ].map(card => (
        <div key={card.label} style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:isMobile?'14px':'18px',backdropFilter:'blur(10px)'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'8px'}}>
            <span style={{fontSize:'10px',color:'rgba(255,255,255,0.4)',textTransform:'uppercase',letterSpacing:'0.8px'}}>{card.label}</span>
            <div style={{width:'28px',height:'28px',borderRadius:'8px',background:card.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'14px'}}>{card.icon}</div>
          </div>
          <p style={{fontSize:isMobile?'22px':'26px',fontWeight:'700',margin:0,color:card.color}}>
            {card.value}{card.suffix}
          </p>
        </div>
      ))}
    </div>

    {/* Graphique + Top clients */}
    <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'1fr 1fr',gap:'16px'}}>
      <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'20px',backdropFilter:'blur(10px)'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
          <h3 style={{fontSize:'15px',fontWeight:'600',margin:0,color:'rgba(255,255,255,0.8)'}}>📈 Tampons cette semaine</h3>
          <span style={{fontSize:'12px',color:proStats.weekGrowth>=0?'#22c55e':'#ef4444',fontWeight:'600'}}>
            {proStats.weekGrowth>=0?'+':''}{proStats.weekGrowth}% vs semaine dernière
          </span>
        </div>
        <div style={{display:'flex',alignItems:'flex-end',gap:'6px',height:'100px'}}>
          {proStats.stampsByDay.map((d, i) => {
            const max = Math.max(...proStats.stampsByDay.map(x => x.count), 1);
            const height = Math.max((d.count / max) * 85, 4);
            const today = new Date().getDay();
            return (
              <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:'4px'}}>
                <span style={{fontSize:'10px',color:'#d4af37',fontWeight:'600'}}>{d.count > 0 ? d.count : ''}</span>
                <div style={{width:'100%',height:`${height}px`,background:i===today?'#d4af37':'rgba(212,175,55,0.3)',borderRadius:'4px',transition:'height 0.3s'}}/>
                <span style={{fontSize:'9px',color:i===today?'#d4af37':'rgba(255,255,255,0.3)',fontWeight:i===today?'700':'400'}}>{d.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'20px',backdropFilter:'blur(10px)'}}>
        <h3 style={{fontSize:'15px',fontWeight:'600',margin:'0 0 16px',color:'rgba(255,255,255,0.8)'}}>🏆 Top clients</h3>
        {proStats.topClients.length === 0 ? (
          <p style={{color:'rgba(255,255,255,0.3)',fontSize:'13px'}}>Aucun client pour l'instant</p>
        ) : (
          <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
            {proStats.topClients.map((card, i) => (
              <div key={card.id} style={{display:'flex',alignItems:'center',gap:'10px',padding:'8px',background:'rgba(255,255,255,0.03)',borderRadius:'8px'}}>
                <span style={{fontSize:'14px',fontWeight:'700',color:i===0?'#d4af37':i===1?'#94a3b8':i===2?'#cd7c3a':'rgba(255,255,255,0.4)',width:'24px',flexShrink:0}}>#{i+1}</span>
                <div style={{flex:1}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'4px'}}>
                    <span style={{fontSize:'12px',color:'rgba(255,255,255,0.6)'}}>{card.stamps || 0} tampons</span>
                    <span style={{fontSize:'11px',color:'rgba(255,255,255,0.3)'}}>{Math.round(((card.stamps||0)/(shop?.card_stamps_required||10))*100)}%</span>
                  </div>
                  <div style={{height:'4px',borderRadius:'2px',background:'rgba(255,255,255,0.08)',overflow:'hidden'}}>
                    <div style={{height:'100%',borderRadius:'2px',background:'#d4af37',width:`${Math.min(((card.stamps||0)/(shop?.card_stamps_required||10))*100,100)}%`}}/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

    {/* Stats Business uniquement */}
    {shop?.plan === 'business' && (
      <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'1fr 1fr 1fr',gap:'16px'}}>
        
        {/* CA estimé */}
        <div style={{background:'rgba(212,175,55,0.06)',border:'1px solid rgba(212,175,55,0.2)',borderRadius:'16px',padding:'20px',backdropFilter:'blur(10px)'}}>
          <h3 style={{fontSize:'13px',fontWeight:'600',margin:'0 0 12px',color:'rgba(255,255,255,0.6)',textTransform:'uppercase',letterSpacing:'0.8px'}}>💰 CA estimé généré</h3>
          <p style={{fontSize:'32px',fontWeight:'800',margin:'0 0 4px',color:'#d4af37'}}>{proStats.estimatedRevenue}€</p>
          <p style={{fontSize:'12px',color:'rgba(255,255,255,0.3)',margin:0}}>Basé sur {proStats.totalStamps} visites à 15€ moy.</p>
        </div>

        {/* Clients actifs vs inactifs */}
        <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'20px',backdropFilter:'blur(10px)'}}>
          <h3 style={{fontSize:'13px',fontWeight:'600',margin:'0 0 12px',color:'rgba(255,255,255,0.6)',textTransform:'uppercase',letterSpacing:'0.8px'}}>👥 Clients actifs / inactifs</h3>
          <div style={{display:'flex',gap:'12px',alignItems:'center',marginBottom:'12px'}}>
            <div style={{textAlign:'center'}}>
              <p style={{fontSize:'24px',fontWeight:'800',margin:0,color:'#22c55e'}}>{proStats.activeClients}</p>
              <p style={{fontSize:'11px',color:'rgba(255,255,255,0.4)',margin:0}}>Actifs</p>
            </div>
            <div style={{flex:1,height:'8px',borderRadius:'4px',background:'rgba(255,255,255,0.08)',overflow:'hidden'}}>
              <div style={{height:'100%',borderRadius:'4px',background:'linear-gradient(90deg,#22c55e,#ef4444)',width:'100%'}}/>
            </div>
            <div style={{textAlign:'center'}}>
              <p style={{fontSize:'24px',fontWeight:'800',margin:0,color:'#ef4444'}}>{proStats.inactiveCount}</p>
              <p style={{fontSize:'11px',color:'rgba(255,255,255,0.4)',margin:0}}>Inactifs</p>
            </div>
          </div>
          <p style={{fontSize:'12px',color:'rgba(255,255,255,0.3)',margin:0}}>Taux de rétention : <span style={{color:'#a855f7',fontWeight:'700'}}>{proStats.retentionRate}%</span></p>
        </div>

        {/* Export CSV */}
        <div style={{background:'rgba(59,130,246,0.06)',border:'1px solid rgba(59,130,246,0.2)',borderRadius:'16px',padding:'20px',backdropFilter:'blur(10px)',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
          <div>
            <h3 style={{fontSize:'13px',fontWeight:'600',margin:'0 0 8px',color:'rgba(255,255,255,0.6)',textTransform:'uppercase',letterSpacing:'0.8px'}}>📥 Export données</h3>
            <p style={{fontSize:'12px',color:'rgba(255,255,255,0.4)',margin:'0 0 16px'}}>Exportez vos clients et statistiques en CSV</p>
          </div>
          <button onClick={async () => {
            const shopData = localStorage.getItem('shop');
            const shopId = JSON.parse(shopData).id;
            const res = await fetch(`${API}/customers/${shopId}`);
            const data = await res.json();
            const clients = data.data || [];
            const csv = ['Nom,Email,Téléphone', ...clients.map(c => `${c.name},${c.email||''},${c.phone||''}`)].join('\n');
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'clients-fideleasy.csv';
            a.click();
          }} style={{background:'rgba(59,130,246,0.15)',color:'#93c5fd',border:'1px solid rgba(59,130,246,0.3)',borderRadius:'8px',padding:'10px',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
            ⬇️ Télécharger CSV
          </button>
        </div>
      </div>
    )}

    {/* Alerte clients inactifs */}
    {proStats.inactiveCount > 0 && (
      <div style={{background:'rgba(239,68,68,0.06)',border:'1px solid rgba(239,68,68,0.2)',borderRadius:'16px',padding:'20px',backdropFilter:'blur(10px)'}}>
        <h3 style={{fontSize:'15px',fontWeight:'600',margin:'0 0 8px',color:'#fca5a5'}}>⚠️ {proStats.inactiveCount} client{proStats.inactiveCount > 1 ? 's' : ''} inactif{proStats.inactiveCount > 1 ? 's' : ''}</h3>
        <p style={{fontSize:'13px',color:'rgba(255,255,255,0.5)',margin:'0 0 12px'}}>Ces clients n'ont pas été tamponnés depuis 30 jours — envoyez leur une offre !</p>
        <a href="/notifications" style={{display:'inline-block',background:'rgba(239,68,68,0.15)',color:'#fca5a5',border:'1px solid rgba(239,68,68,0.3)',borderRadius:'8px',padding:'8px 16px',fontSize:'13px',fontWeight:'600',textDecoration:'none'}}>
          🔔 Envoyer une offre de relance →
        </a>
      </div>
    )}
  </div>
)}

        {isMobile && (
          <a href="/clients" style={{display:'block',textAlign:'center',background:'#d4af37',color:'white',borderRadius:'12px',padding:'14px',textDecoration:'none',fontSize:'15px',fontWeight:'700',boxShadow:'0 4px 20px rgba(212,175,55,0.3)',marginTop:'16px'}}>
            + Ajouter un client
          </a>
        )}
      </div>

      {isMobile && (
        <div style={{position:'fixed',bottom:0,left:0,right:0,background:'rgba(10,10,24,0.95)',borderTop:'1px solid rgba(255,255,255,0.08)',display:'flex',justifyContent:'space-around',padding:'8px 0 20px',zIndex:100,backdropFilter:'blur(20px)'}}>
          {navItems.map(item => (
            <a key={item.href} href={item.href} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'4px',textDecoration:'none',padding:'8px 16px',color:item.active?'#d4af37':'rgba(255,255,255,0.4)',transition:'color 0.2s'}}>
              <span style={{fontSize:'22px'}}>{item.icon}</span>
              <span style={{fontSize:'10px',fontWeight:item.active?'600':'400'}}>{item.label}</span>
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