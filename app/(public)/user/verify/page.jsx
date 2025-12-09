"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/lib/firebase/AuthContext";
import { auth } from "@/app/lib/firebase/firebase";
import { signOut } from "firebase/auth";

export default function VerifyEmailPage() {
  const { user } = useAuth();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user && user.email) {
      setEmail(user.email);
      signOut(auth);
    }
  }, [user]);

  return (
    <main className="flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold text-slate-900">
        Weryfikacja adresu email
      </h1>
      <p className="max-w-md text-center text-sm text-slate-700">
        Na adres {email || "twojego konta"} został wysłany link weryfikacyjny.
        Sprawdź swoją skrzynkę pocztową, kliknij link w wiadomości, a następnie
        zaloguj się ponownie do aplikacji.
      </p>
    </main>
  );
}
