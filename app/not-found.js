import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-semibold text-slate-900">
        404 – Nie znaleziono strony
      </h1>
      <p className="text-sm text-slate-600">
        Ścieżka, którą próbujesz otworzyć, nie istnieje.
      </p>
      <Link
        href="/"
        className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
      >
        Wróć na stronę główną
      </Link>
    </main>
  );
}
