// import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";
import AuthProvider from "./provider/AuthProvider";
import { ComplexesProvider } from "./provider/ComplexProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <NuqsAdapter>
            <ComplexesProvider>
                <html>
                  <body>{children}</body>
                </html>
        </ComplexesProvider>
      </NuqsAdapter>
    </AuthProvider>
  );
}
