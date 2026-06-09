import { useEffect, useMemo, useState } from 'react'
import {
  createService,
  deleteService,
  getServiceCategories,
  getServices,
  updateService,
} from '../../api/servicesApi'
import AppCard from '../../components/common/AppCard'
import AppSelect from '../../components/common/AppSelect'
import EmptyState from '../../components/common/EmptyState'
import PageHeader from '../../components/common/PageHeader'
import SectionCard from '../../components/common/SectionCard'
import StatusBadge from '../../components/common/StatusBadge'
import { buttonStyles } from '../../components/common/buttonStyles'
import type {
  ServiceCategoryDto,
  ServiceCreateRequest,
  ServiceDto,
  ServiceUpdateRequest,
} from '../../types/services'

interface ServiceFormState {
  name: string
  categoryId: string
  description: string
  durationMinutes: string
  price: string
  active: boolean
}

const initialServiceForm: ServiceFormState = {
  name: '',
  categoryId: '',
  description: '',
  durationMinutes: '',
  price: '',
  active: true,
}

function formatPrice(price: number) {
  return `${price.toFixed(price % 1 === 0 ? 0 : 2)} KM`
}

function validateServiceForm(form: ServiceFormState) {
  const duration = Number(form.durationMinutes)
  const price = Number(form.price)

  if (!form.name.trim()) return 'Naziv usluge je obavezan.'
  if (!form.categoryId) return 'Kategorija je obavezna.'
  if (!form.description.trim()) return 'Opis usluge je obavezan.'
  if (form.description.trim().length > 180) {
    return 'Opis treba biti kratak i jasan, maksimalno 180 karaktera.'
  }
  if (!Number.isFinite(duration) || duration <= 0 || duration > 480) {
    return 'Trajanje mora biti između 1 i 480 minuta.'
  }
  if (!Number.isFinite(price) || price < 0 || price > 1000) {
    return 'Cijena mora biti između 0 i 1000 KM.'
  }

  return ''
}

function mapServiceToForm(service: ServiceDto): ServiceFormState {
  return {
    name: service.name,
    categoryId: String(service.categoryId),
    description: service.description ?? '',
    durationMinutes: String(service.durationMinutes),
    price: String(service.price),
    active: service.active,
  }
}

