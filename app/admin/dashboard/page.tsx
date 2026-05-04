'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

interface Stats {
  totalDishes: number;
  activeDishes: number;
  soldOutDishes: number;
  newReservations: number;
  activePlatforms: number;
  activeReviews: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalDishes: 0,
    activeDishes: 0,
    soldOutDishes: 0,
    newReservations: 0,
    activePlatforms: 0,
    activeReviews: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [dishes, reservations, platforms, reviews] = await Promise.all([
          supabase.from('menu_items').select('id, is_active, is_sold_out', { count: 'exact' }),
          supabase.from('reservations').select('id', { count: 'exact' }).eq('status', 'neu'),
          supabase.from('order_platforms').select('id', { count: 'exact' }).eq('is_active', true),
          supabase.from('reviews').select('id', { count: 'exact' }).eq('is_active', true),
        ]);

        const dishData = dishes.data || [];
        const activeDishes = dishData.filter((d) => d.is_active).length;
        const soldOutDishes = dishData.filter((d) => d.is_sold_out).length;

        setStats({
          totalDishes: dishes.count || 0,
          activeDishes,
          soldOutDishes,
          newReservations: reservations.count || 0,
          activePlatforms: platforms.count || 0,
          activeReviews: reviews.count || 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Gerichte gesamt',
      value: stats.totalDishes,
      color: 'bg-blue-100 text-blue-800',
      href: '/admin/menu',
    },
    {
      title: 'Aktive Gerichte',
      value: stats.activeDishes,
      color: 'bg-green-100 text-green-800',
      href: '/admin/menu',
    },
    {
      title: 'Ausverkaufte Gerichte',
      value: stats.soldOutDishes,
      color: 'bg-red-100 text-red-800',
      href: '/admin/menu',
    },
    {
      title: 'Neue Reservierungen',
      value: stats.newReservations,
      color: 'bg-yellow-100 text-yellow-800',
      href: '/admin/reservations',
    },
    {
      title: 'Aktive Bestellplattformen',
      value: stats.activePlatforms,
      color: 'bg-purple-100 text-purple-800',
      href: '/admin/order-platforms',
    },
    {
      title: 'Aktive Rezensionen',
      value: stats.activeReviews,
      color: 'bg-restaurant-gold text-restaurant-dark',
      href: '/admin/reviews',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-restaurant-primary mx-auto"></div>
          <p className="mt-4 text-restaurant-text">Statistiken werden geladen...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-4xl text-restaurant-dark mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {statCards.map((card, index) => (
          <Link key={index} href={card.href}>
            <div className={`rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition ${card.color}`}>
              <h3 className="font-semibold text-sm opacity-75 mb-2">{card.title}</h3>
              <p className="font-display text-4xl font-bold">{card.value}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
        <h2 className="font-display text-2xl text-restaurant-dark mb-6">Schnelle Aktionen</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/admin/menu"
            className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg hover:shadow-md transition-all duration-150 text-center font-semibold text-blue-900"
          >
            Gericht hinzufügen
          </Link>
          <Link
            href="/admin/reservations"
            className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-lg hover:shadow-md transition-all duration-150 text-center font-semibold text-amber-900"
          >
            Reservierungen
          </Link>
          <Link
            href="/admin/reviews"
            className="p-4 bg-gradient-to-br from-restaurant-primary-light/30 to-restaurant-gold/30 border border-restaurant-gold rounded-lg hover:shadow-md transition-all duration-150 text-center font-semibold text-restaurant-dark"
          >
            Rezensionen
          </Link>
          <Link
            href="/admin/settings"
            className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-lg hover:shadow-md transition-all duration-150 text-center font-semibold text-slate-900"
          >
            Einstellungen
          </Link>
        </div>
      </div>
    </div>
  );
}
