import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-semibold text-gray-900 mb-4">Vacation Planning Assistant</h1>
        <p className="text-gray-500 mb-8">Your AI-powered holiday planner</p>
        <Link
          href="/profile"
          className="px-6 py-3 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
        >
          Set up your profile
        </Link>
      </div>
    </main>
  );
}
