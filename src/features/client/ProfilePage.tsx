import PageHeader from '../../components/common/PageHeader'
import SectionCard from '../../components/common/SectionCard'
import { buttonStyles } from '../../components/common/buttonStyles'
import { useAuthUser } from '../../hooks/useAuthUser'

const notificationPreferences = ['Email', 'SMS', 'Aplikacija']

function ProfileField({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <label className="grid gap-2 text-sm text-stone-300">
      {label}
      <input
        value={value}
        disabled
        className="rounded-2xl border border-amber-200/10 bg-black/25 px-4 py-3 text-stone-200 outline-none disabled:cursor-not-allowed disabled:opacity-80"
      />
    </label>
  )
}

function ProfilePage() {
  const { user } = useAuthUser()
  const firstName = user?.firstName || 'Korisnik'
  const lastName = user?.lastName || 'Classic Cuts'
  const email = user?.email || 'email nije dostupan'

  return (
    <div className="grid gap-6">
      <PageHeader
        title="Profil"
        subtitle="Upravljajte osnovnim informacijama svog računa."
      />

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <SectionCard>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/70">
                Lični podaci
              </p>
              <h2 className="mt-3 text-2xl font-black text-stone-50">
                Osnovne informacije
              </h2>
            </div>
            <button type="button" className={buttonStyles.secondary}>
              Uredi profil
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <ProfileField label="Ime" value={firstName} />
            <ProfileField label="Prezime" value={lastName} />
            <ProfileField label="Email" value={email} />
            <ProfileField label="Telefon" value="Telefon nije dodan" />
          </div>
        </SectionCard>

        <SectionCard>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/70">
            Sigurnost
          </p>
          <div className="mt-5 grid gap-4">
            <article className="rounded-2xl border border-amber-200/10 bg-black/25 p-4">
              <h3 className="text-lg font-bold text-stone-50">
                Promjena lozinke
              </h3>
              <p className="mt-2 text-sm leading-6 text-stone-400">
                Ažurirajte lozinku kako biste zaštitili svoj račun.
              </p>
              <button type="button" className={`mt-4 ${buttonStyles.secondary}`}>
                Promijeni lozinku
              </button>
            </article>

            <article className="rounded-2xl border border-amber-200/10 bg-black/25 p-4">
              <h3 className="text-lg font-bold text-stone-50">
                Odjavi se sa svih uređaja
              </h3>
              <p className="mt-2 text-sm leading-6 text-stone-400">
                Ova opcija će biti dostupna nakon povezivanja sigurnosnog toka.
              </p>
              <button
                type="button"
                disabled
                className={`mt-4 ${buttonStyles.secondary}`}
              >
                Uskoro dostupno
              </button>
            </article>
          </div>
        </SectionCard>
      </section>

      <SectionCard>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/70">
          Postavke
        </p>
        <h2 className="mt-3 text-2xl font-black text-stone-50">
          Način obavijesti
        </h2>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {notificationPreferences.map((preference, index) => (
            <label
              key={preference}
              className="flex items-center justify-between gap-4 rounded-2xl border border-amber-200/10 bg-black/25 p-4 text-sm text-stone-300"
            >
              <span>{preference}</span>
              <input
                type="checkbox"
                defaultChecked={index !== 1}
                className="h-4 w-4 accent-[#d6b56c]"
              />
            </label>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}

export default ProfilePage
