"use client";
import { useState } from 'react';

const PHOTOS = {
  hero: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
  qrcode: 'https://images.unsplash.com/photo-1622050756792-5b1180bbb873?w=800&q=80',
  wallet: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=800&q=80',
  notif: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80',
  dashboard: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  cafe: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&q=80',
  client: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
boutique: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80',
commerce: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
};
export default function Landing() {
  const [billing, setBilling] = useState('monthly');
  const [faqOpen, setFaqOpen] = useState(null);
  const [formData, setFormData] = useState({ name: '', business: '', email: '', phone: '' });
  const [formSent, setFormSent] = useState(false);

  const plans = [
    {
      name: 'Starter',
      monthlyPrice: 19,
      yearlyPrice: 16,
      features: ['100 clients max', '1 commerce', 'Apple & Google Wallet', 'QR Code', 'Notifications push', 'Dashboard analytics'],
      cta: 'Commencer gratuitement',
      popular: false,
    },
    {
      name: 'Pro',
      monthlyPrice: 49,
      yearlyPrice: 41,
      features: ['500 clients max', '3 commerces', 'Apple & Google Wallet', 'QR Code', 'Notifications push', 'Carte personnalisée avec photo', 'Support prioritaire'],
      cta: 'Commencer gratuitement',
      popular: true,
    },
    {
      name: 'Business',
      monthlyPrice: 99,
      yearlyPrice: 82,
      features: ['Clients illimités', 'Commerces illimités', 'Apple & Google Wallet', 'QR Code', 'Notifications push', 'Carte personnalisée avec photo', 'Support prioritaire 24/7', 'API access'],
      cta: 'Contacter les ventes',
      popular: false,
    },
  ];

  const faqs = [
    { q: 'Mes clients doivent-ils télécharger une app ?', a: 'Non ! Vos clients scannent simplement votre QR code et la carte s\'ajoute directement dans Apple Wallet ou Google Wallet, déjà installé sur leur téléphone.' },
    { q: 'Comment fonctionne le tampon digital ?', a: 'Depuis votre dashboard, vous cliquez sur le profil de votre client pour lui ajouter un tampon. Simple et rapide !' },
    { q: 'Puis-je personnaliser ma carte de fidélité ?', a: 'Oui ! Couleur, icône, nom du commerce, photo... Tout est personnalisable depuis vos réglages.' },
    { q: 'Puis-je changer de plan à tout moment ?', a: 'Oui, sans engagement. Vous pouvez upgrader ou downgrader votre plan à tout moment.' },
    { q: 'Les notifications push sont-elles incluses ?', a: 'Oui ! Envoyez des offres et messages à tous vos clients directement sur leur écran depuis votre dashboard.' },
    { q: 'Y a-t-il un essai gratuit ?', a: 'Oui ! 14 jours d\'essai gratuit sans carte bancaire. Aucun engagement.' },
  ];

  return (
    <div style={{fontFamily:'system-ui,-apple-system,sans-serif',background:'#faf9f6',color:'#1a1a1a',overflowX:'hidden'}}>

      {/* NAVBAR */}
      <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:100,background:'rgba(250,249,246,0.95)',backdropFilter:'blur(20px)',borderBottom:'1px solid rgba(0,0,0,0.06)',padding:'0 24px',height:'64px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <a href="/landing" style={{textDecoration:'none'}}>
          <span style={{fontSize:'22px',fontWeight:'800',color:'#1a1a1a'}}>Fidel<span style={{color:'#d4af37'}}>Easy</span></span>
        </a>
        <div style={{display:'flex',gap:'12px',alignItems:'center'}}>
          <a href="#pricing" style={{fontSize:'14px',fontWeight:'500',color:'#666',textDecoration:'none',padding:'8px 16px',display:'none'}}>Tarifs</a>
          <a href="/login" style={{fontSize:'14px',fontWeight:'500',color:'#666',textDecoration:'none',padding:'8px 16px'}}>Connexion</a>
          <a href="/register" style={{fontSize:'14px',fontWeight:'700',color:'white',textDecoration:'none',padding:'10px 20px',background:'#1a1a1a',borderRadius:'50px'}}>Essai gratuit</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{paddingTop:'64px',position:'relative',minHeight:'90vh',display:'flex',alignItems:'center',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,backgroundImage:`url(${PHOTOS.cafe})`,backgroundSize:'cover',backgroundPosition:'center',filter:'brightness(0.35)'}}/>
        <div style={{position:'relative',zIndex:1,maxWidth:'800px',margin:'0 auto',padding:'80px 24px',textAlign:'center'}}>
          <div style={{display:'inline-block',background:'rgba(212,175,55,0.2)',border:'1px solid rgba(212,175,55,0.4)',borderRadius:'50px',padding:'8px 20px',fontSize:'13px',fontWeight:'600',color:'#d4af37',marginBottom:'24px'}}>
            🚀 La fidélité numérique pour votre commerce
          </div>
          <h1 style={{fontSize:'clamp(36px,6vw,68px)',fontWeight:'800',lineHeight:'1.1',margin:'0 0 24px',color:'white'}}>
            Transformez vos clients en<br/>
            <span style={{color:'#d4af37'}}>clients fidèles</span>
          </h1>
          <p style={{fontSize:'clamp(16px,2vw,20px)',color:'rgba(255,255,255,0.75)',lineHeight:'1.6',margin:'0 0 40px',maxWidth:'600px',marginLeft:'auto',marginRight:'auto'}}>
            Remplacez vos cartes papier par une carte de fidélité digitale dans Apple Wallet et Google Wallet. Sans app à télécharger.
          </p>
          <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
            <a href="/register" style={{fontSize:'16px',fontWeight:'700',color:'#1a1a1a',textDecoration:'none',padding:'16px 32px',background:'#d4af37',borderRadius:'50px',display:'inline-block'}}>
              Essai gratuit 14 jours →
            </a>
            <a href="#features" style={{fontSize:'16px',fontWeight:'700',color:'white',textDecoration:'none',padding:'16px 32px',background:'rgba(255,255,255,0.1)',borderRadius:'50px',border:'1px solid rgba(255,255,255,0.3)',display:'inline-block',backdropFilter:'blur(10px)'}}>
              En savoir plus
            </a>
          </div>
          <p style={{fontSize:'13px',color:'rgba(255,255,255,0.5)',marginTop:'16px'}}>✓ Sans carte bancaire &nbsp;✓ Sans engagement &nbsp;✓ Annulable à tout moment</p>
        </div>
      </section>

      {/* STATS */}
      <section style={{background:'#1a1a2e',padding:'60px 24px'}}>
        <div style={{maxWidth:'900px',margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'40px',textAlign:'center'}}>
          {[
            { number: '+30%', label: 'de clients qui reviennent' },
            { number: '5 sec', label: 'pour obtenir sa carte' },
            { number: '0', label: 'app à télécharger' },
            { number: '19€', label: 'pour démarrer' },
          ].map((stat, i) => (
            <div key={i}>
              <div style={{fontSize:'clamp(32px,5vw,48px)',fontWeight:'800',color:'#d4af37',marginBottom:'8px'}}>{stat.number}</div>
              <div style={{fontSize:'14px',color:'rgba(255,255,255,0.6)'}}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES avec photos */}
      <section id="features" style={{padding:'80px 0',maxWidth:'1000px',margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:'60px',padding:'0 24px'}}>
          <h2 style={{fontSize:'clamp(28px,4vw,42px)',fontWeight:'800',margin:'0 0 16px'}}>Comment ça marche ?</h2>
          <p style={{fontSize:'16px',color:'#666',maxWidth:'500px',margin:'0 auto'}}>Simple pour vous, magique pour vos clients</p>
        </div>

        {[
          {
            emoji: '📲',
            title: 'Inscription en 5 secondes',
            desc: 'Votre client scanne le QR code affiché à la caisse. Sa carte de fidélité s\'ajoute instantanément dans Apple Wallet ou Google Wallet. Aucune app à télécharger.',
            photo: PHOTOS.qrcode,
            bg: 'rgba(212,175,55,0.06)',
            reverse: false,
          },
          {
            emoji: '📱',
            title: 'Carte dans le Wallet',
            desc: 'Un pass élégant dans le wallet de vos clients. À chaque passage, vous scannez leur QR Code pour créditer leurs tampons ou points. Tout est automatique.',
            photo: PHOTOS.wallet,
            bg: 'rgba(26,26,46,0.04)',
            reverse: true,
          },
          {
            emoji: '🔔',
            title: 'Notifications Push directes',
            desc: 'Envoyez des offres et messages directement sur l\'écran de verrouillage de vos clients. Comme un SMS mais gratuit et instantané.',
            photo: PHOTOS.notif,
            bg: 'rgba(212,175,55,0.06)',
            reverse: false,
          },
          {
            emoji: '📊',
            title: 'Dashboard depuis votre téléphone',
            desc: 'Gérez tous vos clients, visualisez vos statistiques et personnalisez votre carte depuis votre téléphone ou ordinateur. Partout, tout le temps.',
            photo: PHOTOS.dashboard,
            bg: 'rgba(26,26,46,0.04)',
            reverse: true,
          },
        ].map((feature, i) => (
          <div key={i} style={{background:feature.bg,padding:'40px 24px',display:'flex',flexDirection:'column',gap:'32px',alignItems:'center',marginBottom:'8px'}}>
            <div style={{maxWidth:'900px',width:'100%',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'48px',alignItems:'center',direction:feature.reverse?'rtl':'ltr'}}>
              <div style={{direction:'ltr'}}>
                <div style={{fontSize:'36px',marginBottom:'16px'}}>{feature.emoji}</div>
                <h3 style={{fontSize:'clamp(22px,3vw,30px)',fontWeight:'800',margin:'0 0 16px',lineHeight:'1.2'}}>{feature.title}</h3>
                <p style={{fontSize:'16px',color:'#555',lineHeight:'1.7',margin:'0 0 24px'}}>{feature.desc}</p>
                <a href="/register" style={{fontSize:'14px',fontWeight:'700',color:'#d4af37',textDecoration:'none',display:'inline-flex',alignItems:'center',gap:'8px'}}>
                  Essayer gratuitement →
                </a>
              </div>
              <div style={{direction:'ltr',borderRadius:'20px',overflow:'hidden',boxShadow:'0 20px 60px rgba(0,0,0,0.12)',aspectRatio:'4/3'}}>
                <img src={feature.photo} alt={feature.title} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* SOCIAL PROOF */}
      <section style={{background:'#1a1a2e',padding:'80px 24px',overflow:'hidden'}}>
        <div style={{maxWidth:'900px',margin:'0 auto',textAlign:'center',marginBottom:'48px'}}>
          <h2 style={{fontSize:'clamp(28px,4vw,42px)',fontWeight:'800',color:'white',margin:'0 0 16px'}}>
            Déjà adopté par des commerces
          </h2>
          <p style={{fontSize:'16px',color:'rgba(255,255,255,0.5)'}}>Rejoignez les premiers commerçants qui fidélisent leurs clients avec FidelEasy</p>
        </div>
        <div style={{maxWidth:'900px',margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:'20px'}}>
          {[
            { name: 'Sophie M.', role: 'Café à Antibes', text: '"Mes clients adorent avoir leur carte directement dans leur iPhone. Les tampons papier c\'est fini !"', photo: PHOTOS.client },
{ name: 'Marc L.', role: 'Restaurant à Nice', text: '"En 2 semaines j\'avais déjà 50 clients inscrits. La configuration est ultra simple."', photo: PHOTOS.commerce },
{ name: 'Julie R.', role: 'Boutique à Cannes', text: '"Les notifications push fonctionnent vraiment bien. Je vois mes clients revenir plus souvent."', photo: PHOTOS.boutique },
          ].map((t, i) => (
            <div key={i} style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'20px',overflow:'hidden'}}>
              <img src={t.photo} alt={t.name} style={{width:'100%',height:'160px',objectFit:'cover',display:'block'}}/>
              <div style={{padding:'20px'}}>
                <p style={{color:'rgba(255,255,255,0.8)',fontSize:'14px',lineHeight:'1.6',margin:'0 0 16px',fontStyle:'italic'}}>{t.text}</p>
                <div style={{fontWeight:'700',color:'white',fontSize:'14px'}}>{t.name}</div>
                <div style={{color:'#d4af37',fontSize:'12px'}}>{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{padding:'80px 24px',maxWidth:'1000px',margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <h2 style={{fontSize:'clamp(28px,4vw,42px)',fontWeight:'800',margin:'0 0 16px'}}>Des tarifs simples et transparents</h2>
          <p style={{fontSize:'16px',color:'#666',margin:'0 0 32px'}}>Sans engagement, résiliable à tout moment</p>
          <div style={{display:'inline-flex',background:'rgba(0,0,0,0.06)',borderRadius:'50px',padding:'4px',gap:'4px'}}>
            <button onClick={() => setBilling('monthly')} style={{padding:'10px 24px',borderRadius:'50px',border:'none',cursor:'pointer',fontSize:'14px',fontWeight:'600',background:billing==='monthly'?'white':'transparent',color:billing==='monthly'?'#1a1a1a':'#666',boxShadow:billing==='monthly'?'0 2px 8px rgba(0,0,0,0.1)':'none',transition:'all 0.2s'}}>
              Mensuel
            </button>
            <button onClick={() => setBilling('yearly')} style={{padding:'10px 24px',borderRadius:'50px',border:'none',cursor:'pointer',fontSize:'14px',fontWeight:'600',background:billing==='yearly'?'white':'transparent',color:billing==='yearly'?'#1a1a1a':'#666',boxShadow:billing==='yearly'?'0 2px 8px rgba(0,0,0,0.1)':'none',transition:'all 0.2s'}}>
              Annuel <span style={{color:'#d4af37',fontWeight:'700'}}>-2 mois offerts 🎁</span>
            </button>
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'20px'}}>
          {plans.map((plan, i) => (
            <div key={i} style={{background:plan.popular?'#1a1a2e':'white',border:plan.popular?'none':'1px solid rgba(0,0,0,0.08)',borderRadius:'24px',padding:'32px',position:'relative',boxShadow:plan.popular?'0 20px 60px rgba(26,26,46,0.3)':'0 4px 20px rgba(0,0,0,0.06)'}}>
              {plan.popular && (
                <div style={{position:'absolute',top:'-12px',left:'50%',transform:'translateX(-50%)',background:'#d4af37',color:'white',fontSize:'12px',fontWeight:'700',padding:'6px 20px',borderRadius:'50px',whiteSpace:'nowrap'}}>
                  ⭐ LE PLUS POPULAIRE
                </div>
              )}
              <h3 style={{fontSize:'20px',fontWeight:'700',margin:'0 0 8px',color:plan.popular?'white':'#1a1a1a'}}>{plan.name}</h3>
              <div style={{display:'flex',alignItems:'baseline',gap:'4px',margin:'0 0 24px'}}>
                <span style={{fontSize:'48px',fontWeight:'800',color:plan.popular?'#d4af37':'#1a1a1a'}}>
                  {billing === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}€
                </span>
                <span style={{fontSize:'14px',color:plan.popular?'rgba(255,255,255,0.5)':'#999'}}>/mois</span>
              </div>
              {billing === 'yearly' && (
                <div style={{background:'rgba(212,175,55,0.15)',borderRadius:'8px',padding:'8px 12px',marginBottom:'20px',fontSize:'13px',color:'#b8960a',fontWeight:'600'}}>
                  🎁 2 mois offerts — soit {plan.yearlyPrice * 10}€/an
                </div>
              )}
              <ul style={{listStyle:'none',padding:0,margin:'0 0 32px',display:'flex',flexDirection:'column',gap:'10px'}}>
                {plan.features.map((f, j) => (
                  <li key={j} style={{display:'flex',alignItems:'center',gap:'10px',fontSize:'14px',color:plan.popular?'rgba(255,255,255,0.8)':'#444'}}>
                    <span style={{color:'#d4af37',fontWeight:'700',flexShrink:0}}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <a href="/register" style={{display:'block',textAlign:'center',padding:'14px',borderRadius:'50px',fontSize:'15px',fontWeight:'700',textDecoration:'none',background:plan.popular?'#d4af37':'#1a1a2e',color:'white'}}>
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{padding:'80px 24px',maxWidth:'700px',margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <h2 style={{fontSize:'clamp(28px,4vw,42px)',fontWeight:'800',margin:'0 0 16px'}}>Questions fréquentes</h2>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
          {faqs.map((faq, i) => (
            <div key={i} style={{background:'white',border:'1px solid rgba(0,0,0,0.08)',borderRadius:'16px',overflow:'hidden',boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
              <button onClick={() => setFaqOpen(faqOpen===i?null:i)} style={{width:'100%',padding:'20px 24px',display:'flex',justifyContent:'space-between',alignItems:'center',background:'none',border:'none',cursor:'pointer',textAlign:'left'}}>
                <span style={{fontSize:'15px',fontWeight:'600',color:'#1a1a1a',paddingRight:'16px'}}>{faq.q}</span>
                <span style={{fontSize:'20px',color:'#d4af37',flexShrink:0,transform:faqOpen===i?'rotate(45deg)':'rotate(0)',transition:'transform 0.2s'}}>+</span>
              </button>
              {faqOpen===i && (
                <div style={{padding:'0 24px 20px',fontSize:'14px',color:'#666',lineHeight:'1.7'}}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA CONTACT */}
      <section id="contact" style={{position:'relative',padding:'100px 24px',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,backgroundImage:`url(${PHOTOS.commerce})`,backgroundSize:'cover',backgroundPosition:'center',filter:'brightness(0.2)'}}/>
        <div style={{position:'relative',zIndex:1,maxWidth:'600px',margin:'0 auto',textAlign:'center'}}>
          <h2 style={{fontSize:'clamp(28px,4vw,48px)',fontWeight:'800',color:'white',margin:'0 0 16px'}}>
            Prêt à fidéliser vos clients ? 🚀
          </h2>
          <p style={{fontSize:'16px',color:'rgba(255,255,255,0.7)',margin:'0 0 40px'}}>Essai gratuit 14 jours, sans carte bancaire</p>
          {formSent ? (
            <div style={{background:'rgba(212,175,55,0.15)',border:'1px solid rgba(212,175,55,0.3)',borderRadius:'16px',padding:'32px',color:'#d4af37',fontSize:'18px',fontWeight:'700'}}>
              ✅ Message envoyé ! On vous contacte dans les 24h.
            </div>
          ) : (
            <form onSubmit={e=>{e.preventDefault();setFormSent(true);}} style={{display:'flex',flexDirection:'column',gap:'12px'}}>
              <input required value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} placeholder="Votre prénom" style={{padding:'16px 20px',borderRadius:'12px',border:'1px solid rgba(255,255,255,0.15)',background:'rgba(255,255,255,0.1)',color:'white',fontSize:'15px',outline:'none',backdropFilter:'blur(10px)'}}/>
              <input required value={formData.business} onChange={e=>setFormData({...formData,business:e.target.value})} placeholder="Nom de votre commerce" style={{padding:'16px 20px',borderRadius:'12px',border:'1px solid rgba(255,255,255,0.15)',background:'rgba(255,255,255,0.1)',color:'white',fontSize:'15px',outline:'none',backdropFilter:'blur(10px)'}}/>
              <input required type="email" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} placeholder="Email professionnel" style={{padding:'16px 20px',borderRadius:'12px',border:'1px solid rgba(255,255,255,0.15)',background:'rgba(255,255,255,0.1)',color:'white',fontSize:'15px',outline:'none',backdropFilter:'blur(10px)'}}/>
              <input value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})} placeholder="Téléphone (optionnel)" style={{padding:'16px 20px',borderRadius:'12px',border:'1px solid rgba(255,255,255,0.15)',background:'rgba(255,255,255,0.1)',color:'white',fontSize:'15px',outline:'none',backdropFilter:'blur(10px)'}}/>
              <button type="submit" style={{padding:'16px',borderRadius:'50px',border:'none',background:'#d4af37',color:'white',fontSize:'16px',fontWeight:'700',cursor:'pointer',marginTop:'8px'}}>
                Démarrer mon essai gratuit →
              </button>
            </form>
          )}
          <div style={{display:'flex',justifyContent:'center',gap:'24px',marginTop:'24px',flexWrap:'wrap'}}>
            <a href="/login" style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',textDecoration:'none'}}>Déjà client ? Se connecter</a>
            <a href="/legal" style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',textDecoration:'none'}}>CGV & Mentions légales</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{background:'#0a0a18',padding:'32px 24px',textAlign:'center'}}>
        <div style={{marginBottom:'16px'}}>
          <span style={{fontSize:'20px',fontWeight:'800',color:'white'}}>Fidel<span style={{color:'#d4af37'}}>Easy</span></span>
        </div>
        <p style={{color:'rgba(255,255,255,0.3)',fontSize:'13px',margin:0}}>
          © 2025 FidelEasy &nbsp;·&nbsp;
          <a href="/legal" style={{color:'rgba(255,255,255,0.3)',textDecoration:'none'}}>CGV</a> &nbsp;·&nbsp;
          <a href="mailto:contact@fideleasy.app" style={{color:'rgba(255,255,255,0.3)',textDecoration:'none'}}>contact@fideleasy.app</a>
        </p>
      </footer>

      <style>{`
        * { box-sizing: border-box; }
        input::placeholder { color: rgba(255,255,255,0.35); }
        @media (max-width: 640px) {
          [style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
            direction: ltr !important;
          }
        }
      `}</style>
    </div>
  );
}