import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Récif Docs",
    template: "%s — Récif Docs",
  },
  description:
    "Documentation for Récif, the open-source platform to govern, deploy, and operate AI agents at scale.",
  keywords: ["AI agents", "agentic platform", "MLOps", "Kubernetes", "open-source", "governance"],
  openGraph: {
    title: "Récif Docs",
    description: "Open-source platform to govern, deploy, and operate AI agents.",
    type: "website",
  },
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
