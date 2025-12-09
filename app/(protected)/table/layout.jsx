"use client";

import { useLayoutEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/firebase/AuthContext";

function ProtectedLayout({ children }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useLayoutEffect(() => {
    if (!loading && !user) {
      router.replace(`/user/signin?returnUrl=${pathname}`);
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-slate-500">
        Ładowanie...
      </div>
    );
  }

  return <>{children}</>;
}

export default ProtectedLayout;
