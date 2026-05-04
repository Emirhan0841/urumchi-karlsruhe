'use client';

import { useEffect, useState, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import type { Category, MenuItem } from '@/types';

export default function MenuPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    vegetarian: false,
    vegan: false,
    spicy: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catsRes, itemsRes] = await Promise.all([
          supabase.from('categories').select('*').eq('is_active', true).order('sort_order'),
          supabase.from('menu_items').select('*').eq('is_active', true).order('sort_order'),
        ]);

        if (catsRes.data) {
          setCategories(catsRes.data as Category[]);
          const firstActive = (catsRes.data as Category[])[0];
          if (firstActive) setSelectedCategory(firstActive.id);
        }
        if (itemsRes.data) setItems(itemsRes.data as MenuItem[]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory = !selectedCategory || item.category_id === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesVegetarian = !filters.vegetarian || item.is_vegetarian;
      const matchesVegan = !filters.vegan || item.is_vegan;
      const matchesSpicy = !filters.spicy || item.is_spicy;

      return matchesCategory && matchesSearch && matchesVegetarian && matchesVegan && matchesSpicy;
    });
  }, [items, selectedCategory, searchQuery, filters]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-restaurant-light">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-restaurant-accent mx-auto"></div>
          <p className="mt-4 text-restaurant-text">Menü wird geladen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-restaurant-light min-h-screen py-12 pt-28">
      <div className="container-narrow">
        <h1 className="font-display text-4xl md:text-5xl text-center mb-2 text-restaurant-dark">
          Speisekarte
        </h1>
        <p className="text-center text-restaurant-text mb-12 max-w-2xl mx-auto">
          Entdecken Sie unsere authentischen uigurischen Spezialitäten
        </p>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Gericht suchen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-restaurant-accent/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-restaurant-accent"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            {[
              { key: 'vegetarian', label: '🥗 Vegetarisch' },
              { key: 'vegan', label: '🌱 Vegan' },
              { key: 'spicy', label: '🌶️ Scharf' },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilters({ ...filters, [key]: !filters[key as keyof typeof filters] })}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filters[key as keyof typeof filters]
                    ? 'bg-restaurant-accent text-white'
                    : 'bg-gray-100 text-restaurant-text hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-restaurant-accent text-white'
                  : 'bg-white text-restaurant-text border border-restaurant-accent/30 hover:border-restaurant-accent'
              }`}
            >
              {cat.german_name}
            </button>
          ))}
        </div>

        {/* Category Description */}
        {selectedCategory && categories.find((c) => c.id === selectedCategory)?.description && (
          <div className="bg-restaurant-dark text-restaurant-cream rounded-lg p-6 mb-8">
            <p className="italic">{categories.find((c) => c.id === selectedCategory)?.description}</p>
            {categories.find((c) => c.id === selectedCategory)?.note && (
              <p className="text-sm mt-3 text-restaurant-cream/80">
                ℹ️ {categories.find((c) => c.id === selectedCategory)?.note}
              </p>
            )}
          </div>
        )}

        {/* Menu Items */}
        {filtered.length > 0 ? (
          <div className="space-y-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                className={`bg-white rounded-lg shadow-md p-6 transition ${
                  item.is_sold_out ? 'opacity-60' : 'hover:shadow-lg'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      {item.item_number && (
                        <span className="text-sm font-semibold text-restaurant-accent bg-restaurant-cream px-2 py-1 rounded">
                          #{item.item_number}
                        </span>
                      )}
                      <div>
                        <h3 className="font-display text-xl text-restaurant-dark">{item.name}</h3>
                        {item.is_sold_out && (
                          <p className="text-sm text-red-600 font-semibold">Ausverkauft</p>
                        )}
                      </div>
                    </div>

                    {item.description && (
                      <p className="text-restaurant-text text-sm mb-3">{item.description}</p>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {item.is_vegetarian && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          Vegetarisch
                        </span>
                      )}
                      {item.is_vegan && (
                        <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
                          Vegan
                        </span>
                      )}
                      {item.is_spicy && (
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                          Scharf
                        </span>
                      )}
                      {item.is_halal && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          Halal
                        </span>
                      )}
                    </div>

                    {/* Additional Info */}
                    {item.options_text && (
                      <p className="text-xs text-restaurant-brown bg-restaurant-cream px-3 py-2 rounded mb-2 italic">
                        {item.options_text}
                      </p>
                    )}
                    {item.note && (
                      <p className="text-xs text-restaurant-text/75">ℹ️ {item.note}</p>
                    )}
                  </div>

                  {/* Price */}
                  <div className="flex-shrink-0 text-right">
                    <p className="font-display text-2xl text-restaurant-accent">
                      {item.price_label || `${item.price.toFixed(2)} €`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-restaurant-text text-lg">
              {searchQuery || Object.values(filters).some(Boolean)
                ? 'Keine Gerichte gefunden, die Ihren Suchkriterien entsprechen.'
                : 'Keine Gerichte in dieser Kategorie verfügbar.'}
            </p>
          </div>
        )}

        {/* Allergen Notice */}
        <div className="bg-restaurant-dark text-restaurant-cream rounded-lg p-6 mt-12">
          <p className="text-sm">
            ⚠️ <strong>Allergy Information:</strong> Bei Allergenen und Unverträglichkeiten sprecht
            bitte unser Servicepersonal an.
          </p>
        </div>
      </div>
    </div>
  );
}
