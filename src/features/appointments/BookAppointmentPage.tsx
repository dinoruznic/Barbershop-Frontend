import { useMemo, useState } from 'react'
import BarberSelection from './BarberSelection'
import BookingSummary from './BookingSummary'
import type {
  BarberOption,
  BookingServiceOption,
  DateOption,
  TimeSlot,
} from './bookingTypes'
import DateSelection from './DateSelection'
import ServiceSelection from './ServiceSelection'
import TimeSlotGrid from './TimeSlotGrid'

const services: BookingServiceOption[] = [
  {
    id: 'classic-cut',
    name: 'Klasično šišanje',
    duration: '45 min',
    price: '25 KM',
    description: 'Uredan rez, pranje i završno stiliziranje.',
  },
  {
    id: 'fade-cut',
    name: 'Fade šišanje',
    duration: '60 min',
    price: '35 KM',
    description: 'Precizan fade, konture i finalni styling.',
  },
  {
    id: 'beard-trim',
    name: 'Uređivanje brade',
    duration: '30 min',
    price: '18 KM',
    description: 'Oblikovanje brade, linija i njega kože.',
  },
]

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

const dayLabels = ['Ned', 'Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub']

function getNextSevenDays(): DateOption[] {
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date()
    date.setDate(date.getDate() + index)

    return {
      value: date.toISOString().slice(0, 10),
      day: dayLabels[date.getDay()],
      label: date.toLocaleDateString('bs-BA', {
        day: '2-digit',
        month: 'short',
      }),
    }
  })
}

function BookAppointmentPage() {
  const dates = useMemo(() => getNextSevenDays(), [])
  const [selectedServiceId, setSelectedServiceId] = useState(services[0].id)
  const [selectedBarberId, setSelectedBarberId] = useState(barbers[0].id)
  const [selectedDate, setSelectedDate] = useState(dates[0].value)
  const [selectedTime, setSelectedTime] = useState('')

  const selectedService = services.find(
    (service) => service.id === selectedServiceId,
  )
  const selectedBarber = barbers.find(
    (barber) => barber.id === selectedBarberId,
  )
  const selectedDateOption = dates.find((date) => date.value === selectedDate)

  const resetSelectedTime = () => {
    setSelectedTime('')
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

  const handleDateSelect = (date: string) => {
    if (date !== selectedDate) {
      setSelectedDate(date)
      resetSelectedTime()
    }
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
          Odaberite uslugu, frizera i slobodan termin. Ovaj tok je spreman za
          povezivanje sa backend rezervacijama.
        </p>
      </section>

      <ServiceSelection
        services={services}
        selectedServiceId={selectedServiceId}
        onSelect={handleServiceSelect}
      />
      <BarberSelection
        barbers={barbers}
        selectedBarberId={selectedBarberId}
        onSelect={handleBarberSelect}
      />
      <DateSelection
        dates={dates}
        selectedDate={selectedDate}
        onSelect={handleDateSelect}
      />
      <TimeSlotGrid
        slots={timeSlots}
        selectedTime={selectedTime}
        onSelect={setSelectedTime}
      />
      <BookingSummary
        service={selectedService}
        barber={selectedBarber}
        date={selectedDateOption}
        time={selectedTime}
      />
    </div>
  )
}

export default BookAppointmentPage
