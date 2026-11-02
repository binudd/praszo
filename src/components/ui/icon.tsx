import type { LucideProps } from "lucide-react";

import { icons, type IconName } from "@/lib/icons";

/** Renders a lucide icon by name from the static icon map. */
export function Icon({ name, ...props }: LucideProps & { name: IconName }) {
  const Component = icons[name];
  return <Component {...props} />;
}
