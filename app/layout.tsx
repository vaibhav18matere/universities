import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import { UniverseBackground } from "@/app/components/UniverseBackground";
import { THEME_STORAGE_KEY } from "@/lib/theme-storage";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const themeInitScript = `(function(){try{var s=localStorage.getItem("${THEME_STORAGE_KEY}");var t=s==="dark"||s==="light"?s:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.classList.toggle("dark",t==="dark")}catch(e){}})();`;

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
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="theme-transition flex min-h-dvh min-w-0 flex-col overflow-x-clip font-sans text-foreground">
        <ThemeProvider>
          <UniverseBackground />
          <SiteHeader />
          <main className="flex min-w-0 w-full flex-1 flex-col pb-[max(1.5rem,env(safe-area-inset-bottom,0px))]">
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
