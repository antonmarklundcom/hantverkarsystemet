import { telHref, formatSwedishPhone } from "@/lib/site";

export function PhoneLink({
  phoneNumber,
  label,
  className = "",
  gaEvent,
}: {
  phoneNumber: string;
  label?: string;
  className?: string;
  gaEvent?: string;
}) {
  if (!phoneNumber) return null;

  return (
    <a
      href={telHref(phoneNumber)}
      className={`inline-flex min-h-12 items-center justify-center gap-2 font-semibold text-ink underline decoration-2 underline-offset-4 ${className}`}
      data-ga-event={gaEvent}
    >
      {label ?? formatSwedishPhone(phoneNumber)}
    </a>
  );
}
