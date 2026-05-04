'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Reservation } from '@/types';

export default function ReservationsAdminPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filter, setFilter] = useState('neu');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from('reservations')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setReservations(data as Reservation[]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleStatusChange = async (id: string, newStatus: Reservation['status']) => {
    const { error } = await supabase
      .from('reservations')
      .update({ status: newStatus })
      .eq('id', id);
    if (!error) {
      setReservations(
        reservations.map((r) =>
          r.id === id ? { ...r, status: newStatus } : r
        )
      );
    }
  };

  const filtered = filter === 'all' ? reservations : reservations.filter((r) => r.status === filter);

  if (loading) {
    return <div className="text-center py-12">Lädt...</div>;
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-restaurant-dark mb-6">Reservierungen</h1>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {['neu', 'bestätigt', 'abgelehnt', 'erledigt', 'all'].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
              filter === s
                ? 'bg-restaurant-accent text-white'
                : 'bg-white text-restaurant-text border border-restaurant-accent/30'
            }`}
          >
            {s === 'all' ? 'Alle' : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((res) => (
            <div
              key={res.id}
              className="bg-white rounded-lg shadow p-4 border-l-4 border-restaurant-accent"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-restaurant-dark">{res.name}</h4>
                  <p className="text-sm text-gray-600">{res.email}</p>
                  {res.phone && (
                    <p className="text-sm text-gray-600">{res.phone}</p>
                  )}
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-semibold">
                    {res.reservation_date} um {res.reservation_time}
                  </p>
                  <p className="text-sm text-gray-600">{res.guests} Personen</p>
                </div>
              </div>

              {res.message && (
                <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded mb-3">
                  "{res.message}"
                </p>
              )}

              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500">
                  {new Date(res.created_at).toLocaleDateString('de-DE')}
                </p>
                <select
                  value={res.status}
                  onChange={(e) =>
                    handleStatusChange(res.id, e.target.value as Reservation['status'])
                  }
                  className={`px-3 py-1 rounded text-sm font-semibold border-0 cursor-pointer ${
                    res.status === 'neu'
                      ? 'bg-yellow-100 text-yellow-800'
                      : res.status === 'bestätigt'
                      ? 'bg-green-100 text-green-800'
                      : res.status === 'abgelehnt'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  <option value="neu">Neu</option>
                  <option value="bestätigt">Bestätigt</option>
                  <option value="abgelehnt">Abgelehnt</option>
                  <option value="erledigt">Erledigt</option>
                </select>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-gray-600">
            Keine Reservierungen mit Status "{filter}"
          </div>
        )}
      </div>
    </div>
  );
}
