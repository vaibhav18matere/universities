"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { megaMenuCountries } from "@/lib/landing-static";
import {
  buildUniversitiesCountryPath,
  buildUniversitiesHubPath,
} from "@/lib/mega-menu-country-routes";

type HeaderMenuKey = "countries" | null;

function LogoMark() {
  return (
    <span
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground shadow-sm"
      aria-hidden
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none">
        <path
          d="M8 10h16v14H8V10z"
          fill="currentColor"
          className="opacity-95"
        />
        <path d="M10 6h12v6H10V6z" fill="currentColor" className="opacity-80" />
        <path d="M15 12h2v10h-2V12z" fill="var(--surface)" />
        <path d="M12 15h8v2h-8v-2z" fill="var(--surface)" />
      </svg>
    </span>
  );
}

function IconArrowRight() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12.59 4.59 18 10l-5.41 5.41-1.18-1.18L14.76 11H4V9h10.76l-3.35-3.23 1.18-1.18Z" />
    </svg>
  );
}

function IconKey() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12.5 2a4.5 4.5 0 0 1 3.18 7.68L18 12h-2v2h-2v2h-2v2H6v-3.09A4.5 4.5 0 1 1 12.5 2Zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z" />
    </svg>
  );
}

function IconHeadset() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="currentColor"
      aria-hidden
    >
      <path d="M10 2a6 6 0 0 0-6 6v3H3v4h3v-4H5V8a5 5 0 0 1 10 0v3h-1v4h3v-4h-1V8a6 6 0 0 0-6-6Z" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4 shrink-0"
      fill="currentColor"
      aria-hidden
    >
      <path d="M4.5 3h2l1.5 4-1.3 1.3a11 11 0 0 0 5.5 5.5L14 12l4 1.5v2a2 2 0 0 1-2.2 2A16 16 0 0 1 4.5 5.2 2 2 0 0 1 4.5 3Z" />
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4 shrink-0"
      fill="currentColor"
      aria-hidden
    >
      <path d="M10 2a8 8 0 0 0-6.8 12.1L3 18l4.1-1.1A8 8 0 1 0 10 2Zm0 1.5a6.5 6.5 0 0 1 5.5 9.9l.1.3-.4 1.3-1.3-.3a6.5 6.5 0 1 1-4-11.2Z" />
      <path d="M7.2 6.8c.2-.5.4-.5.7-.5h.6c.2 0 .4.1.5.5l.8 1.9c0 .2 0 .4-.1.5l-.5.6c-.1.1-.1.3 0 .4.4.7 1 1.3 1.7 1.7.1.1.3.1.4 0l.6-.5c.1-.1.4-.1.5 0l1.8 1c.2.1.3.3.3.5v.6c0 .3-.1.5-.4.7-.6.4-1.3.6-2 .6-2.4 0-5.5-3.1-5.5-5.5 0-.7.2-1.4.6-2Z" />
    </svg>
  );
}

function IconChevronDown() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="currentColor"
      aria-hidden
    >
      <path d="M5.23 7.21 10 12l4.77-4.79 1.06 1.06L10 14.12 4.17 8.27l1.06-1.06Z" />
    </svg>
  );
}

function IconMenu() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="currentColor"
      aria-hidden
    >
      <path d="M4 7h16v2H4V7Zm0 5h16v2H4v-2Zm0 5h16v2H4v-2Z" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="currentColor"
      aria-hidden
    >
      <path d="M6.4 5 12 10.6 17.6 5 19 6.4 13.4 12 19 17.6 17.6 19 12 13.4 6.4 19 5 17.6 10.6 12 5 6.4Z" />
    </svg>
  );
}

const primaryNavLinkClassName =
  "shrink-0 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-surface-muted hover:text-accent sm:py-2 dark:text-slate-200 dark:hover:bg-slate-800";

const mobileHamburgerButtonClassName =
  "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border text-slate-700 shadow-sm transition active:scale-[0.98] dark:text-slate-100";

type MobileNavIconKind = "home" | "about" | "universities";

type MobileNavItem = {
  readonly href: string;
  readonly label: string;
  readonly description: string;
  readonly iconKind: MobileNavIconKind;
};

