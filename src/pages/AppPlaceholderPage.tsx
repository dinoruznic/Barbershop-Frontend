import { useLocation } from 'react-router-dom'
import PlaceholderPage from '../components/common/PlaceholderPage'
import EmployeeDashboardPlaceholder from '../features/employee/EmployeeDashboardPlaceholder'
import OwnerDashboardPlaceholder from '../features/owner/OwnerDashboardPlaceholder'
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

const ownerPaths = new Set([
  '/app/employees',
  '/app/inventory',
  '/app/payments',
  '/app/analytics',
  '/app/administration',
])

const employeePaths = new Set([
  '/app/schedule',
  '/app/time-off',
  '/app/assigned-appointments',
])

function AppPlaceholderPage() {
  const location = useLocation()

  if (ownerPaths.has(location.pathname)) {
    return <OwnerDashboardPlaceholder />
  }

  if (employeePaths.has(location.pathname)) {
    return <EmployeeDashboardPlaceholder />
  }

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
