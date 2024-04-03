module ParcellesHelper
  def sum_of_surfaces(parcelles)
    parcelles.pluck(:surface).compact.sum
  end
end
