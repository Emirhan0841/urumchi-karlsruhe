'use client';

export default function ImprintPage() {
  return (
    <div className="bg-restaurant-light min-h-screen py-12 pt-28">
      <div className="container-narrow max-w-3xl">
        <h1 className="font-display text-4xl text-restaurant-dark mb-8">Impressum</h1>

        <div className="bg-white rounded-lg shadow-md p-8 space-y-6 text-restaurant-text">
          <section>
            <h2 className="font-display text-2xl text-restaurant-dark mb-4">Betreiber</h2>
            <p className="space-y-1">
              <strong>Ürümchi Uigurisches Restaurant</strong>
              <br />
              Vorname: Eli
              <br />
              Nachname: Tursun
              <br />
              Englerstraße 14
              <br />
              76131 Karlsruhe
              <br />
              Deutschland
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-restaurant-dark mb-4">Kontaktinformation</h2>
            <p className="space-y-1">
              Telefonnummer: +49 176 61406968
              <br />
              E-Mail-Adresse: uyghur_urumchi@outlook.de
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-restaurant-dark mb-4">Steuernummer</h2>
            <p>Lokale Steuernummer: 123123123213</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-restaurant-dark mb-4">Haftungsausschluss</h2>
            <p className="text-sm">
              Die Inhalte dieser Website werden mit großer Sorgfalt erstellt und regelmäßig
              aktualisiert. Der Betreiber übernimmt jedoch keine Gewähr für die Korrektheit,
              Vollständigkeit oder Aktualität der bereitgestellten Inhalte. Die Nutzung dieser
              Website erfolgt auf eigene Gefahr des Nutzers.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-restaurant-dark mb-4">Externe Links</h2>
            <p className="text-sm">
              Für den Inhalt von extern verlinkten Seiten ist der Betreiber nicht verantwortlich.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
