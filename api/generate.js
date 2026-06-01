export const config = { runtime: 'edge' }

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 })
  }

  let body
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 })
  }

  const { topic, trigger } = body
  if (!topic || !trigger) {
    return new Response(JSON.stringify({ error: 'Missing topic or trigger' }), { status: 400 })
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
- DM includes 2-3 full AI prompts the user can copy into ChatGPT or Claude
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
        max_tokens: 4096,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      return new Response(JSON.stringify({ error: 'Anthropic API error', detail: err }), { status: 502 })
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
        return new Response(JSON.stringify({ error: 'Failed to parse AI response', raw: text }), { status: 500 })
      }
    }

    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
