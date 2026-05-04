import type { Metadata } from "next";
import "./globals.css";
import { ConditionalHeader } from "@/components/ConditionalHeader";
import { ConditionalFooter } from "@/components/ConditionalFooter";

export const metadata: Metadata = {
  title: "Ürümchi Uigurisches Restaurant - Karlsruhe",
  description: "Authentische uigurische Küche in Karlsruhe. Willkommen bei Ürümchi. Unsere Küche, unsere Heimat.",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.png"/>
      </head>
      <body className="h-full flex flex-col">
        <ConditionalHeader />
        <main className="flex-1">{children}</main>
        <ConditionalFooter />
      </body>
    </html>
  );
}
