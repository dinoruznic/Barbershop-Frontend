import { useState } from 'react'
import AppCard from '../../components/common/AppCard'
import AppSelect from '../../components/common/AppSelect'
import PageHeader from '../../components/common/PageHeader'
import SectionCard from '../../components/common/SectionCard'
import StatCard from '../../components/common/StatCard'
import StatusBadge from '../../components/common/StatusBadge'
import { buttonStyles } from '../../components/common/buttonStyles'

type OwnerModule =
  | 'appointments'
  | 'employees'
  | 'services'
  | 'inventory'
  | 'payments'
  | 'analytics'
  | 'reviews'
  | 'settings'

interface OwnerModulePageProps {
  module: OwnerModule
}

type StatusTone = 'success' | 'warning' | 'neutral' | 'danger'
type OwnerServiceCategory = 'Šišanje' | 'Brada' | 'Paketi' | 'Njega'

interface OwnerServiceItem {
  id: number
  name: string
  category: OwnerServiceCategory
  description: string
  durationMinutes: number
  price: number
  active: boolean
}

interface OwnerServiceFormState {
  name: string
  category: OwnerServiceCategory
  description: string
  durationMinutes: string
  price: string
  active: boolean
}

const moduleCopy: Record<OwnerModule, { title: string; subtitle: string }> = {
  appointments: {
    title: 'Termini',
    subtitle: 'Pregledajte termine po danu, sedmici ili ukupnoj listi.',
  },
  employees: {
    title: 'Frizeri',
    subtitle: 'Pratite tim, dostupnost i raspored frizera.',
  },
  services: {
    title: 'Usluge salona',
    subtitle: 'Upravljajte uslugama koje klijenti vide prilikom rezervacije.',
  },
  inventory: {
    title: 'Inventar',
    subtitle: 'Pratite artikle, potrošnju i stanje zaliha.',
  },
  payments: {
    title: 'Plaćanja',
    subtitle: 'Pregledajte transakcije i dnevne uplate.',
  },
  analytics: {
    title: 'Analitika',
    subtitle: 'Pregledajte osnovne poslovne pokazatelje salona.',
  },
  reviews: {
    title: 'Recenzije salona',
    subtitle: 'Pratite komentare klijenata i kvalitet usluge.',
  },
  settings: {
    title: 'Postavke salona',
    subtitle: 'Osnovni podaci salona i operativne postavke.',
  },
}

const ownerAppointments = [
  ['09:00', 'Dino R.', 'Fade šišanje', 'Amir K.', 'Na čekanju'],
  ['10:30', 'Haris M.', 'Brada', 'Emin H.', 'Potvrđen'],
  ['13:00', 'Amar S.', 'Klasično šišanje', 'Tarik S.', 'Završen'],
  ['15:00', 'Kenan B.', 'Šišanje + brada', 'Amir K.', 'Otkazan'],
]

const serviceCategories: OwnerServiceCategory[] = ['Šišanje', 'Brada', 'Paketi', 'Njega']

const serviceCategoryOptions = serviceCategories.map((category) => ({
  label: category,
  value: category,
}))

const initialOwnerServices: OwnerServiceItem[] = [
  {
    id: 1,
    name: 'Klasično šišanje',
    category: 'Šišanje',
    description: 'Uredan rez, pranje i završno stiliziranje.',
    durationMinutes: 30,
    price: 25,
    active: true,
  },
  {
    id: 2,
    name: 'Fade šišanje',
    category: 'Šišanje',
    description: 'Precizni prelazi, čiste konture i moderan završetak.',
    durationMinutes: 45,
    price: 35,
    active: true,
  },
  {
    id: 3,
    name: 'Premium brijanje',
    category: 'Brada',
    description: 'Klasično brijanje, topli peškir i njega kože.',
    durationMinutes: 35,
    price: 25,
    active: false,
  },
]

const initialServiceForm: OwnerServiceFormState = {
  name: '',
  category: 'Šišanje',
  description: '',
  durationMinutes: '',
  price: '',
  active: true,
}

function getAppointmentStatusTone(status: string): StatusTone {
  if (status === 'Potvrđen' || status === 'Završen') return 'success'
  if (status === 'Na čekanju') return 'warning'
  if (status === 'Otkazan' || status === 'Nije se pojavio') return 'danger'
  return 'neutral'
}

