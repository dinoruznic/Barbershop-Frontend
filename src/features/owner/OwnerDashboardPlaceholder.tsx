import PlaceholderPage from '../../components/common/PlaceholderPage'

function OwnerDashboardPlaceholder() {
  return (
    <PlaceholderPage
      label="Budući administrativni prostor"
      title="Administrativni pregled"
      description="Ovaj prostor je pripremljen za budući administrativni tok bez aktiviranja dodatnih funkcionalnosti u trenutnom korisničkom iskustvu."
      items={['Analitika', 'Zaposlenici', 'Inventar', 'Plaćanja']}
    />
  )
}

export default OwnerDashboardPlaceholder
