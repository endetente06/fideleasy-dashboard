"use client";
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const API = 'https://fideleasy-backend-production.up.railway.app';
const SUPABASE_URL = 'https://gfxcwcmxnfiwfqinouow.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmeGN3Y214bmZpd2ZxaW5vdW93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0MDUxNDAsImV4cCI6MjA5Mjk4MTE0MH0.H3dsL_dNeoUKQmSFzFQXAX5pjPXqG0IUHAnXN6BTt9E';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON);

const STAMP_ICONS = [
  { label: 'Étoile', value: '⭐' }, { label: 'Café', value: '☕' },
  { label: 'Pizza', value: '🍕' }, { label: 'Ciseaux', value: '✂️' },
  { label: 'Fleur', value: '🌸' }, { label: 'Cœur', value: '❤️' },
  { label: 'Diamant', value: '💎' }, { label: 'Feu', value: '🔥' },
  { label: 'Couronne', value: '👑' }, { label: 'Burger', value: '🍔' },
  { label: 'Sushi', value: '🍣' }, { label: 'Glace', value: '🍦' },
  { label: 'Bière', value: '🍺' }, { label: 'Vin', value: '🍷' },
  { label: 'Gâteau', value: '🎂' }, { label: 'Sport', value: '⚽' },
  { label: 'Musique', value: '🎵' }, { label: 'Livre', value: '📚' },
  { label: 'Voiture', value: '🚗' }, { label: 'Maison', value: '🏠' },
  { label: 'Soleil', value: '☀️' }, { label: 'Spa', value: '💆' },
  { label: 'Gym', value: '💪' }, { label: 'Chien', value: '🐶' },
];

const FONTS = [
  { label: 'Moderne', value: 'system-ui,-apple-system,sans-serif' },
  { label: 'Élégant', value: 'Georgia,serif' },
  { label: 'Minimaliste', value: 'Helvetica,Arial,sans-serif' },
  { label: 'Technique', value: 'monospace' },
];

const COLORS = [
  { label: 'Noir élégant', value: 'rgb(10, 10, 24)' },
  { label: 'Bleu nuit', value: 'rgb(15, 23, 42)' },
  { label: 'Violet', value: 'rgb(88, 28, 135)' },
  { label: 'Vert forêt', value: 'rgb(20, 83, 45)' },
  { label: 'Rouge bordeaux', value: 'rgb(127, 29, 29)' },
  { label: 'Bleu océan', value: 'rgb(12, 74, 110)' },
  { label: 'Or foncé', value: 'rgb(120, 80, 0)' },
  { label: 'Gris ardoise', value: 'rgb(30, 41, 59)' },
  { label: 'Rose foncé', value: 'rgb(131, 24, 67)' },
  { label: 'Teal', value: 'rgb(19, 78, 74)' },
  { label: 'Indigo', value: 'rgb(49, 46, 129)' },
  { label: 'Brun luxe', value: 'rgb(92, 51, 23)' },
];

const BACKGROUNDS = [
  { label: 'Solide', value: 'solid', preview: 'rgb(10,10,24)' },
  { label: 'Dégradé or', value: 'gradient-gold', preview: 'linear-gradient(135deg,#1a1a2e,#8B6914)' },
  { label: 'Dégradé violet', value: 'gradient-purple', preview: 'linear-gradient(135deg,#1a0533,#6b21a8)' },
  { label: 'Dégradé océan', value: 'gradient-ocean', preview: 'linear-gradient(135deg,#0c1445,#0e7490)' },
  { label: 'Dégradé forêt', value: 'gradient-forest', preview: 'linear-gradient(135deg,#052e16,#166534)' },
  { label: 'Dégradé coucher', value: 'gradient-sunset', preview: 'linear-gradient(135deg,#7f1d1d,#92400e)' },
  { label: 'Nuit étoilée', value: 'gradient-night', preview: 'linear-gradient(135deg,#0f0c29,#302b63,#24243e)' },
  { label: 'Aurora', value: 'gradient-aurora', preview: 'linear-gradient(135deg,#0d324d,#7f5a83)' },
];

