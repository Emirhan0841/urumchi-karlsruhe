'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { RestaurantSettings, MenuItem, Review, OpeningHours } from '@/types';

export default function Home() {
  const [settings, setSettings] = useState<RestaurantSettings | null>(null);
  const [featuredItems, setFeaturedItems] = useState<MenuItem[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [openingHours, setOpeningHours] = useState<OpeningHours[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!supabase) {
          setLoading(false);
          return;
        }

        const [settingsRes, itemsRes, reviewsRes, hoursRes] = await Promise.all([
          supabase.from('restaurant_settings').select('*').single(),
          supabase.from('menu_items').select('*').eq('is_active', true).limit(3),
          supabase.from('reviews').select('*').eq('is_active', true).order('sort_order'),
          supabase.from('opening_hours').select('*').order('weekday'),
        ]);

        if (settingsRes.data) setSettings(settingsRes.data as RestaurantSettings);
        if (itemsRes.data) setFeaturedItems(itemsRes.data as MenuItem[]);
        if (reviewsRes.data) setReviews(reviewsRes.data as Review[]);
        if (hoursRes.data) setOpeningHours(hoursRes.data as OpeningHours[]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const weekdays = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag','Sonntag'];
  const currentDay = new Date().getDay();
  const todayHours = openingHours.find((h) => h.weekday === currentDay);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-restaurant-light">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-restaurant-accent mx-auto"></div>
          <p className="mt-4 text-restaurant-text">Wird geladen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-restaurant-light">
      {/* Hero Section */}
      <section
        className="text-restaurant-cream py-12 md:py-24 relative"
        style={{
          backgroundImage: "url('/background.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="container-narrow flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
          <div className="flex-1 text-center md:text-left">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4">
              Ürümchi
            </h1>
            <p className="font-display text-2xl md:text-3xl text-restaurant-gold mb-4">
              Uigurisches Restaurant
            </p>
            <p className="text-lg mb-6 max-w-lg mx-auto md:mx-0">
              {settings?.claim || 'Willkommen bei Ürümchi. Unsere Küche, unsere Heimat.'}
            </p>
            <p className="text-base mb-8 text-restaurant-cream/80 max-w-lg mx-auto md:mx-0">
              {settings?.description}
            </p>

            {/* Call-to-action Buttons */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 w-full max-w-4xl mx-auto md:mx-0">
              <Link href="/menu" className="btn-hero">
                Speisekarte
              </Link>
              <Link href="/reservation" className="btn-hero">
                Reservieren
              </Link>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(
                  `${settings?.address} ${settings?.city}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hero"
              >
                Route
              </a>
              <Link href="/order" className="btn-hero">
                Online bestellen
              </Link>
            </div>
          </div>

          {/* Logo */}
          <div className="flex-1 flex justify-center">
            <Image
              src="/logo.png"
              alt="Ürümchi Logo"
              width={300}
              height={300}
              className="rounded-full shadow-xl max-w-sm w-full h-auto"
              priority
            />
          </div>
        </div>
      </section>

      {/* Opening Hours */}
      <section className="bg-restaurant-cream py-8 md:py-12 pt-28">
        <div className="container-narrow">
          <h2 className="font-display text-3xl md:text-4xl mb-8 text-center">Öffnungszeiten</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {openingHours.map((hours) => (
              <div
                key={hours.id}
                className={`p-4 rounded-lg border-2 ${
                  hours.weekday === currentDay
                    ? 'border-restaurant-accent bg-restaurant-gold/10'
                    : 'border-restaurant-accent/30 bg-white'
                }`}
              >
                <h3 className="font-semibold text-restaurant-dark mb-2">
                  {weekdays[hours.weekday]}
                </h3>
                {hours.is_closed ? (
                  <p className="text-restaurant-brown">Geschlossen</p>
                ) : (
                  <div className="text-restaurant-text">
                    <p>
                      {hours.opens_at?.slice(0, 5)} - {hours.closes_at?.slice(0, 5)}
                    </p>
                    {hours.opens_at_2 && hours.closes_at_2 && (
                      <p>
                        {hours.opens_at_2?.slice(0, 5)} - {hours.closes_at_2?.slice(0, 5)}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-12 md:py-16">
        <div className="container-narrow">
          <h2 className="font-display text-3xl md:text-4xl mb-12 text-center">
            Unsere Spezialitäten
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border-l-4 border-restaurant-accent rounded-lg shadow-md hover:shadow-lg transition p-6"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-display text-xl text-restaurant-dark">{item.name}</h3>
                  <span className="text-restaurant-accent font-semibold text-lg ml-2 flex-shrink-0">
                    {item.price_label || `${item.price.toFixed(2)}€`}
                  </span>
                </div>
                <p className="text-restaurant-text text-sm mb-3">{item.description}</p>
                <div className="flex gap-2 flex-wrap">
                  {item.is_vegetarian && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Vegetarisch
                    </span>
                  )}
                  {item.is_vegan && (
                    <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
                      Vegan
                    </span>
                  )}
                  {item.is_spicy && (
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                      Scharf
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/menu" className="btn-primary">
              Komplette Speisekarte ansehen
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-restaurant-dark text-restaurant-cream py-12 md:py-16">
        <div className="container-narrow">
          <h2 className="font-display text-3xl md:text-4xl mb-12 text-center">
            Was unsere Gäste sagen
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {reviews.slice(0, 4).map((review) => (
              <div
                key={review.id}
                className="bg-restaurant-brown rounded-lg p-6 border border-restaurant-accent/30"
              >
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${
                        i < review.rating ? 'text-restaurant-gold' : 'text-restaurant-brown/50'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="mb-4 italic text-restaurant-cream/90">"{review.text}"</p>
                <p className="font-semibold">— {review.reviewer_name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-16 bg-restaurant-cream">
        <div className="container-narrow">
          <h2 className="font-display text-3xl md:text-4xl mb-12 text-center">Besucht uns</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-display text-2xl mb-6 text-restaurant-dark">Kontaktinformation</h3>
              <div className="space-y-4">
                {settings?.address && (
                  <div>
                    <p className="text-restaurant-accent font-semibold mb-1">Adresse</p>
                    <p className="text-restaurant-text">
                      {settings.address}
                      <br />
                      {settings.postal_code} {settings.city}
                      <br />
                      {settings.country}
                    </p>
                  </div>
                )}
                {settings?.phone && (
                  <div>
                    <p className="text-restaurant-accent font-semibold mb-1">Telefon</p>
                    <a href={`tel:${settings.phone}`} className="text-restaurant-text hover:text-restaurant-accent transition">
                      {settings.phone}
                    </a>
                  </div>
                )}
                {settings?.email && (
                  <div>
                    <p className="text-restaurant-accent font-semibold mb-1">E-Mail</p>
                    <a href={`mailto:${settings.email}`} className="text-restaurant-text hover:text-restaurant-accent transition">
                      {settings.email}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Google Maps */}
            <iframe
              width="100%"
              height="380"
              style={{ border: 0, borderRadius: '0.5rem' }}
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                `${settings?.address} ${settings?.postal_code} ${settings?.city}`
              )}&output=embed`}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
