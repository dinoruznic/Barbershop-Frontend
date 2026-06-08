import type { NavigationGroup, PageMetadata } from '../types/navigation'

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
  '/app/notifications': {
    title: 'Obavijesti',
    subtitle: 'Podsjetnici, obavijesti i sistemske poruke.',
  },
  '/app/profile': {
    title: 'Profil',
    subtitle: 'Lični podaci i postavke naloga.',
  },
  '/app/schedule': {
    title: 'Raspored',
    subtitle: 'Budući pregled radnog rasporeda za frizere.',
  },
  '/app/time-off': {
    title: 'Odsustva',
    subtitle: 'Buduća evidencija odsustava.',
  },
  '/app/assigned-appointments': {
    title: 'Dodijeljeni termini',
    subtitle: 'Budući pregled dodijeljenih termina.',
  },
  '/app/employees': {
    title: 'Zaposlenici',
    subtitle: 'Buduće upravljanje zaposlenicima.',
  },
  '/app/inventory': {
    title: 'Inventar',
    subtitle: 'Buduće stanje opreme i zaliha.',
  },
  '/app/payments': {
    title: 'Plaćanja',
    subtitle: 'Budući pregled plaćanja.',
  },
  '/app/analytics': {
    title: 'Analitika',
    subtitle: 'Budući poslovni uvidi.',
  },
  '/app/administration': {
    title: 'Administracija',
    subtitle: 'Buduća administracija sistema.',
  },
}
