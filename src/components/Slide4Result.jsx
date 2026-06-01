import React from 'react'
import Watermark from './Watermark'

export default function Slide4Result({ data }) {
  const G = '#22C55E'
  const items = data?.items || []

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

      <div style={{ position: 'absolute', top: 28, right: 32, fontSize: 13, color: 'rgba(255,255,255,0.3)', letterSpacing: 2 }}>04 / 06</div>

      <div style={{ position: 'relative', width: '100%', padding: '0 80px', zIndex: 5 }}>
        <div style={{ fontSize: 13, color: G, letterSpacing: 3, marginBottom: 24, textTransform: 'uppercase' }}>The Result</div>

        <div style={{ fontSize: 58, fontWeight: 700, color: '#fff', lineHeight: 1.15, marginBottom: 56, textTransform: 'uppercase' }}>
          {data?.headline || ''}
        </div>

        {/* 2x2 outcome cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {items.map((item, i) => (
            <div key={i} style={{
              background: '#0a1a0e', border: '1px solid #0d2010',
              borderRadius: 20, padding: '36px 32px',
              display: 'flex', flexDirection: 'column', gap: 12,
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                background: `linear-gradient(90deg, ${G}, transparent)`,
              }} />
              <div style={{ fontSize: 40 }}>{item.e}</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>{item.t}</div>
              <div style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>{item.s}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 4,
        background: `linear-gradient(90deg, transparent, ${G}, transparent)`,
      }} />
    </div>
  )
}
