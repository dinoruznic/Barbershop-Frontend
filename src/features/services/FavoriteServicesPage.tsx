import { Link } from 'react-router-dom'
import AppCard from '../../components/common/AppCard'
import EmptyState from '../../components/common/EmptyState'
import PageHeader from '../../components/common/PageHeader'
import SectionCard from '../../components/common/SectionCard'
import { buttonStyles } from '../../components/common/buttonStyles'

interface FavoriteService {
  id: number
  name: string
  category: string
  duration: string
  price: string
  description: string
}

const favoriteServices: FavoriteService[] = [
  {
    id: 1,
    name: 'Klasično šišanje',
    category: 'Šišanje',
    duration: '30 min',
    price: '25 KM',
    description: 'Uredan rez, pranje i završno stiliziranje za svaki dan.',
  },
  {
    id: 2,
    name: 'Fade šišanje',
    category: 'Premium šišanje',
    duration: '45 min',
    price: '35 KM',
    description: 'Precizni prelazi, čiste linije i moderan završetak.',
  },
  {
    id: 3,
    name: 'Uređivanje brade',
    category: 'Brada',
    duration: '30 min',
    price: '20 KM',
    description: 'Oblikovanje brade, konture i završna njega kože.',
  },
  {
    id: 4,
    name: 'Šišanje + brada',
    category: 'Paket usluga',
    duration: '60 min',
    price: '45 KM',
    description: 'Kompletan tretman za kosu i bradu u jednom terminu.',
  },
]

function FavoriteServicesPage() {
  return (
    <div className="grid gap-6">
      <PageHeader
        title="Omiljene usluge"
        subtitle="Sačuvajte usluge koje najčešće birate."
      />

      <SectionCard>
        {favoriteServices.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {favoriteServices.map((service) => (
              <AppCard
                key={service.id}
                className="flex min-h-[340px] flex-col"
                variant="interactive"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-200/65">
                      {service.category}
                    </p>
                    <h3 className="mt-3 text-xl font-black text-stone-50">
                      {service.name}
                    </h3>
                  </div>
                  <span
                    aria-label="Omiljena usluga"
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-amber-200/20 bg-amber-100/10 text-amber-100"
                  >
                    ♥
                  </span>
                </div>

                <p className="mt-4 flex-1 text-sm leading-6 text-stone-400">
                  {service.description}
                </p>

                <div className="mt-5 flex items-center justify-between gap-3 rounded-2xl border border-amber-200/10 bg-white/[0.035] px-4 py-3 text-sm">
                  <span className="text-stone-300">{service.duration}</span>
                  <span className="font-semibold text-stone-100">
                    {service.price}
                  </span>
                </div>

                <Link
                  to="/app/book-appointment"
                  className={`mt-5 ${buttonStyles.primary}`}
                >
                  Zakaži
                </Link>
              </AppCard>
            ))}
          </div>
        ) : (
          <EmptyState
            title="Još nemate omiljenih usluga."
            description="Kada sačuvate usluge koje često birate, bit će prikazane ovdje."
            actionLabel="Pregledaj usluge"
            actionTo="/app/services"
          />
        )}
      </SectionCard>
    </div>
  )
}

export default FavoriteServicesPage
