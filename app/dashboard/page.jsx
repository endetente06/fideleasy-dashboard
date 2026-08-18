"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '../context/ThemeContext';
import Sidebar from '../components/Sidebar';
import Loader from '../components/Loader';

const API = 'https://fideleasy-backend-production.up.railway.app';

export default function Dashboard() {
  const [stats, setStats] = useState({ clients: 0, cards: 0, notifications: 0, stamps: 0 });
  const [recentClients, setRecentClients] = useState([]);
  const [proStats, setProStats] = useState(null);
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const theme = useTheme();
  const router = useRouter();

  const isDark = theme.bg === '#0a0a18' || theme.bg?.includes('0a0a');

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const shopData = localStorage.getItem('shop');
    if (!shopData) { router.push('/login'); return; }
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
    }).catch(err => {
      console.error('Erreur chargement dashboard:', err);
    }).finally(() => setLoading(false));

    if (s.plan === 'pro' || s.plan === 'business') {
      fetch(`${API}/stats/${shopId}`).then(r => r.json()).then(d => setProStats(d)).catch(() => {});
    }
  }, []);

  if (loading) return <Loader />;

  const bg = isDark ? '#0f0f12' : '#f5f4f1';
  const surface = isDark ? '#18181b' : '#ffffff';
  const surfaceHover = isDark ? '#1f1f23' : '#f9f8f6';
  const border = isDark ? '#27272a' : '#e4e2dc';
  const text = isDark ? '#fafafa' : '#18181b';
  const textMuted = isDark ? '#71717a' : '#a1a1aa';
  const accent = '#d4af37';

  const statCards = [
    { label: 'Clients', value: stats.clients },
    { label: 'Tampons', value: stats.stamps, accent: true },
    { label: 'Cartes actives', value: stats.cards },
    { label: 'Notifications', value: stats.notifications },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: bg, color: text, fontFamily: 'system-ui,-apple-system,sans-serif' }}>
      <Sidebar activePage="/dashboard" />

      <div style={{ marginLeft: isMobile ? 0 : '240px', flex: 1, padding: isMobile ? '20px 16px 100px' : '40px 32px', maxWidth: '1200px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: '500', margin: '0 0 4px', color: text }}>Tableau de bord</h1>
            <p style={{ margin: 0, fontSize: '13px', color: textMuted }}>
              {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
          {!isMobile && (
            <div style={{ display: 'flex', gap: '8px' }}>
              <a href="/qrcode" style={{ border: `0.5px solid ${border}`, borderRadius: '6px', padding: '8px 16px', fontSize: '13px', color: text, textDecoration: 'none', background: surface }}>
                Mon QR Code
              </a>
              <a href="/clients" style={{ background: accent, borderRadius: '6px', padding: '8px 16px', fontSize: '13px', color: '#000', fontWeight: '500', textDecoration: 'none' }}>
                + Ajouter un client
              </a>
            </div>
          )}
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: '12px', marginBottom: '24px' }}>
          {statCards.map(card => (
            <div key={card.label} style={{ background: surface, border: `0.5px solid ${border}`, borderRadius: '8px', padding: '20px' }}>
              <p style={{ margin: '0 0 8px', fontSize: '11px', color: textMuted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>{card.label}</p>
              <p style={{ margin: 0, fontSize: '28px', fontWeight: '500', color: card.accent ? accent : text }}>{card.value}</p>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '12px', marginBottom: '12px' }}>

          {/* Derniers clients */}
          <div style={{ background: surface, border: `0.5px solid ${border}`, borderRadius: '8px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <p style={{ margin: 0, fontSize: '13px', fontWeight: '500', color: text }}>Derniers clients</p>
              <a href="/clients" style={{ fontSize: '12px', color: accent, textDecoration: 'none' }}>Voir tous →</a>
            </div>
            {recentClients.length === 0 ? (
              <p style={{ color: textMuted, fontSize: '13px', margin: 0 }}>Aucun client pour l'instant</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {recentClients.map((client, i) => (
                  <div key={client.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: i < recentClients.length - 1 ? `0.5px solid ${border}` : 'none' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: isDark ? '#27272a' : '#f0ede6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '500', color: accent, flexShrink: 0 }}>
                      {client.name?.charAt(0).toUpperCase()}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, fontSize: '13px', fontWeight: '500', color: text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{client.name}</p>
                      <p style={{ margin: 0, fontSize: '11px', color: textMuted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{client.email || client.phone || '—'}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions rapides */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ background: surface, border: `0.5px solid ${border}`, borderRadius: '8px', padding: '20px' }}>
              <p style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: '500', color: text }}>Actions rapides</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { label: 'Gérer mes clients', href: '/clients' },
                  { label: 'Tamponner un client', href: '/clients' },
                  { label: 'Envoyer une notification', href: '/notifications' },
                  { label: 'Afficher mon QR Code', href: '/qrcode' },
                ].map(action => (
                  <a key={action.label} href={action.href} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: surfaceHover, border: `0.5px solid ${border}`, borderRadius: '6px', textDecoration: 'none', color: text, fontSize: '13px' }}>
                    {action.label}
                    <span style={{ color: textMuted }}>→</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Mon plan */}
            <div style={{ background: surface, border: `0.5px solid ${border}`, borderRadius: '8px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <p style={{ margin: 0, fontSize: '13px', fontWeight: '500', color: text }}>Mon plan</p>
                <span style={{ background: isDark ? '#27272a' : '#f0ede6', color: accent, borderRadius: '4px', padding: '3px 10px', fontSize: '11px', fontWeight: '500', textTransform: 'capitalize' }}>{shop?.plan || 'Starter'}</span>
              </div>
              {shop?.plan === 'starter' && (
                <button onClick={async () => {
                  const res = await fetch(`${API}/stripe/checkout`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ plan: 'pro', shop_id: shop.id }) });
                  const data = await res.json();
                  if (data.url) window.location.href = data.url;
                }} style={{ width: '100%', background: accent, border: 'none', borderRadius: '6px', padding: '9px', fontSize: '13px', fontWeight: '500', color: '#000', cursor: 'pointer', marginTop: '4px' }}>
                  Passer au Pro →
                </button>
              )}
              {shop?.plan === 'pro' && (
                <button onClick={async () => {
                  const res = await fetch(`${API}/stripe/checkout`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ plan: 'business', shop_id: shop.id }) });
                  const data = await res.json();
                  if (data.url) window.location.href = data.url;
                }} style={{ width: '100%', background: 'transparent', border: `0.5px solid ${border}`, borderRadius: '6px', padding: '9px', fontSize: '13px', color: text, cursor: 'pointer', marginTop: '4px' }}>
                  Passer au Business →
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Stats Pro */}
        {(shop?.plan === 'pro' || shop?.plan === 'business') && proStats && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: '12px' }}>
              {[
                { label: 'Tampons cette semaine', value: proStats.weekStamps },
                { label: 'Taux de rétention', value: `${proStats.retentionRate}%` },
                { label: 'Cartes complétées', value: proStats.completedCards },
                { label: 'Tampons ce mois', value: proStats.monthStamps },
              ].map(card => (
                <div key={card.label} style={{ background: surface, border: `0.5px solid ${border}`, borderRadius: '8px', padding: '20px' }}>
                  <p style={{ margin: '0 0 8px', fontSize: '11px', color: textMuted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>{card.label}</p>
                  <p style={{ margin: 0, fontSize: '24px', fontWeight: '500', color: text }}>{card.value}</p>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '12px' }}>
              {/* Graphique semaine */}
              <div style={{ background: surface, border: `0.5px solid ${border}`, borderRadius: '8px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: '500', color: text }}>Tampons cette semaine</p>
                  <span style={{ fontSize: '12px', color: proStats.weekGrowth >= 0 ? '#22c55e' : '#ef4444' }}>
                    {proStats.weekGrowth >= 0 ? '+' : ''}{proStats.weekGrowth}%
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '80px' }}>
                  {proStats.stampsByDay.map((d, i) => {
                    const max = Math.max(...proStats.stampsByDay.map(x => x.count), 1);
                    const height = Math.max((d.count / max) * 70, 3);
                    const today = new Date().getDay();
                    return (
                      <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                        <div style={{ width: '100%', height: `${height}px`, background: i === today ? accent : (isDark ? '#27272a' : '#e4e2dc'), borderRadius: '3px' }} />
                        <span style={{ fontSize: '9px', color: i === today ? accent : textMuted }}>{d.day}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Top clients */}
              <div style={{ background: surface, border: `0.5px solid ${border}`, borderRadius: '8px', padding: '20px' }}>
                <p style={{ margin: '0 0 16px', fontSize: '13px', fontWeight: '500', color: text }}>Top clients</p>
                {proStats.topClients.length === 0 ? (
                  <p style={{ color: textMuted, fontSize: '13px', margin: 0 }}>Aucun client pour l'instant</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {proStats.topClients.map((card, i) => (
                      <div key={card.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '12px', color: i === 0 ? accent : textMuted, width: '20px', flexShrink: 0 }}>#{i + 1}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ height: '4px', borderRadius: '2px', background: isDark ? '#27272a' : '#e4e2dc', overflow: 'hidden' }}>
                            <div style={{ height: '100%', background: accent, width: `${Math.min(((card.stamps || 0) / (shop?.card_stamps_required || 10)) * 100, 100)}%`, borderRadius: '2px' }} />
                          </div>
                        </div>
                        <span style={{ fontSize: '12px', color: textMuted, flexShrink: 0 }}>{card.stamps || 0} pts</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Clients inactifs */}
            {proStats.inactiveCount > 0 && (
              <div style={{ background: surface, border: `0.5px solid ${border}`, borderRadius: '8px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <p style={{ margin: '0 0 2px', fontSize: '13px', fontWeight: '500', color: text }}>{proStats.inactiveCount} client{proStats.inactiveCount > 1 ? 's' : ''} inactif{proStats.inactiveCount > 1 ? 's' : ''}</p>
                  <p style={{ margin: 0, fontSize: '12px', color: textMuted }}>Sans tampon depuis 30 jours</p>
                </div>
                <a href="/notifications" style={{ background: 'transparent', border: `0.5px solid ${border}`, borderRadius: '6px', padding: '8px 16px', fontSize: '13px', color: text, textDecoration: 'none' }}>
                  Envoyer une offre →
                </a>
              </div>
            )}

            {/* Business export */}
            {shop?.plan === 'business' && (
              <div style={{ background: surface, border: `0.5px solid ${border}`, borderRadius: '8px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <p style={{ margin: '0 0 2px', fontSize: '13px', fontWeight: '500', color: text }}>Export données</p>
                  <p style={{ margin: 0, fontSize: '12px', color: textMuted }}>CA estimé : {proStats.estimatedRevenue}€</p>
                </div>
                <button onClick={async () => {
                  const shopData = localStorage.getItem('shop');
                  const shopId = JSON.parse(shopData).id;
                  const res = await fetch(`${API}/customers/${shopId}`);
                  const data = await res.json();
                  const clients = data.data || [];
                  const csv = ['Nom,Email,Téléphone', ...clients.map(c => `${c.name},${c.email || ''},${c.phone || ''}`)].join('\n');
                  const blob = new Blob([csv], { type: 'text/csv' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'clients-fideleasy.csv';
                  a.click();
                }} style={{ background: 'transparent', border: `0.5px solid ${border}`, borderRadius: '6px', padding: '8px 16px', fontSize: '13px', color: text, cursor: 'pointer' }}>
                  Télécharger CSV
                </button>
              </div>
            )}
          </div>
        )}

        {/* Mobile CTA */}
        {isMobile && (
          <a href="/clients" style={{ display: 'block', textAlign: 'center', background: accent, borderRadius: '8px', padding: '14px', textDecoration: 'none', fontSize: '14px', fontWeight: '500', color: '#000', marginTop: '16px' }}>
            + Ajouter un client
          </a>
        )}
      </div>
    </div>
  );
}