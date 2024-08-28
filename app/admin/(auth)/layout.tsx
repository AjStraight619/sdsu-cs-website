import AuthLoading from "@/components/loading/auth-loading";
import { ReactNode, Suspense } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex justify-center items-center p-12 w-full">
      <Suspense fallback={<AuthLoading />}>{children}</Suspense>
    </div>
  );
}
