"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/lib/firebase/AuthContext";
import { updateProfile } from "firebase/auth";
import { db } from "@/app/lib/firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function ProfilePage() {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [addressLoading, setAddressLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!user) {
      return;
    }

    setDisplayName(user.displayName || "");
    setPhotoURL(user.photoURL || "");

    const loadAddress = async () => {
      try {
        const snapshot = await getDoc(doc(db, "users", user.uid));
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data.address) {
            setCity(data.address.city || "");
            setStreet(data.address.street || "");
            setZipCode(data.address.zipCode || "");
          }
        }
      } catch (e) {
        setError("Nie udało się pobrać adresu użytkownika.");
      } finally {
        setAddressLoading(false);
      }
    };

    loadAddress();
  }, [user]);

  if (!user) {
    return null;
  }

  const onSubmit = async e => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await updateProfile(user, {
        displayName,
        photoURL,
      });

      await setDoc(
        doc(db, "users", user.uid),
        {
          address: {
            city,
            street,
            zipCode,
          },
        },
        { merge: true }
      );

      setSuccess("Profil został zaktualizowany.");
    } catch (e) {
      setError("Błąd aktualizacji profilu: " + e.message);
    }
  };

  return (
    <main className="max-w-lg space-y-4">
      <h1 className="text-2xl font-semibold text-slate-900">
        Profil użytkownika
      </h1>

      <div className="flex items-center gap-4">
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt="Avatar użytkownika"
            className="h-16 w-16 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 text-sm text-slate-600">
            Brak zdjęcia
          </div>
        )}
        <div className="text-sm text-slate-700">
          <div>{user.displayName || "Bez nazwy wyświetlanej"}</div>
          <div className="text-slate-500">{user.email}</div>
        </div>
      </div>

      <form
        onSubmit={onSubmit}
        className="space-y-4 rounded-xl bg-white p-5 shadow"
      >
        {error && (
          <div className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}
        {success && (
          <div className="rounded-md border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            {success}
          </div>
        )}

        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-700">
            Nazwa wyświetlana
          </label>
          <input
            name="displayName"
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            disabled
            value={user.email || ""}
            className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-700">
            Adres zdjęcia profilowego (URL)
          </label>
          <input
            name="photoURL"
            value={photoURL}
            onChange={e => setPhotoURL(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
          />
        </div>

        <fieldset className="space-y-3 rounded-md border border-slate-200 p-3">
          <legend className="px-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Adres
          </legend>

          {addressLoading ? (
            <p className="text-xs text-slate-500">Ładowanie adresu...</p>
          ) : (
            <>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-700">
                  Miasto
                </label>
                <input
                  name="city"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-700">
                  Ulica
                </label>
                <input
                  name="street"
                  value={street}
                  onChange={e => setStreet(e.target.value)}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-700">
                  Kod pocztowy
                </label>
                <input
                  name="zipCode"
                  value={zipCode}
                  onChange={e => setZipCode(e.target.value)}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
                />
              </div>
            </>
          )}
        </fieldset>

        <button
          type="submit"
          className="mt-2 rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Zapisz zmiany
        </button>
      </form>
    </main>
  );
}
