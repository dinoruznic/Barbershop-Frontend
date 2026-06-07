interface LoginCardProps {
  mode: 'login' | 'register'
  highlighted?: boolean
}

function LoginCard({ mode, highlighted = false }: LoginCardProps) {
  const isLogin = mode === 'login'

  return (
    <section
      id="login-card"
      className={`rounded-2xl border border-amber-200/20 bg-stone-950/75 p-6 backdrop-blur-xl transition-all duration-500 ${
        highlighted
          ? 'ring-2 ring-amber-200 shadow-[0_0_45px_rgba(245,213,145,0.35)]'
          : 'shadow-[0_0_55px_rgba(245,213,145,0.14)]'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-amber-200/70">
            Pristup aplikaciji
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-stone-50">
            {isLogin ? 'Prijava' : 'Registracija'}
          </h2>
        </div>

        <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-medium text-emerald-100">
          Online
        </span>
      </div>

      <form className="mt-6 grid gap-4">
        {!isLogin && (
          <label className="grid gap-2 text-sm text-stone-300">
            Ime i prezime
            <input
              type="text"
              placeholder="Unesite ime i prezime"
              className="rounded-2xl border border-stone-700 bg-black/35 px-4 py-3 text-stone-100 outline-none transition placeholder:text-stone-500 focus:border-amber-200/60 focus:ring-2 focus:ring-amber-200/10"
            />
          </label>
        )}

        <label className="grid gap-2 text-sm text-stone-300">
          Email
          <input
            type="email"
            placeholder="ime@email.com"
            className="rounded-2xl border border-stone-700 bg-black/35 px-4 py-3 text-stone-100 outline-none transition placeholder:text-stone-500 focus:border-amber-200/60 focus:ring-2 focus:ring-amber-200/10"
          />
        </label>

        <label className="grid gap-2 text-sm text-stone-300">
          Lozinka
          <input
            type="password"
            placeholder="••••••••"
            className="rounded-2xl border border-stone-700 bg-black/35 px-4 py-3 text-stone-100 outline-none transition placeholder:text-stone-500 focus:border-amber-200/60 focus:ring-2 focus:ring-amber-200/10"
          />
        </label>

        {!isLogin && (
          <label className="grid gap-2 text-sm text-stone-300">
            Potvrdi lozinku
            <input
              type="password"
              placeholder="••••••••"
              className="rounded-2xl border border-stone-700 bg-black/35 px-4 py-3 text-stone-100 outline-none transition placeholder:text-stone-500 focus:border-amber-200/60 focus:ring-2 focus:ring-amber-200/10"
            />
          </label>
        )}

        {isLogin && (
          <a
            href="#login-card"
            className="text-sm font-medium text-amber-100 transition hover:text-[#d6b56c]"
          >
            Zaboravljena lozinka?
          </a>
        )}

        <button
          type="button"
          className="rounded-2xl bg-amber-200 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-emerald-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d6b56c] hover:shadow-lg"
        >
          {isLogin ? 'Prijavi se' : 'Kreiraj nalog'}
        </button>
      </form>
    </section>
  )
}

export default LoginCard
