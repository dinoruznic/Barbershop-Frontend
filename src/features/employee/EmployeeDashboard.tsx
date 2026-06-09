import { Link } from 'react-router-dom'
import PageHeader from '../../components/common/PageHeader'
import SectionCard from '../../components/common/SectionCard'
import StatCard from '../../components/common/StatCard'
import StatusBadge from '../../components/common/StatusBadge'
import { buttonStyles } from '../../components/common/buttonStyles'

const scheduleItems = [
  ['09:00', 'Fade šišanje', 'Dino R.'],
  ['10:30', 'Brada', 'Haris M.'],
  ['12:00', 'Pauza', ''],
  ['13:00', 'Klasično šišanje', 'Amar S.'],
]

const assignedAppointments = [
  ['Dino R.', 'Fade šišanje', '09:00', 'Potvrđen'],
  ['Haris M.', 'Uređivanje brade', '10:30', 'Na čekanju'],
  ['Amar S.', 'Klasično šišanje', '13:00', 'Potvrđen'],
]

function EmployeeDashboard() {
  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Frizerski prostor"
        title="Dobrodošli u frizerski prostor"
        subtitle="Pratite današnje termine, raspored i odsustva."
      />

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link to="/app/employee/schedule" className={buttonStyles.primary}>
          Pogledaj raspored
        </Link>
        <Link to="/app/employee/time-off" className={buttonStyles.secondary}>
          Zatraži odsustvo
        </Link>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Termini danas" value="6" detail="3 termina su potvrđena" />
        <StatCard label="Sljedeći termin" value="10:30" detail="Uređivanje brade" />
        <StatCard label="Radno vrijeme" value="08:00 - 16:00" detail="Današnja smjena" />
        <StatCard label="Status dana" value="Dostupan" detail="Nema aktivnih odsustava" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <SectionCard>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/70">
            Današnji raspored
          </p>
          <div className="mt-5 grid gap-3">
            {scheduleItems.map(([time, service, client]) => (
              <article
                key={`${time}-${service}`}
                className="grid gap-3 rounded-2xl border border-amber-200/10 bg-black/25 p-4 sm:grid-cols-[82px_1fr_auto] sm:items-center"
              >
                <span className="font-black text-amber-100">{time}</span>
                <span className="font-semibold text-stone-100">{service}</span>
                {client && <span className="text-sm text-stone-400">{client}</span>}
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/70">
            Odsustva
          </p>
          <h3 className="mt-4 text-2xl font-black text-stone-50">
            Nemate aktivnih zahtjeva za odsustvo.
          </h3>
          <p className="mt-3 text-sm leading-6 text-stone-400">
            Kada pošaljete zahtjev ili promijenite dostupnost, status će biti prikazan ovdje.
          </p>
          <Link to="/app/employee/time-off" className={`mt-5 ${buttonStyles.ghost}`}>
            Zatraži odsustvo
          </Link>
        </SectionCard>
      </section>

      <SectionCard>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/70">
          Dodijeljeni termini
        </p>
        <div className="mt-5 grid gap-3">
          {assignedAppointments.map(([client, service, time, status]) => (
            <article
              key={`${client}-${time}`}
              className="grid gap-3 rounded-2xl border border-amber-200/10 bg-black/25 p-4 md:grid-cols-[1fr_1fr_90px_auto] md:items-center"
            >
              <span className="font-semibold text-stone-50">{client}</span>
              <span className="text-stone-300">{service}</span>
              <span className="text-amber-100">{time}</span>
              <StatusBadge
                label={status}
                tone={status === 'Potvrđen' ? 'success' : 'warning'}
              />
            </article>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}

export default EmployeeDashboard
