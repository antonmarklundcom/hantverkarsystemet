import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PhoneLink } from "@/components/ui/PhoneLink";
import { header, siteName } from "@/content/copy.sv";
import { siteConfig } from "@/lib/site";

export function Header() {
  return (
    <header className="border-b border-line bg-bg">
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="text-lg font-bold tracking-tight text-ink">
          {siteName}
        </Link>
        <PhoneLink
          phoneNumber={siteConfig.contactPhoneNumber}
          label={header.phoneLinkLabel}
          gaEvent="phone_clicked"
        />
      </Container>
    </header>
  );
}
