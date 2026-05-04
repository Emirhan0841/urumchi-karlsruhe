'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      if (data.user) {
        router.push('/admin/dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Anmeldung fehlgeschlagen');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-restaurant-dark py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="font-display text-3xl text-center text-restaurant-dark mb-2">
          Admin Login
        </h1>
        <p className="text-center text-restaurant-text/75 mb-8">
          Melden Sie sich an, um das Admin-Panel zu verwenden
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-600 rounded-lg text-red-800 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-restaurant-text font-semibold mb-2">
              E-Mail
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-restaurant-accent/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-restaurant-accent"
              placeholder="admin@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-restaurant-text font-semibold mb-2">
              Passwort
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-restaurant-accent/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-restaurant-accent"
              placeholder="••••••••"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-restaurant-accent text-white rounded-lg font-semibold hover:bg-restaurant-brown transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Wird angemeldet...' : 'Anmelden'}
          </button>
        </form>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-restaurant-accent hover:text-restaurant-brown transition">
            ← Zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}
