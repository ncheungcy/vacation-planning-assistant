export interface Profile {
  travellers: {
    companion: string;
    homeAirports: string;
    passportYou: string;
    passportCompanion: string;
  };
  tripStyle: {
    winter: string;
    summer: string;
    pace: string;
    priorities: string;
  };
  budget: {
    hotelMin: number;
    hotelMax: number;
    foodMin: number;
    foodMax: number;
    flightPreference: string;
  };
  accommodation: {
    preference: string;
    minRating: number;
    requirements: string;
  };
  food: {
    approach: string;
    companionAvoids: string;
    companionDesserts: string;
  };
  interests: {
    you: string;
    companion: string;
    shared: string;
  };
  avoid: string;
  tripLength: {
    annualDays: number;
    remoteWorkFlexible: boolean;
  };
}

export const defaultProfile: Profile = {
  travellers: {
    companion: 'Yutzu Bier',
    homeAirports: 'London Gatwick (preferred), Heathrow',
    passportYou: 'UK',
    passportCompanion: 'Canadian, Hong Kong',
  },
  tripStyle: {
    winter: 'Skiing (US/Canada/Alps/Japan) or warm city/Asia trips',
    summer: 'Beach or European holidays',
    pace: 'Relaxed — morning coffee and light bite, walk, lunch, one afternoon activity, dinner',
    priorities: 'Food, genuine experiences, relaxation — not Instagram clout',
  },
  budget: {
    hotelMin: 200,
    hotelMax: 300,
    foodMin: 50,
    foodMax: 100,
    flightPreference: 'Long haul (10h+): Premium Economy or Business without overpaying. Short haul: budget is fine.',
  },
  accommodation: {
    preference: 'Boutique/independent hotels only, no big chains',
    minRating: 4.5,
    requirements: 'AC required in hot destinations, no shared spaces',
  },
  food: {
    approach: 'Love trying new dishes and restaurants — this is a trip priority',
    companionAvoids: 'Innards/offal, cheese, too many consecutive meat-heavy meals, overly creamy desserts',
    companionDesserts: 'Prefers fruit-based or root vegetable desserts (ube, chestnut, Japanese sweet potato)',
  },
  interests: {
    you: 'Food markets, pintxos/food hopping, live sports (football, tennis)',
    companion: 'Boutique/homeware shopping, art galleries, opera',
    shared: 'Architecture, nature/landscapes, markets, historical sites, cocktail bars',
  },
  avoid: 'Nightclubs, crowded tourist traps (unless genuinely worth it), multi-stop/tiring connections, extreme heat (unless dedicated beach trip)',
  tripLength: {
    annualDays: 25,
    remoteWorkFlexible: true,
  },
};

const STORAGE_KEY = 'traveller-profile';

export function loadProfile(): Profile {
  if (typeof window === 'undefined') return defaultProfile;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return defaultProfile;
  try {
    return JSON.parse(stored) as Profile;
  } catch {
    return defaultProfile;
  }
}

export function saveProfile(profile: Profile): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}
