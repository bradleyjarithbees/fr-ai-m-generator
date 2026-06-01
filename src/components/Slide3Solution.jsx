import React from 'react'
import Watermark from './Watermark'

export default function Slide3Solution({ data }) {
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

      <div style={{ position: 'absolute', top: 28, right: 32, fontSize: 13, color: 'rgba(255,255,255,0.3)', letterSpacing: 2 }}>03 / 06</div>

      <div style={{ position: 'relative', width: '100%', padding: '0 80px', zIndex: 5 }}>
        <div style={{ fontSize: 13, color: G, letterSpacing: 3, marginBottom: 20, textTransform: 'uppercase' }}>The Fix</div>

        <div style={{ fontSize: 52, fontWeight: 700, color: '#fff', lineHeight: 1.15, marginBottom: 12, textTransform: 'uppercase' }}>
          {data?.headline || ''}
        </div>
        <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', marginBottom: 48 }}>
          {data?.sub || ''}
        </div>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {items.map((item, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 24,
              background: '#0a1a0e', border: '1px solid #0d2010',
              borderRadius: 14, padding: '22px 30px',
            }}>
              {/* Step number */}
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: i === items.length - 1 ? G : 'rgba(34,197,94,0.12)',
                border: `2px solid ${G}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, fontWeight: 700,
                color: i === items.length - 1 ? '#050f08' : G,
                flexShrink: 0,
              }}>
                {i === items.length - 1 ? '✓' : i + 1}
              </div>
              <div style={{ fontSize: 26 }}>{item.e}</div>
              <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.85)', lineHeight: 1.3 }}>
                {item.t}
              </div>
              {i === items.length - 1 && (
                <div style={{
                  marginLeft: 'auto', background: G, color: '#050f08',
                  borderRadius: 8, padding: '6px 16px', fontSize: 13, fontWeight: 700,
                  whiteSpace: 'nowrap',
                }}>AI</div>
              )}
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
