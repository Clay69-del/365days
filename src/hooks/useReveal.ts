import { useEffect } from "react";

export default function useReveal(selector = "[data-reveal]") {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (!els || els.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    els.forEach((el) => obs.observe(el));

    return () => obs.disconnect();
  }, [selector]);
}