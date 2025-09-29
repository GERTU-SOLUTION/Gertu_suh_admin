// import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";
import AuthProvider from "./provider/AuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <NuqsAdapter>
     
                <html>
                  <body>{children}</body>
                </html>
        
      </NuqsAdapter>
    </AuthProvider>
  );
}
