import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white md:flex-row">
      <div
        className="relative flex flex-1 flex-col justify-between p-8 text-white md:max-w-md md:p-10"
        style={{
          background:
            "linear-gradient(160deg, #003366 0%, #00A3A3 55%, #2ECC71 100%)",
        }}
      >
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt=""
            width={44}
            height={44}
            className="h-11 w-11 rounded-xl bg-white/10 object-contain p-0.5"
          />
          <div>
            <p className="font-bold">Takamel HR</p>
            <p className="text-sm opacity-90" dir="rtl">
              تكامل
            </p>
          </div>
        </Link>
        <div className="my-10 md:my-0">
          <p className="text-lg font-semibold leading-snug opacity-95">
            HRMS prototype — sign-in flows only, no real backend.
          </p>
          <p className="mt-3 text-sm opacity-80" dir="rtl">
            نموذج أولي — تسجيل دخول تجريبي فقط.
          </p>
        </div>
        <p className="text-xs opacity-70">© Takamel HR</p>
      </div>
      <div className="flex flex-1 items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
