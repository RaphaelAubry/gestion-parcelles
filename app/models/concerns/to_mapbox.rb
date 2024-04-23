module ToMapbox
  extend ActiveSupport::Concern

  included do
    const_get('ActiveRecord_Relation').include(RelationMethods)

    def to_mapbox
      [to_hash]
    end
  end

  module RelationMethods
    def to_mapbox
      map do |parcelle|
        parcelle.to_hash
      end
    end
  end
end
