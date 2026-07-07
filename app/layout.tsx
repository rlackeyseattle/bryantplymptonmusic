import type { Metadata } from "next";
import { Montserrat, Outfit } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Bryant Plympton & The Stillwaters | Montana Alternative Country Rock",
  description: "Official website for Bryant Plympton & The Stillwaters. Stream the debut album 'Baptized in Fire', find tour dates, browse merchandise, and view booking information.",
  keywords: ["Bryant Plympton", "The Stillwaters", "Baptized in Fire", "Montana Country Rock", "Alternative Country", "Americana Music"],
  authors: [{ name: "Bryant Plympton" }],
  openGraph: {
    title: "Bryant Plympton & The Stillwaters",
    description: "Official website for Bryant Plympton & The Stillwaters. Stream 'Baptized in Fire' now.",
    url: "https://www.bryantplymptonmusic.com",
    siteName: "Bryant Plympton Music",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${montserrat.variable} ${outfit.variable} antialiased bg-neutral-950 text-neutral-100 font-sans`}>
        {children}
      </body>
    </html>
  );
}

