export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8 text-center">
      {eyebrow ? (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-2xl font-bold text-balance sm:text-3xl">{title}</h2>
      {subtitle ? (
        <p className="mt-3 text-lg text-neutral-600 text-balance">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
