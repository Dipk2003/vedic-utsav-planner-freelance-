import { NextResponse } from 'next/server';

type HistoryMessage = {
  role: 'user' | 'assistant';
  text: string;
};

function buildFallbackReply(message: string) {
  const text = message.toLowerCase();
  const outsideCities = ['mumbai', 'jaipur', 'bangalore', 'bengaluru', 'goa', 'pune', 'kolkata', 'chennai', 'hyderabad'];
  const mentionsOutside = outsideCities.some((city) => text.includes(city));

  const isWedding = ['wedding', 'shaadi', 'marriage'].some((w) => text.includes(w));
  const isCorporate = ['corporate', 'conference', 'launch', 'offsite', 'annual', 'meet', 'hybrid'].some((w) =>
    text.includes(w)
  );
  const isBirthday = ['birthday', 'bday', 'kids party', 'milestone'].some((w) => text.includes(w));
  const isKitty = ['kitty', 'social', 'ladies', 'anniversary', 'cultural'].some((w) => text.includes(w));
  const asksPrice = ['price', 'cost', 'package', 'budget', 'charges', 'fees'].some((w) => text.includes(w));

  const lines: string[] = [];
  lines.push(
    'Thank you for reaching out. We plan events only in Delhi, Greater Noida, and Varanasi.'
  );

  if (mentionsOutside) {
    lines.push(
      'Currently, we do not serve other cities. If your event is in Delhi, Greater Noida, or Varanasi, we would be happy to help.'
    );
  }

  if (isWedding || isCorporate || isBirthday || isKitty || asksPrice) {
    if (isWedding || (!isCorporate && !isBirthday && !isKitty && asksPrice)) {
      lines.push(
        'Wedding packages: Intimate INR 5,00,000 (up to 150 guests), Grand Celebration INR 15,00,000 (up to 500 guests), Royal Experience (custom).'
      );
    }
    if (isCorporate) {
      lines.push(
        'Corporate packages: Essential INR 2,50,000 (up to 100 attendees), Professional INR 7,50,000 (up to 500 attendees), Enterprise (custom).'
      );
    }
    if (isBirthday) {
      lines.push(
        'Birthday packages: Fun Start INR 50,000 (up to 50 guests), Grand Bash INR 1,50,000 (up to 150 guests), Luxury Experience (custom).'
      );
    }
    if (isKitty) {
      lines.push(
        'Kitty/Social packages: Cozy Gathering INR 25,000 (up to 30 guests), Elegant Affair INR 75,000 (up to 80 guests), Grand Celebration (custom).'
      );
    }
  }

  lines.push(
    'Please share your event type, tentative date, guest count, and budget. I will propose the best-fit package.'
  );
  lines.push('WhatsApp: +91 93691 90920 | Email: vaidikutsav03@gmail.com');

  return lines.join(' ');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = typeof body?.message === 'string' ? body.message.trim() : '';
    const history = Array.isArray(body?.history) ? (body.history as HistoryMessage[]) : [];

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

    const knowledgeBase = [
      'Company: VaidikUtsav event planning.',
      'Service areas: Delhi, Greater Noida, Varanasi only.',
      'Services: Weddings, Corporate Events, Birthday Parties, Kitty Parties and Social Events.',
      'Process: Free consultation (30 minutes), Custom proposal within 48 hours, Vendor coordination, Flawless execution on event day.',
      'Contact: Phone +91 93691 90920, WhatsApp +91 93691 90920, Email vaidikutsav03@gmail.com.',
      'Wedding packages: Intimate INR 5,00,000 (up to 150 guests, venue coordination, basic decor, catering management, photography 8 hours, event day coordination).',
      'Wedding packages: Grand Celebration INR 15,00,000 (up to 500 guests, premium venue, luxury decor and lighting, multi-cuisine catering, photography and videography, entertainment coordination, guest accommodation, dedicated wedding planner).',
      'Wedding packages: Royal Experience (custom) for 500+ guests, destination planning, palace or resort bookings, multi-day celebrations, celebrity entertainment, travel management, luxury hospitality, personal concierge.',
      'Corporate packages: Essential INR 2,50,000 (up to 100 attendees, venue coordination, basic AV setup, catering management, event day coordination).',
      'Corporate packages: Professional INR 7,50,000 (up to 500 attendees, premium venue selection, advanced AV and stage production, branding and signage, photography and videography, entertainment coordination, dedicated event manager).',
      'Corporate packages: Enterprise (custom) for 500+ attendees, multi-day management, hybrid events, speaker management, full production, media and PR, post-event analytics, 24/7 support.',
      'Birthday packages: Fun Start INR 50,000 (up to 50 guests, basic theme decor, cake, catering snacks and meals, photography 4 hours, party favors).',
      'Birthday packages: Grand Bash INR 1,50,000 (up to 150 guests, premium theme, custom cake, multi-cuisine catering, DJ or band, photography and videography, games and activities, event coordinator).',
      'Birthday packages: Luxury Experience (custom) for 150+ guests, luxury venue, celebrity entertainment, designer decor, gourmet catering, production, live streaming, personalized experiences.',
      'Kitty packages: Cozy Gathering INR 25,000 (up to 30 guests, basic decor, snacks and beverages, party games setup, photography 2 hours, event coordination).',
      'Kitty packages: Elegant Affair INR 75,000 (up to 80 guests, premium theme execution, decor and lighting, multi-course catering, DJ or live music, photography and videography, party favors, dedicated coordinator).',
      'Kitty packages: Grand Celebration (custom) for 80+ guests, luxury venue, designer decor, gourmet catering, live entertainment, professional photography, full event management.'
    ].join(' ');

    const systemInstruction = {
      parts: [
        {
          text: [
            'You are the VaidikUtsav event-planning assistant.',
            'You help clients in Delhi, Greater Noida, and Varanasi only.',
            'Ask concise questions to gather event type, date, guest count, budget, and venue preferences.',
            'Use formal, polite English.',
            'Keep responses concise and professional.',
            'Answer only using the knowledge base below. If information is missing, say you will confirm and offer contact options.',
            `Knowledge base: ${knowledgeBase}`,
            'When the user is ready, offer WhatsApp and email contact options.',
            'WhatsApp: +91 93691 90920. Email: vaidikutsav03@gmail.com.',
            'If asked about areas outside these cities, politely explain the current service areas.'
          ].join(' ')
        }
      ]
    };

    const model = process.env.GEMINI_MODEL || 'gemini-1.5-flash-latest';
    const fallbackModel = process.env.GEMINI_FALLBACK_MODEL || 'gemini-1.5-pro-latest';
    const makeRequest = (modelName: string) =>
      fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
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

    let response = await makeRequest(model);
    if (!response.ok && response.status === 404 && fallbackModel && fallbackModel !== model) {
      response = await makeRequest(fallbackModel);
    }

    if (!response.ok) {
      const fallback = buildFallbackReply(message);
      return NextResponse.json({ reply: fallback, source: 'fallback' });
    }

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.map((part: any) => part.text).join('') || '';

    if (!reply) {
      const fallback = buildFallbackReply(message);
      return NextResponse.json({ reply: fallback, source: 'fallback' });
    }

    return NextResponse.json({ reply, source: 'gemini' });
  } catch (error) {
    const fallback = buildFallbackReply(message || '');
    return NextResponse.json({ reply: fallback, source: 'fallback' });
  }
}

