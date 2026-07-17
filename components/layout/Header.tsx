import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PhoneLink } from "@/components/ui/PhoneLink";

export function Header() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="text-lg font-bold text-neutral-900">
          Hantverkarsystemet
        </Link>
        <PhoneLink label="Ring oss" />
      </Container>
    </header>
  );
}
