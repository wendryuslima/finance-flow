import Image from "next/image";

export function AuthHero() {
  return (
    <section className="relative flex min-h-[260px] overflow-hidden bg-brand-950 p-8 sm:p-10 lg:min-h-[640px] lg:items-center lg:justify-center lg:p-12">
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="brand-badge rounded-xl h-24 w-24 rounded-[2rem] text-4xl ">
            <Image
              height={300}
              width={300}
              src="/logo-removebg-preview.png"
              alt="Finance Flow"
            />
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
  );
}
