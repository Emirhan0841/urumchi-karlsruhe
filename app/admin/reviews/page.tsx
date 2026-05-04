'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Review } from '@/types';

export default function ReviewsAdminPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    reviewer_name: '',
    rating: 5,
    text: '',
    source: 'Google',
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from('reviews')
        .select('*')
        .order('sort_order');
      if (data) setReviews(data as Review[]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleAdd = async () => {
    if (!formData.reviewer_name || !formData.text) return;
    const { error } = await supabase.from('reviews').insert({
      ...formData,
      review_date: new Date().toISOString().split('T')[0],
      is_active: true,
    });
    if (!error) {
      setFormData({ reviewer_name: '', rating: 5, text: '', source: 'Google' });
      setShowForm(false);
      const res = await supabase
        .from('reviews')
        .select('*')
        .order('sort_order');
      if (res.data) setReviews(res.data as Review[]);
    }
  };

  const handleToggleActive = async (id: string, current: boolean) => {
    const { error } = await supabase
      .from('reviews')
      .update({ is_active: !current })
      .eq('id', id);
    if (!error) {
      setReviews(
        reviews.map((r) =>
          r.id === id ? { ...r, is_active: !current } : r
        )
      );
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('reviews').delete().eq('id', id);
    if (!error) setReviews(reviews.filter((r) => r.id !== id));
  };

  if (loading) {
    return <div className="text-center py-12">Lädt...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-display text-3xl text-restaurant-dark">Rezensionen verwalten</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary text-sm"
        >
          {showForm ? '✕ Abbrechen' : '+ Rezension hinzufügen'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="space-y-4">
            <input
              placeholder="Name des Bewertenden"
              value={formData.reviewer_name}
              onChange={(e) =>
                setFormData({ ...formData, reviewer_name: e.target.value })
              }
              className="w-full px-3 py-2 border rounded"
            />
            <div className="flex gap-4">
              <label className="flex-1">
                <span className="block text-sm font-semibold mb-1">Sternebewertung</span>
                <select
                  value={formData.rating}
                  onChange={(e) =>
                    setFormData({ ...formData, rating: parseInt(e.target.value) })
                  }
                  className="w-full px-3 py-2 border rounded"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n} Sterne
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex-1">
                <span className="block text-sm font-semibold mb-1">Quelle</span>
                <input
                  value={formData.source}
                  onChange={(e) =>
                    setFormData({ ...formData, source: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded"
                  placeholder="z.B. Google"
                />
              </label>
            </div>
            <textarea
              placeholder="Rezensionstext"
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              className="w-full px-3 py-2 border rounded"
              rows={3}
            />
            <button onClick={handleAdd} className="btn-primary w-full">
              Speichern
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {reviews.map((review) => (
          <div
            key={review.id}
            className={`bg-white rounded-lg shadow p-4 border-l-4 ${
              review.is_active ? 'border-restaurant-accent' : 'border-gray-300'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold text-restaurant-dark">
                    {review.reviewer_name}
                  </h4>
                  <span className="text-yellow-500">
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-2">"{review.text}"</p>
                <p className="text-xs text-gray-500">
                  Quelle: {review.source} | {review.review_date}
                </p>
              </div>
              <div className="flex gap-2 flex-shrink-0 ml-4">
                <button
                  onClick={() =>
                    handleToggleActive(review.id, review.is_active)
                  }
                  className={`text-xs px-2 py-1 rounded ${
                    review.is_active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {review.is_active ? '✓ Aktiv' : 'Inaktiv'}
                </button>
                <button
                  onClick={() => handleDelete(review.id)}
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
