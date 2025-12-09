import { Suspense } from "react";
import SignInForm from "./SignInForm";

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="p-4 text-sm">Ładowanie formularza logowania...</div>}>
      <SignInForm />
    </Suspense>
  );
}
