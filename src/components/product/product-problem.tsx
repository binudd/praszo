import { Statement } from "@/components/sections/statement";
import type { Product } from "@/data/products";

/** The problem, told as a scroll-revealed statement with the pain points as chips. */
export function ProductProblem({ product }: { product: Product }) {
  if (!product.problem) return null;
  const text = product.problem.body ? `${product.problem.title}. ${product.problem.body}` : product.problem.title;
  return (
    <Statement
      id={`${product.slug}-problem`}
      eyebrow="The problem"
      text={text}
      chips={product.problem.points}
      height="170svh"
    />
  );
}
