import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getServices } from '../../api/servicesApi'
import BarberSelection from './BarberSelection'
import BookingSummary from './BookingSummary'
import type {
  BarberOption,
  BookingServiceOption,
  DateOption,
  TimeSlot,
} from './bookingTypes'
import DateCalendar from './DateCalendar'
import ServiceSelection from './ServiceSelection'
import TimeSlotGrid from './TimeSlotGrid'

interface BookingLocationState {
  selectedServiceId?: string
}

const barbers: BarberOption[] = [
  { id: 'amir', name: 'Amir K.', specialty: 'Fade i kratke forme' },
  { id: 'emin', name: 'Emin H.', specialty: 'Klasika i poslovni stil' },
  { id: 'tarik', name: 'Tarik S.', specialty: 'Brada i detalji' },
]

const timeSlots: TimeSlot[] = [
  { value: '09:00', status: 'available' },
  { value: '09:30', status: 'busy' },
  { value: '10:00', status: 'available' },
  { value: '10:30', status: 'available' },
  { value: '11:00', status: 'busy' },
  { value: '12:00', status: 'available' },
  { value: '13:30', status: 'available' },
  { value: '15:00', status: 'busy' },
  { value: '16:00', status: 'available' },
  { value: '17:30', status: 'available' },
]

const monthNames = [
  'Januar',
  'Februar',
  'Mart',
  'April',
  'Maj',
  'Juni',
  'Juli',
  'August',
  'Septembar',
  'Oktobar',
  'Novembar',
  'Decembar',
]

const dayLabels = ['Ned', 'Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub']

function createDateOption(date: Date): DateOption {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return {
    value: `${year}-${month}-${day}`,
    day: dayLabels[date.getDay()],
    label: `${day}. ${monthNames[date.getMonth()]}`,
  }
}

function mapServiceToBookingOption(service: {
  id: number
  name: string
  durationMinutes: number
  price: number
  description?: string | null
}): BookingServiceOption {
  return {
    id: String(service.id),
    name: service.name,
    duration: `${service.durationMinutes} min`,
    price: `${service.price.toFixed(service.price % 1 === 0 ? 0 : 2)} KM`,
    description:
      service.description ||
      'Opis usluge će biti prikazan nakon dopune podataka.',
  }
}

function BookAppointmentPage() {
  const location = useLocation()
  const locationState = location.state as BookingLocationState | null
  const [services, setServices] = useState<BookingServiceOption[]>([])
  const [selectedServiceId, setSelectedServiceId] = useState('')
  const [selectedBarberId, setSelectedBarberId] = useState(barbers[0].id)
  const [selectedDate, setSelectedDate] = useState<DateOption>(
    createDateOption(new Date()),
  )
  const [selectedTime, setSelectedTime] = useState('')
  const [isBookingPrepared, setIsBookingPrepared] = useState(false)
  const [isLoadingServices, setIsLoadingServices] = useState(true)
  const [servicesError, setServicesError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadServices() {
      setIsLoadingServices(true)
      setServicesError('')

      try {
        const response = await getServices({ active: true })
        const bookingServices = response.items.map(mapServiceToBookingOption)

        if (!isMounted) return

        setServices(bookingServices)
        setSelectedServiceId((currentServiceId) => {
          const requestedServiceId = locationState?.selectedServiceId
          const requestedServiceExists = bookingServices.some(
            (service) => service.id === requestedServiceId,
          )
          const currentServiceExists = bookingServices.some(
            (service) => service.id === currentServiceId,
          )

          if (requestedServiceId && requestedServiceExists) {
            return requestedServiceId
          }

          if (currentServiceExists) {
            return currentServiceId
          }

          return bookingServices[0]?.id ?? ''
        })
      } catch {
        if (isMounted) {
          setServicesError('Usluge trenutno nisu dostupne. Pokušajte ponovo kasnije.')
        }
      } finally {
        if (isMounted) {
          setIsLoadingServices(false)
        }
      }
    }

    loadServices()

    return () => {
      isMounted = false
    }
  }, [locationState?.selectedServiceId])

  const selectedService = useMemo(
    () => services.find((service) => service.id === selectedServiceId),
    [selectedServiceId, services],
  )
  const selectedBarber = barbers.find(
    (barber) => barber.id === selectedBarberId,
  )

  const resetSelectedTime = () => {
    setSelectedTime('')
    setIsBookingPrepared(false)
  }

  const handleServiceSelect = (serviceId: string) => {
    if (serviceId !== selectedServiceId) {
      setSelectedServiceId(serviceId)
      resetSelectedTime()
    }
  }

  const handleBarberSelect = (barberId: string) => {
    if (barberId !== selectedBarberId) {
      setSelectedBarberId(barberId)
      resetSelectedTime()
    }
  }

  const handleDateSelect = (date: DateOption) => {
    if (date.value !== selectedDate.value) {
      setSelectedDate(date)
      resetSelectedTime()
    }
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setIsBookingPrepared(false)
  }

  const handlePrepareBooking = () => {
    setIsBookingPrepared(true)
  }

  return (
    <div className="grid min-w-0 gap-6">
      <section className="min-w-0 rounded-[32px] border border-amber-200/15 bg-black/25 p-6 shadow-[0_0_45px_rgba(0,0,0,0.28)] backdrop-blur-xl lg:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-200/75">
          Rezervacija
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-stone-50 sm:text-5xl">
          Zakažite termin u nekoliko koraka
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-stone-300">
          Odaberite uslugu, frizera i slobodan termin. Usluge se sada učitavaju
          iz backend kataloga salona.
        </p>
      </section>

      {isLoadingServices && (
        <section className="rounded-[28px] border border-amber-200/10 bg-white/[0.035] p-5 text-sm text-stone-300 backdrop-blur">
          Učitavanje usluga...
        </section>
      )}

      {servicesError && (
        <section className="rounded-[28px] border border-red-300/20 bg-red-400/10 p-5 text-sm font-semibold text-red-100">
          {servicesError}
        </section>
      )}

      {!isLoadingServices && !servicesError && services.length === 0 && (
        <section className="rounded-[28px] border border-amber-200/10 bg-white/[0.035] p-5 text-sm text-stone-300 backdrop-blur">
          Trenutno nema dostupnih usluga.
        </section>
      )}

      {!isLoadingServices && !servicesError && services.length > 0 && (
        <ServiceSelection
          services={services}
          selectedServiceId={selectedServiceId}
          onSelect={handleServiceSelect}
        />
      )}

      <BarberSelection
        barbers={barbers}
        selectedBarberId={selectedBarberId}
        onSelect={handleBarberSelect}
      />
      <DateCalendar
        selectedDate={selectedDate.value}
        onSelect={handleDateSelect}
      />
      <TimeSlotGrid
        slots={timeSlots}
        selectedTime={selectedTime}
        onSelect={handleTimeSelect}
      />
      <BookingSummary
        service={selectedService}
        barber={selectedBarber}
        date={selectedDate}
        time={selectedTime}
        isPrepared={isBookingPrepared}
        onConfirm={handlePrepareBooking}
      />
    </div>
  )
}

export default BookAppointmentPage
