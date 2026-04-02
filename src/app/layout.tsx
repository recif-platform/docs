import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Recif Docs — Open-Source Agentic Platform",
  description:
    "Documentation for Recif, the open-source platform to govern, deploy, and operate AI agents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
