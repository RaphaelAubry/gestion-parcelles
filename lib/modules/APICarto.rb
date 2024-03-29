module APICarto
  require 'net/http'

  def self.request(params)
    begin
      uri = URI('https://apicarto.ign.fr/api/cadastre/parcelle')
      uri.query = URI.encode_www_form(params)
      resultat = Net::HTTP.get_response(uri)
      resultat.body if resultat.is_a?(Net::HTTPSuccess)
    rescue Exception => e
      Rails.logger.debug e.class
      Rails.logger.debug e.message
      Rails.logger.debug e.backtrace.join('\n')
      return nil
    end
  end

  def self.coordinates(type, geojson)
    begin
      response = JSON.parse(geojson)['features'][0]['geometry']['coordinates'][0][0]
      coordinates = response.map { |c| p c.join(' ') }.join(',')
      "#{type.to_s.upcase} ((#{coordinates}))"
    rescue Exception => e
      Rails.logger.debug e.class
      Rails.logger.debug e.message
      Rails.logger.debug e.backtrace.join('\n')
      return nil
    end
  end
end
