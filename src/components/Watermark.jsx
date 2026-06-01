import React from 'react'

export default function Watermark() {
  return (
    <>
      <div style={{
        position: 'absolute', top: 28, left: 32,
        fontFamily: "'Space Mono', monospace", fontWeight: 700,
        fontSize: 18, color: '#22C55E', letterSpacing: 2, zIndex: 10,
      }}>
        FR_Ai_M
      </div>
      <div style={{
        position: 'absolute', bottom: 22, left: 0, right: 0, textAlign: 'center',
        fontFamily: "'Space Mono', monospace", fontSize: 10,
        color: 'rgba(255,255,255,0.35)', letterSpacing: 1, zIndex: 10,
      }}>
        Putting your family's frame in the future
      </div>
    </>
  )
}
