export default function AboutPage() {
  return (
    <main className="max-w-2xl space-y-6">
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold text-slate-900">
          O autorze i aplikacji
        </h1>
        <p className="text-sm text-slate-700">
          Aplikacja została przygotowana jako projekt w ramach laboratoriów
          6–11. Tematem zrealizowanym w tym projekcie jest komponent tabeli
          generowanej na podstawie tablic header, body i footer, z obsługą
          sortowania oraz ukrywania zaznaczonych wierszy (collapse).
        </p>
      </section>

      <section className="space-y-1 text-sm text-slate-700">
        <h2 className="text-base font-semibold text-slate-900">
          Informacje o autorze
        </h2>
        <p>Imię i nazwisko: Paweł Rodzaj</p>
        <p>Kierunek: informatyka stosowana</p>
        <p>Rok akademicki: 2025/2026</p>
      </section>

      <section className="space-y-2 text-sm text-slate-700">
        <h2 className="text-base font-semibold text-slate-900">
          Wykorzystane technologie
        </h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Next.js (App Router)</li>
          <li>React</li>
          <li>Tailwind CSS</li>
          <li>Firebase Authentication</li>
          <li>Firestore (zapis przykładowych danych z tabeli)</li>
        </ul>
      </section>

      <section className="space-y-2 text-sm text-slate-700">
        <h2 className="text-base font-semibold text-slate-900">
          Funkcjonalności aplikacji
        </h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Rejestracja i logowanie użytkowników za pomocą Firebase.</li>
          <li>Strefa publiczna i strefa chroniona dostępna tylko po zalogowaniu.</li>
          <li>
            Komponent tabeli z sortowaniem rosnącym, malejącym i powrotem do
            naturalnego porządku danych.
          </li>
          <li>
            Funkcja collapse: zaznaczone wiersze są ukrywane i mogą zostać
            przywrócone jednym przyciskiem dla całej grupy.
          </li>
          <li>
            Zapis przykładowych danych z tabeli do kolekcji w Firestore powiązanej
            z zalogowanym użytkownikiem.
          </li>
        </ul>
      </section>
    </main>
  );
}
