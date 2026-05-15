import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
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
    default: "Study Russia — University fees",
    template: "%s — Study Russia",
  },
  description:
    "Search Russian universities, compare tuition and hostel in approximate INR, and view full fee schedules.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans text-foreground">
        <div
          className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
          aria-hidden
        >
          <div className="absolute -left-1/4 top-0 h-[min(70vh,520px)] w-[150%] rounded-full bg-linear-to-br from-indigo-200/40 via-transparent to-transparent blur-3xl dark:from-indigo-950/50 sm:left-0 sm:w-full" />
          <div className="absolute bottom-0 right-0 h-[min(50vh,400px)] w-[min(100vw,480px)] rounded-full bg-linear-to-tl from-violet-200/30 via-transparent to-transparent blur-3xl dark:from-violet-950/40" />
        </div>
        <SiteHeader />
        <main className="flex w-full flex-1 flex-col pb-[max(1.5rem,env(safe-area-inset-bottom,0px))]">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
