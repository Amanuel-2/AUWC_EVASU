import { LucideIcon } from "lucide-react";

export function StatCard({ icon: Icon, label, value, detail }: { icon: LucideIcon; label: string; value: string; detail: string }) {
  return (
    <section className="rounded-lg border bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-foreground">{value}</p>
        </div>
        <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon aria-hidden="true" size={22} />
        </div>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{detail}</p>
    </section>
  );
}
