import { GoogleSignInButton } from "./google-sign-in-button";

export function AuthSignInCard() {
  return (
    <section className="flex h-full bg-foreground text-background">
      <div className="flex w-full flex-col p-8 sm:p-10 lg:p-12">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3"></div>
        </header>

        <div className="flex flex-1 flex-col justify-center py-10 lg:py-0">
          <div className="max-w-md space-y-10">
            <section className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Bem-vindo de volta
              </h1>

              <p className="max-w-sm text-base leading-7 text-background/70">
                Acesse seu painel com segurança e continue o controle das suas
                contas.
              </p>
            </section>

            <section className="space-y-5">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Entrar na sua conta
                </h2>
              </div>

              <div className="flex">
                <GoogleSignInButton />
              </div>
            </section>
          </div>
        </div>

        <footer className="pt-6 text-sm text-background/55">
          Somente autenticação com Google nesta versão.
        </footer>
      </div>
    </section>
  );
}