function getBackground(style, color) {
  switch(style) {
    case 'gradient-gold': return 'linear-gradient(135deg,#1a1a2e,#8B6914)';
    case 'gradient-purple': return 'linear-gradient(135deg,#1a0533,#6b21a8)';
    case 'gradient-ocean': return 'linear-gradient(135deg,#0c1445,#0e7490)';
    case 'gradient-forest': return 'linear-gradient(135deg,#052e16,#166534)';
    case 'gradient-sunset': return 'linear-gradient(135deg,#7f1d1d,#92400e)';
    case 'gradient-night': return 'linear-gradient(135deg,#0f0c29,#302b63,#24243e)';
    case 'gradient-aurora': return 'linear-gradient(135deg,#0d324d,#7f5a83)';
    default: return color;
  }
}

export default function Settings() {
  const [shop, setShop] = useState(null);
  const [form, setForm] = useState({
    card_color: 'rgb(10, 10, 24)',
    card_stamps_required: 10,
    card_logo_text: '',
    card_stamp_icon: '⭐',
    card_font: 'system-ui,-apple-system,sans-serif',
    loyalty_type: 'stamps',
    points_per_euro: 1,
    rewards: [],
  });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('programme');

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const shopData = localStorage.getItem('shop');
    if (shopData) {
      const s = JSON.parse(shopData);
      setShop(s);
      setForm({
        card_color: s.card_color || 'rgb(10, 10, 24)',
        card_stamps_required: s.card_stamps_required || 10,
        card_logo_text: s.card_logo_text || s.name || '',
        card_stamp_icon: s.card_stamp_icon || '⭐',
        card_font: s.card_font || 'system-ui,-apple-system,sans-serif',
        loyalty_type: s.loyalty_type || 'stamps',
        points_per_euro: s.points_per_euro || 1,
        rewards: s.rewards ? (typeof s.rewards === 'string' ? JSON.parse(s.rewards) : s.rewards) : [],
      });
    }
  }, []);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { alert('Image trop grande ! Max 2MB'); return; }
    setUploading(true);
    try {
      const fileName = `${shop.id}_${Date.now()}.${file.name.split('.').pop()}`;
      const { error } = await supabaseClient.storage.from('shop-images').upload(fileName, file, { upsert: true });
      if (error) throw error;
      const { data: urlData } = supabaseClient.storage.from('shop-images').getPublicUrl(fileName);
      setForm(f => ({...f, card_image_url: urlData.publicUrl}));
    } catch (err) { alert('Erreur upload: ' + err.message); }
    setUploading(false);
  };

  const save = async () => {
    if (!shop || !shop.id) { alert('Erreur : shop non chargé !'); return; }
    setSaving(true);
    try {
      const res = await fetch(`${API}/shops/${shop.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, rewards: JSON.stringify(form.rewards) })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      const updatedShop = { ...shop, ...form };
      localStorage.setItem('shop', JSON.stringify(updatedShop));
      setShop(updatedShop);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) { alert('Erreur: ' + err.message); }
    setSaving(false);
  };

  const navItems = [
    { icon: '📊', label: 'Dashboard', href: '/dashboard' },
    { icon: '👥', label: 'Clients', href: '/clients' },
    { icon: '🔔', label: 'Notifs', href: '/notifications' },
    { icon: '📱', label: 'QR Code', href: '/qrcode' },
    { icon: '⚙️', label: 'Réglages', href: '/settings', active: true },
  ];

  const tabs = [
  { id: 'programme', label: '🎯 Programme' },
  { id: 'couleur', label: '🎨 Couleur' },
  { id: 'icone', label: '🏷️ Icône' },
  { id: 'police', label: '✍️ Police' },
  { id: 'general', label: '⚙️ Général' },
];

  const cardBg = getBackground(form.card_background_style, form.card_color);

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
            <a key={item.href} href={item.href} style={{display:'flex',alignItems:'center',gap:'12px',padding:'12px 24px',color:item.active?'#d4af37':'rgba(255,255,255,0.5)',background:item.active?'rgba(212,175,55,0.1)':'transparent',borderLeft:item.active?'3px solid #d4af37':'3px solid transparent',textDecoration:'none',fontSize:'14px',fontWeight:item.active?'600':'400'}}>
              <span style={{fontSize:'18px'}}>{item.icon}</span>{item.label}
            </a>
          ))}
        </div>
      )}

      <div style={{marginLeft:isMobile?0:'240px',flex:1,padding:isMobile?'20px 16px 100px':'32px',position:'relative',zIndex:1}}>
        {isMobile && (
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
            <h1 style={{fontSize:'20px',fontWeight:'800',margin:0}}>Fidel<span style={{color:'#d4af37'}}>Easy</span></h1>
          </div>
        )}

        <div style={{marginBottom:'24px'}}>
          <h2 style={{fontSize:isMobile?'20px':'24px',fontWeight:'700',margin:'0 0 4px'}}>⚙️ Personnalisation</h2>
          <p style={{color:'rgba(255,255,255,0.4)',margin:0,fontSize:'14px'}}>Créez une carte unique pour votre commerce</p>
        </div>

        {success && (
          <div style={{background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:'10px',padding:'12px 16px',marginBottom:'20px',color:'#86efac',fontSize:'14px'}}>
            ✅ Carte mise à jour !
          </div>
        )}

        <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'1fr 1fr',gap:'20px'}}>
          <div>
            <div style={{display:'flex',gap:'6px',marginBottom:'16px',flexWrap:'wrap'}}>
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{background:activeTab===tab.id?'#d4af37':'rgba(255,255,255,0.06)',color:activeTab===tab.id?'white':'rgba(255,255,255,0.5)',border:'none',borderRadius:'8px',padding:'8px 14px',cursor:'pointer',fontSize:'12px',fontWeight:'600',transition:'all 0.2s'}}>
                  {tab.label}
                </button>
              ))}
            </div>

            <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'20px',backdropFilter:'blur(10px)',minHeight:'300px'}}>

              {activeTab === 'programme' && (
                <div>
                  <h3 style={{margin:'0 0 16px',fontSize:'15px',fontWeight:'600'}}>🎯 Type de programme</h3>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginBottom:'20px'}}>
                    <div onClick={() => setForm({...form, loyalty_type: 'stamps'})} style={{background:form.loyalty_type==='stamps'?'rgba(212,175,55,0.15)':'rgba(255,255,255,0.04)',border:form.loyalty_type==='stamps'?'2px solid #d4af37':'1px solid rgba(255,255,255,0.1)',borderRadius:'12px',padding:'16px',cursor:'pointer',textAlign:'center'}}>
                      <div style={{fontSize:'28px',marginBottom:'8px'}}>🎫</div>
                      <p style={{fontWeight:'600',margin:'0 0 4px',fontSize:'14px'}}>Tampons</p>
                      <p style={{fontSize:'11px',color:'rgba(255,255,255,0.4)',margin:0}}>Ex: 10 tampons = 1 café offert</p>
                    </div>
                    <div onClick={() => setForm({...form, loyalty_type: 'points'})} style={{background:form.loyalty_type==='points'?'rgba(212,175,55,0.15)':'rgba(255,255,255,0.04)',border:form.loyalty_type==='points'?'2px solid #d4af37':'1px solid rgba(255,255,255,0.1)',borderRadius:'12px',padding:'16px',cursor:'pointer',textAlign:'center'}}>
                      <div style={{fontSize:'28px',marginBottom:'8px'}}>⭐</div>
                      <p style={{fontWeight:'600',margin:'0 0 4px',fontSize:'14px'}}>Points</p>
                      <p style={{fontSize:'11px',color:'rgba(255,255,255,0.4)',margin:0}}>Ex: 1€ = 1 point</p>
                    </div>
                  </div>

                  {form.loyalty_type === 'stamps' && (
                    <div>
                      <label style={{fontSize:'12px',color:'rgba(255,255,255,0.5)',fontWeight:'600',textTransform:'uppercase',letterSpacing:'0.8px',display:'block',marginBottom:'8px'}}>Tampons pour récompense</label>
                      <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
                        {[5,8,10,12,15,20].map(n => (
                          <button key={n} onClick={() => setForm({...form,card_stamps_required:n})} style={{background:form.card_stamps_required===n?'#d4af37':'rgba(255,255,255,0.06)',color:form.card_stamps_required===n?'white':'rgba(255,255,255,0.6)',border:form.card_stamps_required===n?'none':'1px solid rgba(255,255,255,0.1)',borderRadius:'8px',padding:'8px 16px',cursor:'pointer',fontSize:'14px',fontWeight:'600'}}>
                            {n}
                          </button>
                        ))}
                      </div>
                      <p style={{fontSize:'12px',color:'rgba(255,255,255,0.3)',margin:'8px 0 0'}}>{form.card_stamps_required} tampons = 1 récompense</p>
                    </div>
                  )}

                  {form.loyalty_type === 'points' && (
                    <div>
                      <div style={{marginBottom:'16px'}}>
                        <label style={{fontSize:'12px',color:'rgba(255,255,255,0.5)',fontWeight:'600',textTransform:'uppercase',letterSpacing:'0.8px',display:'block',marginBottom:'8px'}}>Points par euro dépensé</label>
                        <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
                          {[1,2,5,10].map(n => (
                            <button key={n} onClick={() => setForm({...form,points_per_euro:n})} style={{background:form.points_per_euro===n?'#d4af37':'rgba(255,255,255,0.06)',color:form.points_per_euro===n?'white':'rgba(255,255,255,0.6)',border:form.points_per_euro===n?'none':'1px solid rgba(255,255,255,0.1)',borderRadius:'8px',padding:'8px 16px',cursor:'pointer',fontSize:'14px',fontWeight:'600'}}>
                              {n} pt/€
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label style={{fontSize:'12px',color:'rgba(255,255,255,0.5)',fontWeight:'600',textTransform:'uppercase',letterSpacing:'0.8px',display:'block',marginBottom:'8px'}}>Récompenses</label>
                        {form.rewards.map((reward, i) => (
                          <div key={i} style={{display:'flex',gap:'8px',marginBottom:'8px',alignItems:'center'}}>
                            <input type="number" value={reward.points} onChange={e => { const r=[...form.rewards]; r[i]={...r[i],points:parseInt(e.target.value)}; setForm({...form,rewards:r}); }} placeholder="Points" style={{width:'80px',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'8px',padding:'8px',color:'white',fontSize:'13px',outline:'none'}}/>
                            <span style={{color:'rgba(255,255,255,0.4)',fontSize:'13px'}}>pts =</span>
                            <input value={reward.reward} onChange={e => { const r=[...form.rewards]; r[i]={...r[i],reward:e.target.value}; setForm({...form,rewards:r}); }} placeholder="Ex: Café offert" style={{flex:1,background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'8px',padding:'8px',color:'white',fontSize:'13px',outline:'none'}}/>
                            <button onClick={() => setForm({...form,rewards:form.rewards.filter((_,j)=>j!==i)})} style={{background:'rgba(239,68,68,0.1)',color:'#fca5a5',border:'none',borderRadius:'6px',padding:'6px 10px',cursor:'pointer',fontSize:'12px'}}>✕</button>
                          </div>
                        ))}
                        <button onClick={() => setForm({...form,rewards:[...form.rewards,{points:100,reward:''}]})} style={{background:'rgba(212,175,55,0.1)',color:'#d4af37',border:'1px solid rgba(212,175,55,0.3)',borderRadius:'8px',padding:'8px 16px',cursor:'pointer',fontSize:'13px',marginTop:'4px'}}>
                          + Ajouter une récompense
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'couleur' && (
                <div>
                  <h3 style={{margin:'0 0 16px',fontSize:'15px',fontWeight:'600'}}>🎨 Couleur de fond</h3>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'10px'}}>
                    {COLORS.map(c => (
                      <div key={c.value} onClick={() => setForm({...form,card_color:c.value,card_background_style:'solid'})} style={{cursor:'pointer'}}>
                        <div style={{height:'44px',borderRadius:'10px',background:c.value,border:form.card_color===c.value&&form.card_background_style==='solid'?'2px solid #d4af37':'2px solid transparent',display:'flex',alignItems:'center',justifyContent:'center'}}>
                          {form.card_color===c.value&&form.card_background_style==='solid'&&<span style={{fontSize:'16px'}}>✓</span>}
                        </div>
                        <p style={{fontSize:'10px',color:'rgba(255,255,255,0.4)',textAlign:'center',margin:'4px 0 0'}}>{c.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}


              {activeTab === 'icone' && (
                <div>
                  <h3 style={{margin:'0 0 16px',fontSize:'15px',fontWeight:'600'}}>🏷️ Icône de tampon</h3>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:'8px',maxHeight:'250px',overflowY:'auto'}}>
                    {STAMP_ICONS.map(icon => (
                      <div key={icon.value} onClick={() => setForm({...form,card_stamp_icon:icon.value})} style={{width:'44px',height:'44px',borderRadius:'10px',background:form.card_stamp_icon===icon.value?'rgba(212,175,55,0.3)':'rgba(255,255,255,0.06)',border:form.card_stamp_icon===icon.value?'2px solid #d4af37':'2px solid transparent',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'22px',cursor:'pointer',transition:'all 0.2s'}}>
                        {icon.value}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'police' && (
                <div>
                  <h3 style={{margin:'0 0 16px',fontSize:'15px',fontWeight:'600'}}>✍️ Police d'écriture</h3>
                  <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                    {FONTS.map(f => (
                      <div key={f.value} onClick={() => setForm({...form,card_font:f.value})} style={{background:form.card_font===f.value?'rgba(212,175,55,0.1)':'rgba(255,255,255,0.04)',border:form.card_font===f.value?'1px solid rgba(212,175,55,0.4)':'1px solid rgba(255,255,255,0.08)',borderRadius:'10px',padding:'14px 16px',cursor:'pointer',transition:'all 0.2s'}}>
                        <p style={{fontFamily:f.value,fontSize:'16px',margin:'0 0 4px',color:'white'}}>{f.label}</p>
                        <p style={{fontFamily:f.value,fontSize:'12px',margin:0,color:'rgba(255,255,255,0.4)'}}>Café de la Plage · 7/10 tampons</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'general' && (
                <div>
                  <h3 style={{margin:'0 0 16px',fontSize:'15px',fontWeight:'600'}}>⚙️ Paramètres généraux</h3>
                  <div style={{marginBottom:'16px'}}>
                    <label style={{fontSize:'12px',color:'rgba(255,255,255,0.5)',fontWeight:'600',textTransform:'uppercase',letterSpacing:'0.8px',display:'block',marginBottom:'8px'}}>Nom affiché sur la carte</label>
                    <input value={form.card_logo_text} onChange={e => setForm({...form,card_logo_text:e.target.value})} placeholder="Nom de votre commerce" style={{width:'100%',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'8px',padding:'10px 12px',color:'white',fontSize:'14px',boxSizing:'border-box',outline:'none'}} onFocus={e=>e.target.style.borderColor='rgba(212,175,55,0.5)'} onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.1)'}/>
                  </div>
                </div>
              )}
            </div>

            <button onClick={save} disabled={saving} style={{width:'100%',marginTop:'16px',background:'#d4af37',color:'white',border:'none',borderRadius:'12px',padding:'14px',cursor:'pointer',fontSize:'15px',fontWeight:'700',boxShadow:'0 4px 16px rgba(212,175,55,0.3)',opacity:saving?0.7:1}}>
              {saving ? '⏳ Sauvegarde...' : '💾 Sauvegarder les modifications'}
            </button>
          </div>

          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'24px',backdropFilter:'blur(10px)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',position:isMobile?'static':'sticky',top:'32px',alignSelf:'flex-start'}}>
            <h3 style={{margin:'0 0 24px',fontSize:'15px',fontWeight:'600',alignSelf:'flex-start'}}>👁️ Aperçu en temps réel</h3>
            <div style={{width:'100%',maxWidth:'300px',background:cardBg,borderRadius:'20px',overflow:'hidden',border:'1px solid rgba(212,175,55,0.2)',boxShadow:'0 20px 60px rgba(0,0,0,0.5)',fontFamily:form.card_font}}>
              {form.card_image_url && <img src={form.card_image_url} alt="Commerce" style={{width:'100%',height:'100px',objectFit:'cover'}}/>}
              <div style={{padding:'20px'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
                  <span style={{fontSize:'14px',color:'rgba(255,255,255,0.8)',fontWeight:'700'}}>{form.card_logo_text || shop?.name || 'FidelEasy'}</span>
                  <span style={{fontSize:'20px'}}>🍎</span>
                </div>
                {form.loyalty_type === 'points' ? (
                  <div>
                    <div style={{fontSize:'28px',fontWeight:'800',color:'#d4af37',marginBottom:'4px'}}>0</div>
                    <div style={{fontSize:'12px',color:'rgba(255,255,255,0.5)',marginBottom:'12px'}}>Points — {form.points_per_euro} pt/€</div>
                    {form.rewards.length > 0 && (
                      <div style={{background:'rgba(212,175,55,0.1)',borderRadius:'8px',padding:'8px',fontSize:'11px',color:'#d4af37'}}>
                        🎁 Prochaine récompense : {form.rewards[0]?.points} pts = {form.rewards[0]?.reward}
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <div style={{display:'flex',gap:'5px',flexWrap:'wrap',marginBottom:'12px'}}>
                      {[...Array(Math.min(form.card_stamps_required, 15))].map((_,i) => (
                        <div key={i} style={{width:'20px',height:'20px',borderRadius:'50%',background:i===0?'rgba(212,175,55,0.9)':'rgba(255,255,255,0.15)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'10px'}}>
                          {i===0?form.card_stamp_icon:''}
                        </div>
                      ))}
                      {form.card_stamps_required > 15 && <span style={{fontSize:'10px',color:'rgba(255,255,255,0.3)',alignSelf:'center'}}>+{form.card_stamps_required-15}</span>}
                    </div>
                    <div style={{fontSize:'11px',color:'rgba(255,255,255,0.5)'}}>{form.card_stamps_required} tampons = 1 récompense</div>
                  </div>
                )}
                <div style={{fontSize:'11px',color:'rgba(255,255,255,0.4)',marginTop:'8px'}}>Prénom Nom</div>
              </div>
            </div>
            <p style={{fontSize:'11px',color:'rgba(255,255,255,0.3)',marginTop:'16px',textAlign:'center'}}>L'aperçu se met à jour en temps réel ✨</p>
          </div>
        </div>
      </div>

      {isMobile && (
        <div style={{position:'fixed',bottom:0,left:0,right:0,background:'rgba(10,10,24,0.95)',borderTop:'1px solid rgba(255,255,255,0.08)',display:'flex',justifyContent:'space-around',padding:'8px 0 20px',zIndex:100,backdropFilter:'blur(20px)'}}>
          {navItems.map(item => (
            <a key={item.href} href={item.href} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'4px',textDecoration:'none',padding:'6px 10px',color:item.active?'#d4af37':'rgba(255,255,255,0.4)'}}>
              <span style={{fontSize:'20px'}}>{item.icon}</span>
              <span style={{fontSize:'9px',fontWeight:item.active?'600':'400'}}>{item.label}</span>
            </a>
          ))}
        </div>
      )}

      <style>{`
        @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-30px)} }
        @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(20px)} }
        input::placeholder { color: rgba(255,255,255,0.25); }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}