import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "./theme.css";
import { ThemeToggle } from "@/components/ThemeToggle";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const themeScript = `try{var t=localStorage.getItem("theme");if(!t)t="dark";document.documentElement.dataset.theme=t}catch(e){}`;

export const metadata: Metadata = {
  title: "SELMANI Lyna",
  description: "Personal portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} scroll-smooth w-full min-h-screen antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="w-full min-h-screen flex flex-col font-body bg-[var(--bg)] text-[var(--fg-2)] m-0 p-0">
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
