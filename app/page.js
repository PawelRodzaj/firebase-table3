export default function HomePage() {
  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-slate-900">
        Strona główna aplikacji
      </h1>
      <p className="text-sm text-slate-600 max-w-xl">
        To jest projekt z laboratoriów 6–11. Aplikacja posiada logowanie
        z Firebase Authentication, strefę publiczną i chronioną oraz
        komponent tabeli z sortowaniem i grupowaniem wierszy (temat 3).
      </p>
      <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
        <li>Użyj menu po lewej, aby przejść do logowania lub rejestracji.</li>
        <li>Po zalogowaniu przejdź do zakładki „Tabela (temat 3)”.</li>
      </ul>
    </main>
  );
}
