import { useState } from 'react'
import type { ReactNode } from 'react'
import AppButton from '../../components/common/AppButton'
import AppCard from '../../components/common/AppCard'
import PageHeader from '../../components/common/PageHeader'
import SectionCard from '../../components/common/SectionCard'
import StatusBadge from '../../components/common/StatusBadge'
import { buttonStyles } from '../../components/common/buttonStyles'

type EmployeeModule = 'schedule' | 'appointments' | 'time-off' | 'services' | 'profile'
type AppointmentStatus =
  | 'Na čekanju'
  | 'Potvrđen'
  | 'Otkazan'
  | 'Završen'
  | 'Nije se pojavio'

interface EmployeeModulePageProps {
  module: EmployeeModule
}

interface EmployeeAppointment {
  id: string
  client: string
  service: string
  date: string
  time: string
  status: AppointmentStatus
}

const moduleCopy: Record<EmployeeModule, { title: string; subtitle: string }> = {
  schedule: {
    title: 'Moj raspored',
    subtitle: 'Dnevni i sedmični pregled radnog vremena.',
  },
  appointments: {
    title: 'Dodijeljeni termini',
    subtitle: 'Termini koji su dodijeljeni vama.',
  },
  'time-off': {
    title: 'Odsustva',
    subtitle: 'Zahtjevi za odsustvo i dostupnost.',
  },
  services: {
    title: 'Usluge',
    subtitle: 'Usluge koje obavljate u salonu.',
  },
  profile: {
    title: 'Profil',
    subtitle: 'Vaši podaci, specijalnost i radno vrijeme.',
  },
}

const initialAppointments: EmployeeAppointment[] = [
  {
    id: 'appointment-1',
    client: 'Dino R.',
    service: 'Fade šišanje',
    date: '12.06.2026',
    time: '09:00',
    status: 'Na čekanju',
  },
  {
    id: 'appointment-2',
    client: 'Haris M.',
    service: 'Uređivanje brade',
    date: '12.06.2026',
    time: '10:30',
    status: 'Na čekanju',
  },
  {
    id: 'appointment-3',
    client: 'Amar S.',
    service: 'Klasično šišanje',
    date: '13.06.2026',
    time: '13:00',
    status: 'Potvrđen',
  },
  {
    id: 'appointment-4',
    client: 'Kenan B.',
    service: 'Šišanje + brada',
    date: '14.06.2026',
    time: '15:30',
    status: 'Potvrđen',
  },
  {
    id: 'appointment-5',
    client: 'Mirza K.',
    service: 'Fade šišanje',
    date: '10.06.2026',
    time: '11:00',
    status: 'Otkazan',
  },
]

function getStatusTone(status: AppointmentStatus) {
  if (status === 'Potvrđen' || status === 'Završen') return 'success'
  if (status === 'Na čekanju') return 'warning'
  if (status === 'Otkazan' || status === 'Nije se pojavio') return 'danger'
  return 'neutral'
}

function AppointmentCard({
  appointment,
  children,
}: {
  appointment: EmployeeAppointment
  children?: ReactNode
}) {
  return (
    <AppCard className="min-h-[132px]" variant="interactive">
      <div className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1.25fr)_220px_minmax(240px,auto)] lg:items-center">
        <div className="min-w-0">
          <h3 className="truncate text-xl font-black text-stone-50">
            {appointment.client}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-400">
            {appointment.service}
          </p>
        </div>

        <div className="flex w-[220px] justify-self-center items-center justify-center rounded-full border border-amber-200/10 bg-white/[0.035] px-4 py-2.5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
          <span className="text-sm font-black text-stone-100">
            {appointment.date}
          </span>
          <span className="px-2 text-amber-200/50">•</span>
          <span className="text-sm font-black text-amber-100">
            {appointment.time}
          </span>
        </div>

        <div className="flex min-w-0 flex-col gap-3 lg:items-end">
          <StatusBadge label={appointment.status} tone={getStatusTone(appointment.status)} />
          <div className="flex min-h-[42px] flex-wrap gap-2 lg:justify-end">
            {children}
          </div>
        </div>
      </div>
    </AppCard>
  )
}

