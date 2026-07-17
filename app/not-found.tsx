import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { PhoneLink } from "@/components/ui/PhoneLink";

export const metadata: Metadata = {
  title: "Sidan hittades inte",
};

export default function NotFound() {
  return (
    <Container className="py-20 text-center">
      <h1 className="text-3xl font-bold">Vi hittar inte sidan du sökte</h1>
      <p className="mx-auto mt-3 max-w-md text-lg text-neutral-600">
        Länken kan vara felaktig eller föråldrad. Gå till startsidan, eller
        ring oss direkt om du behöver hjälp.
      </p>
      <div className="mt-8 flex flex-col items-center gap-4">
        <CtaButton href="/">Till startsidan</CtaButton>
        <PhoneLink className="text-brand" />
      </div>
    </Container>
  );
}
