import React from 'react'
import Watermark from './Watermark'

export default function Slide5Proof({ data }) {
  const G = '#22C55E'
  const proofs = data?.proofs || []

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

      <div style={{ position: 'absolute', top: 28, right: 32, fontSize: 13, color: 'rgba(255,255,255,0.3)', letterSpacing: 2 }}>05 / 06</div>

      <div style={{ position: 'relative', width: '100%', padding: '0 80px', zIndex: 5 }}>
        <div style={{ fontSize: 13, color: G, letterSpacing: 3, marginBottom: 24, textTransform: 'uppercase' }}>Social Proof</div>

        <div style={{ fontSize: 58, fontWeight: 700, color: '#fff', lineHeight: 1.15, marginBottom: 60, textTransform: 'uppercase' }}>
          {data?.headline || ''}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 40 }}>
          {proofs.map((p, i) => (
            <div key={i} style={{
              background: '#0a1a0e', border: '1px solid #0d2010',
              borderRadius: 18, padding: '30px 36px',
              display: 'flex', alignItems: 'center', gap: 28,
            }}>
              {/* Avatar */}
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: `rgba(34,197,94,0.15)`, border: `2px solid ${G}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, fontWeight: 700, color: G, flexShrink: 0,
              }}>
                {p.name?.[0] || '?'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 6 }}>
                  <span style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>{p.name}</span>
                  <span style={{
                    background: G, color: '#050f08', borderRadius: 6,
                    padding: '3px 12px', fontSize: 14, fontWeight: 700,
                  }}>{p.result}</span>
                </div>
                <div style={{ fontSize: 17, color: 'rgba(255,255,255,0.55)', lineHeight: 1.4 }}>"{p.note}"</div>
              </div>
            </div>
          ))}
        </div>

        {data?.note && (
          <div style={{
            textAlign: 'center', fontSize: 16,
            color: 'rgba(255,255,255,0.35)', letterSpacing: 1,
          }}>{data.note}</div>
        )}
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 4,
        background: `linear-gradient(90deg, transparent, ${G}, transparent)`,
      }} />
    </div>
  )
}
