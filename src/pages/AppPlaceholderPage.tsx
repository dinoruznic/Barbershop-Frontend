import { useLocation } from 'react-router-dom'
import PlaceholderPage from '../components/common/PlaceholderPage'
import { pageMetadata } from '../routes/appNavigation'

const clientPlaceholderItems: Record<string, string[]> = {
  '/app/my-appointments': [
    'Nadolazeći termini',
    'Historija termina',
    'Status rezervacije',
  ],
  '/app/services': ['Kategorije', 'Cijene', 'Trajanje usluge'],
  '/app/favorite-services': ['Sačuvane usluge', 'Brzo zakazivanje'],
  '/app/reviews': ['Moje recenzije', 'Ocjene salona'],
  '/app/notifications': ['Podsjetnici', 'Potvrde termina', 'Sistemske poruke'],
  '/app/profile': ['Lični podaci', 'Kontakt', 'Sigurnost naloga'],
}

function AppPlaceholderPage() {
  const location = useLocation()

  const metadata =
    pageMetadata[location.pathname] ?? pageMetadata['/app/dashboard']

  return (
    <PlaceholderPage
      label="Moj prostor"
      title={metadata.title}
      description={`${metadata.subtitle} Ovaj modul je spreman za povezivanje sa backend funkcionalnostima kada bude definisan tačan UI tok.`}
      items={clientPlaceholderItems[location.pathname]}
    />
  )
}

export default AppPlaceholderPage
