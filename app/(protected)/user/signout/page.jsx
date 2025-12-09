"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase/firebase";

export default function SignOutPage() {
  const router = useRouter();

  useEffect(() => {
    signOut(auth).finally(() => {
      router.push("/");
    });
  }, [router]);

  return (
    <main className="flex min-h-[calc(100vh-6rem)] items-center justify-center">
      <p className="text-sm text-slate-600">
        Trwa wylogowywanie użytkownika...
      </p>
    </main>
  );
}