const mobileNavItems: ReadonlyArray<MobileNavItem> = [
  {
    href: "/",
    label: "Home",
    description: "Back to the homepage",
    iconKind: "home",
  },
  {
    href: "/about",
    label: "About",
    description: "Learn about our counselling",
    iconKind: "about",
  },
  {
    href: buildUniversitiesHubPath(),
    label: "Universities",
    description: "Browse and compare fees",
    iconKind: "universities",
  },
];

function IconNavChevron() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-5 w-5 shrink-0 text-slate-300 dark:text-slate-600"
      fill="currentColor"
      aria-hidden
    >
      <path d="M8.12 4.47 14.65 11l-6.53 6.53-1.06-1.06L12.53 11 7.06 5.53l1.06-1.06Z" />
    </svg>
  );
}

function IconHomeNav() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 3 4 9.5V20h5v-6h6v6h5V9.5L12 3Z" />
    </svg>
  );
}

function IconAboutNav() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 4.5a1.25 1.25 0 1 1-1.25 1.25A1.25 1.25 0 0 1 12 6.5ZM11 11h2v7h-2v-7Z" />
    </svg>
  );
}

function IconUniversitiesNav() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
      aria-hidden
    >
      <path d="M4 20V9l8-5 8 5v11h-5v-6h-2v6H4Zm2-2h2v-6h8v6h2V9.5l-6-3.75L6 9.5V18Z" />
    </svg>
  );
}

function MobileNavIcon(props: { readonly iconKind: MobileNavIconKind }) {
  const { iconKind } = props;
  if (iconKind === "home") {
    return <IconHomeNav />;
  }
  if (iconKind === "about") {
    return <IconAboutNav />;
  }
  return <IconUniversitiesNav />;
}

type MobileNavDrawerProps = {
  readonly onClose: () => void;
};

function MobileNavDrawer(props: MobileNavDrawerProps) {
  const { onClose } = props;

  return (
    <div
      className="fixed inset-0 z-60 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-nav-title"
    >
      <button
        type="button"
        className="mobile-nav-backdrop absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        aria-label="Close navigation menu"
        onClick={onClose}
      />
      <nav
        id="mobile-nav-drawer"
        aria-label="Mobile"
        className="mobile-nav-panel absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-surface shadow-[-16px_0_48px_rgba(15,23,42,0.18)] ring-1 ring-slate-900/5 dark:bg-slate-950 dark:shadow-black/50 dark:ring-white/10"
        style={{
          paddingTop: "env(safe-area-inset-top, 0px)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        <div className="relative overflow-hidden border-b border-slate-200/80 bg-linear-to-br from-accent/8 via-surface to-surface px-5 pb-5 pt-5 dark:border-slate-800 dark:from-accent/15 dark:via-slate-950 dark:to-slate-950">
          <div
            className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-accent/10 blur-2xl"
            aria-hidden
          />
          <div className="relative flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <LogoMark />
              <div className="min-w-0">
                <p
                  id="mobile-nav-title"
                  className="truncate text-sm font-bold uppercase tracking-wide text-brand-ink dark:text-slate-100"
                >
                  University Directory
                </p>
                <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                  Navigate the site
                </p>
              </div>
            </div>
            <button
              type="button"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200/80 bg-surface/90 text-slate-600 shadow-sm transition hover:bg-surface-muted active:scale-[0.98] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              aria-label="Close navigation menu"
              onClick={onClose}
            >
              <IconClose />
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto overscroll-contain">
          <p className="px-5 pb-2 pt-5 text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Explore
          </p>
          <ul className="flex flex-col gap-2 px-4 pb-4">
            {mobileNavItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="group flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-surface-muted/40 px-3 py-3.5 transition hover:border-accent/25 hover:bg-surface-muted active:scale-[0.99] dark:border-slate-700/80 dark:bg-slate-900/50 dark:hover:border-accent/30 dark:hover:bg-slate-800/80"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition group-hover:bg-accent group-hover:text-accent-foreground dark:bg-accent/15">
                    <MobileNavIcon iconKind={item.iconKind} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-base font-semibold text-slate-900 dark:text-slate-50">
                      {item.label}
                    </span>
                    <span className="block text-xs leading-snug text-slate-500 dark:text-slate-400">
                      {item.description}
                    </span>
                  </span>
                  <IconNavChevron />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto border-t border-slate-200/80 bg-surface-muted/30 px-4 py-4 dark:border-slate-800 dark:bg-slate-900/40">
          <div className="flex flex-col gap-2.5">
            <a
              href="tel:+918010584844"
              onClick={onClose}
              className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-2xl bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground shadow-md shadow-accent/25 transition hover:brightness-110 active:scale-[0.98] dark:shadow-black/40"
            >
              <IconPhone />
              Call +91 8010584844
            </a>
            <a
              href="https://wa.me/918010584844"
              target="_blank"
              rel="noreferrer"
              onClick={onClose}
              className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-2xl border-2 border-whatsapp/80 bg-whatsapp/10 px-4 py-3 text-sm font-semibold text-emerald-800 transition hover:bg-whatsapp/20 active:scale-[0.98] dark:text-emerald-200"
            >
              <IconWhatsApp />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}

function SocialIconFacebook() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="currentColor"
      aria-hidden
    >
      <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H7v-3h3.5V9.5c0-3.5 2-5.5 5.3-5.5 1.5 0 3.2.3 3.2.3v3.5h-1.8c-1.8 0-2.4 1.1-2.4 2.2V12h4l-.6 3h-3.4v7A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

function SocialIconLinkedIn() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="currentColor"
      aria-hidden
    >
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 8h4V23h-4V8Zm7.5 0h3.8v2h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V23h-4v-6.7c0-1.6 0-3.6-2.2-3.6-2.2 0-2.5 1.7-2.5 3.5V23h-4V8Z" />
    </svg>
  );
}

function SocialIconInstagram() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="currentColor"
      aria-hidden
    >
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5Zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5ZM18 6.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    </svg>
  );
}

