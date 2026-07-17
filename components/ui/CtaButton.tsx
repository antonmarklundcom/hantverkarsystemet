import type { AnchorHTMLAttributes } from "react";

type CtaButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "secondary";
};

export function CtaButton({ variant = "primary", className = "", children, ...props }: CtaButtonProps) {
  const base =
    "inline-flex min-h-12 items-center justify-center rounded-lg px-6 text-base font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
  const variantClass =
    variant === "primary"
      ? "bg-accent text-accent-ink hover:bg-accent/90"
      : "border border-line bg-transparent text-ink hover:bg-bg-muted";

  return (
    <a className={`${base} ${variantClass} ${className}`} {...props}>
      {children}
    </a>
  );
}
