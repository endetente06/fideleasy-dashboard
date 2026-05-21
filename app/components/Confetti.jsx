"use client";
import { useEffect, useState } from 'react';

export default function Confetti({ active, onDone }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!active) return;
    const colors = ['#d4af37', '#22c55e', '#a855f7', '#3b82f6', '#ef4444', '#f97316', '#ec4899'];
    const newParticles = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      speedY: Math.random() * 3 + 2,
      speedX: (Math.random() - 0.5) * 4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      shape: Math.random() > 0.5 ? 'circle' : 'rect',
    }));
    setParticles(newParticles);
    const timer = setTimeout(() => {
      setParticles([]);
      onDone?.();
    }, 3000);
    return () => clearTimeout(timer);
  }, [active]);

  if (!particles.length) return null;

  return (
    <div style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:9999,overflow:'hidden'}}>
      {particles.map(p => (
        <div key={p.id} style={{
          position:'absolute',
          left:`${p.x}%`,
          top:`${p.y}%`,
          width:`${p.size}px`,
          height:`${p.size}px`,
          background:p.color,
          borderRadius:p.shape==='circle'?'50%':'2px',
          animation:`confetti-fall-${p.id % 5} 3s ease-in forwards`,
          transform:`rotate(${p.rotation}deg)`,
          opacity:1,
        }}/>
      ))}
      <div style={{
        position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',
        background:'rgba(0,0,0,0.8)',borderRadius:'20px',padding:'24px 32px',
        textAlign:'center',border:'1px solid rgba(212,175,55,0.4)',
        backdropFilter:'blur(20px)'
      }}>
        <div style={{fontSize:'48px',marginBottom:'8px'}}>🎉</div>
        <p style={{color:'white',fontWeight:'800',fontSize:'20px',margin:'0 0 4px'}}>Carte complète !</p>
        <p style={{color:'#d4af37',fontSize:'14px',margin:0}}>Récompense débloquée !</p>
      </div>
      <style>{`
        @keyframes confetti-fall-0 { to { transform: translateY(110vh) rotate(720deg); opacity:0; } }
        @keyframes confetti-fall-1 { to { transform: translateY(110vh) translateX(50px) rotate(-360deg); opacity:0; } }
        @keyframes confetti-fall-2 { to { transform: translateY(110vh) translateX(-50px) rotate(540deg); opacity:0; } }
        @keyframes confetti-fall-3 { to { transform: translateY(110vh) translateX(30px) rotate(-720deg); opacity:0; } }
        @keyframes confetti-fall-4 { to { transform: translateY(110vh) translateX(-30px) rotate(360deg); opacity:0; } }
      `}</style>
    </div>
  );
}