import React from 'react'
import Watermark from './Watermark'

export default function Slide6Outro({ data, trigger }) {
  const G = '#22C55E'
  const promises = (data?.promise || '').split('|').map(s => s.trim()).filter(Boolean)

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

      {/* Glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'absolute', top: 28, right: 32, fontSize: 13, color: 'rgba(255,255,255,0.3)', letterSpacing: 2 }}>06 / 06</div>

      <div style={{ position: 'relative', width: '100%', padding: '0 80px', zIndex: 5, textAlign: 'center' }}>
        {/* Save badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 12,
          background: 'rgba(34,197,94,0.1)', border: `1px solid rgba(34,197,94,0.3)`,
          borderRadius: 50, padding: '12px 28px',
          fontSize: 16, color: G, letterSpacing: 2, marginBottom: 40,
        }}>
          <span>🔖</span> SAVE THIS POST
        </div>

        {/* Headline */}
        <div style={{ fontSize: 62, fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: 20, textTransform: 'uppercase' }}>
          {data?.headline || ''}
        </div>
        <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.55)', marginBottom: 48 }}>
          {data?.sub || ''}
        </div>

        {/* Comment trigger box */}
        <div style={{
          background: '#0a1a0e', border: `2px solid ${G}`,
          borderRadius: 20, padding: '32px 40px', marginBottom: 40,
        }}>
          <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', marginBottom: 16, letterSpacing: 1 }}>
            COMMENT BELOW TO GET YOURS FREE:
          </div>
          <div style={{
            fontSize: 52, fontWeight: 700, color: G, letterSpacing: 4,
          }}>{trigger || 'SAVE'}</div>
        </div>

        {/* Promise list */}
        {promises.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
            {promises.map((p, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                fontSize: 16, color: 'rgba(255,255,255,0.6)',
              }}>
                <span style={{ color: G }}>✓</span> {p}
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 4,
        background: `linear-gradient(90deg, transparent, ${G}, transparent)`,
      }} />
    </div>
  )
}
