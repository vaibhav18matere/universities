import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-surface/90 backdrop-blur-md dark:border-slate-800/80 dark:bg-surface/90">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex min-h-11 min-w-0 flex-col justify-center rounded-lg py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:focus-visible:ring-offset-background"
        >
          <span className="truncate text-base font-semibold tracking-tight text-slate-900 transition group-hover:text-accent dark:text-slate-100 dark:group-hover:text-accent">
            Study Russia - University directory 
          </span>
          <span className="hidden text-xs font-medium text-slate-500 sm:block dark:text-slate-400">
            by Dr. Dipesh Rasal (MBBS, DMRE)
          </span>
        </Link>
        <nav
          className="flex shrink-0 items-center gap-1"
          aria-label="Primary"
        >
          <Link
            href="/compare"
            className="rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-surface-muted hover:text-slate-900 active:scale-[0.98] dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          >
            Compare
          </Link>
          <Link
            href="/"
            className="rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-surface-muted hover:text-slate-900 active:scale-[0.98] dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          >
            Browse
          </Link>
        </nav>
      </div>
    </header>
  );
}
