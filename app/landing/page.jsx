"use client";
import { useState } from 'react';

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
      color: '#1a1a2e',
      features: ['100 clients max', '1 commerce', 'Apple & Google Wallet', 'QR Code', 'Notifications push', 'Dashboard analytics'],
      cta: 'Commencer gratuitement',
      popular: false,
    },
    {
      name: 'Pro',
      monthlyPrice: 49,
      yearlyPrice: 41,
      color: '#d4af37',
      features: ['500 clients max', '3 commerces', 'Apple & Google Wallet', 'QR Code', 'Notifications push', 'Dashboard analytics', 'Carte personnalisée avec photo', 'Support prioritaire'],
      cta: 'Commencer gratuitement',
      popular: true,
    },
    {
      name: 'Business',
      monthlyPrice: 99,
      yearlyPrice: 82,
      color: '#1a1a2e',
      features: ['Clients illimités', 'Commerces illimités', 'Apple & Google Wallet', 'QR Code', 'Notifications push', 'Dashboard analytics', 'Carte personnalisée avec photo', 'Support prioritaire 24/7', 'API access'],
      cta: 'Contacter les ventes',
      popular: false,
    },
  ];

  const faqs = [
    { q: 'Mes clients doivent-ils télécharger une app ?', a: 'Non ! Vos clients scannent simplement votre QR code et la carte s\'ajoute directement dans Apple Wallet ou Google Wallet, déjà installé sur leur téléphone.' },
    { q: 'Comment fonctionne le tampon digital ?', a: 'Depuis votre dashboard, vous scannez le QR code de la carte de votre client ou vous cliquez sur son profil pour lui ajouter un tampon. Simple et rapide !' },
    { q: 'Puis-je personnaliser ma carte de fidélité ?', a: 'Oui ! Couleur, icône, nom du commerce, photo... Tout est personnalisable depuis vos réglages. Les offres Pro et Business permettent d\'ajouter une photo plein format.' },
    { q: 'Puis-je changer de plan à tout moment ?', a: 'Oui, sans engagement. Vous pouvez upgrader ou downgrader votre plan à tout moment depuis votre dashboard.' },
    { q: 'Les notifications push sont-elles incluses ?', a: 'Oui ! Envoyez des offres et messages à tous vos clients directement sur leur écran depuis votre dashboard.' },
    { q: 'Y a-t-il un essai gratuit ?', a: 'Oui ! 14 jours d\'essai gratuit sans carte bancaire. Aucun engagement.' },
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div style={{fontFamily:'system-ui,-apple-system,sans-serif',background:'#faf9f6',color:'#1a1a1a',overflowX:'hidden'}}>

      {/* NAVBAR */}
      <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:100,background:'rgba(250,249,246,0.95)',backdropFilter:'blur(20px)',borderBottom:'1px solid rgba(0,0,0,0.06)',padding:'0 24px',height:'64px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <a href="/landing" style={{textDecoration:'none'}}>
          <span style={{fontSize:'22px',fontWeight:'800',color:'#1a1a1a'}}>Fidel<span style={{color:'#d4af37'}}>Easy</span></span>
        </a>
        <div style={{display:'flex',gap:'12px',alignItems:'center'}}>
          <a href="/login" style={{fontSize:'14px',fontWeight:'500',color:'#666',textDecoration:'none',padding:'8px 16px'}}>Connexion</a>
          <a href="/register" style={{fontSize:'14px',fontWeight:'700',color:'white',textDecoration:'none',padding:'10px 20px',background:'#1a1a1a',borderRadius:'50px',border:'2px solid #1a1a1a'}}>Essai gratuit</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{paddingTop:'120px',paddingBottom:'80px',textAlign:'center',padding:'120px 24px 80px',maxWidth:'800px',margin:'0 auto'}}>
        <div style={{display:'inline-block',background:'rgba(212,175,55,0.12)',border:'1px solid rgba(212,175,55,0.3)',borderRadius:'50px',padding:'8px 20px',fontSize:'13px',fontWeight:'600',color:'#b8960a',marginBottom:'24px'}}>
          🚀 La fidélité numérique pour votre commerce
        </div>
        <h1 style={{fontSize:'clamp(36px,6vw,64px)',fontWeight:'800',lineHeight:'1.1',margin:'0 0 24px',color:'#1a1a1a'}}>
          Transformez vos clients en
          <span style={{color:'#d4af37'}}> clients fidèles</span>
        </h1>
        <p style={{fontSize:'clamp(16px,2vw,20px)',color:'#666',lineHeight:'1.6',margin:'0 0 40px',maxWidth:'600px',marginLeft:'auto',marginRight:'auto'}}>
          Remplacez vos cartes papier par une carte de fidélité digitale dans Apple Wallet et Google Wallet. Sans app à télécharger.
        </p>
        <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
          <a href="/register" style={{fontSize:'16px',fontWeight:'700',color:'white',textDecoration:'none',padding:'16px 32px',background:'#1a1a1a',borderRadius:'50px',border:'2px solid #1a1a1a',display:'inline-block'}}>
            Essai gratuit 14 jours →
          </a>
          <a href="#demo" style={{fontSize:'16px',fontWeight:'700',color:'#1a1a1a',textDecoration:'none',padding:'16px 32px',background:'transparent',borderRadius:'50px',border:'2px solid #1a1a1a',display:'inline-block'}}>
            Voir la démo
          </a>
        </div>
        <p style={{fontSize:'13px',color:'#999',marginTop:'16px'}}>✓ Sans carte bancaire &nbsp;✓ Sans engagement &nbsp;✓ Annulable à tout moment</p>
      </section>

      {/* STATS */}
      <section style={{background:'#1a1a2e',padding:'60px 24px'}}>
        <div style={{maxWidth:'900px',margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'40px',textAlign:'center'}}>
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

      {/* FEATURES */}
      <section style={{padding:'80px 24px',maxWidth:'900px',margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:'60px'}}>
          <h2 style={{fontSize:'clamp(28px,4vw,42px)',fontWeight:'800',margin:'0 0 16px'}}>Comment ça marche ?</h2>
          <p style={{fontSize:'16px',color:'#666',maxWidth:'500px',margin:'0 auto'}}>Simple pour vous, magique pour vos clients</p>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
          {[
            { emoji: '📱', title: 'Apple & Google Wallet', desc: 'Un pass dans le wallet de vos clients. À chaque passage, vous scannez leur QR Code pour créditer leurs tampons ou points.', bg: 'rgba(212,175,55,0.08)', border: 'rgba(212,175,55,0.2)' },
            { emoji: '📲', title: 'QR Code d\'inscription', desc: 'Affichez votre QR code à la caisse. Vos clients le scannent et leur carte est créée en 5 secondes. Sans app à télécharger.', bg: 'rgba(26,26,46,0.05)', border: 'rgba(26,26,46,0.1)' },
            { emoji: '🔔', title: 'Notifications Push', desc: 'Envoyez des offres et messages directement sur l\'écran de vos clients. Comme un SMS mais gratuit et instantané.', bg: 'rgba(212,175,55,0.08)', border: 'rgba(212,175,55,0.2)' },
            { emoji: '📊', title: 'Dashboard complet', desc: 'Gérez tous vos clients, visualisez vos stats et personnalisez votre carte depuis votre téléphone ou ordinateur.', bg: 'rgba(26,26,46,0.05)', border: 'rgba(26,26,46,0.1)' },
          ].map((f, i) => (
            <div key={i} style={{background:f.bg,border:`1px solid ${f.border}`,borderRadius:'20px',padding:'32px',display:'flex',gap:'24px',alignItems:'flex-start'}}>
              <div style={{fontSize:'40px',flexShrink:0}}>{f.emoji}</div>
              <div>
                <h3 style={{fontSize:'20px',fontWeight:'700',margin:'0 0 8px'}}>{f.title}</h3>
                <p style={{fontSize:'15px',color:'#666',margin:0,lineHeight:'1.6'}}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DEMO VIDEO SECTION */}
      <section id="demo" style={{background:'#1a1a2e',padding:'80px 24px',textAlign:'center'}}>
        <div style={{maxWidth:'700px',margin:'0 auto'}}>
          <h2 style={{fontSize:'clamp(28px,4vw,42px)',fontWeight:'800',color:'white',margin:'0 0 16px'}}>Voyez FidelEasy en action</h2>
          <p style={{fontSize:'16px',color:'rgba(255,255,255,0.6)',margin:'0 0 40px'}}>En moins de 40 secondes, tout est clair</p>
          <div style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'20px',padding:'60px 24px',display:'flex',flexDirection:'column',alignItems:'center',gap:'16px'}}>
            <div style={{fontSize:'60px'}}>▶️</div>
            <p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',margin:0}}>Vidéo de démonstration — Bientôt disponible</p>
            <a href="/register" style={{fontSize:'14px',fontWeight:'700',color:'#1a1a1a',textDecoration:'none',padding:'12px 24px',background:'#d4af37',borderRadius:'50px',display:'inline-block',marginTop:'8px'}}>
              Essayer maintenant →
            </a>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{padding:'80px 24px',maxWidth:'1000px',margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <h2 style={{fontSize:'clamp(28px,4vw,42px)',fontWeight:'800',margin:'0 0 16px'}}>Des tarifs simples et transparents</h2>
          <p style={{fontSize:'16px',color:'#666',margin:'0 0 32px'}}>Sans engagement, résiliable à tout moment</p>

          {/* Toggle mensuel/annuel */}
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
            <div key={i} style={{background:plan.popular?'#1a1a2e':'white',border:plan.popular?'none':`1px solid rgba(0,0,0,0.08)`,borderRadius:'24px',padding:'32px',position:'relative',boxShadow:plan.popular?'0 20px 60px rgba(26,26,46,0.3)':'0 4px 20px rgba(0,0,0,0.06)'}}>
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
                  🎁 2 mois offerts — soit {plan.yearlyPrice * 10}€/an au lieu de {plan.monthlyPrice * 12}€
                </div>
              )}
              <ul style={{listStyle:'none',padding:0,margin:'0 0 32px',display:'flex',flexDirection:'column',gap:'10px'}}>
                {plan.features.map((f, j) => (
                  <li key={j} style={{display:'flex',alignItems:'center',gap:'10px',fontSize:'14px',color:plan.popular?'rgba(255,255,255,0.8)':'#444'}}>
                    <span style={{color:'#d4af37',fontWeight:'700',flexShrink:0}}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <a href="/register" style={{display:'block',textAlign:'center',padding:'14px',borderRadius:'50px',fontSize:'15px',fontWeight:'700',textDecoration:'none',background:plan.popular?'#d4af37':'#1a1a2e',color:'white',transition:'opacity 0.2s'}}>
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
      <section id="contact" style={{background:'#1a1a2e',padding:'80px 24px'}}>
        <div style={{maxWidth:'600px',margin:'0 auto',textAlign:'center'}}>
          <h2 style={{fontSize:'clamp(28px,4vw,42px)',fontWeight:'800',color:'white',margin:'0 0 16px'}}>
            Prêt à fidéliser vos clients ? 🚀
          </h2>
          <p style={{fontSize:'16px',color:'rgba(255,255,255,0.6)',margin:'0 0 40px'}}>Essai gratuit 14 jours, sans carte bancaire</p>

          {formSent ? (
            <div style={{background:'rgba(212,175,55,0.15)',border:'1px solid rgba(212,175,55,0.3)',borderRadius:'16px',padding:'32px',color:'#d4af37',fontSize:'18px',fontWeight:'700'}}>
              ✅ Message envoyé ! On vous contacte dans les 24h.
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} style={{display:'flex',flexDirection:'column',gap:'12px'}}>
              <input required value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} placeholder="Votre prénom" style={{padding:'16px 20px',borderRadius:'12px',border:'1px solid rgba(255,255,255,0.1)',background:'rgba(255,255,255,0.06)',color:'white',fontSize:'15px',outline:'none'}}/>
              <input required value={formData.business} onChange={e=>setFormData({...formData,business:e.target.value})} placeholder="Nom de votre commerce" style={{padding:'16px 20px',borderRadius:'12px',border:'1px solid rgba(255,255,255,0.1)',background:'rgba(255,255,255,0.06)',color:'white',fontSize:'15px',outline:'none'}}/>
              <input required type="email" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} placeholder="Email professionnel" style={{padding:'16px 20px',borderRadius:'12px',border:'1px solid rgba(255,255,255,0.1)',background:'rgba(255,255,255,0.06)',color:'white',fontSize:'15px',outline:'none'}}/>
              <input value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})} placeholder="Téléphone (optionnel)" style={{padding:'16px 20px',borderRadius:'12px',border:'1px solid rgba(255,255,255,0.1)',background:'rgba(255,255,255,0.06)',color:'white',fontSize:'15px',outline:'none'}}/>
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
          © 2025 FidelEasy — La fidélité numérique pour votre commerce &nbsp;·&nbsp; 
          <a href="/legal" style={{color:'rgba(255,255,255,0.3)',textDecoration:'none'}}>CGV</a> &nbsp;·&nbsp;
          <a href="mailto:contact@fideleasy.app" style={{color:'rgba(255,255,255,0.3)',textDecoration:'none'}}>contact@fideleasy.app</a>
        </p>
      </footer>

      <style>{`
        * { box-sizing: border-box; }
        input::placeholder { color: rgba(255,255,255,0.3); }
        a:hover { opacity: 0.8; }
        @media (max-width: 768px) {
          nav { padding: 0 16px; }
        }
      `}</style>
    </div>
  );
}