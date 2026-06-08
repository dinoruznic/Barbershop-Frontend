import { Link } from 'react-router-dom'
import { buttonStyles } from '../../components/common/buttonStyles'

const popularServices = [
  ['Klasično šišanje', 'Uredan stil, precizna forma i završno stiliziranje.'],
  ['Fade šišanje', 'Moderni prelazi i čiste linije za svjež izgled.'],
  ['Uređivanje brade', 'Oblikovanje brade, linija i završna njega.'],
]

const workingHours = [
  ['Pon - Pet', '08:00 - 20:00'],
  ['Subota', '09:00 - 18:00'],
  ['Nedjelja', 'Zatvoreno'],
]

function ClientDashboard() {
  return (
    <div className="grid gap-6">
      <section className="rounded-[32px] border border-amber-200/15 bg-black/25 p-6 shadow-[0_0_45px_rgba(0,0,0,0.28)] backdrop-blur-xl lg:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-200/75">
          Moj prostor
        </p>
        <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-stone-50 sm:text-5xl">
          Dobrodošli nazad
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-8 text-stone-300">
          Upravljajte terminima i rezervacijama na jednom mjestu.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link to="/app/book-appointment" className={buttonStyles.primary}>
            Zakaži termin
          </Link>
          <Link to="/app/my-appointments" className={buttonStyles.secondary}>
            Moji termini
          </Link>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <article className="rounded-[28px] border border-amber-200/10 bg-white/[0.035] p-6 backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/70">
            Naredni termin
          </p>
          <h3 className="mt-4 text-2xl font-black text-stone-50">
            Trenutno nemate zakazan termin.
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-400">
            Kada rezervacija bude potvrđena, ovdje ćete vidjeti uslugu, frizera,
            datum i vrijeme dolaska.
          </p>
          <Link
            to="/app/book-appointment"
            className="mt-5 inline-flex text-sm font-semibold text-amber-100 transition hover:text-[#d6b56c]"
          >
            Dodaj prvi termin
          </Link>
        </article>

        <aside className="rounded-[28px] border border-amber-200/10 bg-black/25 p-6 backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/70">
            Radno vrijeme
          </p>
          <div className="mt-5 grid gap-3">
            {workingHours.map(([day, hours]) => (
              <div
                key={day}
                className="flex items-center justify-between gap-4 rounded-2xl border border-amber-200/10 bg-white/[0.035] px-4 py-3 text-sm"
              >
                <span className="text-stone-300">{day}</span>
                <span className="font-semibold text-stone-100">{hours}</span>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="rounded-[28px] border border-amber-200/10 bg-white/[0.035] p-6 backdrop-blur">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/70">
              Popularne usluge
            </p>
            <h3 className="mt-3 text-2xl font-black text-stone-50">
              Najčešći izbor klijenata
            </h3>
          </div>
          <Link
            to="/app/services"
            className="text-sm font-semibold text-amber-100 transition hover:text-[#d6b56c]"
          >
            Sve usluge
          </Link>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {popularServices.map(([title, description]) => (
            <article
              key={title}
              className="rounded-2xl border border-amber-200/10 bg-black/25 p-4"
            >
              <h4 className="font-semibold text-stone-50">{title}</h4>
              <p className="mt-2 text-sm leading-6 text-stone-400">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ClientDashboard
