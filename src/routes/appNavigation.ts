import type { NavigationGroup, PageMetadata } from '../types/navigation'
import type { UserRole } from '../types/auth'

export const clientNavigationGroups: NavigationGroup[] = [
  {
    label: 'Glavno',
    items: [
      { label: 'Pregled', path: '/app/dashboard' },
      { label: 'Zakaži termin', path: '/app/book-appointment' },
      { label: 'Moji termini', path: '/app/my-appointments' },
    ],
  },
  {
    label: 'Salon',
    items: [
      { label: 'Usluge', path: '/app/services' },
      { label: 'Omiljene usluge', path: '/app/favorite-services' },
    ],
  },
  {
    label: 'Profil',
    items: [
      { label: 'Recenzije', path: '/app/reviews' },
      { label: 'Profil', path: '/app/profile' },
    ],
  },
]

export const ownerNavigationGroups: NavigationGroup[] = [
  {
    label: 'Pregled',
    items: [{ label: 'Pregled', path: '/app/owner/dashboard' }],
  },
  {
    label: 'Salon',
    items: [
      { label: 'Termini', path: '/app/owner/appointments' },
      { label: 'Frizeri', path: '/app/owner/employees' },
      { label: 'Usluge', path: '/app/owner/services' },
      { label: 'Recenzije', path: '/app/owner/reviews' },
    ],
  },
  {
    label: 'Poslovanje',
    items: [
      { label: 'Inventar', path: '/app/owner/inventory' },
      { label: 'Plaćanja', path: '/app/owner/payments' },
      { label: 'Analitika', path: '/app/owner/analytics' },
    ],
  },
  {
    label: 'Postavke',
    items: [{ label: 'Postavke salona', path: '/app/owner/settings' }],
  },
]

export const employeeNavigationGroups: NavigationGroup[] = [
  {
    label: 'Pregled',
    items: [{ label: 'Pregled', path: '/app/employee/dashboard' }],
  },
  {
    label: 'Radni dan',
    items: [
      { label: 'Moj raspored', path: '/app/employee/schedule' },
      { label: 'Dodijeljeni termini', path: '/app/employee/appointments' },
      { label: 'Odsustva', path: '/app/employee/time-off' },
    ],
  },
  {
    label: 'Salon',
    items: [{ label: 'Usluge', path: '/app/employee/services' }],
  },
  {
    label: 'Profil',
    items: [{ label: 'Profil', path: '/app/employee/profile' }],
  },
]

export function getNavigationForRole(role: UserRole) {
  if (role === 'OWNER') {
    return {
      workspaceLabel: 'Vlasnički prostor',
      navigationGroups: ownerNavigationGroups,
    }
  }

  if (role === 'EMPLOYEE') {
    return {
      workspaceLabel: 'Frizerski prostor',
      navigationGroups: employeeNavigationGroups,
    }
  }

  return {
    workspaceLabel: 'Moj prostor',
    navigationGroups: clientNavigationGroups,
  }
}

export const pageMetadata: Record<string, PageMetadata> = {
  '/app/dashboard': {
    title: 'Pregled',
    subtitle: 'Vaš prostor za termine, usluge i brze rezervacije.',
  },
  '/app/book-appointment': {
    title: 'Zakaži termin',
    subtitle: 'Odaberite uslugu, frizera, datum i slobodan termin.',
  },
  '/app/my-appointments': {
    title: 'Moji termini',
    subtitle: 'Pregled nadolazećih i prethodnih rezervacija.',
  },
  '/app/favorite-services': {
    title: 'Omiljene usluge',
    subtitle: 'Usluge koje najčešće birate ili želite sačuvati.',
  },
  '/app/services': {
    title: 'Usluge',
    subtitle: 'Katalog barbershop usluga i kategorija.',
  },
  '/app/reviews': {
    title: 'Recenzije',
    subtitle: 'Vaše ocjene, komentari i iskustva u salonu.',
  },
  '/app/profile': {
    title: 'Profil',
    subtitle: 'Lični podaci i postavke naloga.',
  },
  '/app/owner/dashboard': {
    title: 'Pregled salona',
    subtitle: 'Pratite termine, frizere i poslovanje salona na jednom mjestu.',
  },
  '/app/owner/appointments': {
    title: 'Termini',
    subtitle: 'Pregled i organizacija termina u salonu.',
  },
  '/app/owner/employees': {
    title: 'Frizeri',
    subtitle: 'Tim, dostupnost i raspored frizera.',
  },
  '/app/owner/services': {
    title: 'Usluge salona',
    subtitle: 'Upravljanje ponudom, trajanjem i cijenama usluga.',
  },
  '/app/owner/inventory': {
    title: 'Inventar',
    subtitle: 'Praćenje artikala, potrošnje i stanja zaliha.',
  },
  '/app/owner/payments': {
    title: 'Plaćanja',
    subtitle: 'Pregled transakcija i dnevnih uplata.',
  },
  '/app/owner/analytics': {
    title: 'Analitika',
    subtitle: 'Poslovni uvidi i trendovi salona.',
  },
  '/app/owner/reviews': {
    title: 'Recenzije salona',
    subtitle: 'Komentari klijenata i kvalitet usluge.',
  },
  '/app/owner/settings': {
    title: 'Postavke salona',
    subtitle: 'Osnovne informacije i operativne postavke.',
  },
  '/app/employee/dashboard': {
    title: 'Moj radni dan',
    subtitle: 'Pregled rasporeda, termina i dostupnosti.',
  },
  '/app/employee/schedule': {
    title: 'Moj raspored',
    subtitle: 'Dnevni i sedmični pregled radnog vremena.',
  },
  '/app/employee/appointments': {
    title: 'Dodijeljeni termini',
    subtitle: 'Termini koji su dodijeljeni vama.',
  },
  '/app/employee/time-off': {
    title: 'Odsustva',
    subtitle: 'Zahtjevi za odsustvo i dostupnost.',
  },
  '/app/employee/services': {
    title: 'Usluge',
    subtitle: 'Usluge koje obavljate u salonu.',
  },
  '/app/employee/profile': {
    title: 'Profil',
    subtitle: 'Vaši podaci, specijalnost i radno vrijeme.',
  },
}
