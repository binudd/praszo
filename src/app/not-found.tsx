import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-5 py-24 md:px-10">
      <p className="text-[11px] tracking-[0.22em] text-ink-3 uppercase">404</p>
      <h1 className="mt-4 font-serif text-5xl text-ink">This page is not here.</h1>
      <p className="mt-4 max-w-md text-ink-2">
        The work lives on the main page. The story lives at /story.
      </p>
      <div className="mt-8">
        <Button href="/">Back to the portfolio</Button>
      </div>
    </main>
  );
}
