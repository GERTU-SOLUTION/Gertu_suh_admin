// import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";
import AuthProvider from "./provider/AuthProvider";
import { ComplexesProvider } from "./provider/ComplexProvider";
import { PropertiesProvider } from "./provider/PropertiesProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <NuqsAdapter>
        <ComplexesProvider>
          <PropertiesProvider>
            <html>
              <body>{children}</body>
            </html>
          </PropertiesProvider>
        </ComplexesProvider>
      </NuqsAdapter>
    </AuthProvider>
  );
}
