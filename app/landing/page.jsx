"use client";
import { useState, useEffect, useRef } from 'react';

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, { threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

function AnimatedSection({ children, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(30px)',
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`
    }}>
      {children}
    </div>
  );
}

export default function Landing() {
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const plans = [
    { name: 'Starter', price: '19', desc: 'Pour démarrer', features: ['100 clients', '1 commerce', 'Apple & Google Wallet', 'QR Code', 'Notifications push'] },
    { name: 'Pro', price: '49', desc: 'Le plus populaire', features: ['500 clients', '3 commerces', 'Apple & Google Wallet', 'QR Code', 'Notifications push', 'Stats avancées'], popular: true },
    { name: 'Business', price: '99', desc: 'Sans limites', features: ['Clients illimités', 'Commerces illimités', 'Apple & Google Wallet', 'QR Code', 'Notifications push', 'Stats avancées', 'Support prioritaire'] },
  ];

  const faqs = [
    { q: 'Mes clients doivent-ils télécharger une application ?', a: 'Non ! Vos clients scannent simplement votre QR code et la carte s\'ajoute directement à Apple Wallet ou Google Wallet, déjà installés sur tous les smartphones.' },
    { q: 'Comment mes clients reçoivent-ils les notifications ?', a: 'Une fois la carte ajoutée au wallet, vous pouvez envoyer des notifications push directement depuis votre dashboard. Elles apparaissent sur l\'écran de verrouillage.' },
    { q: 'Puis-je essayer avant de payer ?', a: 'Oui ! Créez un compte gratuitement et testez toutes les fonctionnalités. Aucune carte bancaire requise pour commencer.' },
    { q: 'Comment fonctionne le système de tampons ?', a: 'Vous définissez le nombre de tampons pour une récompense. À chaque visite, vous tamponnez depuis votre dashboard. Le client voit sa progression en temps réel.' },
    { q: 'Puis-je annuler mon abonnement ?', a: 'Oui, résiliation à tout moment depuis votre espace client. Aucun engagement, aucune pénalité.' },
    { q: 'FidelEasy fonctionne-t-il pour tous les types de commerces ?', a: 'Absolument ! Cafés, restaurants, boutiques, coiffeurs... Si vous avez des clients réguliers, FidelEasy est fait pour vous.' },
  ];

  return (
    <div style={{background:'#ffffff',color:'#1a1a2e',fontFamily:'system-ui,-apple-system,sans-serif',overflowX:'hidden'}}>

      {/* Nav */}
      <nav style={{
        display:'flex',justifyContent:'space-between',alignItems:'center',
        padding:'0 48px',height:'64px',
        position:'fixed',top:0,left:0,right:0,zIndex:100,
        background: scrollY > 20 ? 'rgba(255,255,255,0.95)' : 'transparent',
        backdropFilter: scrollY > 20 ? 'blur(20px)' : 'none',
        borderBottom: scrollY > 20 ? '1px solid #f0f0f5' : 'none',
        transition:'all 0.3s ease'
      }}>
        <h1 style={{fontSize:'20px',fontWeight:'800',margin:0,color:'#1a1a2e'}}>
          Fidel<span style={{color:'#d4af37'}}>Easy</span>
        </h1>
        <div style={{display:'flex',gap:'32px',alignItems:'center'}}>
          <a href="#fonctionnalites" style={{color:'#6060a0',textDecoration:'none',fontSize:'14px',fontWeight:'500'}}>Fonctionnalités</a>
          <a href="#tarifs" style={{color:'#6060a0',textDecoration:'none',fontSize:'14px',fontWeight:'500'}}>Tarifs</a>
          <a href="#faq" style={{color:'#6060a0',textDecoration:'none',fontSize:'14px',fontWeight:'500'}}>FAQ</a>
          <a href="/login" style={{color:'#1a1a2e',textDecoration:'none',fontSize:'14px',fontWeight:'600'}}>Connexion</a>
          <a href="/register" style={{
            background:'#d4af37',color:'white',
            borderRadius:'10px',padding:'9px 20px',
            textDecoration:'none',fontSize:'14px',fontWeight:'700'
          }}>
            Essai gratuit
          </a>
        </div>
      </nav>

      {/* Hero */}
<section style={{
  minHeight:'100vh',display:'flex',flexDirection:'column',
  alignItems:'center',justifyContent:'center',
  textAlign:'center',padding:'120px 24px 80px',
  background:'linear-gradient(135deg,#0a0a18 0%,#1a1020 50%,#0a1020 100%)',
  position:'relative',overflow:'hidden'
}}>
  {/* Formes animées fond */}
  <div style={{position:'absolute',inset:0,pointerEvents:'none'}}>
    <div style={{position:'absolute',top:'10%',left:'5%',width:'300px',height:'300px',borderRadius:'50%',background:'rgba(212,175,55,0.06)',animation:'float1 8s ease-in-out infinite'}}/>
    <div style={{position:'absolute',top:'60%',right:'5%',width:'200px',height:'200px',borderRadius:'50%',background:'rgba(212,175,55,0.04)',animation:'float2 10s ease-in-out infinite'}}/>
    <div style={{position:'absolute',top:'30%',right:'15%',width:'100px',height:'100px',borderRadius:'50%',background:'rgba(255,255,255,0.02)',animation:'float3 6s ease-in-out infinite'}}/>
  </div>

  {/* Carte Apple Wallet flottante gauche */}
  <div style={{
    position:'absolute',left:'5%',top:'25%',
    width:'200px',background:'linear-gradient(135deg,#1a1a2e,#2a1a3e)',
    borderRadius:'16px',padding:'20px',
    border:'1px solid rgba(212,175,55,0.3)',
    boxShadow:'0 20px 60px rgba(0,0,0,0.5)',
    animation:'floatCard1 7s ease-in-out infinite',
    backdropFilter:'blur(10px)'
  }}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
      <span style={{fontSize:'11px',color:'rgba(255,255,255,0.6)',fontWeight:'600'}}>FidelEasy</span>
      <span style={{fontSize:'18px'}}>🍎</span>
    </div>
    <div style={{fontSize:'24px',fontWeight:'800',color:'#d4af37',marginBottom:'4px'}}>7</div>
    <div style={{fontSize:'11px',color:'rgba(255,255,255,0.5)'}}>Tampons</div>
    <div style={{marginTop:'12px',display:'flex',gap:'4px'}}>
      {[...Array(10)].map((_,i) => (
        <div key={i} style={{width:'14px',height:'14px',borderRadius:'50%',background: i < 7 ? '#d4af37' : 'rgba(255,255,255,0.1)'}}/>
      ))}
    </div>
    <div style={{marginTop:'12px',fontSize:'11px',color:'rgba(255,255,255,0.4)'}}>Sophie Martin</div>
  </div>

  {/* Carte Google Wallet flottante droite */}
  <div style={{
    position:'absolute',right:'5%',top:'30%',
    width:'190px',background:'linear-gradient(135deg,#0f1a2e,#1a2a1e)',
    borderRadius:'16px',padding:'20px',
    border:'1px solid rgba(34,197,94,0.3)',
    boxShadow:'0 20px 60px rgba(0,0,0,0.5)',
    animation:'floatCard2 9s ease-in-out infinite',
  }}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
      <span style={{fontSize:'11px',color:'rgba(255,255,255,0.6)',fontWeight:'600'}}>FidelEasy</span>
      <span style={{fontSize:'18px'}}>🟢</span>
    </div>
    <div style={{fontSize:'24px',fontWeight:'800',color:'#22c55e',marginBottom:'4px'}}>120</div>
    <div style={{fontSize:'11px',color:'rgba(255,255,255,0.5)'}}>Points</div>
    <div style={{marginTop:'12px',background:'rgba(34,197,94,0.2)',borderRadius:'8px',padding:'6px 10px',fontSize:'11px',color:'#22c55e',fontWeight:'600'}}>
      🎁 Récompense proche !
    </div>
    <div style={{marginTop:'8px',fontSize:'11px',color:'rgba(255,255,255,0.4)'}}>Marc Dubois</div>
  </div>

  {/* Notification flottante */}
  <div style={{
    position:'absolute',right:'8%',top:'12%',
    width:'220px',background:'rgba(255,255,255,0.95)',
    borderRadius:'14px',padding:'12px 16px',
    boxShadow:'0 10px 40px rgba(0,0,0,0.3)',
    animation:'floatCard3 6s ease-in-out infinite',
  }}>
    <div style={{display:'flex',gap:'10px',alignItems:'center'}}>
      <div style={{width:'32px',height:'32px',borderRadius:'8px',background:'#d4af37',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'16px'}}>☕</div>
      <div>
        <div style={{fontSize:'12px',fontWeight:'700',color:'#1a1a2e'}}>Café de la Plage</div>
        <div style={{fontSize:'11px',color:'#6060a0'}}>🎉 -20% ce weekend !</div>
      </div>
    </div>
  </div>

  {/* QR Code flottant bas gauche */}
  <div style={{
    position:'absolute',left:'8%',bottom:'20%',
    width:'100px',height:'100px',
    background:'white',borderRadius:'12px',padding:'8px',
    boxShadow:'0 10px 30px rgba(0,0,0,0.3)',
    animation:'floatCard4 11s ease-in-out infinite',
    display:'flex',alignItems:'center',justifyContent:'center',
    fontSize:'64px'
  }}>
    🔲
  </div>

  {/* Contenu hero */}
  <div style={{position:'relative',zIndex:10}}>
    <div style={{
      display:'inline-block',
      background:'rgba(212,175,55,0.15)',
      border:'1px solid rgba(212,175,55,0.4)',
      borderRadius:'20px',padding:'6px 16px',
      fontSize:'13px',color:'#d4af37',
      marginBottom:'28px',fontWeight:'600',
      animation:'fadeInDown 0.6s ease'
    }}>
      ✨ La fidélité numérique pour votre commerce
    </div>

    <h1 style={{
      fontSize:'64px',fontWeight:'800',lineHeight:'1.05',
      marginBottom:'24px',maxWidth:'800px',color:'white',
      animation:'fadeInUp 0.7s ease 0.1s both'
    }}>
      Fidélisez vos clients<br/>
      <span style={{color:'#d4af37'}}>sans carte papier</span>
    </h1>

    <p style={{
      fontSize:'20px',color:'rgba(255,255,255,0.6)',maxWidth:'560px',
      marginBottom:'48px',lineHeight:'1.8',
      animation:'fadeInUp 0.7s ease 0.2s both'
    }}>
      Vos clients reçoivent une carte de fidélité directement dans leur Apple Wallet ou Google Wallet. Simple, rapide, moderne.
    </p>

    <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap',animation:'fadeInUp 0.7s ease 0.3s both'}}>
      <a href="/register" style={{
        background:'#d4af37',color:'white',
        borderRadius:'12px',padding:'15px 32px',
        textDecoration:'none',fontSize:'16px',fontWeight:'700',
        boxShadow:'0 4px 20px rgba(212,175,55,0.4)',
        transition:'transform 0.2s,box-shadow 0.2s'
      }}
      onMouseEnter={e=>{e.target.style.transform='translateY(-2px)';e.target.style.boxShadow='0 8px 30px rgba(212,175,55,0.5)'}}
      onMouseLeave={e=>{e.target.style.transform='translateY(0)';e.target.style.boxShadow='0 4px 20px rgba(212,175,55,0.4)'}}>
        Commencer gratuitement →
      </a>
      <a href="#fonctionnalites" style={{
        background:'rgba(255,255,255,0.08)',color:'white',
        border:'1px solid rgba(255,255,255,0.15)',
        borderRadius:'12px',padding:'15px 32px',
        textDecoration:'none',fontSize:'16px',
        transition:'background 0.2s'
      }}
      onMouseEnter={e=>e.target.style.background='rgba(255,255,255,0.15)'}
      onMouseLeave={e=>e.target.style.background='rgba(255,255,255,0.08)'}>
        Voir comment ça marche
      </a>
    </div>

    {/* Stats */}
    <div style={{
      display:'flex',gap:'40px',marginTop:'72px',
      padding:'24px 48px',
      background:'rgba(255,255,255,0.05)',
      border:'1px solid rgba(255,255,255,0.1)',borderRadius:'20px',
      animation:'fadeInUp 0.7s ease 0.5s both',
      flexWrap:'wrap',justifyContent:'center',
      backdropFilter:'blur(10px)'
    }}>
      {[
        { value:'2 min', label:'Pour configurer' },
        { value:'0', label:'App à télécharger' },
        { value:'100%', label:'iPhone & Android' },
        { value:'3', label:'Plans disponibles' },
      ].map(s => (
        <div key={s.label} style={{textAlign:'center'}}>
          <p style={{fontSize:'28px',fontWeight:'800',color:'#d4af37',margin:'0 0 2px'}}>{s.value}</p>
          <p style={{fontSize:'12px',color:'rgba(255,255,255,0.4)',margin:0}}>{s.label}</p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Logos / Social proof */}
      <section style={{padding:'40px 48px',background:'#f8f8fc',borderTop:'1px solid #f0f0f5',borderBottom:'1px solid #f0f0f5',textAlign:'center'}}>
        <p style={{color:'#9090b0',fontSize:'13px',fontWeight:'600',letterSpacing:'0.5px',textTransform:'uppercase',margin:'0 0 24px'}}>
          Compatible avec
        </p>
        <div style={{display:'flex',justifyContent:'center',gap:'48px',alignItems:'center',flexWrap:'wrap'}}>
          {['🍎 Apple Wallet','🟢 Google Wallet','🔔 Notifications Push','📱 iOS & Android'].map(item => (
            <span key={item} style={{fontSize:'15px',color:'#4040a0',fontWeight:'600'}}>{item}</span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="fonctionnalites" style={{padding:'100px 48px',background:'white'}}>
        <AnimatedSection>
          <h2 style={{textAlign:'center',fontSize:'42px',fontWeight:'800',marginBottom:'12px',color:'#1a1a2e'}}>
            Tout ce dont vous avez besoin
          </h2>
          <p style={{textAlign:'center',color:'#9090b0',marginBottom:'60px',fontSize:'18px'}}>
            Simple à configurer, puissant à utiliser
          </p>
        </AnimatedSection>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'20px',maxWidth:'1100px',margin:'0 auto'}}>
          {[
            { icon:'💳', title:'Apple & Google Wallet', desc:'Vos clients ajoutent la carte directement dans leur wallet. Pas d\'app, pas de friction.', delay:0 },
            { icon:'🔲', title:'QR Code intelligent', desc:'Un QR code unique par commerce. Imprimez-le et affichez-le à la caisse.', delay:0.1 },
            { icon:'🔔', title:'Notifications push', desc:'Envoyez des offres spéciales directement sur l\'écran de verrouillage.', delay:0.2 },
            { icon:'⭐', title:'Tampons digitaux', desc:'Tamponnez les cartes depuis votre dashboard. Le client voit sa progression.', delay:0.3 },
            { icon:'📊', title:'Statistiques', desc:'Suivez vos clients actifs, cartes émises et l\'efficacité de vos notifications.', delay:0.4 },
            { icon:'🔒', title:'Sécurisé & RGPD', desc:'Données hébergées en Europe. Conformité RGPD garantie.', delay:0.5 },
          ].map(f => (
            <AnimatedSection key={f.title} delay={f.delay}>
              <div style={{
                background:'#fafafa',border:'1.5px solid #f0f0f5',
                borderRadius:'16px',padding:'28px',
                transition:'border-color 0.2s,transform 0.2s,box-shadow 0.2s',cursor:'default'
              }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='#d4af37';e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow='0 8px 30px rgba(212,175,55,0.12)'}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='#f0f0f5';e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none'}}>
                <div style={{fontSize:'32px',marginBottom:'14px'}}>{f.icon}</div>
                <h3 style={{fontSize:'17px',fontWeight:'700',marginBottom:'8px',color:'#1a1a2e'}}>{f.title}</h3>
                <p style={{color:'#9090b0',fontSize:'14px',lineHeight:'1.7',margin:0}}>{f.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Comment ça marche */}
      <section style={{padding:'100px 48px',background:'#fafaf7'}}>
        <AnimatedSection>
          <h2 style={{textAlign:'center',fontSize:'42px',fontWeight:'800',marginBottom:'60px',color:'#1a1a2e'}}>
            En 4 étapes simples
          </h2>
        </AnimatedSection>

        <div style={{maxWidth:'720px',margin:'0 auto'}}>
          {[
            { num:'01', title:'Créez votre compte', desc:'Inscrivez-vous en 2 minutes. Aucune carte bancaire requise.', icon:'👤' },
            { num:'02', title:'Configurez votre carte', desc:'Personnalisez votre carte de fidélité avec le nom de votre commerce.', icon:'🎨' },
            { num:'03', title:'Affichez le QR code', desc:'Imprimez et affichez le QR code à la caisse. Vos clients le scannent.', icon:'🔲' },
            { num:'04', title:'Fidélisez !', desc:'Tamponnez, envoyez des notifs, regardez vos clients revenir.', icon:'🎉' },
          ].map((step, i) => (
            <AnimatedSection key={step.num} delay={i * 0.12}>
              <div style={{display:'flex',gap:'20px',alignItems:'flex-start',padding:'28px 0',borderBottom: i < 3 ? '1px solid #f0f0f5' : 'none'}}>
                <div style={{
                  width:'52px',height:'52px',borderRadius:'14px',
                  background:'rgba(212,175,55,0.1)',border:'1.5px solid rgba(212,175,55,0.3)',
                  display:'flex',alignItems:'center',justifyContent:'center',
                  fontSize:'22px',flexShrink:0
                }}>{step.icon}</div>
                <div>
                  <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'6px'}}>
                    <span style={{fontSize:'11px',color:'#d4af37',fontWeight:'800',letterSpacing:'0.5px'}}>{step.num}</span>
                    <h3 style={{fontSize:'18px',fontWeight:'700',margin:0,color:'#1a1a2e'}}>{step.title}</h3>
                  </div>
                  <p style={{color:'#9090b0',fontSize:'15px',margin:0,lineHeight:'1.7'}}>{step.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Demo */}
      <section id="demo" style={{padding:'100px 48px',background:'white'}}>
        <AnimatedSection>
          <h2 style={{textAlign:'center',fontSize:'42px',fontWeight:'800',marginBottom:'12px',color:'#1a1a2e'}}>
            Voyez FidelEasy en action
          </h2>
          <p style={{textAlign:'center',color:'#9090b0',marginBottom:'48px',fontSize:'18px'}}>
            De l'inscription à la carte wallet en 30 secondes
          </p>
          <div style={{
            maxWidth:'760px',margin:'0 auto',
            background:'#f8f8fc',border:'1.5px solid #f0f0f5',
            borderRadius:'20px',overflow:'hidden',
            boxShadow:'0 8px 40px rgba(0,0,0,0.08)'
          }}>
            <div style={{background:'#f0f0f5',padding:'12px 16px',display:'flex',alignItems:'center',gap:'8px'}}>
              <div style={{width:'11px',height:'11px',borderRadius:'50%',background:'#ff5f57'}}/>
              <div style={{width:'11px',height:'11px',borderRadius:'50%',background:'#febc2e'}}/>
              <div style={{width:'11px',height:'11px',borderRadius:'50%',background:'#28c840'}}/>
              <div style={{flex:1,background:'white',borderRadius:'6px',padding:'4px 12px',fontSize:'12px',color:'#9090b0',textAlign:'center',marginLeft:'8px'}}>
                fideleasy-dashboard.vercel.app
              </div>
            </div>
            <div style={{padding:'60px',textAlign:'center'}}>
              <div style={{fontSize:'56px',marginBottom:'16px'}}>🎬</div>
              <p style={{color:'#9090b0',fontSize:'15px',marginBottom:'20px'}}>Vidéo de démonstration</p>
              <div style={{
                display:'inline-flex',alignItems:'center',gap:'10px',
                background:'rgba(212,175,55,0.1)',border:'1px solid rgba(212,175,55,0.3)',
                borderRadius:'10px',padding:'12px 24px',cursor:'pointer',
                color:'#b8960a',fontWeight:'600',fontSize:'14px'
              }}>
                ▶ Lancer la démo (2 min)
              </div>
              <p style={{color:'#c0c0d0',fontSize:'12px',marginTop:'12px'}}>Bientôt disponible</p>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Pricing */}
      <section id="tarifs" style={{padding:'100px 48px',background:'#fafaf7'}}>
        <AnimatedSection>
          <h2 style={{textAlign:'center',fontSize:'42px',fontWeight:'800',marginBottom:'12px',color:'#1a1a2e'}}>
            Tarifs simples
          </h2>
          <p style={{textAlign:'center',color:'#9090b0',marginBottom:'60px',fontSize:'18px'}}>
            Sans engagement · Résiliable à tout moment
          </p>
        </AnimatedSection>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'20px',maxWidth:'1000px',margin:'0 auto'}}>
          {plans.map((plan, i) => (
            <AnimatedSection key={plan.name} delay={i * 0.1}>
              <div
                onMouseEnter={() => setHoveredPlan(plan.name)}
                onMouseLeave={() => setHoveredPlan(null)}
                style={{
                  background: plan.popular ? 'white' : 'white',
                  border: plan.popular ? '2px solid #d4af37' : hoveredPlan === plan.name ? '1.5px solid #d4af37' : '1.5px solid #f0f0f5',
                  borderRadius:'20px',padding:'36px',position:'relative',
                  transition:'all 0.2s',
                  transform: hoveredPlan === plan.name ? 'translateY(-4px)' : 'none',
                  boxShadow: plan.popular ? '0 8px 40px rgba(212,175,55,0.15)' : hoveredPlan === plan.name ? '0 8px 30px rgba(0,0,0,0.08)' : 'none'
                }}>
                {plan.popular && (
                  <div style={{
                    position:'absolute',top:'-14px',left:'50%',transform:'translateX(-50%)',
                    background:'#d4af37',color:'white',
                    borderRadius:'20px',padding:'4px 20px',
                    fontSize:'12px',fontWeight:'800',whiteSpace:'nowrap'
                  }}>
                    ⭐ Le plus populaire
                  </div>
                )}
                <h3 style={{fontSize:'20px',fontWeight:'800',marginBottom:'4px',color:'#1a1a2e'}}>{plan.name}</h3>
                <p style={{color:'#9090b0',fontSize:'13px',marginBottom:'20px'}}>{plan.desc}</p>
                <div style={{marginBottom:'24px'}}>
                  <span style={{fontSize:'48px',fontWeight:'800',color:'#d4af37'}}>{plan.price}€</span>
                  <span style={{color:'#9090b0',fontSize:'14px'}}>/mois</span>
                </div>
                <a href="/register" style={{
                  display:'block',textAlign:'center',
                  background: plan.popular ? '#d4af37' : 'transparent',
                  color: plan.popular ? 'white' : '#d4af37',
                  border: plan.popular ? 'none' : '1.5px solid rgba(212,175,55,0.5)',
                  borderRadius:'10px',padding:'12px',textDecoration:'none',
                  fontSize:'14px',fontWeight:'700',marginBottom:'24px',
                }}>
                  Commencer →
                </a>
                <ul style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:'8px'}}>
                  {plan.features.map(f => (
                    <li key={f} style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'14px',color:'#4040a0'}}>
                      <span style={{color:'#d4af37',fontWeight:'800'}}>✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{padding:'100px 48px',background:'white'}}>
        <AnimatedSection>
          <h2 style={{textAlign:'center',fontSize:'42px',fontWeight:'800',marginBottom:'12px',color:'#1a1a2e'}}>
            Questions fréquentes
          </h2>
          <p style={{textAlign:'center',color:'#9090b0',marginBottom:'60px',fontSize:'18px'}}>
            Tout ce que vous voulez savoir
          </p>
        </AnimatedSection>

        <div style={{maxWidth:'680px',margin:'0 auto',display:'flex',flexDirection:'column',gap:'10px'}}>
          {faqs.map((faq, i) => (
            <AnimatedSection key={i} delay={i * 0.05}>
              <div style={{
                background:'#fafafa',
                border:'1.5px solid',
                borderColor: openFaq === i ? '#d4af37' : '#f0f0f5',
                borderRadius:'12px',overflow:'hidden',
                transition:'border-color 0.2s'
              }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                  width:'100%',display:'flex',justifyContent:'space-between',
                  alignItems:'center',padding:'18px 22px',
                  background:'transparent',border:'none',
                  color:'#1a1a2e',cursor:'pointer',textAlign:'left',gap:'16px'
                }}>
                  <span style={{fontSize:'15px',fontWeight:'600'}}>{faq.q}</span>
                  <span style={{
                    color:'#d4af37',fontSize:'22px',flexShrink:0,
                    transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)',
                    transition:'transform 0.3s',lineHeight:1
                  }}>+</span>
                </button>
                <div style={{
                  maxHeight: openFaq === i ? '200px' : '0',
                  overflow:'hidden',transition:'max-height 0.4s ease'
                }}>
                  <p style={{padding:'0 22px 18px',color:'#9090b0',fontSize:'14px',lineHeight:'1.8',margin:0}}>
                    {faq.a}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section style={{padding:'120px 48px',textAlign:'center',background:'#fafaf7'}}>
        <AnimatedSection>
          <h2 style={{fontSize:'52px',fontWeight:'800',marginBottom:'20px',lineHeight:'1.1',color:'#1a1a2e'}}>
            Prêt à moderniser<br/>votre fidélité ?
          </h2>
          <p style={{color:'#9090b0',fontSize:'18px',marginBottom:'48px',maxWidth:'480px',margin:'0 auto 48px'}}>
            Rejoignez les commerçants qui ont dit adieu aux cartes papier
          </p>
          <a href="/register" style={{
            display:'inline-block',
            background:'#d4af37',color:'white',
            borderRadius:'14px',padding:'18px 52px',
            textDecoration:'none',fontSize:'17px',fontWeight:'800',
            boxShadow:'0 6px 30px rgba(212,175,55,0.35)',
            transition:'transform 0.2s,box-shadow 0.2s'
          }}
          onMouseEnter={e=>{e.target.style.transform='translateY(-2px)';e.target.style.boxShadow='0 10px 40px rgba(212,175,55,0.5)'}}
          onMouseLeave={e=>{e.target.style.transform='translateY(0)';e.target.style.boxShadow='0 6px 30px rgba(212,175,55,0.35)'}}>
            Créer mon compte gratuitement →
          </a>
          <p style={{color:'#c0c0d0',fontSize:'13px',marginTop:'16px'}}>Aucune carte bancaire requise</p>
        </AnimatedSection>
      </section>

      {/* Footer */}
      <footer style={{borderTop:'1px solid #f0f0f5',padding:'36px 48px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'16px',background:'white'}}>
        <span style={{fontWeight:'800',fontSize:'18px',color:'#1a1a2e'}}>Fidel<span style={{color:'#d4af37'}}>Easy</span></span>
        <div style={{display:'flex',gap:'28px'}}>
          <a href="/legal" style={{color:'#9090b0',textDecoration:'none',fontSize:'13px'}}>Mentions légales</a>
          <a href="/legal" style={{color:'#9090b0',textDecoration:'none',fontSize:'13px'}}>CGV</a>
          <a href="/legal" style={{color:'#9090b0',textDecoration:'none',fontSize:'13px'}}>Confidentialité</a>
        </div>
        <span style={{color:'#c0c0c0',fontSize:'13px'}}>© 2026 FidelEasy — Antibes, France</span>
      </footer>

    <style>{`
  @keyframes fadeInDown {
    from { opacity:0; transform:translateY(-20px); }
    to { opacity:1; transform:translateY(0); }
  }
  @keyframes fadeInUp {
    from { opacity:0; transform:translateY(25px); }
    to { opacity:1; transform:translateY(0); }
  }
  @keyframes float1 {
    0%,100% { transform:translateY(0) scale(1); }
    50% { transform:translateY(-30px) scale(1.05); }
  }
  @keyframes float2 {
    0%,100% { transform:translateY(0); }
    50% { transform:translateY(20px); }
  }
  @keyframes float3 {
    0%,100% { transform:translateY(0) rotate(0deg); }
    50% { transform:translateY(-15px) rotate(10deg); }
  }
  @keyframes floatCard1 {
    0%,100% { transform:translateY(0) rotate(-3deg); }
    50% { transform:translateY(-20px) rotate(-1deg); }
  }
  @keyframes floatCard2 {
    0%,100% { transform:translateY(0) rotate(2deg); }
    50% { transform:translateY(-25px) rotate(4deg); }
  }
  @keyframes floatCard3 {
    0%,100% { transform:translateY(0) rotate(1deg); }
    50% { transform:translateY(-15px) rotate(-1deg); }
  }
  @keyframes floatCard4 {
    0%,100% { transform:translateY(0) rotate(-5deg); }
    50% { transform:translateY(-20px) rotate(-2deg); }
  }
  * { box-sizing: border-box; }
  @media (max-width: 768px) {
    nav { padding: 0 20px !important; }
    section { padding: 60px 20px !important; }
    h1 { font-size: 36px !important; }
    h2 { font-size: 28px !important; }
  }
`}</style>
</div>
  );
}