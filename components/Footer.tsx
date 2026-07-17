import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { footer, siteName } from "@/content/copy.sv";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-bg-muted">
      <Container className="flex flex-col items-start gap-4 py-8 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {year} {siteName}. {footer.copyrightSuffix}
        </p>
        <nav className="flex gap-4">
          {footer.legalLinks.map((link) => (
            <Link key={link.href} href={link.href} className="underline underline-offset-4 hover:text-ink">
              {link.label}
            </Link>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
