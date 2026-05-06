"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

const API = 'https://fideleasy-backend-production.up.railway.app';

export default function Join() {
  const { shop_id } = useParams();
  const [shop, setShop] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cardUrl, setCardUrl] = useState(null);

  useEffect(() => {
    fetch(`${API}/shops/${shop_id}`)
      .then(r => r.json())
      .then(d => { setShop(d.data); setLoading(false); });
  }, [shop_id]);

  const join = async () => {
    setSaving(true);
    try {
      const customerRes = await fetch(`${API}/customers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, shop_id })
      });
      const customerData = await customerRes.json();
      const customer = customerData.data?.[0];

      if (customer) {
        const cardRes = await fetch(`${API}/cards`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ customer_id: customer.id, shop_id, wallet_type: 'apple' })
        });
        const cardData = await cardRes.json();
        const card = cardData.data?.[0];
        if (card) {
          setCardUrl(`${API}/pass/apple/${card.id}`);
        }
      }
      setSuccess(true);
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  };

  if (loading) return (
    <div style={{
      minHeight:'100vh',
      background:'linear-gradient(135deg,#0a0a18 0%,#1a1020 50%,#0a1020 100%)',
      display:'flex',alignItems:'center',justifyContent:'center',
      fontFamily:'system-ui,sans-serif'
    }}>
      <div style={{textAlign:'center',color:'rgba(255,255,255,0.4)'}}>
        <div style={{fontSize:'40px',marginBottom:'16px'}}>⏳</div>
        <p>Chargement...</p>
      </div>
    </div>
  );

  if (success) return (
    <div style={{
      minHeight:'100vh',
      background:'linear-gradient(135deg,#0a0a18 0%,#1a1020 50%,#0a1020 100%)',
      display:'flex',alignItems:'center',justifyContent:'center',
      fontFamily:'system-ui,-apple-system,sans-serif',
      padding:'24px',position:'relative',overflow:'hidden'
    }}>
      <div style={{position:'absolute',inset:0,pointerEvents:'none'}}>
        <div style={{position:'absolute',top:'10%',left:'5%',width:'300px',height:'300px',borderRadius:'50%',background:'rgba(212,175,55,0.06)',animation:'float1 8s ease-in-out infinite'}}/>
        <div style={{position:'absolute',bottom:'10%',right:'5%',width:'200px',height:'200px',borderRadius:'50%',background:'rgba(34,197,94,0.04)',animation:'float2 10s ease-in-out infinite'}}/>
      </div>

      <div style={{
        width:'100%',maxWidth:'400px',
        background:'rgba(255,255,255,0.04)',
        border:'1px solid rgba(255,255,255,0.1)',
        borderRadius:'24px',padding:'40px',
        backdropFilter:'blur(20px)',
        textAlign:'center',position:'relative',zIndex:1,
        boxShadow:'0 20px 60px rgba(0,0,0,0.4)'
      }}>
        <div style={{fontSize:'64px',marginBottom:'16px'}}>🎉</div>
        <h2 style={{fontSize:'24px',fontWeight:'800',color:'white',marginBottom:'8px'}}>
          Bienvenue chez<br/>
          <span style={{color:'#d4af37'}}>{shop?.name}</span> !
        </h2>
        <p style={{color:'rgba(255,255,255,0.5)',fontSize:'15px',marginBottom:'32px',lineHeight:'1.6'}}>
          Votre carte de fidélité est prête ! Ajoutez-la à votre wallet en un clic.
        </p>

        {cardUrl && (
          <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
            <a href={cardUrl} style={{
              display:'flex',alignItems:'center',justifyContent:'center',gap:'10px',
              background:'black',color:'white',
              borderRadius:'12px',padding:'14px 24px',
              textDecoration:'none',fontSize:'15px',fontWeight:'600',
              boxShadow:'0 4px 20px rgba(0,0,0,0.4)'
            }}>
              🍎 Ajouter à Apple Wallet
            </a>
            <a href={`${API}/pass/google/${cardUrl.split('/').pop()}`} style={{
              display:'flex',alignItems:'center',justifyContent:'center',gap:'10px',
              background:'white',color:'#1a1a2e',
              borderRadius:'12px',padding:'14px 24px',
              textDecoration:'none',fontSize:'15px',fontWeight:'600'
            }}>
              🟢 Ajouter à Google Wallet
            </a>
          </div>
        )}

        <div style={{
          marginTop:'24px',padding:'16px',
          background:'rgba(212,175,55,0.08)',
          border:'1px solid rgba(212,175,55,0.2)',
          borderRadius:'12px'
        }}>
          <p style={{fontSize:'13px',color:'rgba(255,255,255,0.5)',margin:'0 0 8px'}}>Votre carte de fidélité</p>
          <div style={{display:'flex',gap:'6px',justifyContent:'center',flexWrap:'wrap'}}>
            {[...Array(10)].map((_,i) => (
              <div key={i} style={{
                width:'20px',height:'20px',borderRadius:'50%',
                background: i === 0 ? '#d4af37' : 'rgba(255,255,255,0.1)'
              }}/>
            ))}
          </div>
          <p style={{fontSize:'12px',color:'rgba(255,255,255,0.3)',margin:'8px 0 0'}}>1/10 tampons</p>
        </div>
      </div>

      <style>{`
        @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-30px)} }
        @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(20px)} }
      `}</style>
    </div>
  );

  return (
    <div style={{
      minHeight:'100vh',
      background:'linear-gradient(135deg,#0a0a18 0%,#1a1020 50%,#0a1020 100%)',
      display:'flex',alignItems:'center',justifyContent:'center',
      fontFamily:'system-ui,-apple-system,sans-serif',
      padding:'24px',position:'relative',overflow:'hidden'
    }}>
      {/* Formes animées */}
      <div style={{position:'absolute',inset:0,pointerEvents:'none'}}>
        <div style={{position:'absolute',top:'10%',left:'5%',width:'300px',height:'300px',borderRadius:'50%',background:'rgba(212,175,55,0.05)',animation:'float1 8s ease-in-out infinite'}}/>
        <div style={{position:'absolute',bottom:'10%',right:'5%',width:'200px',height:'200px',borderRadius:'50%',background:'rgba(212,175,55,0.04)',animation:'float2 10s ease-in-out infinite'}}/>
      </div>

      <div style={{
        width:'100%',maxWidth:'420px',
        background:'rgba(255,255,255,0.04)',
        border:'1px solid rgba(255,255,255,0.1)',
        borderRadius:'24px',padding:'36px',
        backdropFilter:'blur(20px)',
        position:'relative',zIndex:1,
        boxShadow:'0 20px 60px rgba(0,0,0,0.4)'
      }}>
        {/* Header */}
        <div style={{textAlign:'center',marginBottom:'28px'}}>
          <div style={{
            width:'64px',height:'64px',borderRadius:'18px',
            background:'rgba(212,175,55,0.15)',
            border:'1px solid rgba(212,175,55,0.3)',
            display:'flex',alignItems:'center',justifyContent:'center',
            fontSize:'28px',margin:'0 auto 16px'
          }}>
            💳
          </div>
          <h1 style={{fontSize:'22px',fontWeight:'800',color:'white',margin:'0 0 6px'}}>
            Rejoindre <span style={{color:'#d4af37'}}>{shop?.name}</span>
          </h1>
          <p style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',margin:0,lineHeight:'1.6'}}>
            Créez votre carte de fidélité numérique gratuite
          </p>
        </div>

        {/* Badges */}
        <div style={{display:'flex',gap:'8px',justifyContent:'center',marginBottom:'28px',flexWrap:'wrap'}}>
          {['🍎 Apple Wallet','🟢 Google Wallet','🆓 Gratuit'].map(badge => (
            <span key={badge} style={{
              background:'rgba(212,175,55,0.08)',
              border:'1px solid rgba(212,175,55,0.2)',
              borderRadius:'20px',padding:'4px 12px',
              fontSize:'12px',color:'rgba(255,255,255,0.6)',fontWeight:'500'
            }}>
              {badge}
            </span>
          ))}
        </div>

        {/* Formulaire */}
        {[
          { label:'Votre prénom', key:'name', type:'text', placeholder:'Sophie', required:true },
          { label:'Email', key:'email', type:'email', placeholder:'sophie@email.fr' },
          { label:'Téléphone', key:'phone', type:'tel', placeholder:'06 XX XX XX XX' },
        ].map(field => (
          <div key={field.key} style={{marginBottom:'14px'}}>
            <label style={{
              fontSize:'12px',color:'rgba(255,255,255,0.5)',
              fontWeight:'600',textTransform:'uppercase',
              letterSpacing:'0.8px',display:'block',marginBottom:'7px'
            }}>
              {field.label} {field.required && <span style={{color:'#d4af37'}}>*</span>}
            </label>
            <input
              type={field.type}
              placeholder={field.placeholder}
              value={form[field.key]}
              onChange={e => setForm({...form, [field.key]: e.target.value})}
              style={{
                width:'100%',background:'rgba(255,255,255,0.06)',
                border:'1px solid rgba(255,255,255,0.1)',
                borderRadius:'10px',padding:'12px 14px',
                color:'white',fontSize:'15px',
                boxSizing:'border-box',outline:'none',
                transition:'border-color 0.2s'
              }}
              onFocus={e=>e.target.style.borderColor='rgba(212,175,55,0.5)'}
              onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.1)'}
            />
          </div>
        ))}

        <button
          onClick={join}
          disabled={saving || !form.name}
          style={{
            width:'100%',background:'#d4af37',color:'white',
            border:'none',borderRadius:'12px',padding:'14px',
            cursor: saving || !form.name ? 'not-allowed' : 'pointer',
            fontSize:'16px',fontWeight:'700',marginTop:'8px',
            opacity: saving || !form.name ? 0.6 : 1,
            boxShadow:'0 4px 20px rgba(212,175,55,0.3)',
            transition:'transform 0.2s'
          }}
          onMouseEnter={e=>{if(!saving && form.name)e.target.style.transform='translateY(-1px)'}}
          onMouseLeave={e=>e.target.style.transform='translateY(0)'}
        >
          {saving ? '⏳ Création...' : '🎉 Obtenir ma carte gratuite'}
        </button>

        <p style={{
          textAlign:'center',fontSize:'12px',
          color:'rgba(255,255,255,0.25)',marginTop:'16px',lineHeight:'1.6'
        }}>
          Aucun paiement requis · Carte ajoutée à votre wallet
        </p>
      </div>

      <style>{`
        @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-30px)} }
        @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(20px)} }
        input::placeholder { color: rgba(255,255,255,0.25); }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}