function OwnerServicesPage() {
  const [categories, setCategories] = useState<ServiceCategoryDto[]>([])
  const [services, setServices] = useState<ServiceDto[]>([])
  const [serviceForm, setServiceForm] = useState<ServiceFormState>(initialServiceForm)
  const [editingServiceId, setEditingServiceId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [formError, setFormError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: String(category.id),
  }))

  const selectedCategory = categories.find(
    (category) => String(category.id) === serviceForm.categoryId,
  )

  const inferredShopId = useMemo(() => {
    return services[0]?.shopId ?? categories[0]?.shopId ?? null
  }, [categories, services])

  const loadServicesData = async () => {
    setIsLoading(true)
    setError('')

    try {
      const [categoriesResponse, servicesResponse] = await Promise.all([
        getServiceCategories({ active: true }),
        getServices(),
      ])

      setCategories(categoriesResponse.items)
      setServices(servicesResponse.items)
      setServiceForm((currentForm) => ({
        ...currentForm,
        categoryId:
          currentForm.categoryId || String(categoriesResponse.items[0]?.id ?? ''),
      }))
    } catch {
      setError('Usluge trenutno nisu dostupne. Pokušajte ponovo kasnije.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadServicesData()
  }, [])

  const handleServiceFieldChange = (
    field: keyof ServiceFormState,
    value: string | boolean,
  ) => {
    setServiceForm((currentForm) => ({ ...currentForm, [field]: value }))
    setFormError('')
    setSuccessMessage('')
  }

  const resetForm = () => {
    setEditingServiceId(null)
    setServiceForm({
      ...initialServiceForm,
      categoryId: String(categories[0]?.id ?? ''),
    })
    setFormError('')
    setSuccessMessage('')
  }

  const createRequestBody = (): ServiceCreateRequest | null => {
    const validationError = validateServiceForm(serviceForm)

    if (validationError) {
      setFormError(validationError)
      return null
    }

    if (!inferredShopId) {
      setFormError(
        'Nije moguće odrediti salon. Provjerite da postoje shop, kategorije i owner-shop veza.',
      )
      return null
    }

    return {
      shopId: inferredShopId,
      categoryId: Number(serviceForm.categoryId),
      name: serviceForm.name.trim(),
      description: serviceForm.description.trim(),
      durationMinutes: Number(serviceForm.durationMinutes),
      price: Number(serviceForm.price),
    }
  }

  const handleSubmitService = async () => {
    const requestBody = createRequestBody()
    if (!requestBody) return

    setIsSaving(true)
    setFormError('')
    setSuccessMessage('')

    try {
      if (editingServiceId) {
        const updateRequestBody: ServiceUpdateRequest = {
          ...requestBody,
          active: serviceForm.active,
        }
        const updatedService = await updateService(editingServiceId, updateRequestBody)

        setServices((currentServices) =>
          currentServices.map((service) =>
            service.id === updatedService.id ? updatedService : service,
          ),
        )
        setSuccessMessage('Usluga je uspješno ažurirana.')
      } else {
        const createdService = await createService(requestBody)
        setServices((currentServices) => [createdService, ...currentServices])
        setSuccessMessage('Usluga je uspješno dodana.')
      }

      resetForm()
    } catch (apiError) {
      setFormError(
        apiError instanceof Error
          ? apiError.message
          : 'Uslugu trenutno nije moguće sačuvati.',
      )
    } finally {
      setIsSaving(false)
    }
  }

  const handleEditService = (service: ServiceDto) => {
    setEditingServiceId(service.id)
    setServiceForm(mapServiceToForm(service))
    setFormError('')
    setSuccessMessage('')
  }

  const handleDeactivateService = async (service: ServiceDto) => {
    setError('')
    setSuccessMessage('')

    try {
      await deleteService(service.id)
      setServices((currentServices) =>
        currentServices.map((currentService) =>
          currentService.id === service.id
            ? { ...currentService, active: false }
            : currentService,
        ),
      )
      setSuccessMessage('Usluga je deaktivirana.')
    } catch (apiError) {
      setError(
        apiError instanceof Error
          ? apiError.message
          : 'Uslugu trenutno nije moguće deaktivirati.',
      )
    }
  }

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Vlasnički prostor"
        title="Usluge salona"
        subtitle="Upravljanje ponudom, trajanjem i cijenama usluga."
      />

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
          <StatusBadge label={`${services.length} usluga`} />
        </div>

        {isLoading && (
          <p className="mt-6 rounded-2xl border border-amber-200/10 bg-black/25 px-4 py-3 text-sm text-stone-300">
            Učitavanje usluga...
          </p>
        )}

        {error && (
          <p className="mt-6 rounded-2xl border border-red-300/20 bg-red-400/10 px-4 py-3 text-sm font-semibold text-red-100">
            {error}
          </p>
        )}

        {successMessage && (
          <p className="mt-6 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm font-semibold text-emerald-100">
            {successMessage}
          </p>
        )}

        {!isLoading && !error && services.length === 0 && (
          <div className="mt-6">
            <EmptyState
              title="Još niste dodali nijednu uslugu."
              description="Forma za dodavanje usluge ostaje dostupna ispod liste."
            />
          </div>
        )}

        {!isLoading && services.length > 0 && (
          <div className="mt-5 grid gap-4">
            {services.map((service) => (
              <AppCard
                key={service.id}
                className="min-h-[156px]"
                variant="interactive"
              >
                <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.8fr)_minmax(240px,auto)] xl:items-center">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate text-xl font-black text-stone-50">
                        {service.name}
                      </h3>
                      <StatusBadge
                        label={service.active ? 'Aktivna' : 'Neaktivna'}
                        tone={service.active ? 'success' : 'neutral'}
                      />
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-400">
                      {service.description || 'Opis usluge nije dodan.'}
                    </p>
                  </div>
                  <div className="grid gap-2 rounded-2xl border border-amber-200/10 bg-white/[0.035] px-4 py-3 text-sm sm:grid-cols-3">
                    <span className="min-w-0 truncate text-stone-200">
                      {service.categoryName || 'Kategorija'}
                    </span>
                    <span className="text-stone-300">{service.durationMinutes} min</span>
                    <span className="font-semibold text-amber-100">
                      {formatPrice(service.price)}
                    </span>
                  </div>
                  <div className="flex min-h-[42px] flex-wrap gap-2 xl:justify-end">
                    <button
                      type="button"
                      onClick={() => handleEditService(service)}
                      className={buttonStyles.ghost}
                    >
                      Uredi
                    </button>
                    {service.active && (
                      <button
                        type="button"
                        onClick={() => handleDeactivateService(service)}
                        className={buttonStyles.secondary}
                      >
                        Deaktiviraj
                      </button>
                    )}
                  </div>
                </div>
              </AppCard>
            ))}
          </div>
        )}
      </SectionCard>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <SectionCard>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/70">
            {editingServiceId ? 'Uredi uslugu' : 'Nova usluga'}
          </p>
          <h2 className="mt-3 text-2xl font-black text-stone-50">
            {editingServiceId ? 'Ažuriraj uslugu' : 'Dodaj uslugu'}
          </h2>

          {categories.length === 0 && !isLoading && (
            <p className="mt-5 rounded-2xl border border-amber-200/10 bg-black/25 px-4 py-3 text-sm text-stone-300">
              Još nisu dodane kategorije usluga.
            </p>
          )}

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
              disabled={categories.length === 0}
              label="Kategorija"
              value={serviceForm.categoryId}
              options={categoryOptions}
              placeholder="Odaberite kategoriju"
              onChange={(value) => handleServiceFieldChange('categoryId', value)}
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

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              disabled={isSaving || categories.length === 0}
              onClick={handleSubmitService}
              className={buttonStyles.primary}
            >
              {isSaving ? 'Spremanje...' : editingServiceId ? 'Sačuvaj izmjene' : 'Dodaj uslugu'}
            </button>
            {editingServiceId && (
              <button
                type="button"
                onClick={resetForm}
                className={buttonStyles.ghost}
              >
                Odustani
              </button>
            )}
          </div>
        </SectionCard>

        <SectionCard>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/70">
            Pregled za klijenta
          </p>
          <AppCard className="mt-5" variant="default">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-200/65">
                  {selectedCategory?.name ?? 'Kategorija'}
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
              {serviceForm.description.trim() ||
                'Opis koji će klijent vidjeti u katalogu usluga.'}
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
          </AppCard>
        </SectionCard>
      </section>
    </div>
  )
}

export default OwnerServicesPage
