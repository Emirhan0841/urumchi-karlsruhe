'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { RestaurantSettings } from '@/types';

export default function SettingsAdminPage() {
  const [settings, setSettings] = useState<RestaurantSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from('restaurant_settings')
        .select('*')
        .single();
      if (data) setSettings(data as RestaurantSettings);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleChange = (field: string, value: any) => {
    if (settings) {
      setSettings({ ...settings, [field]: value });
    }
  };

  const handleSave = async () => {
    if (!settings) return;
    const { error } = await supabase
      .from('restaurant_settings')
      .update(settings)
      .eq('id', settings.id);
    if (!error) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Lädt...</div>;
  }

  if (!settings) {
    return <div className="text-center py-12">Keine Einstellungen gefunden</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-display text-3xl text-restaurant-dark">Restaurantdaten</h1>
        <button
          onClick={handleSave}
          className="btn-primary text-sm"
        >
          {saved ? '✓ Gespeichert' : 'Speichern'}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 space-y-6 max-w-2xl">
        <div>
          <label className="block text-sm font-semibold mb-2">Restaurantname</label>
          <input
            value={settings.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Claim/Slogan</label>
          <input
            value={settings.claim || ''}
            onChange={(e) => handleChange('claim', e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="z.B. Unsere Küche, unsere Heimat"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Kurzbeschreibung</label>
          <textarea
            value={settings.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            className="w-full px-3 py-2 border rounded"
            rows={2}
          />
        </div>

        <hr />

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Telefonnummer</label>
            <input
              value={settings.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">E-Mail</label>
            <input
              type="email"
              value={settings.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Adresse</label>
          <input
            value={settings.address || ''}
            onChange={(e) => handleChange('address', e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Postleitzahl</label>
            <input
              value={settings.postal_code || ''}
              onChange={(e) => handleChange('postal_code', e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Stadt</label>
            <input
              value={settings.city || ''}
              onChange={(e) => handleChange('city', e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Land</label>
            <input
              value={settings.country || ''}
              onChange={(e) => handleChange('country', e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        </div>

        <hr />

        <div>
          <label className="block text-sm font-semibold mb-2">Google Maps URL</label>
          <input
            type="url"
            value={settings.google_maps_url || ''}
            onChange={(e) => handleChange('google_maps_url', e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="https://maps.google.com/..."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Instagram Link</label>
          <input
            type="url"
            value={settings.instagram_url || ''}
            onChange={(e) => handleChange('instagram_url', e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="https://instagram.com/..."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Logo URL</label>
          <input
            type="url"
            value={settings.logo_url || ''}
            onChange={(e) => handleChange('logo_url', e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="/logo.png"
          />
        </div>

        <button
          onClick={handleSave}
          className="btn-primary w-full mt-4"
        >
          {saved ? '✓ Gespeichert' : 'Alle Änderungen speichern'}
        </button>
      </div>
    </div>
  );
}
