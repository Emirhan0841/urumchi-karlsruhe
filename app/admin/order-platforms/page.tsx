'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { OrderPlatform } from '@/types';

export default function OrderPlatformsAdminPage() {
  const [platforms, setPlatforms] = useState<OrderPlatform[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    supports_pickup: true,
    supports_delivery: true,
    fee_label: '',
    time_label: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from('order_platforms')
        .select('*')
        .order('sort_order');
      if (data) setPlatforms(data as OrderPlatform[]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleAdd = async () => {
    if (!formData.name || !formData.url) return;
    const { error } = await supabase.from('order_platforms').insert({
      ...formData,
      is_active: true,
    });
    if (!error) {
      setFormData({
        name: '',
        url: '',
        supports_pickup: true,
        supports_delivery: true,
        fee_label: '',
        time_label: '',
      });
      setShowForm(false);
      const res = await supabase
        .from('order_platforms')
        .select('*')
        .order('sort_order');
      if (res.data) setPlatforms(res.data as OrderPlatform[]);
    }
  };

  const handleToggleActive = async (id: string, current: boolean) => {
    const { error } = await supabase
      .from('order_platforms')
      .update({ is_active: !current })
      .eq('id', id);
    if (!error) {
      setPlatforms(
        platforms.map((p) =>
          p.id === id ? { ...p, is_active: !current } : p
        )
      );
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('order_platforms').delete().eq('id', id);
    if (!error) setPlatforms(platforms.filter((p) => p.id !== id));
  };

  if (loading) {
    return <div className="text-center py-12">Lädt...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-display text-3xl text-restaurant-dark">Online-Bestellplattformen</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary text-sm"
        >
          {showForm ? '✕ Abbrechen' : '+ Plattform hinzufügen'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="space-y-4">
            <input
              placeholder="Name (z.B. Wolt)"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            />
            <input
              placeholder="URL"
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            />
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.supports_pickup}
                  onChange={(e) =>
                    setFormData({ ...formData, supports_pickup: e.target.checked })
                  }
                />
                Abholung
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.supports_delivery}
                  onChange={(e) =>
                    setFormData({ ...formData, supports_delivery: e.target.checked })
                  }
                />
                Lieferung
              </label>
            </div>
            <input
              placeholder="Gebühren-Hinweis (optional)"
              value={formData.fee_label}
              onChange={(e) => setFormData({ ...formData, fee_label: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            />
            <input
              placeholder="Zeit-Hinweis (optional)"
              value={formData.time_label}
              onChange={(e) => setFormData({ ...formData, time_label: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            />
            <button onClick={handleAdd} className="btn-primary w-full">
              Speichern
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {platforms.map((platform) => (
          <div
            key={platform.id}
            className="bg-white rounded-lg shadow p-4 border-l-4 border-restaurant-accent"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold text-restaurant-dark">{platform.name}</h4>
                <p className="text-sm text-gray-600">
                  {platform.supports_pickup && 'Abholung'}{' '}
                  {platform.supports_pickup && platform.supports_delivery && '+'}{' '}
                  {platform.supports_delivery && 'Lieferung'}
                </p>
                {platform.fee_label && (
                  <p className="text-xs text-gray-500">💳 {platform.fee_label}</p>
                )}
                {platform.time_label && (
                  <p className="text-xs text-gray-500">⏱️ {platform.time_label}</p>
                )}
              </div>
              <div className="flex gap-2 flex-shrink-0 ml-4">
                <button
                  onClick={() =>
                    handleToggleActive(platform.id, platform.is_active)
                  }
                  className={`text-xs px-2 py-1 rounded ${
                    platform.is_active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {platform.is_active ? '✓ Aktiv' : 'Inaktiv'}
                </button>
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Öffnen →
                </a>
                <button
                  onClick={() => handleDelete(platform.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
