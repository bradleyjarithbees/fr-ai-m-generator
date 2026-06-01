import React from 'react'
import Watermark from './Watermark'

export default function Slide2Problem({ data }) {
  const G = '#22C55E'
  const bubbles = data?.bubbles || ['', '', '']

  return (
    <div style={{
      width: 1080, height: 1080, background: '#050f08', position: 'relative',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Space Mono', monospace", overflow: 'hidden',
    }}>
      <Watermark />

      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(34,197,94,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div style={{ position: 'absolute', top: 28, right: 32, fontSize: 13, color: 'rgba(255,255,255,0.3)', letterSpacing: 2 }}>02 / 06</div>

      <div style={{ position: 'relative', width: '100%', padding: '0 80px', zIndex: 5 }}>
        {/* Label */}
        <div style={{ fontSize: 13, color: G, letterSpacing: 3, marginBottom: 24, textTransform: 'uppercase' }}>The Problem</div>

        {/* Headline */}
        <div style={{ fontSize: 58, fontWeight: 700, color: '#fff', lineHeight: 1.15, marginBottom: 60, textTransform: 'uppercase' }}>
          {data?.headline || ''}
        </div>

        {/* Pain bubbles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 56 }}>
          {bubbles.map((b, i) => (
            <div key={i} style={{
              background: '#0a1a0e', border: '1px solid #0d2010',
              borderRadius: 16, padding: '28px 36px',
              fontSize: 24, color: 'rgba(255,255,255,0.85)', lineHeight: 1.4,
              display: 'flex', alignItems: 'center', gap: 20,
              borderLeft: `4px solid ${G}`,
            }}>
              <span style={{ fontSize: 32 }}>{b.split(' ')[0]}</span>
              <span>{b.split(' ').slice(1).join(' ')}</span>
            </div>
          ))}
        </div>

        {/* Stat bar */}
        <div style={{
          background: 'rgba(34,197,94,0.08)', border: `1px solid rgba(34,197,94,0.2)`,
          borderRadius: 12, padding: '24px 36px',
          fontSize: 20, color: G, textAlign: 'center', letterSpacing: 1,
        }}>
          {data?.stat || ''}
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 4,
        background: `linear-gradient(90deg, transparent, ${G}, transparent)`,
      }} />
    </div>
  )
}
