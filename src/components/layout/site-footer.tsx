import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-line px-5 py-8 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 text-[12px] text-ink-3 md:flex-row md:items-center md:justify-between">
        <p className="font-mono tracking-[0.14em] uppercase">{site.eyebrow}</p>
        <p className="font-serif text-base text-ink-2">From pixels to products.</p>
        <p className="font-mono tracking-[0.12em] uppercase">
          © 2026 {site.name}. {site.company}.
        </p>
      </div>
    </footer>
  );
}
