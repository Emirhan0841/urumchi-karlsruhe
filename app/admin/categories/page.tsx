'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Category } from '@/types';

export default function CategoriesAdminPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    original_name: '',
    german_name: '',
    slug: '',
    description: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order');
      if (data) setCategories(data as Category[]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleAdd = async () => {
    if (!formData.german_name || !formData.original_name) return;
    const slug = formData.german_name.toLowerCase().replace(/\s+/g, '-');
    const { error } = await supabase.from('categories').insert({
      ...formData,
      slug,
    });
    if (!error) {
      setFormData({ original_name: '', german_name: '', slug: '', description: '' });
      setShowForm(false);
      const res = await supabase
        .from('categories')
        .select('*')
        .order('sort_order');
      if (res.data) setCategories(res.data as Category[]);
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (!error) setCategories(categories.filter((c) => c.id !== id));
  };

  if (loading) {
    return <div className="text-center py-12">Lädt...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-display text-3xl text-restaurant-dark">Kategorien verwalten</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary text-sm"
        >
          {showForm ? '✕ Abbrechen' : '+ Kategorie hinzufügen'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="space-y-4">
            <input
              placeholder="Deutsche Bezeichnung"
              value={formData.german_name}
              onChange={(e) => setFormData({ ...formData, german_name: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            />
            <input
              placeholder="Ursprüngliche Bezeichnung (Uigurisch)"
              value={formData.original_name}
              onChange={(e) => setFormData({ ...formData, original_name: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            />
            <textarea
              placeholder="Beschreibung"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border rounded"
              rows={2}
            />
            <button onClick={handleAdd} className="btn-primary w-full">
              Speichern
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-lg shadow p-4 flex justify-between items-start border-l-4 border-restaurant-accent"
          >
            <div className="flex-1">
              <h4 className="font-semibold text-restaurant-dark">{cat.german_name}</h4>
              <p className="text-sm text-gray-600">{cat.original_name}</p>
              {cat.description && (
                <p className="text-xs text-gray-500 mt-1">{cat.description}</p>
              )}
            </div>
            <button
              onClick={() => handleDelete(cat.id)}
              className="text-sm text-red-600 hover:underline flex-shrink-0 ml-4"
            >
              🗑️ Löschen
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
