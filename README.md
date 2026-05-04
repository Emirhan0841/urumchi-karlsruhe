# Ürümchi Uigurisches Restaurant - Website

Moderne Restaurant-Website mit digitaler Speisekarte, Reservierungssystem und Admin-Panel für Ürümchi Uigurisches Restaurant in Karlsruhe.

## Features

✨ **Öffentliche Website**
- Moderne, mobile-first Homepage mit Logo
- Digitale Speisekarte mit Suchfunktion und Filtern
- Online-Bestellplattformen (Wolt, Lieferando.de)
- Reservierungssystem
- Rezensionen-Sektion
- Responsive Design

🔧 **Admin-Panel**
- Speisekarte verwalten (CRUD)
- Kategorien bearbeiten
- Rezensionen verwalten
- Online-Bestellplattformen konfigurieren
- Öffnungszeiten verwalten
- Reservierungen anzeigen und Status ändern
- Restaurantdaten bearbeiten

🛡️ **Backend**
- Supabase PostgreSQL Datenbank
- Supabase Auth für Admin-Login
- Row Level Security (RLS) für Datenschutz
- API-Routen für Formulare

## Tech Stack

- **Frontend:** Next.js 15 (App Router), React 18, TypeScript
- **Styling:** Tailwind CSS, Amatic SC Font
- **Backend:** Supabase (PostgreSQL, Auth)
- **Deployment:** Vercel-ready

## Installation

### 1. Voraussetzungen

- Node.js 18+
- npm oder yarn
- Supabase Account (kostenlos unter https://supabase.com)

### 2. Repository klonen/öffnen

```bash
cd C:\Users\emirh\VscodeProjects\urumchi
```

### 3. Dependencies installieren

```bash
npm install
```

### 4. Supabase Projekt erstellen

1. Gehen Sie zu https://supabase.com und erstellen Sie ein neues Projekt
2. Kopieren Sie die **Project URL** und **Anon Key**
3. Notieren Sie diese für den nächsten Schritt

### 5. Datenbank einrichten

1. Öffnen Sie den SQL Editor in Supabase
2. Kopieren Sie den Inhalt von `supabase/schema.sql`
3. Führen Sie die SQL-Anweisungen aus
4. Führen Sie `supabase/seed.sql` aus, um Beispiel-Daten zu laden

### 6. Environment-Variablen konfigurieren

Erstellen Sie `.env.local` im Projekt-Root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Ersetzen Sie die Werte mit Ihren Supabase-Anmeldedaten.

### 7. Admin-User erstellen

1. Gehen Sie zu **Supabase Dashboard → Authentication → Users**
2. Klicken Sie auf **"Add user"**
3. Geben Sie E-Mail und Passwort ein
4. Bestätigen Sie die E-Mail (falls erforderlich)
5. Der Benutzer ist jetzt Admin-User mit Zugriff auf `/admin`

### 8. Lokal starten

```bash
npm run dev
```

Öffnen Sie [http://localhost:3000](http://localhost:3000) in Ihrem Browser.

## Verwendung

### Öffentliche Website

- **Startseite:** `/` - Hero-Bereich, Öffnungszeiten, Rezensionen
- **Speisekarte:** `/menu` - Digitale Speisekarte mit Filtern
- **Online bestellen:** `/order` - Links zu Wolt und Lieferando
- **Reservieren:** `/reservation` - Reservierungsformular
- **Impressum:** `/imprint`
- **Datenschutz:** `/privacy`

### Admin-Panel

- **Login:** `/admin/login`
- **Dashboard:** `/admin/dashboard` - Übersicht mit Statistiken
- **Speisekarte:** `/admin/menu` - Gerichte verwalten
- **Kategorien:** `/admin/categories` - Kategorien bearbeiten
- **Rezensionen:** `/admin/reviews` - Rezensionen hinzufügen/bearbeiten
- **Bestellplattformen:** `/admin/order-platforms` - Wolt, Lieferando konfigurieren
- **Öffnungszeiten:** `/admin/opening-hours` - Öffnungszeiten setzen
- **Reservierungen:** `/admin/reservations` - Reservierungen verwalten
- **Einstellungen:** `/admin/settings` - Restaurantdaten bearbeiten

## Datenbank-Schema

### Wichtigste Tabellen

- **restaurant_settings** - Restaurantinformationen
- **categories** - Speisekarte-Kategorien
- **menu_items** - Gerichte
- **reviews** - Kundenbewertungen
- **order_platforms** - Bestellplattformen (Wolt, Lieferando)
- **reservations** - Tischreservierungen
- **opening_hours** - Öffnungszeiten
- **profiles** - Admin-Benutzer und Rollen

## Design

- **Farben:** Dunkle, warme und elegante Palette
  - Dunkelbraun (#1a1410), Creme (#f5f1ed), Gold (#d4a574)
  - Rustikale Akzente für uigurisches Restaurant-Flair
  
- **Schriften:**
  - **Amatic SC** - Handschriftlich für Überschriften
  - **Inter** - Modern und lesbar für Body-Text

- **Mobile-First** - Optimiert für Smartphones und Tablets

## Deployment auf Vercel

1. Pushen Sie den Code zu GitHub
2. Verbinden Sie das Repository mit Vercel
3. Setzen Sie die Environment-Variablen in Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Vercel deployt automatisch

## Sicherheit

- Row Level Security (RLS) schützt Daten
- Admin-Seiten sind mit Supabase Auth geschützt
- Öffentliche Website kann nur aktive Inhalte sehen
- Keine sensiblen Daten im Client-Code

## TODO (zukünftige Erweiterungen)

- [ ] Google Places API Integration für Rezensionen
- [ ] Foto-Upload für Gerichte
- [ ] Mehrsprachigkeit (Deutsch/Uigurisch)
- [ ] Mitarbeiter und Küchen-Rollen
- [ ] SMS-Reservierungsbestätigung
- [ ] Newsletter-Anmeldung
- [ ] Statistik-Dashboard

## Support

Bei Fragen oder Problemen kontaktieren Sie:
- **E-Mail:** uyghur_urumchi@outlook.de
- **Adresse:** Englerstraße 14, 76131 Karlsruhe

## Lizenz

Privat - Ürümchi Uigurisches Restaurant
