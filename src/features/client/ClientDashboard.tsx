import { Link } from 'react-router-dom'
import { buttonStyles } from '../../components/common/buttonStyles'

const popularServices = [
  {
    name: 'Klasično šišanje',
    description: 'Uredan stil, precizna forma i završno stiliziranje.',
    duration: '30 min',
    price: '25 KM',
  },
  {
    name: 'Fade šišanje',
    description: 'Moderni prelazi i čiste linije za svjež izgled.',
    duration: '45 min',
    price: '35 KM',
  },
  {
    name: 'Uređivanje brade',
    description: 'Oblikovanje brade, linija i završna njega.',
    duration: '30 min',
    price: '20 KM',
  },
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

      <section className="rounded-[28px] border border-amber-200/10 bg-white/[0.035] p-6 backdrop-blur">
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
        <Link to="/app/book-appointment" className={`mt-6 ${buttonStyles.primary}`}>
          Zakaži termin
        </Link>
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
          {popularServices.map((service) => (
            <article
              key={service.name}
              className="rounded-2xl border border-amber-200/10 bg-black/25 p-4"
            >
              <h4 className="font-semibold text-stone-50">{service.name}</h4>
              <p className="mt-2 text-sm leading-6 text-stone-400">
                {service.description}
              </p>
              <div className="mt-4 flex items-center justify-between gap-3 text-sm">
                <span className="text-stone-400">{service.duration}</span>
                <span className="font-semibold text-amber-100">
                  {service.price}
                </span>
              </div>
              <Link
                to="/app/book-appointment"
                className="mt-4 inline-flex text-sm font-semibold text-amber-100 transition hover:text-[#d6b56c]"
              >
                Zakaži
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ClientDashboard
