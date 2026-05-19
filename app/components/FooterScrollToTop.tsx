"use client";

import { useCallback, useEffect, useState } from "react";

function IconChevronUp() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M12 8.2 4.5 15.7l1.4 1.4L12 11l6.1 6.1 1.4-1.4L12 8.2Z" />
    </svg>
  );
}

export function FooterScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const onScroll = useCallback(() => {
    setIsVisible(window.scrollY > 400);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  return (
    <button
      type="button"
      className={`fixed bottom-[max(1.25rem,env(safe-area-inset-bottom,0px)+0.5rem)] right-[max(1.25rem,env(safe-area-inset-right,0px)+0.5rem)] z-30 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition hover:brightness-110 active:scale-[0.98] sm:bottom-6 sm:right-6 sm:h-11 sm:w-11 ${
        isVisible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-label="Scroll to top"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <IconChevronUp />
    </button>
  );
}
