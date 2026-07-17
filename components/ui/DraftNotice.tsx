export function DraftNotice({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8 rounded-2xl border-2 border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
      <strong>Utkast:</strong> {children}
    </div>
  );
}
