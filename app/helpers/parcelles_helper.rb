module ParcellesHelper
  def sum_of_surfaces(parcelles)
    parcelles.pluck(:surface).sum
  end
end
