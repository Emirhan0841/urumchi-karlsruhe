"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isInHero, setIsInHero] = useState(true);
  const [heroHeight, setHeroHeight] = useState(0);

  useEffect(() => {
    const hero = document.querySelector("section:first-of-type");
    if (hero) {
      setHeroHeight(hero.clientHeight);
    }

    const handleScroll = () => {
      setIsInHero(window.scrollY < (heroHeight || 600));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [heroHeight]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 text-restaurant-cream bg-black/30 shadow-lg"
    >
      <nav className="container-narrow py-4 flex items-center justify-between bg-transparent">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Ürümchi Logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          <span className="hidden sm:block font-display text-xl sm:text-2xl">
            Ürümchi
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <Link href="/menu" className="font-display text-lg hover:text-restaurant-gold transition">
            Speisekarte
          </Link>
          <Link
            href="/reservation"
            className="font-display text-lg hover:text-restaurant-gold transition"
          >
            Reservieren
          </Link>
          <Link href="/order" className="font-display text-lg hover:text-restaurant-gold transition">
            Online bestellen
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:bg-restaurant-brown rounded transition"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-transparent border-t border-restaurant-accent">
          <div className="container-narrow py-4 flex flex-col gap-4">
            <Link
              href="/menu"
              className="font-display text-lg hover:text-restaurant-gold transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Speisekarte
            </Link>
            <Link
              href="/reservation"
              className="font-display text-lg hover:text-restaurant-gold transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Reservieren
            </Link>
            <Link
              href="/order"
              className="font-display text-lg hover:text-restaurant-gold transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Online bestellen
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