function validateServiceForm(form: OwnerServiceFormState) {
  const duration = Number(form.durationMinutes)
  const price = Number(form.price)

  if (!form.name.trim()) return 'Naziv usluge je obavezan.'
  if (!form.category) return 'Kategorija je obavezna.'
  if (!form.description.trim()) return 'Opis usluge je obavezan.'
  if (form.description.trim().length > 180) {
    return 'Opis treba biti kratak i jasan, maksimalno 180 karaktera.'
  }
  if (!Number.isFinite(duration) || duration < 10 || duration > 240) {
    return 'Trajanje mora biti između 10 i 240 minuta.'
  }
  if (!Number.isFinite(price) || price < 1 || price > 500) {
    return 'Cijena mora biti između 1 i 500 KM.'
  }

  return ''
}

function OwnerModulePage({ module }: OwnerModulePageProps) {
  const copy = moduleCopy[module]
  const [ownerServices, setOwnerServices] = useState(initialOwnerServices)
  const [serviceForm, setServiceForm] = useState(initialServiceForm)
  const [formError, setFormError] = useState('')

  const handleServiceFieldChange = (
    field: keyof OwnerServiceFormState,
    value: string | boolean,
  ) => {
    setServiceForm((currentForm) => ({ ...currentForm, [field]: value }))
    setFormError('')
  }

  const handleAddService = () => {
    const validationError = validateServiceForm(serviceForm)
    if (validationError) {
      setFormError(validationError)
      return
    }

    setOwnerServices((currentServices) => [
      {
        id: Date.now(),
        name: serviceForm.name.trim(),
        category: serviceForm.category,
        description: serviceForm.description.trim(),
        durationMinutes: Number(serviceForm.durationMinutes),
        price: Number(serviceForm.price),
        active: serviceForm.active,
      },
      ...currentServices,
    ])
    setServiceForm(initialServiceForm)
  }

  const toggleServiceStatus = (serviceId: number) => {
    setOwnerServices((currentServices) =>
      currentServices.map((service) =>
        service.id === serviceId ? { ...service, active: !service.active } : service,
      ),
    )
  }

  return (
    <div className="grid gap-6">
      <PageHeader eyebrow="Vlasnički prostor" title={copy.title} subtitle={copy.subtitle} />

      {module === 'appointments' && (
        <SectionCard>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {['Danas', 'Sedmica', 'Svi'].map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className="rounded-2xl border border-amber-200/10 bg-black/25 px-4 py-2.5 text-sm font-semibold text-stone-300 transition hover:border-amber-200/30 hover:text-amber-100"
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {['Na čekanju', 'Potvrđen', 'Otkazan', 'Završen'].map((status) => (
                <StatusBadge
                  key={status}
                  label={status}
                  tone={getAppointmentStatusTone(status)}
                />
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-3">
            {ownerAppointments.map(([time, client, service, barber, status]) => (
              <article
                key={`${time}-${client}`}
                className="grid gap-3 rounded-2xl border border-amber-200/10 bg-black/25 p-4 md:grid-cols-[80px_1fr_1fr_1fr_auto]"
              >
                <span className="font-black text-amber-100">{time}</span>
                <span>{client}</span>
                <span className="text-stone-300">{service}</span>
                <span className="text-stone-400">{barber}</span>
                <StatusBadge
                  label={status}
                  tone={getAppointmentStatusTone(status)}
                />
              </article>
            ))}
          </div>
        </SectionCard>
      )}

      {module === 'employees' && (
        <SectionCard>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-black text-stone-50">Tim salona</h2>
            <button type="button" className={buttonStyles.secondary}>
              Dodaj frizera
            </button>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              ['Amir K.', 'Fade i kratke forme', 'Dostupan'],
              ['Emin H.', 'Klasika i poslovni stil', 'Zauzet'],
              ['Tarik S.', 'Brada i detalji', 'Odsutan'],
            ].map(([name, specialty, status]) => (
              <article key={name} className="rounded-2xl border border-amber-200/10 bg-black/25 p-5">
                <h3 className="text-lg font-bold text-stone-50">{name}</h3>
                <p className="mt-2 text-sm text-stone-400">{specialty}</p>
                <div className="mt-4">
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
              </article>
            ))}
          </div>
        </SectionCard>
      )}

      {module === 'services' && (
        <>
          <SectionCard>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/70">
                  Katalog
                </p>
                <h2 className="mt-3 text-2xl font-black text-stone-50">
                  Lista usluga
                </h2>
              </div>
              <StatusBadge label={`${ownerServices.length} usluga`} />
            </div>
            <div className="mt-5 grid gap-4">
              {ownerServices.map((service) => (
                <AppCard
                  key={service.id}
                  className="min-h-[156px]"
                  variant="interactive"
                >
                  <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.8fr)_minmax(220px,auto)] xl:items-center">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate text-xl font-black text-stone-50">{service.name}</h3>
                        <StatusBadge
                          label={service.active ? 'Aktivna' : 'Neaktivna'}
                          tone={service.active ? 'success' : 'neutral'}
                        />
                      </div>
                      <p className="mt-2 text-sm leading-6 text-stone-400">
                        {service.description}
                      </p>
                    </div>
                    <div className="grid gap-2 rounded-2xl border border-amber-200/10 bg-white/[0.035] px-4 py-3 text-sm sm:grid-cols-3">
                      <span className="min-w-0 truncate text-stone-200">{service.category}</span>
                      <span className="text-stone-300">{service.durationMinutes} min</span>
                      <span className="font-semibold text-amber-100">{service.price} KM</span>
                    </div>
                    <div className="flex min-h-[42px] flex-wrap gap-2 xl:justify-end">
                      <button type="button" className={buttonStyles.ghost}>
                        Uredi
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleServiceStatus(service.id)}
                        className={buttonStyles.secondary}
                      >
                        {service.active ? 'Deaktiviraj' : 'Aktiviraj'}
                      </button>
                    </div>
                  </div>
                </AppCard>
              ))}
            </div>
          </SectionCard>

          <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
            <SectionCard>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/70">
                Nova usluga
              </p>
              <h2 className="mt-3 text-2xl font-black text-stone-50">
                Dodaj ili pripremi uslugu
              </h2>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold text-stone-300">
                  Naziv usluge
                  <input
                    value={serviceForm.name}
                    onChange={(event) => handleServiceFieldChange('name', event.target.value)}
                    className="rounded-2xl border border-amber-200/10 bg-black/25 px-4 py-3 text-stone-100 outline-none transition focus:border-amber-200/35"
                    placeholder="npr. Fade šišanje"
                  />
                </label>
                <AppSelect
                  label="Kategorija"
                  value={serviceForm.category}
                  options={serviceCategoryOptions}
                  onChange={(value) => handleServiceFieldChange('category', value)}
                />
                <label className="grid gap-2 text-sm font-semibold text-stone-300 md:col-span-2">
                  Opis
                  <textarea
                    value={serviceForm.description}
                    onChange={(event) =>
                      handleServiceFieldChange('description', event.target.value)
                    }
                    rows={3}
                    className="resize-none rounded-2xl border border-amber-200/10 bg-black/25 px-4 py-3 text-stone-100 outline-none transition focus:border-amber-200/35"
                    placeholder="Kratak opis koji će klijent vidjeti u katalogu."
                  />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-stone-300">
                  Trajanje u minutama
                  <input
                    value={serviceForm.durationMinutes}
                    onChange={(event) =>
                      handleServiceFieldChange('durationMinutes', event.target.value)
                    }
                    inputMode="numeric"
                    className="rounded-2xl border border-amber-200/10 bg-black/25 px-4 py-3 text-stone-100 outline-none transition focus:border-amber-200/35"
                    placeholder="45"
                  />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-stone-300">
                  Cijena u KM
                  <input
                    value={serviceForm.price}
                    onChange={(event) => handleServiceFieldChange('price', event.target.value)}
                    inputMode="decimal"
                    className="rounded-2xl border border-amber-200/10 bg-black/25 px-4 py-3 text-stone-100 outline-none transition focus:border-amber-200/35"
                    placeholder="35"
                  />
                </label>
                <label className="flex items-center gap-3 rounded-2xl border border-amber-200/10 bg-black/25 px-4 py-3 text-sm font-semibold text-stone-300">
                  <input
                    type="checkbox"
                    checked={serviceForm.active}
                    onChange={(event) =>
                      handleServiceFieldChange('active', event.target.checked)
                    }
                    className="h-4 w-4 accent-amber-200"
                  />
                  Aktivna usluga
                </label>
              </div>

              {formError && (
                <p className="mt-4 rounded-2xl border border-red-300/20 bg-red-400/10 px-4 py-3 text-sm font-semibold text-red-100">
                  {formError}
                </p>
              )}

              <button type="button" onClick={handleAddService} className={`mt-5 ${buttonStyles.primary}`}>
                Sačuvaj lokalno
              </button>
              <p className="mt-3 text-xs leading-5 text-stone-500">
                UI placeholder: kasnije povezati sa `POST /api/services` ili `PUT /api/services/{'{id}'}`.
              </p>
            </SectionCard>

            <SectionCard>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/70">
                Pregled za klijenta
              </p>
              <article className="mt-5 rounded-3xl border border-amber-200/10 bg-black/25 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-200/65">
                      {serviceForm.category}
                    </p>
                    <h3 className="mt-3 text-xl font-black text-stone-50">
                      {serviceForm.name.trim() || 'Naziv usluge'}
                    </h3>
                  </div>
                  <StatusBadge
                    label={serviceForm.active ? 'Aktivna' : 'Neaktivna'}
                    tone={serviceForm.active ? 'success' : 'neutral'}
                  />
                </div>
                <p className="mt-4 text-sm leading-6 text-stone-400">
                  {serviceForm.description.trim() || 'Opis koji će klijent vidjeti u katalogu usluga.'}
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-amber-200/10 bg-white/[0.035] px-4 py-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-stone-500">
                      Trajanje
                    </p>
                    <p className="mt-1 font-semibold text-stone-100">
                      {serviceForm.durationMinutes || '0'} min
                    </p>
                  </div>
                  <div className="rounded-2xl border border-amber-200/10 bg-white/[0.035] px-4 py-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-stone-500">
                      Cijena
                    </p>
                    <p className="mt-1 font-semibold text-amber-100">
                      {serviceForm.price || '0'} KM
                    </p>
                  </div>
                </div>
              </article>
            </SectionCard>
          </section>
        </>
      )}

      {module === 'inventory' && (
        <SectionCard>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ['Vosak za kosu', 'Dovoljno'],
              ['Aftershave', 'Pri kraju'],
              ['Rukavice', 'Nema na stanju'],
            ].map(([name, status]) => (
              <article key={name} className="rounded-2xl border border-amber-200/10 bg-black/25 p-5">
                <h3 className="font-bold text-stone-50">{name}</h3>
                <div className="mt-4">
                  <StatusBadge
                    label={status}
                    tone={
                      status === 'Dovoljno'
                        ? 'success'
                        : status === 'Pri kraju'
                          ? 'warning'
                          : 'danger'
                    }
                  />
                </div>
              </article>
            ))}
          </div>
        </SectionCard>
      )}

      {module === 'payments' && (
        <SectionCard>
          <div className="grid gap-3">
            {[
              ['14:30', 'Fade šišanje', '35 KM', 'Kartica'],
              ['13:00', 'Brada', '20 KM', 'Gotovina'],
              ['10:00', 'Klasično šišanje', '25 KM', 'Kartica'],
            ].map(([time, service, amount, method]) => (
              <article key={`${time}-${service}`} className="grid gap-2 rounded-2xl border border-amber-200/10 bg-black/25 p-4 sm:grid-cols-4">
                <span className="text-amber-100">{time}</span>
                <span>{service}</span>
                <span className="font-semibold">{amount}</span>
                <span className="text-stone-400">{method}</span>
              </article>
            ))}
          </div>
        </SectionCard>
      )}

      {module === 'analytics' && (
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard label="Popunjenost" value="78%" detail="Sedmični prosjek" />
          <StatCard label="Ponovni dolasci" value="64%" detail="Klijenti koji se vraćaju" />
          <StatCard label="Najtraženija usluga" value="Fade" detail="35 termina ovog mjeseca" />
        </div>
      )}

      {module === 'reviews' && (
        <SectionCard>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ['Dino R.', '5', 'Odlična usluga i precizan fade.'],
              ['Haris M.', '4', 'Profesionalno i tačno na vrijeme.'],
            ].map(([client, rating, comment]) => (
              <article key={client} className="rounded-2xl border border-amber-200/10 bg-black/25 p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-stone-50">{client}</h3>
                  <span className="text-amber-100">{rating} ★</span>
                </div>
                <p className="mt-3 text-sm text-stone-400">{comment}</p>
              </article>
            ))}
          </div>
        </SectionCard>
      )}

      {module === 'settings' && (
        <SectionCard>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ['Naziv salona', 'Classic Cuts'],
              ['Telefon', '+387 61 123 456'],
              ['Email', 'info@classiccuts.ba'],
              ['Lokacija', 'Bihać, Bosna i Hercegovina'],
            ].map(([label, value]) => (
              <label key={label} className="grid gap-2 text-sm text-stone-300">
                {label}
                <input
                  disabled
                  value={value}
                  className="rounded-2xl border border-amber-200/10 bg-black/25 px-4 py-3 text-stone-200"
                />
              </label>
            ))}
          </div>
        </SectionCard>
      )}
    </div>
  )
}

export default OwnerModulePage
