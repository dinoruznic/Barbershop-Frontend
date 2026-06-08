export interface BookingServiceOption {
  id: string
  name: string
  duration: string
  price: string
  description: string
}

export interface BarberOption {
  id: string
  name: string
  specialty: string
}

export interface DateOption {
  value: string
  label: string
  day: string
}

export interface TimeSlot {
  value: string
  status: 'available' | 'busy'
}
