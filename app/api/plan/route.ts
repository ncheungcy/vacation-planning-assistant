import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import { Profile } from '@/lib/profile';

interface PlanRequest {
  destination: string;
  when: string;
  duration: string;
  profile: Profile;
}

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const body: PlanRequest = await req.json();
    const { destination, when, duration, profile } = body;

    if (!destination || !when || !duration) {
      return NextResponse.json(
        { error: 'destination, when, and duration are required' },
        { status: 400 },
      );
    }

    const isSki = /ski|skiing|alps|whistler|aspen|chamonix|niseko|hakuba|verbier|zermatt|powder/i.test(
      destination + ' ' + when,
    );

    const skiSection = isSki
      ? '4. Ski pass & rentals (lift passes, ski or snowboard hire, lessons if relevant, equipment checklist)'
      : null;

    const sectionList = [
      '1. Timing (best time to visit, weather, local events, visa requirements for both passports)',
      '2. Getting there (flights from London Gatwick or Heathrow, or trains if relevant e.g. Eurostar for Paris/Amsterdam/Brussels)',
      '3. Hotels (specific neighbourhood recommendations, what to look for, booking tips)',
      skiSection,
      skiSection ? '5. Restaurants' : '4. Restaurants',
      skiSection ? '6. Things to do' : '5. Things to do',
    ]
      .filter(Boolean)
      .join('\n');

    const prompt = `You are a knowledgeable travel planning assistant. Generate a personalised trip planning checklist.

TRIP:
- Destination: ${destination}
- When: ${when}
- Duration: ${duration}

TRAVELLER PROFILE:
- Travelling with: ${profile.travellers.companion}
- Flying from: ${profile.travellers.homeAirports}
- Your passport: ${profile.travellers.passportYou}
- ${profile.travellers.companion}'s passport(s): ${profile.travellers.passportCompanion}
- Trip style: ${profile.tripStyle.priorities}
- Typical day: ${profile.tripStyle.pace}
- Hotel budget: £${profile.budget.hotelMin}–£${profile.budget.hotelMax}/night (${profile.accommodation.preference}, min rating ${profile.accommodation.minRating}/5)
- Food budget: £${profile.budget.foodMin}–£${profile.budget.foodMax}/meal
- Flight preference: ${profile.budget.flightPreference}
- Food: ${profile.food.approach}
- ${profile.travellers.companion} avoids: ${profile.food.companionAvoids}
- ${profile.travellers.companion}'s dessert preference: ${profile.food.companionDesserts}
- Your interests: ${profile.interests.you}
- ${profile.travellers.companion}'s interests: ${profile.interests.companion}
- Shared interests: ${profile.interests.shared}
- Avoid: ${profile.avoid}

Generate a checklist with these sections in this exact order:
${sectionList}

Rules:
- 3–6 specific, actionable items per section
- Be specific to this destination — use real place names, neighbourhoods, and practical details
- Personalise to the traveller profile throughout
- Restaurants: factor in ${profile.travellers.companion}'s dietary restrictions (avoids: ${profile.food.companionAvoids}); suggest both travellers' styles
- Activities: mix both travellers' interests — yours (${profile.interests.you}) and ${profile.travellers.companion}'s (${profile.interests.companion})
- Flights: recommend Premium Economy or Business for long haul (10h+); budget airlines fine for short haul
- Favour genuinely interesting over famous tourist traps
- Keep each item to 1–2 sentences

Return ONLY valid JSON, no other text:
{
  "sections": [
    {
      "id": "timing",
      "title": "Timing",
      "items": [
        { "id": "timing-1", "text": "item text here" }
      ]
    }
  ]
}

Use these section IDs in order: "timing", "getting-there", "hotels"${isSki ? ', "ski"' : ''}, "restaurants", "things-to-do"`;

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
      messages: [{ role: 'user', content: prompt }],
    });

    const block = message.content[0];
    if (block.type !== 'text') {
      return NextResponse.json({ error: 'Unexpected response from AI' }, { status: 500 });
    }

    const parsed = JSON.parse(block.text);
    return NextResponse.json(parsed);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 });
    }
    if (error instanceof Anthropic.AuthenticationError) {
      return NextResponse.json({ error: 'API key missing or invalid' }, { status: 500 });
    }
    console.error('Plan API error:', error);
    return NextResponse.json({ error: 'Failed to generate plan' }, { status: 500 });
  }
}
