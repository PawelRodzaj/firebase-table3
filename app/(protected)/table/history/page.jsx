"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/lib/firebase/AuthContext";
import { db } from "@/app/lib/firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function TableHistoryPage() {
  const { user } = useAuth();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const q = query(
          collection(db, "tableRows"),
          where("userId", "==", user.uid)
        );
        const snapshot = await getDocs(q);
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRows(items);
      } catch (e) {
        setError("Nie udało się pobrać zapisanych danych: " + e.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user]);

  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-slate-900">
        Zapisane dane z tabeli
      </h1>

      {loading && (
        <p className="text-sm text-slate-600">
          Ładowanie zapisanych rekordów...
        </p>
      )}

      {!loading && error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}

      {!loading && !error && rows.length === 0 && (
        <p className="text-sm text-slate-600">
          Brak zapisanych danych dla tego użytkownika. Najpierw zapisz dane na stronie tabeli.
        </p>
      )}

      {!loading && !error && rows.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Nazwa
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Kategoria
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Cena
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Stan
                </th>
              </tr>
            </thead>
           <tbody className="divide-y divide-slate-200 bg-white">
  {rows.map(row => (
    <tr key={row.id}>
      <td className="px-3 py-2 text-sm font-medium text-slate-900">{row.name}</td>
      <td className="px-3 py-2 text-sm text-slate-900">{row.category}</td>
      <td className="px-3 py-2 text-sm text-slate-900">{row.price}</td>
      <td className="px-3 py-2 text-sm text-slate-900">{row.stock}</td>
    </tr>
  ))}
</tbody>


          </table>
        </div>
      )}
    </main>
  );
}
