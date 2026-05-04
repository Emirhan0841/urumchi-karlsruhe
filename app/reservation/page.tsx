'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  message: string;
}

export default function ReservationPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value) || 2 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!supabase) {
      setError('Reservierungssystem nicht verfügbar');
      setLoading(false);
      return;
    }

    try {
      const { error: insertError } = await supabase.from('reservations').insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        reservation_date: formData.date,
        reservation_time: formData.time,
        guests: formData.guests,
        message: formData.message || null,
        status: 'neu',
      });

      if (insertError) throw insertError;

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: 2,
        message: '',
      });

      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten');
    } finally {
      setLoading(false);
    }
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="bg-restaurant-light min-h-screen py-12 pt-28">
      <div className="container-narrow max-w-2xl">
        <h1 className="font-display text-4xl md:text-5xl text-center mb-2 text-restaurant-dark">
          Reservieren
        </h1>
        <p className="text-center text-restaurant-text mb-12">
          Buchen Sie einen Tisch in unserem Restaurant
        </p>

        {submitted && (
          <div className="mb-8 p-4 bg-green-100 border border-green-600 rounded-lg text-green-800">
            ✓ Ihre Reservierung wurde erfolgreich eingereicht! Wir kontaktieren Sie in Kürze zur
            Bestätigung.
          </div>
        )}

        {error && (
          <div className="mb-8 p-4 bg-red-100 border border-red-600 rounded-lg text-red-800">
            ✗ Fehler: {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-restaurant-text font-semibold mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-restaurant-accent/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-restaurant-accent"
              placeholder="Ihr Name"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-restaurant-text font-semibold mb-2">
              E-Mail *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-restaurant-accent/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-restaurant-accent"
              placeholder="Ihre E-Mail"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-restaurant-text font-semibold mb-2">
              Telefonnummer (optional)
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-restaurant-accent/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-restaurant-accent"
              placeholder="Ihre Telefonnummer"
            />
          </div>

          {/* Date and Time */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="date" className="block text-restaurant-text font-semibold mb-2">
                Datum *
              </label>
              <input
                type="date"
                id="date"
                name="date"
                required
                min={minDate}
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-restaurant-accent/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-restaurant-accent"
              />
            </div>

            <div>
              <label htmlFor="time" className="block text-restaurant-text font-semibold mb-2">
                Uhrzeit *
              </label>
              <input
                type="time"
                id="time"
                name="time"
                required
                value={formData.time}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-restaurant-accent/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-restaurant-accent"
              />
            </div>
          </div>

          {/* Guests */}
          <div>
            <label htmlFor="guests" className="block text-restaurant-text font-semibold mb-2">
              Anzahl Personen *
            </label>
            <select
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-restaurant-accent/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-restaurant-accent"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? 'Person' : 'Personen'}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-restaurant-text font-semibold mb-2">
              Nachricht (optional)
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-restaurant-accent/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-restaurant-accent"
              placeholder="Z.B. Spezialwünsche, Allergien, besondere Anlässe..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-form"
          >
            {loading ? 'Wird verarbeitet...' : 'Reservierung anfragen'}
          </button>
        </form>

        {/* Info */}
        <div className="mt-12 bg-restaurant-dark text-restaurant-cream rounded-lg p-6">
          <h3 className="font-display text-xl mb-4">Informationen</h3>
          <ul className="text-sm space-y-2">
            <li>✓ Reservierungen werden innerhalb von 2 Stunden bestätigt</li>
            <li>✓ Bei Fragen rufen wir Sie unter der angegebenen Telefonnummer an</li>
            <li>✓ Sie erhalten eine Bestätigung per E-Mail</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
