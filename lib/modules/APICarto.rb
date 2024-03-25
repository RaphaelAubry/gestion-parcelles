module APICarto
  require 'net/http'

  def self.request(params)
    begin
      uri = URI('https://apicarto.ign.fr/api/cadastre/parcelle')
      uri.query = URI.encode_www_form(params)
      resultat = Net::HTTP.get_response(uri)
      resultat.body if resultat.is_a?(Net::HTTPSuccess)
    rescue Exception => e
      p e.class
      p e.message
      print e.backtrace.join("\n")
    end
  end

  def self.coordinates(geojson)
    response = JSON.parse(geojson)['features'][0]['geometry']['coordinates'][0][0]
    coordinates = response.map { |c| p c.join(' ') }.join(',')
    "POLYGON ((#{coordinates}))"
  end
end
