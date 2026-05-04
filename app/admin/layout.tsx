"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      } else {
        setUser(session.user);
      }
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-restaurant-light">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-restaurant-accent mx-auto"></div>
          <p className="mt-4 text-restaurant-text">Wird geladen...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const navItems = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Speisekarte", href: "/admin/menu" },
    { label: "Kategorien", href: "/admin/categories" },
    { label: "Rezensionen", href: "/admin/reviews" },
    { label: "Bestellplattformen", href: "/admin/order-platforms" },
    { label: "Öffnungszeiten", href: "/admin/opening-hours" },
    { label: "Reservierungen", href: "/admin/reservations" },
    { label: "Restaurantdaten", href: "/admin/settings" },
  ];

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 bg-restaurant-dark text-restaurant-cream flex-col">
        <div className="p-6 border-b border-restaurant-accent">
          <h2 className="font-display text-2xl">Admin</h2>
          <p className="text-sm text-restaurant-cream/75">{user.email}</p>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2 rounded-lg hover:bg-restaurant-brown transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="mx-4 mb-4 p-3 bg-restaurant-primary text-white rounded-lg font-semibold hover:bg-restaurant-primary-dark transition-all duration-150 shadow-md hover:shadow-lg"
        >
          Abmelden
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-auto">
        {/* Mobile Header */}
        <div className="md:hidden bg-restaurant-dark text-restaurant-cream px-4 py-4 flex items-center justify-between">
          <h2 className="font-display text-xl">Admin</h2>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-restaurant-brown rounded transition"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  mobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden bg-restaurant-brown text-restaurant-cream px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 rounded-lg hover:bg-restaurant-dark transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              className="w-full px-4 py-2 mt-4 bg-restaurant-primary text-white rounded-lg font-semibold hover:bg-restaurant-primary-dark transition-all duration-150 shadow-md hover:shadow-lg"
            >
              Abmelden
            </button>
          </nav>
        )}

        {/* Page Content */}
        <div className="flex-1 p-4 md:p-8 bg-restaurant-light overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
