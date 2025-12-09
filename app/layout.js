import "./globals.css";
import { FiHome, FiTable, FiLogIn, FiUserPlus, FiInfo, FiUser, FiLogOut, FiClock } from "react-icons/fi";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { AuthProvider } from "@/app/lib/firebase/AuthContext";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata = {
  title: "Projekt lab 6-11",
  description: "Aplikacja z logowaniem i tabelą (temat 3)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <div className="min-h-screen flex bg-slate-100">
            <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white p-4 md:flex">
              <div className="mb-6 text-lg font-semibold text-slate-900">
                Panel aplikacji
              </div>
              <nav className="flex flex-1 flex-col gap-2 text-sm">
                <Link
  href="/"
  className="flex items-center gap-2 rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100"
>
  <FiHome className="h-4 w-4" />
  <span>Strona główna</span>
</Link>
                <Link
  href="/table"
  className="flex items-center gap-2 rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100"
>
  <FiTable className="h-4 w-4" />
  <span>Tabela (temat 3)</span>
</Link>
                <Link
  href="/about"
  className="flex items-center gap-2 rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100"
>
  <FiInfo className="h-4 w-4" />
  <span>o aplikacji</span>
</Link>
<Link
  href="/table/history"
  className="flex items-center gap-2 rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100"
>
  <FiClock className="h-4 w-4" />
  <span>Historia zapisów</span>
</Link>

                <div className="mt-4 border-t border-slate-200 pt-4 text-xs font-semibold uppercase text-slate-500">
                  Użytkownik
                </div>
                <Link
  href="/user/signin"
  className="flex items-center gap-2 rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100"
>
  <FiLogIn className="h-4 w-4" />
  <span>Logowanie</span>
</Link>
                <Link
  href="/user/register"
  className="flex items-center gap-2 rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100"
>
  <FiUserPlus className="h-4 w-4" />
  <span>Rejestracja</span>
</Link>
                
<Link
  href="/user/profile"
  className="flex items-center gap-2 rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100"
>
  <FiUser className="h-4 w-4" />
  <span>Profil</span>
</Link>
<Link
  href="/user/signout"
  className="flex items-center gap-2 rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100"
>
  <FiLogOut className="h-4 w-4" />
  <span>Wyloguj</span>
</Link>

              </nav>
            </aside>

            <div className="flex flex-1 flex-col">
              <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
                <div className="text-sm font-medium text-slate-800">
                  Projekt Next.js + Firebase
                </div>
                <div className="flex gap-3 text-sm">
                  <Link
                    href="/user/signin"
                    className="rounded-md border border-slate-300 px-3 py-1.5 text-slate-700 hover:bg-slate-100"
                  >
                    Zaloguj
                  </Link>
                  <Link
                    href="/user/register"
                    className="rounded-md bg-slate-900 px-3 py-1.5 text-slate-500 hover:bg-slate-800"
                  >
                    Rejestracja
                  </Link>
                </div>
              </header>

              <main className="flex-1 p-4 lg:p-6">{children}</main>

              <footer className="border-t border-slate-200 bg-white px-4 py-3 text-xs text-slate-500">
                Laboratoria 6–11 – temat 3, komponent tabeli
              </footer>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
