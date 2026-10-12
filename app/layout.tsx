import type { Metadata } from "next";
import "./globals.css";
import "./theme.css";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "SELMANI Lyna",
  description: "Personal portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="scroll-smooth w-full min-h-screen antialiased"
    >
      <body className="w-full min-h-screen flex flex-col font-body bg-[var(--bg)] text-[var(--fg-2)] m-0 p-0">
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
