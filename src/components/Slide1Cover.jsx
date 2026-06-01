import React from 'react'
import Watermark from './Watermark'

export default function Slide1Cover({ data, coverPhoto, trigger }) {
  const G = '#22C55E'
  return (
    <div style={{
      width: 1080, height: 1080, background: '#050f08', position: 'relative',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Space Mono', monospace", overflow: 'hidden',
    }}>
      <Watermark />

      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(34,197,94,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.04) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Cover photo */}
      {coverPhoto && (
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${coverPhoto})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.18,
        }} />
      )}

      {/* Glow */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Slide number */}
      <div style={{
        position: 'absolute', top: 28, right: 32, fontSize: 13,
        color: 'rgba(255,255,255,0.3)', letterSpacing: 2,
      }}>01 / 06</div>

      <div style={{ position: 'relative', textAlign: 'center', padding: '0 80px', zIndex: 5 }}>
        {/* Hook stat */}
        <div style={{
          display: 'inline-block', background: 'rgba(34,197,94,0.12)',
          border: `1px solid rgba(34,197,94,0.3)`, borderRadius: 8,
          padding: '8px 20px', fontSize: 15, color: G, letterSpacing: 1,
          marginBottom: 40,
        }}>
          {data?.hook || ''}
        </div>

        {/* Headline */}
        <div style={{
          fontSize: 72, fontWeight: 700, lineHeight: 1.1,
          color: '#fff', marginBottom: 40, letterSpacing: -1,
          textTransform: 'uppercase',
        }}>
          {(data?.headline || '').split('\n').map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>

        {/* Sub */}
        <div style={{
          fontSize: 22, color: 'rgba(255,255,255,0.6)', marginBottom: 60, letterSpacing: 1,
        }}>
          {data?.sub || ''}
        </div>

        {/* CTA */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 14,
          background: G, borderRadius: 12,
          padding: '18px 40px', fontSize: 20, fontWeight: 700,
          color: '#050f08', letterSpacing: 1,
        }}>
          <span>COMMENT</span>
          <span style={{
            background: '#050f08', color: G, borderRadius: 8,
            padding: '4px 16px', fontSize: 20, fontWeight: 700,
          }}>{trigger || 'SAVE'}</span>
          <span>FOR THE FREE GUIDE</span>
        </div>
      </div>

      {/* Bottom accent */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 4,
        background: `linear-gradient(90deg, transparent, ${G}, transparent)`,
      }} />
    </div>
  )
}
