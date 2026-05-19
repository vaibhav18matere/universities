"use client";

import { FormEvent, useState } from "react";

function IconSend() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M2.5 17.5 18 10 2.5 2.5l.01 5L14 10l-11.49 2.5-.01 5Z" />
    </svg>
  );
}

export function FooterNewsletterForm() {
  const [email, setEmail] = useState("");

  return (
    <form
      className="flex flex-col gap-3 sm:flex-row"
      onSubmit={(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setEmail("");
      }}
    >
      <label className="sr-only" htmlFor="footer-newsletter-email">
        Email for newsletter
      </label>
      <input
        id="footer-newsletter-email"
        name="email"
        type="email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        required
        autoComplete="email"
        placeholder="Enter Your Email Here"
        className="min-h-11 w-full flex-1 rounded-lg border border-slate-600 bg-slate-900 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
      />
      <button
        type="submit"
        className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition hover:brightness-110"
      >
        Subscribe
        <IconSend />
      </button>
    </form>
  );
}
