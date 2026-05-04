'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { RestaurantSettings } from '@/types';

export function Footer() {
  const [settings, setSettings] = useState<RestaurantSettings | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase
        .from('restaurant_settings')
        .select('*')
        .single();
      setSettings(data as RestaurantSettings);
    };
    fetchSettings();
  }, []);

  return (
    <footer className="bg-restaurant-dark text-restaurant-cream border-t border-restaurant-accent">
      <div className="container-narrow py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Contact */}
        <div>
          <h3 className="font-display text-xl mb-4">Kontakt</h3>
          <div className="text-sm space-y-2">
            {settings?.address && (
              <>
                <p>{settings.address}</p>
                <p>
                  {settings.postal_code} {settings.city}
                </p>
              </>
            )}
            {settings?.phone && (
              <p>
                Tel: <a href={`tel:${settings.phone}`} className="hover:text-restaurant-gold">
                  {settings.phone}
                </a>
              </p>
            )}
            {settings?.email && (
              <p>
                E-Mail:{' '}
                <a href={`mailto:${settings.email}`} className="hover:text-restaurant-gold">
                  {settings.email}
                </a>
              </p>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-display text-xl mb-4">Navigation</h3>
          <ul className="text-sm space-y-2">
            <li>
              <Link href="/menu" className="hover:text-restaurant-gold transition">
                Speisekarte
              </Link>
            </li>
            <li>
              <Link href="/reservation" className="hover:text-restaurant-gold transition">
                Reservieren
              </Link>
            </li>
            <li>
              <Link href="/order" className="hover:text-restaurant-gold transition">
                Online bestellen
              </Link>
            </li>
          </ul>
        </div>

        {/* Social & External */}
        <div>
          <h3 className="font-display text-xl mb-4">Folge uns</h3>
          <ul className="text-sm space-y-2">
            {settings?.instagram_url && (
              <li>
                <a
                  href={settings.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-restaurant-gold transition"
                >
                  Instagram
                </a>
              </li>
            )}
            {settings?.wolt_url && (
              <li>
                <a
                  href={settings.wolt_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-restaurant-gold transition"
                >
                  Wolt
                </a>
              </li>
            )}
            {settings?.lieferando_url && (
              <li>
                <a
                  href={settings.lieferando_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-restaurant-gold transition"
                >
                  Lieferando
                </a>
              </li>
            )}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-display text-xl mb-4">Rechtliches</h3>
          <ul className="text-sm space-y-2">
            <li>
              <Link href="/imprint" className="hover:text-restaurant-gold transition">
                Impressum
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-restaurant-gold transition">
                Datenschutz
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-restaurant-accent py-6 text-center text-sm text-restaurant-cream/75">
        <p>© {new Date().getFullYear()} Ürümchi Uigurisches Restaurant. Alle Rechte vorbehalten.</p>
      </div>
    </footer>
  );
}
