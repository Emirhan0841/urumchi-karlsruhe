'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { MenuItem, Category } from '@/types';

export default function MenuAdminPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    category_id: '',
    price: 0,
    description: '',
    is_vegetarian: false,
    is_vegan: false,
    is_spicy: false,
    is_halal: true,
    is_sold_out: false,
    is_active: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsRes, catsRes] = await Promise.all([
          supabase.from('menu_items').select('*').order('sort_order'),
          supabase.from('categories').select('*').order('sort_order'),
        ]);

        if (itemsRes.error) {
          console.error('Menu items fetch error:', itemsRes.error);
        } else if (itemsRes.data) {
          setItems(itemsRes.data as MenuItem[]);
        }

        if (catsRes.error) {
          console.error('Categories fetch error:', catsRes.error);
          alert(`Fehler beim Laden von Kategorien: ${catsRes.error.message}`);
        } else if (catsRes.data) {
          console.log('Categories loaded:', catsRes.data.length);
          setCategories(catsRes.data as Category[]);
          if (catsRes.data.length > 0) {
            setFormData((prev) => ({ ...prev, category_id: catsRes.data[0].id }));
          }
        }
      } catch (err) {
        console.error('Unexpected error loading data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAdd = async () => {
    if (!formData.name || !formData.category_id) {
      alert('Bitte füllen Sie Name und Kategorie aus');
      return;
    }

    try {
      const { error } = await supabase.from('menu_items').insert({
        ...formData,
        item_number: null,
      });

      if (error) {
        console.error('Insert error:', error);
        alert(`Fehler beim Speichern: ${error.message}`);
        return;
      }

      setFormData({
        name: '',
        category_id: categories[0]?.id || '',
        price: 0,
        description: '',
        is_vegetarian: false,
        is_vegan: false,
        is_spicy: false,
        is_halal: true,
        is_sold_out: false,
        is_active: true,
      });
      setShowForm(false);

      const { data, error: fetchError } = await supabase.from('menu_items').select('*').order('sort_order');
      if (fetchError) {
        console.error('Fetch error:', fetchError);
        alert(`Fehler beim Abrufen: ${fetchError.message}`);
        return;
      }
      if (data) setItems(data as MenuItem[]);
    } catch (err) {
      console.error('Unexpected error:', err);
      alert(`Unerwarteter Fehler: ${err instanceof Error ? err.message : 'Unbekannt'}`);
    }
  };

  const handleUpdate = async (id: string) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;

    try {
      const { error } = await supabase.from('menu_items').update(item).eq('id', id);

      if (error) {
        console.error('Update error:', error);
        alert(`Fehler beim Aktualisieren: ${error.message}`);
        return;
      }

      setEditingId(null);
    } catch (err) {
      console.error('Unexpected error:', err);
      alert(`Unerwarteter Fehler: ${err instanceof Error ? err.message : 'Unbekannt'}`);
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('menu_items').delete().eq('id', id);
    if (!error) setItems(items.filter((i) => i.id !== id));
  };

  if (loading) {
    return <div className="text-center py-12">Lädt...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-display text-3xl text-restaurant-dark">Speisekarte verwalten</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary text-sm"
        >
          {showForm ? '✕ Abbrechen' : '+ Gericht hinzufügen'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg mb-4">Neues Gericht</h3>
          <div className="space-y-4 grid grid-cols-2 gap-4">
            <input
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="col-span-2 px-3 py-2 border rounded"
            />
            <select
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
              className="col-span-2 px-3 py-2 border rounded"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.german_name}
                </option>
              ))}
            </select>
            <input
              placeholder="Preis"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              className="px-3 py-2 border rounded"
            />
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.is_vegetarian}
                  onChange={(e) =>
                    setFormData({ ...formData, is_vegetarian: e.target.checked })
                  }
                />
                Vegetarisch
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.is_vegan}
                  onChange={(e) => setFormData({ ...formData, is_vegan: e.target.checked })}
                />
                Vegan
              </label>
            </div>
            <textarea
              placeholder="Beschreibung"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="col-span-2 px-3 py-2 border rounded"
              rows={2}
            />
            <button
              onClick={handleAdd}
              className="col-span-2 btn-primary text-center"
            >
              Speichern
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow p-4 flex justify-between items-start border-l-4 border-restaurant-accent"
          >
            <div className="flex-1">
              <h4 className="font-semibold text-restaurant-dark">{item.name}</h4>
              <p className="text-sm text-gray-600">{item.description}</p>
              <div className="mt-2 flex gap-2 text-xs">
                {item.is_vegetarian && <span className="bg-green-100 px-2 py-1 rounded">🥗</span>}
                {item.is_vegan && <span className="bg-green-50 px-2 py-1 rounded">🌱</span>}
                {!item.is_active && <span className="bg-gray-100 px-2 py-1 rounded">Inaktiv</span>}
                {item.is_sold_out && <span className="bg-red-100 px-2 py-1 rounded">Ausverkauft</span>}
              </div>
            </div>
            <div className="text-right ml-4 flex-shrink-0">
              <p className="font-bold text-restaurant-accent">{item.price.toFixed(2)}€</p>
              <button
                onClick={() => setEditingId(editingId === item.id ? null : item.id)}
                className="text-sm text-blue-600 hover:underline"
              >
                {editingId === item.id ? '✓' : '✏️'}
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-sm text-red-600 hover:underline ml-2"
              >
                🗑️
              </button>
            </div>

            {editingId === item.id && (
              <div className="col-span-2 mt-3 p-3 bg-gray-50 rounded text-xs space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={item.is_sold_out}
                    onChange={(e) => {
                      const updated = { ...item, is_sold_out: e.target.checked };
                      setItems(items.map((i) => (i.id === item.id ? updated : i)));
                    }}
                  />
                  Ausverkauft
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={item.is_active}
                    onChange={(e) => {
                      const updated = { ...item, is_active: e.target.checked };
                      setItems(items.map((i) => (i.id === item.id ? updated : i)));
                    }}
                  />
                  Aktiv
                </label>
                <button
                  onClick={() => handleUpdate(item.id)}
                  className="btn-primary w-full text-xs"
                >
                  Änderungen speichern
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
