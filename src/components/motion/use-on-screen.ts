"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * True while the element is at least partly in the viewport. Used to pause
 * looping mockup animations once their section has scrolled away, so they do
 * not keep invalidating style and paint for the rest of the page.
 */
export function useOnScreen(ref: RefObject<Element | null>, rootMargin = "0px") {
  const [onScreen, setOnScreen] = useState(true);
  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { rootMargin });
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, rootMargin]);
  return onScreen;
}
