export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-slate-200/80 bg-surface-muted/50 py-8 dark:border-slate-800/80 dark:bg-slate-900/50">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 text-center sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-left lg:px-8">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Sundar Educational
        </p>
        <p className="text-xs text-slate-400 dark:text-slate-500">
          © {new Date().getFullYear()} Universities directory
        </p>
      </div>
    </footer>
  );
}
