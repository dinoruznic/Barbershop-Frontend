import { useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import SectionCard from '../../components/common/SectionCard'
import StatusBadge from '../../components/common/StatusBadge'
import { buttonStyles } from '../../components/common/buttonStyles'

interface ReviewItem {
  id: number
  service: string
  barber: string
  date: string
  rating: number
  comment: string
}

const myReviews: ReviewItem[] = [
  {
    id: 1,
    service: 'Fade šišanje',
    barber: 'Emir H.',
    date: '02.06.2026',
    rating: 5,
    comment:
      'Odličan fade, precizne linije i vrlo profesionalan pristup. Termin je počeo na vrijeme.',
  },
  {
    id: 2,
    service: 'Uređivanje brade',
    barber: 'Amar K.',
    date: '26.05.2026',
    rating: 4,
    comment: 'Ugodna atmosfera i kvalitetna usluga. Brada je izgledala uredno.',
  },
]

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-sm tracking-[0.18em] text-amber-100">
      {'★'.repeat(rating)}
      <span className="text-stone-600">{'★'.repeat(5 - rating)}</span>
    </span>
  )
}

function ReviewsPage() {
  const [selectedRating, setSelectedRating] = useState(5)
  const [comment, setComment] = useState('')

  return (
    <div className="grid gap-6">
      <PageHeader
        title="Recenzije"
        subtitle="Pregledajte svoje recenzije i iskustva nakon termina."
      />

      <SectionCard>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/70">
              Moje recenzije
            </p>
            <h2 className="mt-3 text-2xl font-black text-stone-50">
              Objavljena iskustva
            </h2>
          </div>
          <StatusBadge label={`${myReviews.length} objavljene`} tone="neutral" />
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {myReviews.map((review) => (
            <article
              key={review.id}
              className="rounded-2xl border border-amber-200/10 bg-black/25 p-5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-xl font-black text-stone-50">
                    {review.service}
                  </h3>
                  <p className="mt-2 text-sm text-stone-400">
                    {review.barber} · {review.date}
                  </p>
                </div>
                <StatusBadge label="Objavljeno" tone="success" />
              </div>
              <div className="mt-4">
                <Stars rating={review.rating} />
              </div>
              <p className="mt-4 text-sm leading-7 text-stone-300">
                {review.comment}
              </p>
            </article>
          ))}
        </div>
      </SectionCard>

      <section className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
        <SectionCard>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/70">
            Čeka recenziju
          </p>
          <h2 className="mt-3 text-2xl font-black text-stone-50">
            Fade šišanje sa Emirom H.
          </h2>
          <p className="mt-3 text-sm leading-7 text-stone-400">
            Termin: 07.06.2026. Podijelite svoje iskustvo nakon posjete.
          </p>
          <button type="button" className={`mt-5 ${buttonStyles.secondary}`}>
            Ostavi recenziju
          </button>
        </SectionCard>

        <SectionCard>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/70">
            Nova recenzija
          </p>
          <h2 className="mt-3 text-2xl font-black text-stone-50">
            Podijelite svoje iskustvo
          </h2>

          <div className="mt-5 flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => setSelectedRating(rating)}
                className={`rounded-2xl border px-4 py-2 text-sm font-semibold transition ${
                  selectedRating === rating
                    ? 'border-amber-200/45 bg-amber-100/10 text-amber-100'
                    : 'border-amber-200/10 bg-black/25 text-stone-300 hover:border-amber-200/25'
                }`}
              >
                {rating} ★
              </button>
            ))}
          </div>

          <label className="mt-5 grid gap-2 text-sm text-stone-300">
            Komentar
            <textarea
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Podijelite svoje iskustvo..."
              rows={5}
              className="resize-none rounded-2xl border border-amber-200/10 bg-black/25 px-4 py-3 text-stone-100 outline-none placeholder:text-stone-500 focus:border-amber-200/35"
            />
          </label>

          <button type="button" className={`mt-5 ${buttonStyles.primary}`}>
            Pošalji recenziju
          </button>
        </SectionCard>
      </section>
    </div>
  )
}

export default ReviewsPage
