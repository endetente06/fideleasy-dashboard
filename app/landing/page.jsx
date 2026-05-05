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
      transform: inView ? 'translateY(0)' : 'translateY(40px)',
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`
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
    { q: 'Mes clients doivent-ils télécharger une application ?', a: 'Non ! C\'est le grand avantage de FidelEasy. Vos clients scannent simplement votre QR code et la carte s\'ajoute directement à Apple Wallet ou Google Wallet, déjà installés sur tous les iPhones et Android.' },
    { q: 'Comment mes clients reçoivent-ils les notifications ?', a: 'Une fois la carte ajoutée au wallet, vous pouvez envoyer des notifications push directement depuis votre dashboard. Elles apparaissent sur l\'écran de verrouillage du téléphone, comme un SMS.' },
    { q: 'Puis-je essayer avant de payer ?', a: 'Oui ! Vous pouvez créer un compte gratuitement et tester toutes les fonctionnalités. Aucune carte bancaire requise pour commencer.' },
    { q: 'Comment fonctionne le système de tampons ?', a: 'Vous définissez le nombre de tampons nécessaires pour une récompense (ex: 10 tampons = 1 café offert). À chaque visite, vous tamponnez la carte depuis votre dashboard. Le client voit sa progression en temps réel.' },
    { q: 'Puis-je annuler mon abonnement ?', a: 'Oui, vous pouvez résilier à tout moment depuis votre espace client. Aucun engagement, aucune pénalité. La résiliation prend effet à la fin de la période en cours.' },
    { q: 'FidelEasy fonctionne-t-il pour tous les types de commerces ?', a: 'Absolument ! FidelEasy est utilisé par des cafés, restaurants, boutiques, coiffeurs, et bien d\'autres. Si vous avez des clients réguliers, FidelEasy est fait pour vous.' },
  ];

  return (
    <div style={{background:'#07070f',color:'white',fontFamily:'system-ui,sans-serif',overflowX:'hidden'}}>

      {/* Nav */}
      <nav style={{
        display:'flex',justifyContent:'space-between',alignItems:'center',
        padding:'20px 48px',
        position:'fixed',top:0,left:0,right:0,zIndex:100,
        background: scrollY > 50 ? 'rgba(7,7,15,0.95)' : 'transparent',
        backdropFilter: scrollY > 50 ? 'blur(20px)' : 'none',
        borderBottom: scrollY > 50 ? '1px solid #1e1e35' : 'none',
        transition:'all 0.3s ease'
      }}>
        <h1 style={{fontSize:'22px',fontWeight:'800',margin:0}}>
          Fidel<span style={{color:'#d4af37'}}>Easy</span>
        </h1>
        <div style={{display:'flex',gap:'32px',alignItems:'center'}}>
          <a href="#fonctionnalites" style={{color:'#8080b0',textDecoration:'none',fontSize:'14px'}}>Fonctionnalités</a>
          <a href="#tarifs" style={{color:'#8080b0',textDecoration:'none',fontSize:'14px'}}>Tarifs</a>
          <a href="#faq" style={{color:'#8080b0',textDecoration:'none',fontSize:'14px'}}>FAQ</a>
          <a href="/login" style={{color:'#8080b0',textDecoration:'none',fontSize:'14px'}}>Connexion</a>
          <a href="/register" style={{background:'#d4af37',color:'#07070f',borderRadius:'10px',padding:'10px 20px',textDecoration:'none',fontSize:'14px',fontWeight:'700'}}>
            Essai gratuit →
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:'120px 48px 80px',position:'relative'}}>
        
        {/* Glow background */}
        <div style={{position:'absolute',top:'30%',left:'50%',transform:'translate(-50%,-50%)',width:'600px',height:'600px',background:'radial-gradient(circle,rgba(212,175,55,0.08) 0%,transparent 70%)',pointerEvents:'none'}}/>

        <div style={{
          display:'inline-block',background:'rgba(212,175,55,0.1)',
          border:'1px solid rgba(212,175,55,0.3)',borderRadius:'20px',
          padding:'6px 16px',fontSize:'13px',color:'#d4af37',
          marginBottom:'32px',fontWeight:'600',
          animation:'fadeInDown 0.8s ease'
        }}>
          ✨ La carte de fidélité du 21ème siècle
        </div>

        <h1 style={{
          fontSize:'72px',fontWeight:'800',lineHeight:'1.05',
          marginBottom:'24px',maxWidth:'900px',
          animation:'fadeInUp 0.8s ease 0.2s both'
        }}>
          Fidélisez vos clients<br/>
          <span style={{color:'#d4af37'}}>directement dans leur wallet</span>
        </h1>

        <p style={{
          fontSize:'20px',color:'#8080b0',maxWidth:'600px',
          marginBottom:'48px',lineHeight:'1.8',
          animation:'fadeInUp 0.8s ease 0.4s both'
        }}>
          Remplacez les cartes papier perdues par des cartes numériques dans Apple Wallet et Google Wallet. Vos clients adorent, vous gagnez du temps.
        </p>

        <div style={{display:'flex',gap:'16px',justifyContent:'center',animation:'fadeInUp 0.8s ease 0.6s both'}}>
          <a href="/register" style={{
            background:'#d4af37',color:'#07070f',
            borderRadius:'12px',padding:'16px 36px',
            textDecoration:'none',fontSize:'16px',fontWeight:'800',
            transition:'transform 0.2s, box-shadow 0.2s',
            boxShadow:'0 4px 20px rgba(212,175,55,0.3)'
          }}
          onMouseEnter={e=>{e.target.style.transform='translateY(-2px)';e.target.style.boxShadow='0 8px 30px rgba(212,175,55,0.4)'}}
          onMouseLeave={e=>{e.target.style.transform='translateY(0)';e.target.style.boxShadow='0 4px 20px rgba(212,175,55,0.3)'}}>
            Commencer gratuitement →
          </a>
          <a href="#demo" style={{
            background:'rgba(255,255,255,0.05)',border:'1px solid #2e2e45',
            color:'white',borderRadius:'12px',padding:'16px 36px',
            textDecoration:'none',fontSize:'16px',
            transition:'background 0.2s'
          }}
          onMouseEnter={e=>e.target.style.background='rgba(255,255,255,0.1)'}
          onMouseLeave={e=>e.target.style.background='rgba(255,255,255,0.05)'}>
            ▶ Voir la démo
          </a>
        </div>

        {/* Stats */}
        <div style={{
          display:'flex',gap:'48px',marginTop:'80px',
          padding:'32px 48px',
          background:'rgba(255,255,255,0.03)',
          border:'1px solid #1e1e35',borderRadius:'20px',
          animation:'fadeInUp 0.8s ease 0.8s both',
          flexWrap:'wrap',justifyContent:'center'
        }}>
          {[
            { value: '2 min', label: 'Pour configurer' },
            { value: '0', label: 'App à télécharger' },
            { value: '100%', label: 'iPhone & Android' },
            { value: '3', label: 'Plans disponibles' },
          ].map(s => (
            <div key={s.label} style={{textAlign:'center'}}>
              <p style={{fontSize:'32px',fontWeight:'800',color:'#d4af37',margin:'0 0 4px'}}>{s.value}</p>
              <p style={{fontSize:'13px',color:'#6060a0',margin:0}}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Demo Video */}
      <section id="demo" style={{padding:'100px 48px',background:'#0a0a14'}}>
        <AnimatedSection>
          <h2 style={{textAlign:'center',fontSize:'44px',fontWeight:'800',marginBottom:'16px'}}>
            Voyez FidelEasy en action
          </h2>
          <p style={{textAlign:'center',color:'#8080b0',marginBottom:'48px',fontSize:'18px'}}>
            De l'inscription à la carte wallet en 30 secondes
          </p>
          <div style={{
            maxWidth:'800px',margin:'0 auto',
            background:'#0f0f1c',border:'1px solid #1e1e35',
            borderRadius:'20px',overflow:'hidden',
            boxShadow:'0 20px 60px rgba(0,0,0,0.5)'
          }}>
            {/* Fake browser bar */}
            <div style={{background:'#161625',padding:'12px 16px',display:'flex',alignItems:'center',gap:'8px',borderBottom:'1px solid #1e1e35'}}>
              <div style={{width:'12px',height:'12px',borderRadius:'50%',background:'#ff5f57'}}/>
              <div style={{width:'12px',height:'12px',borderRadius:'50%',background:'#febc2e'}}/>
              <div style={{width:'12px',height:'12px',borderRadius:'50%',background:'#28c840'}}/>
              <div style={{flex:1,background:'#0f0f1c',borderRadius:'6px',padding:'4px 12px',fontSize:'12px',color:'#6060a0',textAlign:'center',marginLeft:'8px'}}>
                fideleasy-dashboard.vercel.app
              </div>
            </div>
            {/* Demo content */}
            <div style={{padding:'48px',textAlign:'center'}}>
              <div style={{fontSize:'64px',marginBottom:'16px'}}>🎬</div>
              <p style={{color:'#6060a0',fontSize:'16px',marginBottom:'24px'}}>Vidéo de démonstration</p>
              <div style={{
                display:'inline-flex',alignItems:'center',gap:'12px',
                background:'rgba(212,175,55,0.1)',border:'1px solid rgba(212,175,55,0.3)',
                borderRadius:'12px',padding:'14px 28px',cursor:'pointer',
                color:'#d4af37',fontWeight:'600',fontSize:'15px'
              }}>
                ▶ Lancer la démo (2 min)
              </div>
              <p style={{color:'#4060a0',fontSize:'13px',marginTop:'16px'}}>Bientôt disponible</p>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Features */}
      <section id="fonctionnalites" style={{padding:'100px 48px'}}>
        <AnimatedSection>
          <h2 style={{textAlign:'center',fontSize:'44px',fontWeight:'800',marginBottom:'16px'}}>
            Tout ce dont vous avez besoin
          </h2>
          <p style={{textAlign:'center',color:'#8080b0',marginBottom:'60px',fontSize:'18px'}}>
            Simple à configurer, puissant à utiliser
          </p>
        </AnimatedSection>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'20px',maxWidth:'1100px',margin:'0 auto'}}>
          {[
            { icon:'💳', title:'Apple & Google Wallet', desc:'Vos clients ajoutent la carte directement dans leur wallet. Pas d\'app, pas de friction.', delay:0 },
            { icon:'🔲', title:'QR Code intelligent', desc:'Un QR code unique par commerce. Imprimez-le et affichez-le à la caisse.', delay:0.1 },
            { icon:'🔔', title:'Notifications push', desc:'Envoyez des offres spéciales directement sur l\'écran de verrouillage de vos clients.', delay:0.2 },
            { icon:'⭐', title:'Tampons digitaux', desc:'Tamponnez les cartes depuis votre dashboard. Le client voit sa progression en temps réel.', delay:0.3 },
            { icon:'📊', title:'Statistiques', desc:'Suivez vos clients actifs, cartes émises et l\'efficacité de vos notifications.', delay:0.4 },
            { icon:'🔒', title:'Sécurisé & RGPD', desc:'Données hébergées en Europe. Conformité RGPD garantie. Vos données vous appartiennent.', delay:0.5 },
          ].map(f => (
            <AnimatedSection key={f.title} delay={f.delay}>
              <div style={{
                background:'#0f0f1c',border:'1px solid #1e1e35',
                borderRadius:'16px',padding:'28px',height:'100%',
                transition:'border-color 0.2s, transform 0.2s',cursor:'default'
              }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(212,175,55,0.4)';e.currentTarget.style.transform='translateY(-4px)'}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='#1e1e35';e.currentTarget.style.transform='translateY(0)'}}>
                <div style={{fontSize:'36px',marginBottom:'16px'}}>{f.icon}</div>
                <h3 style={{fontSize:'18px',fontWeight:'700',marginBottom:'10px'}}>{f.title}</h3>
                <p style={{color:'#8080b0',fontSize:'14px',lineHeight:'1.7',margin:0}}>{f.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Comment ça marche */}
      <section style={{padding:'100px 48px',background:'#0a0a14'}}>
        <AnimatedSection>
          <h2 style={{textAlign:'center',fontSize:'44px',fontWeight:'800',marginBottom:'60px'}}>
            En 4 étapes simples
          </h2>
        </AnimatedSection>

        <div style={{maxWidth:'800px',margin:'0 auto',display:'flex',flexDirection:'column',gap:'0'}}>
          {[
            { num:'01', title:'Créez votre compte', desc:'Inscrivez-vous en 2 minutes. Aucune carte bancaire requise pour commencer.', icon:'👤' },
            { num:'02', title:'Configurez votre carte', desc:'Personnalisez votre carte de fidélité avec le nom de votre commerce.', icon:'🎨' },
            { num:'03', title:'Affichez le QR code', desc:'Imprimez et affichez le QR code à la caisse. Vos clients le scannent pour rejoindre.', icon:'🔲' },
            { num:'04', title:'Fidélisez !', desc:'Tamponnez, envoyez des notifs, regardez vos clients revenir.', icon:'🎉' },
          ].map((step, i) => (
            <AnimatedSection key={step.num} delay={i * 0.15}>
              <div style={{display:'flex',gap:'24px',alignItems:'flex-start',padding:'32px 0',borderBottom: i < 3 ? '1px solid #1e1e35' : 'none'}}>
                <div style={{
                  width:'56px',height:'56px',borderRadius:'16px',
                  background:'rgba(212,175,55,0.1)',border:'1px solid rgba(212,175,55,0.3)',
                  display:'flex',alignItems:'center',justifyContent:'center',
                  fontSize:'24px',flexShrink:0
                }}>{step.icon}</div>
                <div style={{flex:1}}>
                  <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'8px'}}>
                    <span style={{fontSize:'12px',color:'#d4af37',fontWeight:'700'}}>{step.num}</span>
                    <h3 style={{fontSize:'20px',fontWeight:'700',margin:0}}>{step.title}</h3>
                  </div>
                  <p style={{color:'#8080b0',fontSize:'15px',margin:0,lineHeight:'1.7'}}>{step.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="tarifs" style={{padding:'100px 48px'}}>
        <AnimatedSection>
          <h2 style={{textAlign:'center',fontSize:'44px',fontWeight:'800',marginBottom:'16px'}}>
            Tarifs transparents
          </h2>
          <p style={{textAlign:'center',color:'#8080b0',marginBottom:'60px',fontSize:'18px'}}>
            Sans engagement · Résiliable à tout moment
          </p>
        </AnimatedSection>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'24px',maxWidth:'1000px',margin:'0 auto'}}>
          {plans.map((plan, i) => (
            <AnimatedSection key={plan.name} delay={i * 0.1}>
              <div
                onMouseEnter={() => setHoveredPlan(plan.name)}
                onMouseLeave={() => setHoveredPlan(null)}
                style={{
                  background: plan.popular ? 'rgba(212,175,55,0.05)' : '#0f0f1c',
                  border: plan.popular ? '2px solid #d4af37' : hoveredPlan === plan.name ? '1px solid rgba(212,175,55,0.4)' : '1px solid #1e1e35',
                  borderRadius:'20px',padding:'36px',position:'relative',
                  transition:'all 0.2s',
                  transform: hoveredPlan === plan.name ? 'translateY(-4px)' : 'none'
                }}>
                {plan.popular && (
                  <div style={{
                    position:'absolute',top:'-14px',left:'50%',transform:'translateX(-50%)',
                    background:'#d4af37',color:'#07070f',
                    borderRadius:'20px',padding:'4px 20px',
                    fontSize:'12px',fontWeight:'800',whiteSpace:'nowrap'
                  }}>
                    ⭐ Plus populaire
                  </div>
                )}
                <h3 style={{fontSize:'22px',fontWeight:'800',marginBottom:'4px'}}>{plan.name}</h3>
                <p style={{color:'#6060a0',fontSize:'14px',marginBottom:'24px'}}>{plan.desc}</p>
                <div style={{marginBottom:'28px'}}>
                  <span style={{fontSize:'52px',fontWeight:'800',color:'#d4af37'}}>{plan.price}€</span>
                  <span style={{color:'#6060a0',fontSize:'14px'}}>/mois</span>
                </div>
                <a href="/register" style={{
                  display:'block',textAlign:'center',
                  background: plan.popular ? '#d4af37' : 'transparent',
                  color: plan.popular ? '#07070f' : '#d4af37',
                  border: plan.popular ? 'none' : '1px solid rgba(212,175,55,0.4)',
                  borderRadius:'12px',padding:'14px',textDecoration:'none',
                  fontSize:'15px',fontWeight:'700',marginBottom:'28px',
                  transition:'all 0.2s'
                }}>
                  Commencer →
                </a>
                <ul style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:'10px'}}>
                  {plan.features.map(f => (
                    <li key={f} style={{display:'flex',alignItems:'center',gap:'10px',fontSize:'14px',color:'#c0c0d0'}}>
                      <span style={{color:'#d4af37',fontWeight:'800',fontSize:'16px'}}>✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{padding:'100px 48px',background:'#0a0a14'}}>
        <AnimatedSection>
          <h2 style={{textAlign:'center',fontSize:'44px',fontWeight:'800',marginBottom:'16px'}}>
            Questions fréquentes
          </h2>
          <p style={{textAlign:'center',color:'#8080b0',marginBottom:'60px',fontSize:'18px'}}>
            Tout ce que vous voulez savoir
          </p>
        </AnimatedSection>

        <div style={{maxWidth:'720px',margin:'0 auto',display:'flex',flexDirection:'column',gap:'12px'}}>
          {faqs.map((faq, i) => (
            <AnimatedSection key={i} delay={i * 0.05}>
              <div style={{
                background:'#0f0f1c',border:'1px solid',
                borderColor: openFaq === i ? 'rgba(212,175,55,0.4)' : '#1e1e35',
                borderRadius:'14px',overflow:'hidden',transition:'border-color 0.2s'
              }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                  width:'100%',display:'flex',justifyContent:'space-between',
                  alignItems:'center',padding:'20px 24px',
                  background:'transparent',border:'none',color:'white',
                  cursor:'pointer',textAlign:'left',gap:'16px'
                }}>
                  <span style={{fontSize:'15px',fontWeight:'600'}}>{faq.q}</span>
                  <span style={{
                    color:'#d4af37',fontSize:'20px',flexShrink:0,
                    transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)',
                    transition:'transform 0.3s'
                  }}>+</span>
                </button>
                <div style={{
                  maxHeight: openFaq === i ? '200px' : '0',
                  overflow:'hidden',transition:'max-height 0.4s ease'
                }}>
                  <p style={{padding:'0 24px 20px',color:'#8080b0',fontSize:'14px',lineHeight:'1.8',margin:0}}>
                    {faq.a}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section style={{padding:'120px 48px',textAlign:'center',position:'relative'}}>
        <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:'500px',height:'500px',background:'radial-gradient(circle,rgba(212,175,55,0.06) 0%,transparent 70%)',pointerEvents:'none'}}/>
        <AnimatedSection>
          <h2 style={{fontSize:'56px',fontWeight:'800',marginBottom:'20px',lineHeight:'1.1'}}>
            Prêt à moderniser<br/>votre fidélité ?
          </h2>
          <p style={{color:'#8080b0',fontSize:'18px',marginBottom:'48px',maxWidth:'500px',margin:'0 auto 48px'}}>
            Rejoignez les commerçants qui ont dit adieu aux cartes papier
          </p>
          <a href="/register" style={{
            display:'inline-block',
            background:'#d4af37',color:'#07070f',
            borderRadius:'14px',padding:'20px 56px',
            textDecoration:'none',fontSize:'18px',fontWeight:'800',
            boxShadow:'0 8px 40px rgba(212,175,55,0.3)',
            transition:'transform 0.2s, box-shadow 0.2s'
          }}
          onMouseEnter={e=>{e.target.style.transform='translateY(-3px)';e.target.style.boxShadow='0 12px 50px rgba(212,175,55,0.5)'}}
          onMouseLeave={e=>{e.target.style.transform='translateY(0)';e.target.style.boxShadow='0 8px 40px rgba(212,175,55,0.3)'}}>
            Créer mon compte gratuitement →
          </a>
          <p style={{color:'#4060a0',fontSize:'13px',marginTop:'16px'}}>Aucune carte bancaire requise</p>
        </AnimatedSection>
      </section>

      {/* Footer */}
      <footer style={{borderTop:'1px solid #1e1e35',padding:'40px 48px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'16px'}}>
        <span style={{fontWeight:'800',fontSize:'18px'}}>Fidel<span style={{color:'#d4af37'}}>Easy</span></span>
        <div style={{display:'flex',gap:'32px'}}>
          <a href="/legal" style={{color:'#6060a0',textDecoration:'none',fontSize:'13px'}}>Mentions légales</a>
          <a href="/legal" style={{color:'#6060a0',textDecoration:'none',fontSize:'13px'}}>CGV</a>
          <a href="/legal" style={{color:'#6060a0',textDecoration:'none',fontSize:'13px'}}>Confidentialité</a>
        </div>
        <span style={{color:'#6060a0',fontSize:'13px'}}>© 2026 FidelEasy — Antibes, France</span>
      </footer>

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </div>
  );
}