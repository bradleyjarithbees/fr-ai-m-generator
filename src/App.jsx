import React, { useState, useRef, useCallback } from 'react'
import Slide1Cover from './components/Slide1Cover'
import Slide2Problem from './components/Slide2Problem'
import Slide3Solution from './components/Slide3Solution'
import Slide4Result from './components/Slide4Result'
import Slide5Proof from './components/Slide5Proof'
import Slide6Outro from './components/Slide6Outro'

const G = '#22C55E'
const SLIDE_LABELS = ['Cover', 'Problem', 'Fix', 'Result', 'Proof', 'Outro']

function SlideWrapper({ children, index, slideRef }) {
  return (
    <div
      ref={slideRef}
      style={{
        width: 1080, height: 1080, flexShrink: 0,
        position: 'relative', overflow: 'hidden',
      }}
    >
      {children}
    </div>
  )
}

export default function App() {
  const [topic, setTopic] = useState('')
  const [trigger, setTrigger] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [slides, setSlides] = useState(null)
  const [coverPhoto, setCoverPhoto] = useState(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const [downloading, setDownloading] = useState(false)
  const [bulkDownloading, setBulkDownloading] = useState(false)

  const slideRefs = useRef([])
  const fileInputRef = useRef()

  const handleGenerate = async () => {
    if (!topic.trim() || !trigger.trim()) return
    setLoading(true)
    setError('')
    setSlides(null)
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: topic.trim(), trigger: trigger.trim() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Generation failed')
      setSlides(data)
      setActiveSlide(0)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCoverUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setCoverPhoto(ev.target.result)
    reader.readAsDataURL(file)
  }

  const downloadSlide = useCallback(async (index) => {
    const el = slideRefs.current[index]
    if (!el) return
    setDownloading(true)
    try {
      const { default: html2canvas } = await import('html2canvas')
      const canvas = await html2canvas(el, {
        width: 1080, height: 1080, scale: 1,
        backgroundColor: '#050f08',
        useCORS: true, allowTaint: true,
        logging: false,
      })
      const link = document.createElement('a')
      link.download = `fr-ai-m-slide-${index + 1}-${SLIDE_LABELS[index].toLowerCase()}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (e) {
      console.error(e)
    } finally {
      setDownloading(false)
    }
  }, [])

  const downloadAll = useCallback(async () => {
    setBulkDownloading(true)
    try {
      const { default: html2canvas } = await import('html2canvas')
      const JSZip = (await import('jszip')).default
      const zip = new JSZip()

      for (let i = 0; i < 6; i++) {
        const el = slideRefs.current[i]
        if (!el) continue
        const canvas = await html2canvas(el, {
          width: 1080, height: 1080, scale: 1,
          backgroundColor: '#050f08',
          useCORS: true, allowTaint: true,
          logging: false,
        })
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'))
        zip.file(`slide-${i + 1}-${SLIDE_LABELS[i].toLowerCase()}.png`, blob)
      }

      const content = await zip.generateAsync({ type: 'blob' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(content)
      link.download = 'fr-ai-m-carousel.zip'
      link.click()
    } catch (e) {
      console.error(e)
    } finally {
      setBulkDownloading(false)
    }
  }, [])

  const renderSlide = (index) => {
    if (!slides) return null
    const props = { trigger }
    const components = [
      <Slide1Cover data={slides.cover} coverPhoto={coverPhoto} trigger={trigger} />,
      <Slide2Problem data={slides.problem} />,
      <Slide3Solution data={slides.solution} />,
      <Slide4Result data={slides.result} />,
      <Slide5Proof data={slides.proof} />,
      <Slide6Outro data={slides.outro} trigger={trigger} />,
    ]
    return components[index]
  }

  return (
    <div style={{ minHeight: '100vh', background: '#050f08', fontFamily: "'Space Mono', monospace", color: '#fff' }}>

      {/* Header */}
      <div style={{
        borderBottom: '1px solid #0d2010', padding: '20px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <span style={{ color: G, fontWeight: 700, fontSize: 20, letterSpacing: 2 }}>FR_Ai_M</span>
          <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, marginLeft: 12, letterSpacing: 1 }}>
            Content Generator
          </span>
        </div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: 1 }}>
          Putting your family's frame in the future
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 20px 80px' }}>

        {/* Input section */}
        <div style={{
          background: '#0a1a0e', border: '1px solid #0d2010',
          borderRadius: 20, padding: '32px', marginBottom: 40,
        }}>
          <div style={{ fontSize: 13, color: G, letterSpacing: 3, marginBottom: 24, textTransform: 'uppercase' }}>
            Generate Carousel
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', letterSpacing: 2, display: 'block', marginBottom: 8 }}>
                TOPIC
              </label>
              <input
                value={topic}
                onChange={e => setTopic(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleGenerate()}
                placeholder="e.g. how to save money on food shopping"
                style={{
                  width: '100%', background: '#050f08', border: '1px solid #0d2010',
                  borderRadius: 12, padding: '14px 18px', color: '#fff',
                  fontFamily: "'Space Mono', monospace", fontSize: 15, outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', letterSpacing: 2, display: 'block', marginBottom: 8 }}>
                COMMENT TRIGGER WORD
              </label>
              <input
                value={trigger}
                onChange={e => setTrigger(e.target.value.toUpperCase())}
                placeholder="e.g. SAVE"
                style={{
                  width: '100%', background: '#050f08', border: '1px solid #0d2010',
                  borderRadius: 12, padding: '14px 18px', color: G,
                  fontFamily: "'Space Mono', monospace", fontSize: 20, fontWeight: 700,
                  letterSpacing: 4, outline: 'none',
                }}
              />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading || !topic.trim() || !trigger.trim()}
            style={{
              width: '100%', background: loading ? 'rgba(34,197,94,0.3)' : G,
              border: 'none', borderRadius: 14, padding: '18px',
              color: '#050f08', fontFamily: "'Space Mono', monospace",
              fontWeight: 700, fontSize: 18, cursor: loading ? 'not-allowed' : 'pointer',
              letterSpacing: 2, transition: 'all 0.2s',
            }}
          >
            {loading ? '⏳ GENERATING...' : '⚡ GENERATE CAROUSEL'}
          </button>

          {error && (
            <div style={{
              marginTop: 16, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: 10, padding: '12px 16px', fontSize: 14, color: '#f87171',
            }}>
              {error}
            </div>
          )}
        </div>

        {slides && (
          <>
            {/* Cover photo upload */}
            <div style={{
              background: '#0a1a0e', border: '1px solid #0d2010',
              borderRadius: 16, padding: '20px 24px', marginBottom: 32,
              display: 'flex', alignItems: 'center', gap: 16,
            }}>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleCoverUpload} style={{ display: 'none' }} />
              <button
                onClick={() => fileInputRef.current.click()}
                style={{
                  background: 'rgba(34,197,94,0.1)', border: `1px solid rgba(34,197,94,0.3)`,
                  borderRadius: 10, padding: '10px 20px', color: G,
                  fontFamily: "'Space Mono', monospace", fontSize: 13,
                  fontWeight: 700, cursor: 'pointer', letterSpacing: 1,
                }}
              >
                📷 UPLOAD COVER PHOTO
              </button>
              {coverPhoto && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <img src={coverPhoto} alt="cover" style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover', border: `2px solid ${G}` }} />
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Cover photo applied to slide 1</span>
                </div>
              )}
            </div>

            {/* Slide tabs */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
              {SLIDE_LABELS.map((label, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  style={{
                    background: activeSlide === i ? G : '#0a1a0e',
                    border: `1px solid ${activeSlide === i ? G : '#0d2010'}`,
                    borderRadius: 10, padding: '8px 18px',
                    color: activeSlide === i ? '#050f08' : 'rgba(255,255,255,0.5)',
                    fontFamily: "'Space Mono', monospace", fontSize: 12,
                    fontWeight: 700, cursor: 'pointer', letterSpacing: 1,
                    transition: 'all 0.15s',
                  }}
                >
                  {i + 1}. {label}
                </button>
              ))}
            </div>

            {/* Slide preview — scaled down for screen */}
            <div style={{
              background: '#0a1a0e', border: '1px solid #0d2010',
              borderRadius: 20, padding: 24, marginBottom: 20,
              display: 'flex', justifyContent: 'center', alignItems: 'center',
            }}>
              {/* This outer div clips the scaled slide */}
              <div style={{ position: 'relative', width: '100%', maxWidth: 540 }}>
                <div style={{
                  width: 540, height: 540, overflow: 'hidden',
                  borderRadius: 12, position: 'relative',
                }}>
                  {/* Scale 1080→540 */}
                  <div style={{
                    transform: 'scale(0.5)', transformOrigin: 'top left',
                    width: 1080, height: 1080, position: 'absolute', top: 0, left: 0,
                  }}>
                    <div ref={el => slideRefs.current[activeSlide] = el}>
                      {renderSlide(activeSlide)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hidden real-size slides for download capture */}
            <div style={{ position: 'absolute', left: -9999, top: 0, pointerEvents: 'none' }}>
              {[0, 1, 2, 3, 4, 5].filter(i => i !== activeSlide).map(i => (
                <div key={i} ref={el => slideRefs.current[i] = el}>
                  {renderSlide(i)}
                </div>
              ))}
            </div>

            {/* Download buttons */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 40, flexWrap: 'wrap' }}>
              <button
                onClick={() => downloadSlide(activeSlide)}
                disabled={downloading}
                style={{
                  flex: 1, minWidth: 200,
                  background: G, border: 'none', borderRadius: 14, padding: '16px',
                  color: '#050f08', fontFamily: "'Space Mono', monospace",
                  fontWeight: 700, fontSize: 15, cursor: downloading ? 'not-allowed' : 'pointer',
                  letterSpacing: 1, opacity: downloading ? 0.6 : 1,
                }}
              >
                {downloading ? '⏳ SAVING...' : `⬇ DOWNLOAD SLIDE ${activeSlide + 1}`}
              </button>
              <button
                onClick={downloadAll}
                disabled={bulkDownloading}
                style={{
                  flex: 1, minWidth: 200,
                  background: '#0a1a0e', border: `1px solid ${G}`,
                  borderRadius: 14, padding: '16px',
                  color: G, fontFamily: "'Space Mono', monospace",
                  fontWeight: 700, fontSize: 15, cursor: bulkDownloading ? 'not-allowed' : 'pointer',
                  letterSpacing: 1, opacity: bulkDownloading ? 0.6 : 1,
                }}
              >
                {bulkDownloading ? '⏳ ZIPPING...' : '📦 DOWNLOAD ALL 6'}
              </button>
            </div>

            {/* Caption section */}
            <div style={{
              background: '#0a1a0e', border: '1px solid #0d2010',
              borderRadius: 20, padding: '28px', marginBottom: 20,
            }}>
              <div style={{ fontSize: 12, color: G, letterSpacing: 3, marginBottom: 16, textTransform: 'uppercase' }}>
                Caption
              </div>
              <div style={{
                fontSize: 15, color: 'rgba(255,255,255,0.75)',
                lineHeight: 1.7, whiteSpace: 'pre-wrap',
              }}>
                {slides.caption}
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(slides.caption)}
                style={{
                  marginTop: 16, background: 'rgba(34,197,94,0.1)',
                  border: '1px solid rgba(34,197,94,0.3)', borderRadius: 8,
                  padding: '8px 18px', color: G,
                  fontFamily: "'Space Mono', monospace", fontSize: 12,
                  cursor: 'pointer', letterSpacing: 1,
                }}
              >
                COPY CAPTION
              </button>
            </div>

            {/* Hashtags */}
            <div style={{
              background: '#0a1a0e', border: '1px solid #0d2010',
              borderRadius: 20, padding: '28px', marginBottom: 20,
            }}>
              <div style={{ fontSize: 12, color: G, letterSpacing: 3, marginBottom: 16, textTransform: 'uppercase' }}>
                Hashtags
              </div>
              <div style={{
                fontSize: 14, color: 'rgba(255,255,255,0.55)',
                lineHeight: 2, wordBreak: 'break-word',
              }}>
                {slides.hashtags}
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(slides.hashtags)}
                style={{
                  marginTop: 16, background: 'rgba(34,197,94,0.1)',
                  border: '1px solid rgba(34,197,94,0.3)', borderRadius: 8,
                  padding: '8px 18px', color: G,
                  fontFamily: "'Space Mono', monospace", fontSize: 12,
                  cursor: 'pointer', letterSpacing: 1,
                }}
              >
                COPY HASHTAGS
              </button>
            </div>

            {/* DM Script */}
            <div style={{
              background: '#0a1a0e', border: '1px solid #0d2010',
              borderRadius: 20, padding: '28px',
            }}>
              <div style={{ fontSize: 12, color: G, letterSpacing: 3, marginBottom: 16, textTransform: 'uppercase' }}>
                DM Script + AI Prompts
              </div>
              <div style={{
                fontSize: 14, color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.8, whiteSpace: 'pre-wrap',
              }}>
                {slides.dm}
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(slides.dm)}
                style={{
                  marginTop: 16, background: 'rgba(34,197,94,0.1)',
                  border: '1px solid rgba(34,197,94,0.3)', borderRadius: 8,
                  padding: '8px 18px', color: G,
                  fontFamily: "'Space Mono', monospace", fontSize: 12,
                  cursor: 'pointer', letterSpacing: 1,
                }}
              >
                COPY DM SCRIPT
              </button>
            </div>
          </>
        )}

        {!slides && !loading && (
          <div style={{
            textAlign: 'center', padding: '60px 20px',
            color: 'rgba(255,255,255,0.2)', fontSize: 15, letterSpacing: 2,
          }}>
            Enter a topic and trigger word to generate your carousel
          </div>
        )}
      </div>
    </div>
  )
}
