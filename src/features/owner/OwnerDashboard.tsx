import { Link } from 'react-router-dom'
import PageHeader from '../../components/common/PageHeader'
import SectionCard from '../../components/common/SectionCard'
import StatCard from '../../components/common/StatCard'
import StatusBadge from '../../components/common/StatusBadge'
import { buttonStyles } from '../../components/common/buttonStyles'

const todayAppointments = [
  ['09:00', 'Dino R.', 'Fade šišanje', 'Amir K.', 'Na čekanju'],
  ['10:30', 'Haris M.', 'Brada', 'Emin H.', 'Potvrđen'],
  ['13:00', 'Amar S.', 'Klasično šišanje', 'Tarik S.', 'Potvrđen'],
]

const barbersToday = [
  ['Amir K.', 'Dostupan', '5 termina'],
  ['Emin H.', 'Zauzet', '4 termina'],
  ['Tarik S.', 'Odsutan', '0 termina'],
]

function getStatusTone(status: string) {
  if (status === 'Potvrđen') return 'success'
  if (status === 'Otkazan') return 'danger'
  if (status === 'Na čekanju') return 'warning'
  return 'neutral'
}

function OwnerDashboard() {
  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Vlasnički prostor"
        title="Dobrodošli u vlasnički prostor"
        subtitle="Upravljajte terminima, frizerima, uslugama i poslovanjem salona."
      />

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link to="/app/owner/appointments" className={buttonStyles.primary}>
          Pregled termina
        </Link>
        <button type="button" className={buttonStyles.secondary}>
          Dodaj frizera
        </button>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Današnji termini" value="12" detail="4 termina su potvrđena" />
        <StatCard label="Termini na čekanju" value="3" detail="Čekaju potvrdu frizera" />
        <StatCard label="Aktivni frizeri" value="3" detail="2 trenutno dostupna" />
        <StatCard label="Prihod danas" value="280 KM" detail="Pregled gotovine i kartica" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <SectionCard>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/70">
            Današnji termini
          </p>
          <div className="mt-5 grid gap-3">
            {todayAppointments.map(([time, client, service, barber, status]) => (
              <article
                key={`${time}-${client}`}
                className="grid gap-3 rounded-2xl border border-amber-200/10 bg-black/25 p-4 md:grid-cols-[80px_1fr_1fr_1fr_auto] md:items-center"
              >
                <span className="font-black text-amber-100">{time}</span>
                <span className="text-stone-100">{client}</span>
                <span className="text-stone-300">{service}</span>
                <span className="text-stone-400">{barber}</span>
                <StatusBadge label={status} tone={getStatusTone(status)} />
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/70">
            Frizeri danas
          </p>
          <div className="mt-5 grid gap-3">
            {barbersToday.map(([name, status, appointments]) => (
              <article
                key={name}
                className="rounded-2xl border border-amber-200/10 bg-black/25 p-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-bold text-stone-50">{name}</h3>
                  <StatusBadge
                    label={status}
                    tone={
                      status === 'Dostupan'
                        ? 'success'
                        : status === 'Zauzet'
                          ? 'warning'
                          : 'neutral'
                    }
                  />
                </div>
                <p className="mt-2 text-sm text-stone-400">{appointments}</p>
              </article>
            ))}
          </div>
        </SectionCard>
      </section>

      <SectionCard>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/70">
          Poslovni pregled
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-amber-200/10 bg-black/25 p-4">
            <h3 className="font-bold text-stone-50">Inventar zahtijeva pažnju</h3>
            <p className="mt-2 text-sm text-stone-400">2 artikla su pri kraju.</p>
          </div>
          <div className="rounded-2xl border border-amber-200/10 bg-black/25 p-4">
            <h3 className="font-bold text-stone-50">Plaćanja spremna za pregled</h3>
            <p className="mt-2 text-sm text-stone-400">
              Dnevne transakcije čekaju završnu provjeru.
            </p>
          </div>
        </div>
      </SectionCard>
    </div>
  )
}

export default OwnerDashboard
