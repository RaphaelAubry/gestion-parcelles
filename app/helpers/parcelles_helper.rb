module ParcellesHelper
  def sum_of_surfaces(parcelles)
    parcelles.pluck(:surface).compact.sum
  end

  def display_contract(parcelle)
    parcelle.contract.nil? ? "Sans contrat" : (link_to parcelle.contract.name, contract_path(parcelle.contract))
  end
end
