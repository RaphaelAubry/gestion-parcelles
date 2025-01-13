module RGeo
  module Geographic
    class SphericalMultiPolygonImpl
      def centroid
        require 'array.rb'
        begin
          average_x = map { |polygon| polygon.centroid.x }.average
          average_y = map { |polygon| polygon.centroid.y }.average
          [average_x, average_y]
        rescue Exception => e
          Rails.logger.debug e.class
          Rails.logger.debug e.message
          Rails.logger.debug e.backtrace.join('\n')
          return [nil, nil]
        end
      end
    end

    def self.coordinates(type, coordinates)
      "#{type.to_s.upcase} ((#{coordinates}))"
    end
  end
end
