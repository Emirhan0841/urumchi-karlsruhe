'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { OrderPlatform } from '@/types';
import Link from 'next/link';

export default function OrderPage() {
  const [platforms, setPlatforms] = useState<OrderPlatform[]>([]);
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        if (!supabase) {
          setLoading(false);
          return;
        }

        const { data } = await supabase
          .from('order_platforms')
          .select('*')
          .eq('is_active', true)
          .order('sort_order');
        if (data) setPlatforms(data as OrderPlatform[]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlatforms();
  }, []);

  const filtered = platforms.filter((p) =>
    orderType === 'pickup' ? p.supports_pickup : p.supports_delivery
  );

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
    <div className="bg-restaurant-light min-h-screen py-12 pt-28">
      <div className="container-narrow max-w-2xl">
        <h1 className="font-display text-4xl md:text-5xl text-center mb-2 text-restaurant-dark">
          Online bestellen
        </h1>
        <p className="text-center text-restaurant-text mb-12">
          Wählen Sie Ihre bevorzugte Bestellmethode
        </p>

        {/* Toggle Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center">
          <button
            onClick={() => setOrderType('pickup')}
            className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-150 ${
              orderType === 'pickup'
                ? 'bg-restaurant-primary text-white shadow-lg -translate-y-0.5'
                : 'bg-white text-restaurant-text border-2 border-restaurant-secondary hover:border-restaurant-primary'
            }`}
          >
            🛵 Abholung
          </button>
          <button
            onClick={() => setOrderType('delivery')}
            className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-150 ${
              orderType === 'delivery'
                ? 'bg-restaurant-primary text-white shadow-lg -translate-y-0.5'
                : 'bg-white text-restaurant-text border-2 border-restaurant-secondary hover:border-restaurant-primary'
            }`}
          >
            🚚 Lieferung
          </button>
        </div>

        {/* Platforms */}
        {filtered.length > 0 ? (
          <div className="space-y-4">
            {filtered.map((platform) => (
              <a
                key={platform.id}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 border-l-4 border-restaurant-accent"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-display text-2xl text-restaurant-dark mb-2">
                      {platform.name}
                    </h3>
                    <p className="text-restaurant-text mb-3">
                      {orderType === 'pickup'
                        ? 'Bestellen Sie Ihr Lieblingsgericht zur Abholung'
                        : 'Wir liefern direkt zu Ihnen nach Hause'}
                    </p>

                    {/* Details */}
                    <div className="flex flex-wrap gap-4 text-sm">
                      {platform.time_label && (
                        <div className="bg-restaurant-cream px-3 py-2 rounded">
                          ⏱️ {platform.time_label}
                        </div>
                      )}
                      {platform.fee_label && (
                        <div className="bg-restaurant-cream px-3 py-2 rounded">
                          💳 {platform.fee_label}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="ml-4 flex-shrink-0">
                    <button className="px-6 py-3 bg-restaurant-primary text-white rounded-lg font-semibold hover:bg-restaurant-primary-dark transition-all duration-150 shadow-md hover:shadow-lg">
                      Bestellen →
                    </button>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-restaurant-text text-lg mb-4">
              {orderType === 'pickup'
                ? 'Momentan keine Abholung verfügbar'
                : 'Momentan keine Lieferung verfügbar'}
            </p>
            <Link href="/reservation" className="btn-primary inline-block">
              Reservieren Sie einen Tisch
            </Link>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-12 bg-restaurant-dark text-restaurant-cream rounded-lg p-6">
          <h3 className="font-display text-xl mb-4">Andere Optionen</h3>
          <div className="space-y-3 text-sm">
            <p>
              📞 <strong>Telefonisch bestellen:</strong> Rufen Sie uns unter Ihrer bevorzugten
              Telefonnummer an
            </p>
            <p>
              📅 <strong>Tisch reservieren:</strong>{' '}
              <Link href="/reservation" className="text-restaurant-gold hover:underline">
                Buchen Sie einen Tisch
              </Link>{' '}
              und genießen Sie Ihre Mahlzeit bei uns vor Ort
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
