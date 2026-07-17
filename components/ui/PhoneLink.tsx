import { env } from "@/lib/env";

function formatSwedishNumber(e164: string) {
  const digits = e164.replace(/^\+46/, "0");
  return digits.replace(/(\d{2,3})(?=\d)/g, "$1 ").trim();
}

export function PhoneLink({
  className = "",
  label,
}: {
  className?: string;
  label?: string;
}) {
  if (!env.contactPhoneNumber) {
    return null;
  }

  return (
    <a
      href={`tel:${env.contactPhoneNumber}`}
      className={`inline-flex min-h-12 items-center justify-center gap-2 text-base font-semibold underline underline-offset-4 ${className}`}
    >
      {label ?? `Ring ${formatSwedishNumber(env.contactPhoneNumber)}`}
    </a>
  );
}
