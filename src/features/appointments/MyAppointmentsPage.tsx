import { useState } from 'react'
import { Link } from 'react-router-dom'
import EmptyState from '../../components/common/EmptyState'
import PageHeader from '../../components/common/PageHeader'
import SectionCard from '../../components/common/SectionCard'
import StatusBadge from '../../components/common/StatusBadge'
import { buttonStyles } from '../../components/common/buttonStyles'

type AppointmentStatus = 'Potvrđen' | 'Na čekanju' | 'Završen' | 'Otkazan'
type AppointmentCategory = 'upcoming' | 'completed' | 'cancelled'

interface AppointmentItem {
  id: number
  service: string
  barber: string
  date: string
  time: string
  duration: string
  status: AppointmentStatus
  price: string
  category: AppointmentCategory
}

const appointments: AppointmentItem[] = [
  {
    id: 1,
    service: 'Fade šišanje',
    barber: 'Emir H.',
    date: '12.06.2026',
    time: '14:30',
    duration: '45 min',
    status: 'Potvrđen',
    price: '35 KM',
    category: 'upcoming',
  },
  {
    id: 2,
    service: 'Uređivanje brade',
    barber: 'Amar K.',
    date: '15.06.2026',
    time: '11:00',
    duration: '30 min',
    status: 'Na čekanju',
    price: '20 KM',
    category: 'upcoming',
  },
  {
    id: 3,
    service: 'Klasično šišanje',
    barber: 'Emin H.',
    date: '04.06.2026',
    time: '10:00',
    duration: '30 min',
    status: 'Završen',
    price: '25 KM',
    category: 'completed',
  },
  {
    id: 4,
    service: 'Šišanje + brada',
    barber: 'Tarik S.',
    date: '31.05.2026',
    time: '16:00',
    duration: '60 min',
    status: 'Otkazan',
    price: '45 KM',
    category: 'cancelled',
  },
]

const filters: Array<{ label: string; value: AppointmentCategory }> = [
  { label: 'Nadolazeći', value: 'upcoming' },
  { label: 'Završeni', value: 'completed' },
  { label: 'Otkazani', value: 'cancelled' },
]

function getStatusTone(status: AppointmentStatus) {
  if (status === 'Potvrđen') {
    return 'success'
  }

  if (status === 'Na čekanju') {
    return 'warning'
  }

  if (status === 'Otkazan') {
    return 'danger'
  }

  return 'neutral'
}

function AppointmentCard({ appointment }: { appointment: AppointmentItem }) {
  return (
    <article className="rounded-2xl border border-amber-200/10 bg-black/25 p-5 transition hover:border-amber-200/25 hover:bg-black/35">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-xl font-black text-stone-50">
            {appointment.service}
          </h3>
          <p className="mt-2 text-sm text-stone-400">
            Frizer: {appointment.barber}
          </p>
        </div>
        <StatusBadge
          label={appointment.status}
          tone={getStatusTone(appointment.status)}
        />
      </div>

      <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2 xl:grid-cols-4">
        {[
          ['Datum', appointment.date],
          ['Vrijeme', appointment.time],
          ['Trajanje', appointment.duration],
          ['Cijena', appointment.price],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-2xl border border-amber-200/10 bg-white/[0.035] p-3"
          >
            <dt className="text-xs uppercase tracking-[0.16em] text-stone-500">
              {label}
            </dt>
            <dd className="mt-1 font-semibold text-stone-100">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button type="button" className={buttonStyles.secondary}>
          Detalji
        </button>
        {appointment.category === 'upcoming' && (
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-2xl border border-red-300/20 bg-red-400/10 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-red-200 transition hover:border-red-300/30 hover:bg-red-400/15"
          >
            Otkaži termin
          </button>
        )}
      </div>
    </article>
  )
}

function MyAppointmentsPage() {
  const [activeFilter, setActiveFilter] =
    useState<AppointmentCategory>('upcoming')
  const visibleAppointments = appointments.filter(
    (appointment) => appointment.category === activeFilter,
  )

  return (
    <div className="grid gap-6">
      <PageHeader
        title="Moji termini"
        subtitle="Pregledajte nadolazeće, završene i otkazane termine."
      />

      <SectionCard>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/70">
              Filter termina
            </p>
            <h2 className="mt-3 text-2xl font-black text-stone-50">
              {filters.find((filter) => filter.value === activeFilter)?.label}{' '}
              termini
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActiveFilter(filter.value)}
                className={`rounded-2xl border px-4 py-2.5 text-sm font-semibold transition ${
                  activeFilter === filter.value
                    ? 'border-amber-200/40 bg-amber-100/10 text-amber-100'
                    : 'border-amber-200/10 bg-black/25 text-stone-300 hover:border-amber-200/25 hover:text-amber-100'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4">
          {visibleAppointments.length > 0 ? (
            visibleAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))
          ) : (
            <EmptyState
              title="Nemate termina u ovoj kategoriji."
              description="Kada se pojave termini sa ovim statusom, bit će prikazani ovdje."
              actionLabel="Zakaži termin"
              actionTo="/app/book-appointment"
            />
          )}
        </div>
      </SectionCard>

      <SectionCard>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/70">
              Brzi pristup
            </p>
            <h2 className="mt-3 text-2xl font-black text-stone-50">
              Želite novi termin?
            </h2>
          </div>
          <Link to="/app/book-appointment" className={buttonStyles.primary}>
            Zakaži termin
          </Link>
        </div>
      </SectionCard>
    </div>
  )
}

export default MyAppointmentsPage
