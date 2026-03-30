'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { loadProfile, Profile } from '@/lib/profile';

interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

interface ChecklistSection {
  id: string;
  title: string;
  items: ChecklistItem[];
}

const CHECKLIST_KEY = 'last-checklist';
const TRIP_KEY = 'last-trip';

export default function Home() {
  const [destination, setDestination] = useState('');
  const [when, setWhen] = useState('');
  const [duration, setDuration] = useState('');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [sections, setSections] = useState<ChecklistSection[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setProfile(loadProfile());
    const lastTrip = localStorage.getItem(TRIP_KEY);
    const lastChecklist = localStorage.getItem(CHECKLIST_KEY);
    if (lastTrip) {
      const trip = JSON.parse(lastTrip);
      setDestination(trip.destination);
      setWhen(trip.when);
      setDuration(trip.duration);
    }
    if (lastChecklist) {
      setSections(JSON.parse(lastChecklist));
    }
  }, []);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!profile) return;

    setLoading(true);
    setError('');
    setSections([]);

    try {
      const res = await fetch('/api/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destination, when, duration, profile }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to generate plan');
      }

      const data = await res.json();
      const withChecked: ChecklistSection[] = data.sections.map(
        (s: ChecklistSection) => ({
          ...s,
          items: s.items.map((item: ChecklistItem) => ({ ...item, checked: false })),
        }),
      );

      setSections(withChecked);
      localStorage.setItem(CHECKLIST_KEY, JSON.stringify(withChecked));
      localStorage.setItem(TRIP_KEY, JSON.stringify({ destination, when, duration }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  function toggleItem(sectionId: string, itemId: string) {
    setSections(prev => {
      const updated = prev.map(s =>
        s.id === sectionId
          ? { ...s, items: s.items.map(item => item.id === itemId ? { ...item, checked: !item.checked } : item) }
          : s,
      );
      localStorage.setItem(CHECKLIST_KEY, JSON.stringify(updated));
      return updated;
    });
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-12">

        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-semibold text-gray-900">Plan a trip</h1>
          <Link href="/profile" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            Edit profile
          </Link>
        </div>

        <form onSubmit={handleGenerate} className="mb-10">
          <div className="flex gap-3 mb-4 flex-wrap">
            <div className="flex-1 min-w-40">
              <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
              <input
                type="text"
                value={destination}
                onChange={e => setDestination(e.target.value)}
                placeholder="e.g. Tokyo, Japan"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
            <div className="w-36">
              <label className="block text-sm font-medium text-gray-700 mb-1">When</label>
              <input
                type="text"
                value={when}
                onChange={e => setWhen(e.target.value)}
                placeholder="e.g. March 2026"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
            <div className="w-28">
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <input
                type="text"
                value={duration}
                onChange={e => setDuration(e.target.value)}
                placeholder="e.g. 7 days"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Generating...' : 'Generate checklist'}
          </button>

          {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
        </form>

        {loading && (
          <div className="text-sm text-gray-400 animate-pulse">
            Putting together your checklist...
          </div>
        )}

        {sections.length > 0 && (
          <div className="space-y-8">
            {sections.map(section => (
              <section key={section.id}>
                <h2 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">
                  {section.title}
                </h2>
                <ul className="space-y-3">
                  {section.items.map(item => (
                    <li
                      key={item.id}
                      className="flex gap-3 cursor-pointer"
                      onClick={() => toggleItem(section.id, item.id)}
                    >
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => toggleItem(section.id, item.id)}
                        onClick={e => e.stopPropagation()}
                        className="mt-0.5 w-4 h-4 flex-shrink-0 accent-gray-900 cursor-pointer"
                      />
                      <span className={`text-sm leading-relaxed ${item.checked ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}
