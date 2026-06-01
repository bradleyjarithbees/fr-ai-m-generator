export const maxDuration = 60

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  const { topic, trigger } = body || {}

  if (!topic || !trigger) {
    return res.status(400).json({ error: 'Missing topic or trigger' })
  }

  const prompt = `You are a social media content creator for @fr_ai_m, an Instagram page that teaches everyday families how to use AI. Generate a 6-slide Instagram carousel for the topic: ${topic}. The comment trigger word is: ${trigger}.

Return ONLY a valid JSON object with this exact structure — no markdown, no explanation, no code fences:
{
  "cover": { "headline": "string", "hook": "string", "sub": "string" },
  "problem": { "headline": "string", "bubbles": ["string", "string", "string"], "stat": "string" },
  "solution": { "headline": "string", "sub": "string", "items": [{"e": "string", "t": "string"}, {"e": "string", "t": "string"}, {"e": "string", "t": "string"}, {"e": "string", "t": "string"}, {"e": "string", "t": "string"}] },
  "result": { "headline": "string", "items": [{"e": "string", "t": "string", "s": "string"}, {"e": "string", "t": "string", "s": "string"}, {"e": "string", "t": "string", "s": "string"}, {"e": "string", "t": "string", "s": "string"}] },
  "proof": { "headline": "string", "proofs": [{"name": "string", "result": "string", "note": "string"}, {"name": "string", "result": "string", "note": "string"}, {"name": "string", "result": "string", "note": "string"}], "note": "string" },
  "outro": { "headline": "string", "sub": "string", "promise": "string" },
  "caption": "string",
  "hashtags": "string",
  "dm": "string"
}

Rules:
- Headlines are punchy, 2-3 lines max, ALL CAPS style
- Bubbles are relatable pain points with emoji
- Proof cards use realistic UK names and specific £ or time results
- Caption opens with a hook stat or story, ends with comment trigger CTA
- DM is the complete message sent to followers who comment the trigger word
- DM MUST start with exactly this block (preserve line breaks and emoji):
"⚡ IMPORTANT — DO THIS FIRST\n\nFor these prompts to find REAL results with live prices you need web search turned on:\n\n✅ ChatGPT — tap the globe 🌐 icon before typing\n✅ Perplexity.ai — free app, searches live automatically (recommended)\n\nWithout web search the AI will guess. With it — it finds real results."
- DM contains 2-3 full copy-paste AI prompts tailored to the topic
- Every prompt that searches for deals, prices, products, jobs, properties or services MUST: (a) start with "Search the web right now and find me real [SPECIFIC THING]. Search [RELEVANT SITES]." — (b) include a "My details:" section with fill-in-the-blank fields in [square brackets] relevant to the topic — (c) end with "Only show me real results you have found. Do not guess or make anything up."
- Choose RELEVANT SITES from this map based on the topic: Holiday/flights → TUI, Jet2, On the Beach, Love Holidays, Skyscanner | Staycation → Sykes Cottages, Airbnb, Cottages.com | Money/bills → MoneySavingExpert, Uswitch, Compare the Market | Jobs → Indeed, LinkedIn, Glassdoor, Reed | Shopping → Google Shopping, Amazon, PriceRunner | Health → NHS.uk | Benefits → GOV.UK, Turn2Us | Food → Google Maps, TripAdvisor | Events → Eventbrite, VisitBritain | Education → GOV.UK, Coursera | Legal/housing → Citizens Advice, Rightmove, Zoopla
- DM MUST end with a 💡 BONUS TIP line telling the follower to open Perplexity.ai and paste a specific live-search query relevant to the topic
- Everything is written for everyday UK families aged 25-45
- solution items: e = emoji, t = step text
- result items: e = emoji, t = title, s = subtitle
- proof items: name = first name + initial, result = specific outcome, note = one-line quote`

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      return res.status(502).json({ error: 'Anthropic API error', detail: err })
    }

    const data = await response.json()
    const text = data.content?.[0]?.text ?? ''

    let parsed
    try {
      parsed = JSON.parse(text)
    } catch {
      const match = text.match(/\{[\s\S]*\}/)
      if (match) {
        parsed = JSON.parse(match[0])
      } else {
        return res.status(500).json({ error: 'Failed to parse AI response', raw: text })
      }
    }

    return res.status(200).json(parsed)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
