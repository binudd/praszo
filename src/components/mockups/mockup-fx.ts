import { gsap } from "@/components/motion/gsap";
import { productList } from "@/data/products";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Shared "liveliness" kit for the hero mockups. Every mockup renders the same overlay through
 * MockupShell ([data-fx]: a labelled collaborator cursor, a click ripple and a toast), and drives it
 * with these helpers, so all four feel like one product being used by a person:
 *   cursorTo  the cursor glides to the element about to change;
 *   click     a press with a ripple;
 *   toast     a short status message (flat ink pill, no shadow);
 *   burst     a small confetti pop in the Praszo product colours when a flow completes.
 * Under reduced motion every helper is a no-op and the mockups stay static.
 */
export type ToastTone = "product" | "success" | "accent";

export type MockupFx = {
  cursorTo: (target: Element | null | undefined, options?: { x?: number; y?: number; duration?: number }) => gsap.core.Tween | null;
  /** Moves the cursor to a point given in viewport coordinates (e.g. along a signature path). */
  cursorAt: (clientX: number, clientY: number) => void;
  click: () => gsap.core.Timeline | null;
  toast: (text: string, tone?: ToastTone) => void;
  burst: (target: Element | null | undefined) => void;
  hideCursor: () => void;
};

const NOOP: MockupFx = {
  cursorTo: () => null,
  cursorAt: () => undefined,
  click: () => null,
  toast: () => undefined,
  burst: () => undefined,
  hideCursor: () => undefined,
};

const CONFETTI = productList.map((product) => product.color);

export function createMockupFx(root: HTMLElement): MockupFx {
  const layer = root.querySelector<HTMLElement>("[data-fx]");
  const cursor = root.querySelector<HTMLElement>("[data-fx-cursor]");
  const ripple = root.querySelector<HTMLElement>("[data-fx-ripple]");
  const toastEl = root.querySelector<HTMLElement>("[data-fx-toast]");
  const toastText = root.querySelector<HTMLElement>("[data-fx-toast-text]");
  if (!layer || !cursor || prefersReducedMotion()) return NOOP;

  let toastTimer: gsap.core.Tween | null = null;
  const local = (clientX: number, clientY: number) => {
    const box = layer.getBoundingClientRect();
    return { x: clientX - box.left, y: clientY - box.top };
  };
  const show = () => {
    if (Number(gsap.getProperty(cursor, "opacity")) < 1) gsap.to(cursor, { opacity: 1, duration: 0.25 });
  };

  return {
    cursorTo(target, options = {}) {
      if (!target) return null;
      const rect = target.getBoundingClientRect();
      if (!rect.width) return null;
      const point = local(rect.left + rect.width * (options.x ?? 0.5), rect.top + rect.height * (options.y ?? 0.55));
      show();
      return gsap.to(cursor, { x: point.x, y: point.y, duration: options.duration ?? 0.7, ease: "power3.inOut", overwrite: "auto" });
    },
    cursorAt(clientX, clientY) {
      const point = local(clientX, clientY);
      show();
      gsap.set(cursor, { x: point.x, y: point.y });
    },
    click() {
      const x = Number(gsap.getProperty(cursor, "x"));
      const y = Number(gsap.getProperty(cursor, "y"));
      const tl = gsap.timeline();
      tl.to(cursor, { scale: 0.82, duration: 0.09, ease: "power2.out" }).to(cursor, { scale: 1, duration: 0.22, ease: "back.out(3)" });
      if (ripple) {
        tl.fromTo(ripple, { x, y, scale: 0.2, opacity: 0.7 }, { scale: 1.8, opacity: 0, duration: 0.5, ease: "power2.out" }, 0);
      }
      return tl;
    },
    toast(text, tone = "product") {
      if (!toastEl || !toastText) return;
      toastText.textContent = text;
      toastEl.dataset.tone = tone;
      toastTimer?.kill();
      gsap.fromTo(toastEl, { y: 14, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.8)", overwrite: true });
      toastTimer = gsap.delayedCall(2.1, () => {
        gsap.to(toastEl, { y: 8, opacity: 0, duration: 0.3, ease: "power2.in" });
      });
    },
    burst(target) {
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const origin = local(rect.left + rect.width / 2, rect.top + rect.height / 2);
      for (let i = 0; i < 16; i += 1) {
        const piece = document.createElement("span");
        piece.className = "absolute top-0 left-0 block rounded-[2px]";
        piece.style.width = `${4 + (i % 3) * 2}px`;
        piece.style.height = `${3 + (i % 2) * 3}px`;
        piece.style.background = CONFETTI[i % CONFETTI.length];
        layer.appendChild(piece);
        const angle = (i / 16) * Math.PI * 2 + gsap.utils.random(-0.25, 0.25);
        const distance = gsap.utils.random(26, 58);
        gsap.fromTo(
          piece,
          { x: origin.x, y: origin.y, opacity: 1, rotate: 0, scale: 1 },
          {
            x: origin.x + Math.cos(angle) * distance,
            y: origin.y + Math.sin(angle) * distance + 14,
            rotate: gsap.utils.random(-220, 220),
            opacity: 0,
            scale: 0.6,
            duration: gsap.utils.random(0.7, 1.05),
            ease: "power2.out",
            onComplete: () => piece.remove(),
          },
        );
      }
    },
    hideCursor() {
      gsap.to(cursor, { opacity: 0, duration: 0.25 });
    },
  };
}

/**
 * Hover-to-take-control: while the pointer is over the mockup its demo pauses (onHold(true)) and the
 * fake cursor hides, so the visitor can click things; it resumes on leave. Returns a cleanup.
 */
export function bindHoverHold(root: HTMLElement, fx: MockupFx, onHold: (held: boolean) => void) {
  const enter = () => {
    onHold(true);
    fx.hideCursor();
  };
  const leave = () => onHold(false);
  root.addEventListener("pointerenter", enter);
  root.addEventListener("pointerleave", leave);
  return () => {
    root.removeEventListener("pointerenter", enter);
    root.removeEventListener("pointerleave", leave);
  };
}
