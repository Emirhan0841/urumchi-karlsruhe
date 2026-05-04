'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { RestaurantSettings } from '@/types';

export default function ImprintPage() {
  const [settings, setSettings] = useState<RestaurantSettings | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      if (!supabase) return;
      const { data } = await supabase
        .from('restaurant_settings')
        .select('*')
        .single();
      setSettings(data as RestaurantSettings);
    };
    fetchSettings();
  }, []);

  return (
    <div className="bg-restaurant-light min-h-screen py-12 pt-28">
      <div className="container-narrow max-w-3xl">
        <h1 className="font-display text-4xl text-restaurant-dark mb-8">Impressum</h1>

        <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
          <section>
            <h2 className="font-display text-2xl text-restaurant-dark mb-4">Betreiber</h2>
            <p className="text-restaurant-text">
              {settings?.name || 'Ürümchi Uigurisches Restaurant'}
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-restaurant-dark mb-4">Kontakt</h2>
            <p className="text-restaurant-text">
              {settings?.address && (
                <>
                  {settings.address}
                  <br />
                </>
              )}
              {settings?.postal_code && settings?.city && (
                <>
                  {settings.postal_code} {settings.city}
                  <br />
                </>
              )}
              {settings?.phone && (
                <>
                  Telefon: {settings.phone}
                  <br />
                </>
              )}
              {settings?.email && (
                <>
                  E-Mail: {settings.email}
                </>
              )}
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-restaurant-dark mb-4">Haftungsausschluss</h2>
            <p className="text-restaurant-text text-sm">
              Die Inhalte dieser Website werden mit großer Sorgfalt erstellt und regelmäßig
              aktualisiert. Der Betreiber übernimmt jedoch keine Gewähr für die Korrektheit,
              Vollständigkeit oder Aktualität der bereitgestellten Inhalte. Die Nutzung dieser
              Website erfolgt auf eigene Gefahr des Nutzers.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-restaurant-dark mb-4">
              Externe Links
            </h2>
            <p className="text-restaurant-text text-sm">
              Für den Inhalt von extern verlinkten Seiten ist der Betreiber nicht verantwortlich.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
