class Parcelle < ApplicationRecord

  INSTANCE_VARIABLES = [:reference_cadastrale,
                        :lieu_dit,
                        :code_officiel_geographique,
                        :surface,
                        :annee_plantation,
                        :distance_rang,
                        :distance_pieds,
                        :polygon]

  after_create :update_polygon_coordinates
  attribute :polygon, :st_polygon, srid: 4326, geographic: true

  def code_section
    # résultat à 2 caractères
    result = reference_cadastrale.scan(/\D/).join
    prepend_zero(result, 2)
  end

  def numero_parcelle
    # résultat à 4 caractères
    result = reference_cadastrale.scan(/\d/).join
    prepend_zero(result, 4)
  end

  private

  def prepend_zero(string, length)
    until string.chars.length == length do
      string.prepend "0"
    end
    string
  end

  def update_polygon_coordinates
    geojson = APICarto.request({ code_insee: code_officiel_geographique, section: code_section, numero: numero_parcelle })
    polygon = APICarto.coordinates(:polygon, geojson)
    data = RGeo::Geographic.spherical_factory(srid: 4326).parse_wkt(polygon)
    update(polygon: data)
  end
end
