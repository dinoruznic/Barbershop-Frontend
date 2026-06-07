import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  clearAuthSession,
  getStoredAccessToken,
  getStoredUser,
  logoutUser,
} from '../api/authApi'

const appNavigation = ['Pregled', 'Profil', 'Postavke']

function AppPage() {
  const navigate = useNavigate()
  const user = useMemo(() => getStoredUser(), [])

  useEffect(() => {
    if (!getStoredAccessToken()) {
      navigate('/', { replace: true })
    }
  }, [navigate])

  const handleLogout = async () => {
    try {
      await logoutUser()
    } catch {
      clearAuthSession()
    } finally {
      navigate('/', { replace: true })
    }
  }

  return (
    <main className="min-h-screen bg-[#06110d] text-stone-100">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="flex h-full w-full flex-col justify-between border-b border-amber-200/10 bg-black/30 p-5 backdrop-blur-xl lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:border-b-0 lg:border-r">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl border border-amber-200/25 bg-amber-100/10 text-xl font-black text-amber-100 shadow-[0_0_30px_rgba(245,213,145,0.12)]">
                CC
              </span>
              <span>
                <span className="block text-lg font-semibold tracking-wide text-stone-50">
                  Classic Cuts
                </span>
                <span className="block text-xs uppercase tracking-[0.28em] text-amber-200/70">
                  Aplikacija
                </span>
              </span>
            </div>

            <nav className="mt-8 grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
              {appNavigation.map((item, index) => (
                <button
                  key={item}
                  type="button"
                  className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                    index === 0
                      ? 'border-amber-200/30 bg-amber-100/10 text-amber-100'
                      : 'border-transparent text-stone-300 hover:border-amber-200/40 hover:bg-amber-100/10 hover:text-amber-100'
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-8">
            {user && (
              <p className="mb-4 text-sm text-stone-300">
                {user.firstName} {user.lastName}
              </p>
            )}
            <button
              type="button"
              onClick={handleLogout}
              className="w-full rounded-2xl border border-amber-200/35 bg-black/25 px-4 py-3 text-sm font-bold uppercase tracking-[0.18em] text-amber-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-100/10"
            >
              Odjavi se
            </button>
          </div>
        </aside>

        <section className="relative flex-1 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(245,213,145,0.16),transparent_28%),radial-gradient(circle_at_78%_22%,rgba(34,197,94,0.16),transparent_26%),linear-gradient(135deg,#07110d_0%,#0b1711_45%,#030504_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px] opacity-25" />

          <div className="relative flex min-h-screen flex-col">
            <header className="border-b border-amber-200/10 px-5 py-5 backdrop-blur-xl sm:px-8 lg:px-10">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/70">
                    Classic Cuts
                  </p>
                  <h1 className="mt-2 text-2xl font-semibold text-stone-50">
                    Aplikacija
                  </h1>
                </div>
                <span className="w-fit rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-medium text-emerald-100">
                  Online
                </span>
              </div>
            </header>

            <div className="flex flex-1 items-center px-5 py-10 sm:px-8 lg:px-10">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-200/80">
                  Mainframe
                </p>
                <h2 className="mt-5 text-4xl font-black leading-tight text-stone-50 sm:text-5xl">
                  Dobrodošli u Classic Cuts aplikaciju
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-stone-200 sm:text-lg">
                  Ovdje će se prikazivati funkcionalnosti nakon prijave.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default AppPage
