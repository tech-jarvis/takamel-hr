import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import { SessionTenantSync } from "@/components/auth/session-tenant-sync";
import { AppSettingsProvider } from "@/components/providers/app-settings-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin", "arabic"],
});

export const metadata: Metadata = {
  title: "Takamel HR — تكامل | AI-powered HRMS",
  description:
    "Multitenant HRMS prototype: hiring, HR operations, and AI layer for Saudi Arabia and the Gulf.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${cairo.variable} antialiased`}>
        <AppSettingsProvider>
          <AuthProvider>
            <SessionTenantSync />
            {children}
          </AuthProvider>
        </AppSettingsProvider>
      </body>
    </html>
  );
}
