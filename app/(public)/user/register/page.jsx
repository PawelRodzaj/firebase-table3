"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/app/lib/firebase/firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    setError("");

    const email = e.target.email.value;
    const password = e.target.password.value;
    const repeat = e.target.repeat.value;

    if (password !== repeat) {
      setError("Hasła muszą być takie same");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => sendEmailVerification(auth.currentUser))
      .then(() => {
        router.push("/user/verify");
      })
      .catch(err => {
        setError(err.message);
      });
  };

  return (
    <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm space-y-4 rounded-xl bg-white p-6 shadow"
      >
        <h1 className="text-xl font-semibold text-slate-900">Rejestracja</h1>

        {error && (
          <div className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-700">
            Hasło
          </label>
          <input
            type="password"
            name="password"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-700">
            Powtórz hasło
          </label>
          <input
            type="password"
            name="repeat"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
          />
        </div>

        <button
          type="submit"
          className="mt-2 w-full rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Zarejestruj
        </button>
      </form>
    </div>
  );
}
