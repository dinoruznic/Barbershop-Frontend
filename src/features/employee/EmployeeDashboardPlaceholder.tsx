import PlaceholderPage from '../../components/common/PlaceholderPage'

function EmployeeDashboardPlaceholder() {
  return (
    <PlaceholderPage
      label="Budući prostor za frizere"
      title="Pregled rada"
      description="Ovaj prostor je pripremljen za budući tok rada frizera, uključujući raspored, odsustva i dodijeljene termine."
      items={['Raspored', 'Odsustva', 'Dodijeljeni termini']}
    />
  )
}

export default EmployeeDashboardPlaceholder
