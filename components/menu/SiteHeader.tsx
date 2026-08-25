"use client";

import { useEffect, useState } from "react";

const SHRINK_THRESHOLD = 80;

const SiteHeader = ({ children }: { children: React.ReactNode }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled((prev) => {
        // Shrink as soon as the user scrolls down past the threshold.
        if (!prev) return y > SHRINK_THRESHOLD;
        // Only grow back once they're all the way back at the top —
        // not at some intermediate scroll position.
        return y > 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`bg menu${scrolled ? " menu--scrolled" : ""}`}>
      {children}
    </header>
  );
};

export default SiteHeader;
