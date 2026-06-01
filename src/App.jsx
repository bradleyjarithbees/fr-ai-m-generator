import React, { useState, useRef, useCallback } from 'react'
import Slide1Cover from './components/Slide1Cover'
import Slide2Problem from './components/Slide2Problem'
import Slide3Solution from './components/Slide3Solution'
import Slide4Result from './components/Slide4Result'
import Slide5Proof from './components/Slide5Proof'
import Slide6Outro from './components/Slide6Outro'

const G = '#22C55E'
const SLIDE_LABELS = ['Cover', 'Problem', 'Fix', 'Result', 'Proof', 'Outro']

const QUICK_STARTS = [
  {
    label: '✈️ Holiday',
    topic: 'how to find the best family holiday deals using AI',
    trigger: 'HOLIDAY',
    dm: `⚡ IMPORTANT — DO THIS FIRST

For these prompts to find REAL results with live prices you need web search turned on:

✅ ChatGPT — tap the globe 🌐 icon before typing
✅ Perplexity.ai — free app, searches live automatically (recommended)

Without web search the AI will guess. With it — it finds real results.

---

✈️ PROMPT 1 — Find a Family Holiday Deal

Search the web right now and find me real family holiday packages available to book today. Search TUI, Jet2, On the Beach, Love Holidays and Skyscanner.

My details:
- Travelling from: [your nearest airport]
- Month: [preferred month]
- Duration: [e.g. 7 nights]
- Budget: £[total budget] for [number of people]
- Destination ideas: [e.g. Spain, Turkey, Greece]

Only show me real results you have found. Do not guess or make anything up.

---

✈️ PROMPT 2 — Find the Cheapest Flights

Search the web right now and find me real cheap flights available to book today. Search Skyscanner and Jet2.

My details:
- Travelling from: [your airport]
- Destination: [where you want to go]
- Dates: [flexible dates or exact]
- Passengers: [number of adults + children ages]

Only show me real results you have found. Do not guess or make anything up.

---

🏡 PROMPT 3 — Find a UK Staycation Break

Search the web right now and find me real UK holiday cottages or breaks available to book. Search Sykes Cottages, Airbnb and Cottages.com.

My details:
- Location preference: [e.g. Lake District, Cornwall, Scotland]
- Dates: [your dates]
- Budget: £[total] for [number of nights]
- Group size: [number of people]

Only show me real results you have found. Do not guess or make anything up.

---

💡 BONUS TIP: Open Perplexity.ai and ask: "Find me the cheapest family holiday packages departing [your airport] in [your month] under £[budget] per person" — it searches live right now and shows you real prices.`,
  },
  {
    label: '💰 Pay Rise',
    topic: 'how to use AI to get a pay rise',
    trigger: 'PAYRISE',
    dm: `⚡ IMPORTANT — DO THIS FIRST

For these prompts to find REAL results with live prices you need web search turned on:

✅ ChatGPT — tap the globe 🌐 icon before typing
✅ Perplexity.ai — free app, searches live automatically (recommended)

Without web search the AI will guess. With it — it finds real results.

---

💰 PROMPT 1 — Find Out What You Should Be Earning

Search the web right now and find me real current salary data for my job role. Search Indeed, LinkedIn and Glassdoor.

My details:
- Job title: [your exact job title]
- Location: [your city or region]
- Years of experience: [number]
- Industry: [your industry]

Only show me real results you have found. Do not guess or make anything up.

---

💰 PROMPT 2 — Find Higher Paying Jobs I Could Switch To

Search the web right now and find me real job listings paying more than my current salary. Search Indeed, LinkedIn, Glassdoor and Reed.

My details:
- Current job title: [your title]
- Current salary: £[your salary]
- Location: [your city] or willing to commute [radius]
- Key skills: [list your top skills]

Only show me real results you have found. Do not guess or make anything up.

---

💰 PROMPT 3 — Write My Pay Rise Request

Write me a professional pay rise request email to send to my manager. Use the market rate data I found above to support my case.

My details:
- Current role: [your role]
- Current salary: £[your salary]
- Time since last pay review: [e.g. 18 months]
- My biggest wins this year: [list 3 achievements]
- Market rate I found: £[figure from Prompt 1]

---

💡 BONUS TIP: Open Perplexity.ai and ask: "What is the average salary for a [your job title] in [your city] in 2025?" — it searches live job boards and gives you real figures to take into your negotiation.`,
  },
  {
    label: '🎂 Birthday Party',
    topic: 'how to plan the perfect birthday party using AI',
    trigger: 'PARTY',
    dm: `⚡ IMPORTANT — DO THIS FIRST

For these prompts to find REAL results with live prices you need web search turned on:

✅ ChatGPT — tap the globe 🌐 icon before typing
✅ Perplexity.ai — free app, searches live automatically (recommended)

Without web search the AI will guess. With it — it finds real results.

---

🎂 PROMPT 1 — Find Party Venues Near Me

Search the web right now and find me real birthday party venues available to book. Search Google Maps and Eventbrite.

My details:
- Location: [your town or city]
- Party date: [your date]
- Number of guests: [number]
- Age of birthday person: [age]
- Budget for venue: £[budget]

Only show me real results you have found. Do not guess or make anything up.

---

🎂 PROMPT 2 — Find Party Food and Cake Deals

Search the web right now and find me real deals on party food and birthday cakes available now. Search Google Shopping, Amazon and bakeries on Google Maps.

My details:
- Number of guests: [number]
- Dietary needs: [any allergies or requirements]
- Food budget: £[budget]
- Cake theme or flavour: [your choice]

Only show me real results you have found. Do not guess or make anything up.

---

🎂 PROMPT 3 — Plan the Whole Party on a Budget

Create me a complete birthday party plan with a full budget breakdown, shopping list and timeline.

My details:
- Total budget: £[budget]
- Number of guests: [number]
- Age group: [children / adults / mixed]
- Theme: [your theme or "help me choose"]
- Venue preference: [home / hired venue / outdoor]

Include money-saving tips to cut costs without cutting corners.

---

💡 BONUS TIP: Open Perplexity.ai and ask: "What are the best budget birthday party ideas for a [age] year old in [your location] in 2025?" — it finds real local venues and the latest ideas right now.`,
  },
]

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
  const [quickStartDM, setQuickStartDM] = useState('')
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
    setQuickStartDM('')
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

          {/* Quick-start buttons */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
            {QUICK_STARTS.map((qs) => (
              <button
                key={qs.trigger}
                onClick={() => { setTopic(qs.topic); setTrigger(qs.trigger); setQuickStartDM(qs.dm) }}
                style={{
                  background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)',
                  borderRadius: 10, padding: '10px 20px', color: G,
                  fontFamily: "'Space Mono', monospace", fontSize: 13,
                  fontWeight: 700, cursor: 'pointer', letterSpacing: 1,
                  transition: 'all 0.15s',
                }}
              >
                {qs.label}
              </button>
            ))}
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

        {/* Quick-start DM preview — shown immediately on button click, before generating */}
        {quickStartDM && !slides && (
          <div style={{
            background: '#0a1a0e', border: '1px solid #0d2010',
            borderRadius: 20, padding: '28px', marginBottom: 40,
          }}>
            <div style={{ fontSize: 12, color: G, letterSpacing: 3, marginBottom: 16, textTransform: 'uppercase' }}>
              DM Script + AI Prompts
            </div>
            <div style={{
              fontSize: 14, color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.8, whiteSpace: 'pre-wrap',
            }}>
              {quickStartDM}
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(quickStartDM)}
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
        )}

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