function SocialIconYouTube() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="currentColor"
      aria-hidden
    >
      <path d="M23.5 7.2s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.4-1C17 3.5 12 3.5 12 3.5h0s-5 0-8.2.4c-.5.1-1.5.1-2.4 1C.7 5.6.5 7.2.5 7.2S0 9.1 0 11v1.8c0 1.9.5 3.8.5 3.8s.2 1.6.9 2.3c.9.9 2.1.9 2.6 1 1.9.2 8 .4 8 .4s5 0 8.2-.4c.5-.1 1.5-.1 2.4-1 .7-.7.9-2.3.9-2.3s.5-1.9.5-3.8V11c0-1.9-.5-3.8-.5-3.8ZM9.5 14.7V8.2l6.2 3.25-6.2 3.25Z" />
    </svg>
  );
}

function SocialIconMail() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z" />
    </svg>
  );
}

export function SiteHeader() {
  const [activeMenu, setActiveMenu] = useState<HeaderMenuKey>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const countriesMenuRef = useRef<HTMLDivElement>(null);

  function closeMobileMenu(): void {
    setMobileMenuOpen(false);
  }

  useEffect(() => {
    if (!mobileMenuOpen) {
      return undefined;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (activeMenu !== "countries") {
      return undefined;
    }
    function handlePointerDown(event: MouseEvent | TouchEvent) {
      const node = countriesMenuRef.current;
      if (node === null) {
        return;
      }
      const target = event.target;
      if (target instanceof Node && node.contains(target) === false) {
        setActiveMenu(null);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveMenu(null);
      }
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown, {
      passive: true,
    });
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeMenu]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/90 bg-surface/95 pt-[env(safe-area-inset-top,0px)] shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-surface/80 dark:border-slate-800 dark:bg-slate-950/95 dark:supports-[backdrop-filter]:bg-slate-950/80">
      {/* <div className="bg-utility-bar text-slate-100">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="#directory"
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold text-amber-300 transition hover:text-amber-200"
            >
              <IconArrowRight />
              Apply Online
            </a>
            <span className="hidden text-slate-600 sm:inline" aria-hidden>
              |
            </span>
            <a
              href="#directory"
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold text-amber-300 transition hover:text-amber-200"
            >
              <IconKey />
              Student Login
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="text-slate-200 transition hover:text-white"
              aria-label="Facebook"
            >
              <SocialIconFacebook />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-slate-200 transition hover:text-white"
              aria-label="LinkedIn"
            >
              <SocialIconLinkedIn />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-slate-200 transition hover:text-white"
              aria-label="Instagram"
            >
              <SocialIconInstagram />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="text-slate-200 transition hover:text-white"
              aria-label="YouTube"
            >
              <SocialIconYouTube />
            </a>
            <a
              href="mailto:info@sundareducational.com"
              className="text-slate-200 transition hover:text-white"
              aria-label="Email"
            >
              <SocialIconMail />
            </a>
          </div>
        </div>
      </div> */}

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 lg:hidden">
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="group flex min-w-0 flex-1 items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <LogoMark />
          <span className="min-w-0">
            <span className="block truncate text-sm font-bold uppercase tracking-wide text-brand-ink dark:text-slate-100">
              University Directory
            </span>
            {/* <span className="block truncate text-[10px] font-medium leading-snug text-slate-500 dark:text-slate-400">
              by Dr. Dipesh Rasal
            </span> */}
          </span>
        </Link>
        <button
          type="button"
          className={`${mobileHamburgerButtonClassName} ${
            mobileMenuOpen
              ? "border-accent/40 bg-accent text-accent-foreground hover:brightness-110 dark:border-accent/50"
              : "border-slate-200 bg-surface hover:bg-surface-muted dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
          }`}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-drawer"
          onClick={() => {
            setMobileMenuOpen((previous) => !previous);
          }}
        >
          {mobileMenuOpen ? <IconClose /> : <IconMenu />}
          <span className="sr-only">
            {mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          </span>
        </button>
      </div>

      {mobileMenuOpen ? <MobileNavDrawer onClose={closeMobileMenu} /> : null}

      <div className="mx-auto hidden max-w-7xl px-4 pb-3 pt-3 sm:px-6 sm:pt-4 lg:block lg:px-8">
        <div className="flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-start lg:justify-between">
          <Link
            href="/"
            className="group flex min-w-0 max-w-full items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <LogoMark />
            <span className="min-w-0">
              <span className="block text-base font-bold uppercase tracking-wide text-brand-ink sm:text-lg dark:text-slate-100">
                University Directory
              </span>
              {/* <span className="block text-[11px] font-medium leading-snug text-slate-500 sm:text-xs dark:text-slate-400">
                by Dr. Dipesh Rasal (MBBS, DMRE)
              </span> */}
            </span>
          </Link>

          <div className="flex min-w-0 flex-col gap-3 lg:items-end">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end sm:gap-4">
              {/* <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-accent px-4 py-2 text-sm font-semibold text-accent transition hover:bg-accent hover:text-accent-foreground"
              >
                <IconHeadset />
                Live Counselling
              </button> */}
              <a
                href="tel:+918010584844"
                className="flex min-h-11 items-start gap-2 rounded-lg text-sm text-slate-700 transition hover:text-accent active:bg-surface-muted sm:min-h-0 dark:text-slate-200"
              >
                <span className="mt-0.5 text-accent">
                  <IconPhone />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-medium text-slate-500 dark:text-slate-400">
                    Talk to an Expert Now
                  </span>
                  <span className="font-semibold text-accent">
                    +91 8010584844
                  </span>
                </span>
              </a>
              <a
                href="https://wa.me/8010584844"
                target="_blank"
                rel="noreferrer"
                className="flex min-h-11 items-start gap-2 rounded-lg text-sm text-slate-700 transition hover:opacity-90 active:bg-surface-muted sm:min-h-0 dark:text-slate-200"
              >
                <span className="mt-0.5 text-whatsapp">
                  <IconWhatsApp />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-medium text-slate-500 dark:text-slate-400">
                    Chat on WhatsApp
                  </span>
                  <span className="font-semibold text-whatsapp">
                    +91 8010584844
                  </span>
                </span>
              </a>
            </div>

            <nav
              className="flex min-w-0 flex-wrap items-center gap-x-1 gap-y-2"
              aria-label="Primary"
            >
              <Link href="/" className={primaryNavLinkClassName}>
                Home
              </Link>
              <Link href="/about" className={primaryNavLinkClassName}>
                About
              </Link>
              {/* countries mega menu commented out */}
              <Link
                href={buildUniversitiesHubPath()}
                className={primaryNavLinkClassName}
              >
                Universities
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
