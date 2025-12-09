"use client";

import { useState } from "react";
import DataTable from "@/app/components/DataTable";
import { db } from "@/app/lib/firebase/firebase";
import { useAuth } from "@/app/lib/firebase/AuthContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const header = [
  { key: "name", label: "Nazwa" },
  { key: "category", label: "Kategoria" },
  { key: "price", label: "Cena [PLN]" },
  { key: "stock", label: "Stan magazynowy" },
];

const body = [
  { id: "1", name: "Klawiatura mechaniczna", category: "Peripherals", price: 299, stock: 12 },
  { id: "2", name: "Mysz bezprzewodowa", category: "Peripherals", price: 149, stock: 34 },
  { id: "3", name: "Monitor 27\"", category: "Display", price: 1299, stock: 7 },
  { id: "4", name: "Laptop 15\"", category: "Computers", price: 3999, stock: 4 },
  { id: "5", name: "Słuchawki", category: "Audio", price: 249, stock: 18 },
  { id: "6", name: "Głośniki biurkowe", category: "Audio", price: 199, stock: 9 },
  { id: "7", name: "Dysk SSD 1TB", category: "Storage", price: 399, stock: 25 },
  { id: "8", name: "Dysk HDD 2TB", category: "Storage", price: 349, stock: 15 },
];

const totalPrice = body.reduce((sum, row) => sum + row.price, 0);
const footer = ["Suma", "", `${totalPrice} PLN`, ""];

export default function TablePage() {
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  const handleSave = async () => {
    if (!user) {
      setStatus("Musisz być zalogowany, aby zapisać dane.");
      return;
    }
    setSaving(true);
    setStatus("");
    try {
      const promises = body.map(row =>
        addDoc(collection(db, "tableRows"), {
          userId: user.uid,
          rowId: row.id,
          name: row.name,
          category: row.category,
          price: row.price,
          stock: row.stock,
          createdAt: serverTimestamp(),
        })
      );
      await Promise.all(promises);
      setStatus("Dane tabeli zostały zapisane w bazie.");
    } catch (e) {
      setStatus("Błąd zapisu danych: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-slate-900">
          Komponent tabeli (temat 3)
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl">
          Tabela generowana na podstawie tablic header, body, footer. Nagłówki
          mają sortowanie, a zaznaczone wiersze można grupowo ukrywać i
          przywracać. Dane mogą zostać zapisane do Firestore.
        </p>
      </header>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-emerald-300"
        >
          {saving ? "Zapisywanie..." : "Zapisz dane do bazy"}
        </button>
        {status && (
           <span className="rounded-md bg-slate-100 px-3 py-1 text-sm font-medium text-slate-900">
            {status}
          </span>
        )}
      </div>

      <DataTable header={header} body={body} footer={footer} />
    </section>
  );
}
