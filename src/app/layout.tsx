// import type { Metadata } from "next";
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
      <ComplexesProvider>
        <PropertiesProvider>
          <html>
            <body>{children}</body>
          </html>
        </PropertiesProvider>
      </ComplexesProvider>
    </AuthProvider>
  );
}
