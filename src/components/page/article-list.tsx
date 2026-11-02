import { ArrowUpRight, Newspaper } from "lucide-react";
import Link from "next/link";

import { RevealGroup } from "@/components/motion/reveal";
import { ProductLinks } from "@/components/ui/product-links";
import type { Article } from "@/data/pages/insights";
import { productList } from "@/data/products";

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/** Article rows (rule, category and date, title, summary). With no articles yet, an honest empty state. */
export function ArticleList({ articles }: { articles: ReadonlyArray<Article> }) {
  if (articles.length === 0) {
    return (
      <div className="max-w-3xl border-t border-line-strong pt-6">
        <p className="label flex items-center gap-3 text-ink-3">
          <Newspaper size={18} className="text-brand" aria-hidden />
          Coming soon
        </p>
        <h3 className="heading mt-4 text-ink">No articles have been published yet</h3>
        <p className="copy mt-3">
          New insights will appear here. In the meantime, see how each Praszo product supports a stage of the audit workflow.
        </p>
        <ProductLinks products={productList} detail="category" className="mt-10 sm:grid-cols-2" />
      </div>
    );
  }

  return (
    <RevealGroup>
      <ul className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => {
          const external = /^https?:\/\//.test(article.href);
          return (
            <li key={article.href} data-reveal>
              <Link
                href={article.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className="group block border-t border-line-strong pt-5"
              >
                <p className="label text-ink-3">
                  {article.category} · <time dateTime={article.date}>{dateFormat.format(new Date(`${article.date}T00:00:00Z`))}</time>
                </p>
                <h3 className="heading mt-4 flex items-start gap-1.5 text-ink transition-colors group-hover:text-brand-strong">
                  {article.title}
                  <ArrowUpRight size={16} className="mt-1 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                </h3>
                <p className="copy mt-3">{article.summary}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </RevealGroup>
  );
}
