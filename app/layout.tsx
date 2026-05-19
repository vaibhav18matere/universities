import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: "University Directory — University fees",
    template: "%s — University Directory",
  },
  description:
    "Search universities, compare tuition and hostel in approximate INR, and view full fee schedules.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-dvh min-w-0 flex-col overflow-x-clip font-sans text-foreground">
        <div
          className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
          aria-hidden
        >
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f3f4f6_55%,#eef2f7_100%)] dark:bg-[linear-gradient(180deg,#0b1220_0%,#020617_100%)]" />
        </div>
        <SiteHeader />
        <main className="flex min-w-0 w-full flex-1 flex-col pb-[max(1.5rem,env(safe-area-inset-bottom,0px))]">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
