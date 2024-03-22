class Parcelle < ApplicationRecord
  INSTANCE_VARIABLES = [:reference_cadastrale,
                        :lieu_dit,
                        :code_officiel_geographique,
                        :surface,
                        :annee_plantation,
                        :distance_rang,
                        :distance_pieds]

  after_create :request_api_carto

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

  def request_api_carto
    require 'net/http'

    begin
      uri = URI('https://apicarto.ign.fr/api/cadastre/parcelle')
      params = { code_insee: code_officiel_geographique, section: code_section, numero: numero_parcelle }
      uri.query = URI.encode_www_form(params)
      resultat = Net::HTTP.get_response(uri)
      if resultat.is_a?(Net::HTTPSuccess)
        update(distance_rang: 1)
      end
    rescue Exception => e
      p e.class
      p e.message
      print e.backtrace.join("\n")
    end
  end
end
