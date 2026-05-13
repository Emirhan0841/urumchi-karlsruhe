'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { OpeningHours } from '@/types';

const weekdayNames = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag','Sonntag'];

export default function OpeningHoursAdminPage() {
  const [hours, setHours] = useState<OpeningHours[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from('opening_hours')
        .select('*')
        .order('weekday');
      if (data) setHours(data as OpeningHours[]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleUpdate = (id: string, field: string, value: any) => {
    setHours(
      hours.map((h) =>
        h.id === id ? { ...h, [field]: value } : h
      )
    );
    setSaveMessage(null);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const hour of hours) {
        const updateData = {
          is_closed: hour.is_closed,
          opens_at: hour.opens_at || null,
          closes_at: hour.closes_at || null,
          opens_at_2: hour.opens_at_2 || null,
          closes_at_2: hour.closes_at_2 || null,
        };

        const { data, error } = await supabase
          .from('opening_hours')
          .update(updateData)
          .eq('id', hour.id);

        console.log('Update response:', { data, error, id: hour.id });

        if (error) {
          console.error(`Error updating ${hour.id}:`, error);
          throw new Error(error.message || JSON.stringify(error));
        }
      }
      setSaveMessage('Öffnungszeiten gespeichert!');
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (error) {
      console.error('Failed to save opening hours:', error);
      setSaveMessage(`Fehler beim Speichern: ${error instanceof Error ? error.message : 'Unbekannter Fehler'}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Lädt...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-display text-3xl text-restaurant-dark">Öffnungszeiten</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-restaurant-accent text-white rounded-lg font-semibold hover:bg-opacity-90 disabled:opacity-50 transition-all"
        >
          {saving ? 'Wird gespeichert...' : 'Speichern'}
        </button>
      </div>

      {saveMessage && (
        <div className={`mb-4 p-3 rounded-lg ${saveMessage.includes('Fehler') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {saveMessage}
        </div>
      )}

      <div className="space-y-4">
        {hours.map((hour) => (
          <div
            key={hour.id}
            className="bg-white rounded-lg shadow p-6 border-l-4 border-restaurant-accent"
          >
            <h3 className="font-semibold text-restaurant-dark mb-4">
              {weekdayNames[hour.weekday]}
            </h3>
            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={hour.is_closed}
                  onChange={(e) =>
                    handleUpdate(hour.id, 'is_closed', e.target.checked)
                  }
                  className="w-4 h-4"
                />
                <span className="text-sm">Geschlossen</span>
              </label>

              {!hour.is_closed && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Block 1</h4>
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex items-center gap-2">
                        <label htmlFor={`opens-${hour.id}`} className="text-sm">
                          Öffnet:
                        </label>
                        <input
                          id={`opens-${hour.id}`}
                          type="time"
                          value={hour.opens_at || ''}
                          onChange={(e) =>
                            handleUpdate(hour.id, 'opens_at', e.target.value)
                          }
                          className="px-2 py-1 border rounded"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <label htmlFor={`closes-${hour.id}`} className="text-sm">
                          Schließt:
                        </label>
                        <input
                          id={`closes-${hour.id}`}
                          type="time"
                          value={hour.closes_at || ''}
                          onChange={(e) =>
                            handleUpdate(hour.id, 'closes_at', e.target.value)
                          }
                          className="px-2 py-1 border rounded"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Block 2</h4>
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex items-center gap-2">
                        <label htmlFor={`opens2-${hour.id}`} className="text-sm">
                          Öffnet:
                        </label>
                        <input
                          id={`opens2-${hour.id}`}
                          type="time"
                          value={hour.opens_at_2 || ''}
                          onChange={(e) =>
                            handleUpdate(hour.id, 'opens_at_2', e.target.value)
                          }
                          className="px-2 py-1 border rounded"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <label htmlFor={`closes2-${hour.id}`} className="text-sm">
                          Schließt:
                        </label>
                        <input
                          id={`closes2-${hour.id}`}
                          type="time"
                          value={hour.closes_at_2 || ''}
                          onChange={(e) =>
                            handleUpdate(hour.id, 'closes_at_2', e.target.value)
                          }
                          className="px-2 py-1 border rounded"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {hour.note && (
                <p className="text-xs text-gray-600 italic">{hour.note}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