function EmployeeModulePage({ module }: EmployeeModulePageProps) {
  const copy = moduleCopy[module]
  const [appointments, setAppointments] = useState(initialAppointments)

  const pendingAppointments = appointments.filter(
    (appointment) => appointment.status === 'Na čekanju',
  )
  const activeAppointments = appointments.filter(
    (appointment) => appointment.status === 'Potvrđen',
  )
  const historyAppointments = appointments.filter((appointment) =>
    ['Otkazan', 'Završen', 'Nije se pojavio'].includes(appointment.status),
  )

  const updateAppointmentStatus = (
    appointmentId: string,
    status: AppointmentStatus,
  ) => {
    setAppointments((currentAppointments) =>
      currentAppointments.map((appointment) =>
        appointment.id === appointmentId ? { ...appointment, status } : appointment,
      ),
    )
  }

  return (
    <div className="grid gap-6">
      <PageHeader eyebrow="Frizerski prostor" title={copy.title} subtitle={copy.subtitle} />

      {module === 'schedule' && (
        <SectionCard>
          <div className="grid gap-4">
            {[
              ['08:00', 'Početak smjene', 'Priprema radnog mjesta'],
              ['09:00', 'Fade šišanje', 'Dino R.'],
              ['10:30', 'Uređivanje brade', 'Haris M.'],
              ['12:00', 'Pauza', '30 min'],
              ['13:00', 'Klasično šišanje', 'Amar S.'],
            ].map(([time, title, detail]) => (
              <AppCard
                key={`${time}-${title}`}
                className="grid gap-3 rounded-2xl sm:grid-cols-[90px_1fr]"
                variant="subtle"
              >
                <span className="font-black text-amber-100">{time}</span>
                <div>
                  <h3 className="font-bold text-stone-50">{title}</h3>
                  <p className="mt-1 text-sm text-stone-400">{detail}</p>
                </div>
              </AppCard>
            ))}
          </div>
        </SectionCard>
      )}

      {module === 'appointments' && (
        <>
          <SectionCard>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/70">
                  Zahtjevi za potvrdu
                </p>
                <h2 className="mt-3 text-2xl font-black text-stone-50">
                  Termini na čekanju
                </h2>
              </div>
            </div>

            <div className="mt-5 grid gap-4">
              {pendingAppointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment}>
                  {/* TODO: Povezati sa status endpointima kada API integracija krene. */}
                  <AppButton
                    onClick={() => updateAppointmentStatus(appointment.id, 'Potvrđen')}
                    variant="secondary"
                  >
                    Prihvati
                  </AppButton>
                  <AppButton
                    onClick={() => updateAppointmentStatus(appointment.id, 'Otkazan')}
                    variant="danger"
                  >
                    Odbij
                  </AppButton>
                </AppointmentCard>
              ))}
            </div>
          </SectionCard>

          <SectionCard>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/70">
                  Aktivni termini
                </p>
                <h2 className="mt-3 text-2xl font-black text-stone-50">
                  Potvrđeni termini
                </h2>
              </div>
            </div>

            <div className="mt-5 grid gap-4">
              {activeAppointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment}>
                  <AppButton
                    onClick={() => updateAppointmentStatus(appointment.id, 'Završen')}
                    variant="secondary"
                  >
                    Završi
                  </AppButton>
                  <AppButton
                    onClick={() => updateAppointmentStatus(appointment.id, 'Nije se pojavio')}
                    variant="ghost"
                  >
                    Nije se pojavio
                  </AppButton>
                </AppointmentCard>
              ))}
            </div>
          </SectionCard>

          <SectionCard>
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/70">
                  Historija
                </p>
                <h2 className="mt-3 text-2xl font-black text-stone-50">
                  Historija termina
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-400">
                  Odbijeni, završeni i propušteni termini ostaju u historiji radi evidencije.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-4">
              {historyAppointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment}>
                  {appointment.status === 'Otkazan' && (
                    <AppButton
                      onClick={() => updateAppointmentStatus(appointment.id, 'Na čekanju')}
                      variant="ghost"
                      className="px-3 py-2 text-xs font-semibold normal-case tracking-normal text-stone-300 hover:text-amber-100"
                    >
                      ↺ Vrati u čekanje
                    </AppButton>
                  )}
                </AppointmentCard>
              ))}
            </div>
            <p className="mt-4 text-xs leading-5 text-stone-500">
              TODO: Backend trenutno ne podržava vraćanje CANCELLED termina nazad u PENDING status.
            </p>
          </SectionCard>
        </>
      )}

      {module === 'time-off' && (
        <SectionCard>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/70">
                Odsustva
              </p>
              <h2 className="mt-3 text-2xl font-black text-stone-50">
                Nemate aktivnih zahtjeva za odsustvo.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-400">
                Ovdje će se prikazivati odobreni, odbijeni i zahtjevi na čekanju.
              </p>
            </div>
            <button type="button" className={buttonStyles.primary}>
              Zatraži odsustvo
            </button>
          </div>
        </SectionCard>
      )}

      {module === 'services' && (
        <SectionCard>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ['Fade šišanje', 'Šišanje', '45 min', '35 KM'],
              ['Klasično šišanje', 'Šišanje', '30 min', '25 KM'],
              ['Uređivanje brade', 'Brada', '30 min', '20 KM'],
            ].map(([name, category, duration, price]) => (
              <AppCard key={name} className="flex min-h-[220px] flex-col" variant="interactive">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-200/65">
                  {category}
                </p>
                <h3 className="mt-3 text-xl font-black text-stone-50">{name}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-stone-400">
                  Usluga dostupna u salonu, spremna za prikaz kroz buduću API integraciju.
                </p>
                <div className="mt-5 flex items-center justify-between gap-3 rounded-2xl border border-amber-200/10 bg-white/[0.035] px-4 py-3 text-sm">
                  <span className="text-stone-300">{duration}</span>
                  <span className="font-semibold text-amber-100">{price}</span>
                </div>
              </AppCard>
            ))}
          </div>
        </SectionCard>
      )}

      {module === 'profile' && (
        <SectionCard>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ['Ime', 'Amir'],
              ['Prezime', 'K.'],
              ['Specijalnost', 'Fade i kratke forme'],
              ['Radno vrijeme', '08:00 - 16:00'],
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

export default EmployeeModulePage
