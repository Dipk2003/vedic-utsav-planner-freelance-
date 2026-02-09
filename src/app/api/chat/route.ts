import { NextResponse } from 'next/server';

type HistoryMessage = {
  role: 'user' | 'assistant';
  text: string;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = typeof body?.message === 'string' ? body.message.trim() : '';
    const history = Array.isArray(body?.history) ? (body.history as HistoryMessage[]) : [];
    const language = body?.language === 'hi' ? 'hi' : 'en';

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is missing' }, { status: 500 });
    }

    const contents = history.slice(-8).map((item) => ({
      role: item.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: item.text }]
    }));

    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const systemInstruction = {
      role: 'system',
      parts: [
        {
          text: [
            'You are the VedicUtsav event-planning assistant.',
            'You help clients in Delhi, Greater Noida, and Varanasi only.',
            'Ask concise questions to gather event type, date, guest count, budget, and venue preferences.',
            language === 'hi'
              ? 'Use formal, polite Hinglish (Romanized Hindi).'
              : 'Use formal, polite English.',
            'Keep responses concise and professional.',
            'When the user is ready, offer WhatsApp and email contact options.',
            'If asked about areas outside these cities, politely explain the current service areas.'
          ].join(' ')
        }
      ]
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction,
          contents,
          generationConfig: {
            temperature: 0.6,
            maxOutputTokens: 256
          }
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: errorText || 'Gemini request failed' }, { status: 502 });
    }

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.map((part: any) => part.text).join('') || '';

    if (!reply) {
      return NextResponse.json({ error: 'Empty response from Gemini' }, { status: 502 });
    }

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
