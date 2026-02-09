import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey =
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Supabase keys are missing' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const body = await request.json();

    const name = typeof body?.name === 'string' ? body.name.trim() : '';
    const phone = typeof body?.phone === 'string' ? body.phone.trim() : '';
    const email = typeof body?.email === 'string' ? body.email.trim() : '';
    const eventType = typeof body?.eventType === 'string' ? body.eventType.trim() : '';
    const eventDate = typeof body?.eventDate === 'string' ? body.eventDate.trim() : '';
    const guestCount = typeof body?.guestCount === 'string' ? body.guestCount.trim() : '';
    const city = typeof body?.city === 'string' ? body.city.trim() : '';
    const message = typeof body?.message === 'string' ? body.message.trim() : '';
    const source = typeof body?.source === 'string' ? body.source.trim() : 'contact_form';

    if (!name || !phone || !email || !eventType || !city) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { error } = await supabase.from('leads').insert({
      name,
      phone,
      email,
      event_type: eventType,
      event_date: eventDate || null,
      guest_count: guestCount || null,
      city,
      message: message || null,
      source
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
