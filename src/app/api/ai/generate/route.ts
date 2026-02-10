import { NextResponse } from 'next/server';

function safeJsonParse(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch {
        return null;
      }
    }
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const type = body?.type;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is missing' }, { status: 500 });
    }

    let prompt = '';
    if (type === 'blog') {
      const title = typeof body?.title === 'string' ? body.title.trim() : '';
      const topic = typeof body?.topic === 'string' ? body.topic.trim() : '';
      const base = title || topic;
      if (!base) {
        return NextResponse.json({ error: 'Title or topic is required' }, { status: 400 });
      }
      prompt = [
        'You are a senior event content writer for VedicUtsav.',
        'Write a blog post for our event planning company.',
        'Use formal, professional English.',
        'Return ONLY valid JSON with keys: title, excerpt, content, seo_title, seo_description.',
        'Content should be 500-700 words, include headings and bullet points, and end with a clear call-to-action.',
        `Topic: ${base}`
      ].join(' ');
    } else if (type === 'seo') {
      const title = typeof body?.title === 'string' ? body.title.trim() : '';
      const content = typeof body?.content === 'string' ? body.content.trim() : '';
      if (!title && !content) {
        return NextResponse.json({ error: 'Title or content is required' }, { status: 400 });
      }
      prompt = [
        'You are an SEO specialist for VedicUtsav.',
        'Use formal, professional English.',
        'Return ONLY valid JSON with keys: seo_title and seo_description.',
        'SEO title 50-60 chars, description 140-160 chars.',
        `Title: ${title}`,
        `Content: ${content}`
      ].join(' ');
    } else if (type === 'translate') {
      const text = typeof body?.text === 'string' ? body.text.trim() : '';
      if (!text) {
        return NextResponse.json({ error: 'Text is required' }, { status: 400 });
      }
      prompt = [
        'Translate the following text into formal, professional English.',
        'Return ONLY valid JSON with key: translation.',
        `Text: ${text}`
      ].join(' ');
    } else {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    const model = process.env.GEMINI_MODEL || 'gemini-1.5-flash-latest';
    const fallbackModel = process.env.GEMINI_FALLBACK_MODEL || 'gemini-1.5-pro-latest';
    const makeRequest = (modelName: string) =>
      fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.6,
              maxOutputTokens: type === 'blog' ? 900 : 300
            }
          })
        }
      );

    let response = await makeRequest(model);
    if (!response.ok && response.status === 404 && fallbackModel && fallbackModel !== model) {
      response = await makeRequest(fallbackModel);
    }

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: errorText || 'Gemini request failed' }, { status: 502 });
    }

    const data = await response.json();
    const raw = data?.candidates?.[0]?.content?.parts?.map((part: any) => part.text).join('') || '';
    const parsed = safeJsonParse(raw);

    if (!parsed) {
      return NextResponse.json({ error: 'Failed to parse AI response', raw }, { status: 502 });
    }

    return NextResponse.json({ result: parsed });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
