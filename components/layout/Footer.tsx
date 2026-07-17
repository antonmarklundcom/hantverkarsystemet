import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-neutral-200 bg-neutral-50">
      <Container className="flex flex-col gap-4 py-8 text-sm text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} Hantverkarsystemet</p>
        <nav className="flex flex-wrap gap-4">
          <Link href="/sa-funkar-det" className="hover:underline">
            Så funkar det
          </Link>
          <Link href="/kontakt" className="hover:underline">
            Kontakt
          </Link>
          <Link href="/integritetspolicy" className="hover:underline">
            Integritetspolicy
          </Link>
          <Link href="/villkor" className="hover:underline">
            Villkor
          </Link>
        </nav>
      </Container>
    </footer>
  );
}
