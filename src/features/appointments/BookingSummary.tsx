import { buttonStyles } from '../../components/common/buttonStyles'
import type {
  BarberOption,
  BookingServiceOption,
  DateOption,
} from './bookingTypes'

interface BookingSummaryProps {
  service?: BookingServiceOption
  barber?: BarberOption
  date?: DateOption
  time: string
}

function BookingSummary({ service, barber, date, time }: BookingSummaryProps) {
  const isComplete = Boolean(service && barber && date && time)

  return (
    <section className="min-w-0 rounded-[28px] border border-amber-200/15 bg-black/30 p-5 shadow-[0_0_36px_rgba(0,0,0,0.24)] backdrop-blur-xl lg:p-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/70">
            Korak 5
          </p>
          <h2 className="mt-3 text-2xl font-black text-stone-50">
            Sažetak rezervacije
          </h2>
        </div>
        <button
          type="button"
          disabled={!isComplete}
          className={buttonStyles.primary}
        >
          Potvrdi termin
        </button>
      </div>

      <dl className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ['Usluga', service?.name ?? 'Nije odabrano'],
          ['Frizer', barber?.name ?? 'Nije odabrano'],
          ['Datum', date ? `${date.day}, ${date.label}` : 'Nije odabrano'],
          ['Vrijeme', time || 'Nije odabrano'],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-2xl border border-amber-200/10 bg-white/[0.035] p-4"
          >
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
              {label}
            </dt>
            <dd className="mt-2 font-semibold text-stone-100">{value}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-4 text-xs leading-5 text-stone-500">
        Potvrda termina će biti povezana sa backendom kada rezervacijski tok
        bude spreman.
      </p>
    </section>
  )
}

export default BookingSummary
