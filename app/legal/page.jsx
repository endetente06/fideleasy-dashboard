export default function Legal() {
  return (
    <div style={{minHeight:'100vh',background:'#07070f',color:'white',fontFamily:'system-ui,sans-serif',padding:'48px 24px'}}>
      <div style={{maxWidth:'800px',margin:'0 auto'}}>
        
        <div style={{marginBottom:'48px'}}>
          <a href="/dashboard" style={{color:'#4f6ef7',textDecoration:'none',fontSize:'14px'}}>← Retour au dashboard</a>
          <h1 style={{fontSize:'32px',fontWeight:'800',margin:'16px 0 8px'}}>
            Fidel<span style={{color:'#059669'}}>Easy</span>
          </h1>
          <p style={{color:'#6060a0'}}>Mentions légales & Conditions Générales de Vente</p>
        </div>

        {/* Mentions légales */}
        <section style={{marginBottom:'48px'}}>
          <h2 style={{fontSize:'22px',fontWeight:'700',marginBottom:'16px',color:'#4f6ef7'}}>Mentions légales</h2>
          <div style={{background:'#0f0f1c',border:'1px solid #1e1e35',borderRadius:'16px',padding:'24px',lineHeight:'1.8',color:'#c0c0d0'}}>
            <p><strong style={{color:'white'}}>Éditeur du site :</strong> FidelEasy</p>
            <p><strong style={{color:'white'}}>Responsable de la publication :</strong> Daniel Fraier</p>
            <p><strong style={{color:'white'}}>Adresse :</strong> Antibes, France</p>
            <p><strong style={{color:'white'}}>Email :</strong> contact@fideleasy.fr</p>
            <p><strong style={{color:'white'}}>Hébergeur :</strong> Vercel Inc. - 340 Pine Street, San Francisco, CA 94104, USA</p>
            <p><strong style={{color:'white'}}>API :</strong> Railway - San Francisco, CA, USA</p>
          </div>
        </section>

        {/* CGV */}
        <section style={{marginBottom:'48px'}}>
          <h2 style={{fontSize:'22px',fontWeight:'700',marginBottom:'16px',color:'#4f6ef7'}}>Conditions Générales de Vente</h2>
          
          <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
            {[
              {
                title: '1. Objet',
                content: 'Les présentes CGV régissent les conditions de vente des abonnements au service FidelEasy, plateforme SaaS de gestion de cartes de fidélité numériques.'
              },
              {
                title: '2. Services proposés',
                content: 'FidelEasy propose trois offres d\'abonnement mensuel : Starter (19€/mois), Pro (49€/mois) et Business (99€/mois). Ces abonnements donnent accès à la création et gestion de cartes de fidélité numériques compatibles Apple Wallet et Google Wallet.'
              },
              {
                title: '3. Tarifs et paiement',
                content: 'Les prix sont indiqués en euros TTC. Le paiement s\'effectue par carte bancaire via Stripe. Les abonnements sont renouvelés automatiquement chaque mois. Vous pouvez résilier à tout moment depuis votre espace client.'
              },
              {
                title: '4. Résiliation',
                content: 'Vous pouvez résilier votre abonnement à tout moment. La résiliation prend effet à la fin de la période en cours. Aucun remboursement ne sera effectué pour la période entamée.'
              },
              {
                title: '5. Données personnelles',
                content: 'FidelEasy collecte et traite les données personnelles conformément au RGPD. Les données sont hébergées en Europe via Supabase. Pour exercer vos droits, contactez-nous à contact@fideleasy.fr.'
              },
              {
                title: '6. Droit applicable',
                content: 'Les présentes CGV sont soumises au droit français. En cas de litige, les tribunaux français sont compétents.'
              }
            ].map(section => (
              <div key={section.title} style={{background:'#0f0f1c',border:'1px solid #1e1e35',borderRadius:'12px',padding:'20px'}}>
                <h3 style={{fontSize:'16px',fontWeight:'600',marginBottom:'8px',margin:'0 0 8px'}}>{section.title}</h3>
                <p style={{color:'#8080b0',lineHeight:'1.7',margin:0,fontSize:'14px'}}>{section.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Politique de confidentialité */}
        <section style={{marginBottom:'48px'}}>
          <h2 style={{fontSize:'22px',fontWeight:'700',marginBottom:'16px',color:'#4f6ef7'}}>Politique de confidentialité</h2>
          <div style={{background:'#0f0f1c',border:'1px solid #1e1e35',borderRadius:'16px',padding:'24px',color:'#8080b0',lineHeight:'1.8',fontSize:'14px'}}>
            <p>FidelEasy collecte les données suivantes : nom, email, numéro de téléphone des clients, données de fidélité (tampons, points).</p>
            <p>Ces données sont utilisées uniquement pour le fonctionnement du service de fidélité.</p>
            <p>Elles ne sont jamais vendues à des tiers.</p>
            <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données.</p>
            <p style={{margin:0}}>Contact : <span style={{color:'#4f6ef7'}}>contact@fideleasy.fr</span></p>
          </div>
        </section>

        <div style={{textAlign:'center',color:'#6060a0',fontSize:'13px',paddingTop:'24px',borderTop:'1px solid #1e1e35'}}>
          © 2026 FidelEasy — Tous droits réservés
        </div>
      </div>
    </div>
  );
}