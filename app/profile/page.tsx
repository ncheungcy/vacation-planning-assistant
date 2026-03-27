'use client';

import { useState, useEffect } from 'react';
import { loadProfile, saveProfile, defaultProfile, Profile } from '@/lib/profile';

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setProfile(loadProfile());
  }, []);

  function set<S extends keyof Profile>(
    section: S,
    field: keyof Profile[S],
    value: Profile[S][keyof Profile[S]],
  ) {
    setProfile(prev => ({
      ...prev,
      [section]: { ...(prev[section] as object), [field]: value },
    }));
    setSaved(false);
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    saveProfile(profile);
    setSaved(true);
  }

  const companionName = profile.travellers.companion || 'Companion';

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Traveller Profile</h1>
        <p className="text-gray-500 mb-10">
          Your preferences are used to personalise trip suggestions.
        </p>

        <form onSubmit={handleSave} className="space-y-10">

          {/* Who's travelling */}
          <Section title="Who's travelling">
            <Field label="Travel companion">
              <Input
                value={profile.travellers.companion}
                onChange={v => set('travellers', 'companion', v)}
              />
            </Field>
            <Field label="Home airports">
              <Input
                value={profile.travellers.homeAirports}
                onChange={v => set('travellers', 'homeAirports', v)}
              />
            </Field>
            <Field label="Your passport(s)">
              <Input
                value={profile.travellers.passportYou}
                onChange={v => set('travellers', 'passportYou', v)}
              />
            </Field>
            <Field label={`${companionName}'s passport(s)`}>
              <Input
                value={profile.travellers.passportCompanion}
                onChange={v => set('travellers', 'passportCompanion', v)}
              />
            </Field>
          </Section>

          {/* Trip style */}
          <Section title="Trip style">
            <Field label="Winter trips">
              <Textarea
                value={profile.tripStyle.winter}
                onChange={v => set('tripStyle', 'winter', v)}
              />
            </Field>
            <Field label="Summer trips">
              <Textarea
                value={profile.tripStyle.summer}
                onChange={v => set('tripStyle', 'summer', v)}
              />
            </Field>
            <Field label="Typical day pace">
              <Textarea
                value={profile.tripStyle.pace}
                onChange={v => set('tripStyle', 'pace', v)}
              />
            </Field>
            <Field label="Priorities">
              <Textarea
                value={profile.tripStyle.priorities}
                onChange={v => set('tripStyle', 'priorities', v)}
              />
            </Field>
          </Section>

          {/* Budget */}
          <Section title="Budget">
            <Field label="Hotel budget per night (GBP)">
              <div className="flex gap-3 items-center">
                <NumberInput
                  value={profile.budget.hotelMin}
                  onChange={v => set('budget', 'hotelMin', v)}
                  placeholder="Min"
                />
                <span className="text-gray-400 text-sm">to</span>
                <NumberInput
                  value={profile.budget.hotelMax}
                  onChange={v => set('budget', 'hotelMax', v)}
                  placeholder="Max"
                />
              </div>
            </Field>
            <Field label="Food budget per meal (GBP)">
              <div className="flex gap-3 items-center">
                <NumberInput
                  value={profile.budget.foodMin}
                  onChange={v => set('budget', 'foodMin', v)}
                  placeholder="Min"
                />
                <span className="text-gray-400 text-sm">to</span>
                <NumberInput
                  value={profile.budget.foodMax}
                  onChange={v => set('budget', 'foodMax', v)}
                  placeholder="Max"
                />
              </div>
            </Field>
            <Field label="Flight preference">
              <Textarea
                value={profile.budget.flightPreference}
                onChange={v => set('budget', 'flightPreference', v)}
              />
            </Field>
          </Section>

          {/* Accommodation */}
          <Section title="Accommodation">
            <Field label="Preference">
              <Textarea
                value={profile.accommodation.preference}
                onChange={v => set('accommodation', 'preference', v)}
              />
            </Field>
            <Field label="Minimum rating (out of 5)">
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={profile.accommodation.minRating}
                onChange={e => set('accommodation', 'minRating', Number(e.target.value))}
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </Field>
            <Field label="Requirements">
              <Textarea
                value={profile.accommodation.requirements}
                onChange={v => set('accommodation', 'requirements', v)}
              />
            </Field>
          </Section>

          {/* Food */}
          <Section title="Food">
            <Field label="General approach">
              <Textarea
                value={profile.food.approach}
                onChange={v => set('food', 'approach', v)}
              />
            </Field>
            <Field label={`${companionName} avoids`}>
              <Textarea
                value={profile.food.companionAvoids}
                onChange={v => set('food', 'companionAvoids', v)}
              />
            </Field>
            <Field label={`${companionName}'s dessert preferences`}>
              <Textarea
                value={profile.food.companionDesserts}
                onChange={v => set('food', 'companionDesserts', v)}
              />
            </Field>
          </Section>

          {/* Interests */}
          <Section title="Interests">
            <Field label="Your interests">
              <Textarea
                value={profile.interests.you}
                onChange={v => set('interests', 'you', v)}
              />
            </Field>
            <Field label={`${companionName}'s interests`}>
              <Textarea
                value={profile.interests.companion}
                onChange={v => set('interests', 'companion', v)}
              />
            </Field>
            <Field label="Shared interests">
              <Textarea
                value={profile.interests.shared}
                onChange={v => set('interests', 'shared', v)}
              />
            </Field>
          </Section>

          {/* Avoid */}
          <Section title="Things to avoid">
            <Textarea
              value={profile.avoid}
              onChange={v => {
                setProfile(p => ({ ...p, avoid: v }));
                setSaved(false);
              }}
            />
          </Section>

          {/* Trip length */}
          <Section title="Trip length">
            <Field label="Annual vacation days">
              <NumberInput
                value={profile.tripLength.annualDays}
                onChange={v => set('tripLength', 'annualDays', v)}
              />
            </Field>
            <Field label="Flexibility">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.tripLength.remoteWorkFlexible}
                  onChange={e => set('tripLength', 'remoteWorkFlexible', e.target.checked)}
                  className="w-4 h-4 accent-gray-900"
                />
                <span className="text-sm text-gray-700">Can work remotely to extend trips beyond annual leave</span>
              </label>
            </Field>
          </Section>

          {/* Save */}
          <div className="flex items-center gap-4 pt-2">
            <button
              type="submit"
              className="px-6 py-3 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
            >
              Save profile
            </button>
            {saved && (
              <span className="text-sm text-green-600">Profile saved</span>
            )}
          </div>

        </form>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {children}
    </div>
  );
}

function Input({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
    />
  );
}

function Textarea({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      rows={3}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
    />
  );
}

function NumberInput({ value, onChange, placeholder }: { value: number; onChange: (v: number) => void; placeholder?: string }) {
  return (
    <input
      type="number"
      value={value}
      onChange={e => onChange(Number(e.target.value))}
      placeholder={placeholder}
      className="w-28 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
    />
  );
}
