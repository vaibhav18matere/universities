import { FooterNewsletterForm } from "@/app/components/FooterNewsletterForm";
import { FooterScrollToTop } from "@/app/components/FooterScrollToTop";

function FooterLogoMark() {
  return (
    <span
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground"
      aria-hidden
    >
      <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none">
        <path
          d="M8 10h16v14H8V10z"
          fill="currentColor"
          className="opacity-95"
        />
        <path d="M10 6h12v6H10V6z" fill="currentColor" className="opacity-80" />
        <path d="M15 12h2v10h-2V12z" fill="white" />
        <path d="M12 15h8v2h-8v-2z" fill="white" />
      </svg>
    </span>
  );
}

function IconEnvelope() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0"
      fill="currentColor"
      aria-hidden
    >
      <path d="M6.6 3h2.4l2 5-1.7 1.7a13 13 0 0 0 6.4 6.4L17 15l5 2v2.4a2.7 2.7 0 0 1-3 2.6A19 19 0 0 1 3.1 6.6 2.7 2.7 0 0 1 6.6 3Z" />
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2a10 10 0 0 0-8.5 15.1L2 22l5.1-1.4A10 10 0 1 0 12 2Zm0 2a8 8 0 0 1 6.8 12.2l.1.4-.5 1.6-1.6-.4a8 8 0 1 1-5-13.8Z" />
      <path d="M8.6 8.2c.2-.6.5-.6.9-.6h.7c.3 0 .5.1.6.6l1 2.4c0 .3 0 .5-.2.7l-.6.7c-.1.2-.1.4 0 .5.5 1 1.2 1.7 2 2.2.2.1.4.1.5 0l.7-.6c.2-.2.5-.2.6 0l2.3 1.2c.3.1.4.4.4.7v.7c0 .4-.1.6-.5.9-.7.5-1.6.7-2.4.7-3 0-6.8-3.9-6.8-6.8 0-.9.2-1.8.7-2.5Z" />
    </svg>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto bg-[#1a1a1a] pb-[env(safe-area-inset-bottom,0px)] text-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 border-b border-slate-700 pb-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <FooterLogoMark />
            <span className="text-lg font-bold uppercase tracking-wide text-white">
              University Directory
            </span>
          </div>
        </div>

        <div className="grid gap-10 py-10 lg:grid-cols-3">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white">
              Contact
            </h3>
            <div className="mt-4 flex flex-col gap-3">
              <a
                href="mailto:info@sundareducational.com"
                className="flex items-center gap-2 text-sm text-slate-300 transition hover:text-white"
              >
                <IconEnvelope />
                info@sundareducational.com
              </a>
              <a
                href="tel:+918010584844"
                className="flex items-center gap-2 text-sm text-slate-300 transition hover:text-white"
              >
                <IconPhone />
                +91 8010584844
              </a>
              <a
                href="https://wa.me/917058362626"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-whatsapp transition hover:text-white"
              >
                <IconWhatsApp />
                +91 8010584844
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white">
              Office Addresses
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Shop no 10/11, Siddheshwar Apt, Pumping Station, Gangapur Road,
              Nashik, Maharashtra, India — 422013
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-slate-700 pt-8 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Sundar Educational · University Directory </p>
          <p className="text-slate-400">© {year} All Rights Reserved</p>
        </div>
      </div>
      <FooterScrollToTop />
    </footer>
  );
}
