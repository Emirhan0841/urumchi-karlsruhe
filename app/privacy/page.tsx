'use client';

export default function PrivacyPage() {
  return (
    <div className="bg-restaurant-light min-h-screen py-12 pt-28">
      <div className="container-narrow max-w-3xl">
        <h1 className="font-display text-4xl text-restaurant-dark mb-8">Datenschutzerklärung</h1>

        <div className="bg-white rounded-lg shadow-md p-8 space-y-8 text-sm text-restaurant-text">
          <section>
            <h2 className="font-display text-2xl text-restaurant-dark mb-4">
              1. Datenschutz auf einen Blick
            </h2>
            <p>
              Diese Website erhebt und speichert personenbezogene Daten nur in dem Umfang, der für
              die Funktionalität der Website erforderlich ist.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-restaurant-dark mb-4">
              2. Reservierungen
            </h2>
            <p>
              Wenn Sie eine Tischreservierung vornehmen, werden Ihre persönlichen Daten
              (Name, E-Mail, Telefonnummer) gespeichert, um die Reservierung zu bestätigen
              und Sie zu kontaktieren. Diese Daten werden nach Abschluss der Reservierung
              gelöscht oder mit Ihrer Zustimmung archiviert.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-restaurant-dark mb-4">3. Cookies</h2>
            <p>
              Diese Website verwendet Cookies nur soweit notwendig für die Authentifizierung
              (Admin-Bereich). Marketing-Cookies werden nicht verwendet.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-restaurant-dark mb-4">4. Ihre Rechte</h2>
            <p>
              Sie haben das Recht, jederzeit Auskunft über Ihre gespeicherten Daten zu erhalten
              und diese zu korrigieren oder löschen zu lassen. Kontaktieren Sie uns hierzu unter
              den im Impressum angegebenen Kontaktdaten.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-restaurant-dark mb-4">5. Kontakt</h2>
            <p>
              Bei Fragen zum Datenschutz kontaktieren Sie uns bitte über die im Impressum
              angegebenen Kontaktdaten.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
