export function AuthHero() {
  return (
    <section className="relative flex min-h-[260px] overflow-hidden bg-brand-950 p-8 sm:p-10 lg:min-h-[640px] lg:items-center lg:justify-center lg:p-12">
      <div
        aria-hidden="true"
        className="auth-orb -right-10 top-8 h-40 w-40"
        style={{ background: "var(--overlay-primary)" }}
      />

      <div
        aria-hidden="true"
        className="auth-orb -bottom-8 -left-6 h-32 w-32"
        style={{ background: "var(--overlay-accent)" }}
      />

      <div className="relative flex h-full w-full items-center justify-center">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="brand-badge h-24 w-24 rounded-[2rem] text-4xl shadow-[0_24px_80px_var(--overlay-primary)]">
            <span className="font-semibold">F</span>
          </div>

          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-200/80">
              Finance Flow
            </p>

            <p className="max-w-xs text-sm leading-6 text-foreground/70">
              Organize contas, acompanhe vencimentos e entre no seu painel com
              um fluxo direto.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
