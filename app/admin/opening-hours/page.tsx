'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { OpeningHours } from '@/types';

const weekdayNames = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag','Sonntag'];

export default function OpeningHoursAdminPage() {
  const [hours, setHours] = useState<OpeningHours[]>([]);
  const [loading, setLoading] = useState(true);

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

  const handleUpdate = async (id: string, field: string, value: any) => {
    const { error } = await supabase
      .from('opening_hours')
      .update({ [field]: value })
      .eq('id', id);
    if (!error) {
      setHours(
        hours.map((h) =>
          h.id === id ? { ...h, [field]: value } : h
        )
      );
    }
  };

  if (loading) {
    return <div className="text-center py-12">Lädt...</div>;
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-restaurant-dark mb-6">Öffnungszeiten</h1>

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
                <>
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

                  <div className="flex flex-col md:flex-row md:items-center gap-4 text-gray-600">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={!!(hour.opens_at_2)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleUpdate(hour.id, 'opens_at_2', '17:00');
                            handleUpdate(hour.id, 'closes_at_2', '21:00');
                          } else {
                            handleUpdate(hour.id, 'opens_at_2', null);
                            handleUpdate(hour.id, 'closes_at_2', null);
                          }
                        }}
                        className="w-4 h-4"
                      />
                      Nachmittags geöffnet
                    </label>

                    {hour.opens_at_2 && (
                      <>
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
                      </>
                    )}
                  </div>
                </>
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
