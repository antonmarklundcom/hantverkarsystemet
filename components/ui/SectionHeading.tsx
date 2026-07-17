export function SectionHeading({ children, id }: { children: string; id?: string }) {
  return (
    <h2 id={id} className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
      {children}
    </h2>
  );
}
