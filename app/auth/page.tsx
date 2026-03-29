import { AuthHero } from "./components/auth-hero"
import { AuthSignInCard } from "./components/auth-sign-in-card"

const AuthPage = () => {
  return (
    <main className="page-shell relative isolate min-h-screen overflow-hidden">
      <div
        aria-hidden="true"
        className="auth-orb left-0 top-0 h-44 w-44 -translate-x-1/3 -translate-y-1/4"
        style={{ background: "var(--overlay-primary)" }}
      />

      <div
        aria-hidden="true"
        className="auth-orb bottom-0 right-0 h-56 w-56 translate-x-1/4 translate-y-1/4"
        style={{ background: "var(--overlay-accent)" }}
      />

      <section className="relative grid min-h-screen w-full overflow-hidden lg:grid-cols-[1.08fr_0.92fr]">
        <AuthHero />
        <AuthSignInCard />
      </section>
    </main>
  )
}

export default AuthPage
