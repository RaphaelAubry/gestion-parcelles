class Parcelle < ApplicationRecord
  include FilterModelConcern
  include ToMapbox

  INSTANCE_VARIABLES = %i[reference_cadastrale
                          lieu_dit
                          code_officiel_geographique
                          surface
                          annee_plantation
                          distance_rang
                          distance_pieds
                          polygon
                          tag_id
                         ]

  Factory = RGeo::Geographic.spherical_factory(srid: 4326)

  has_many :user_parcelles
  has_many :users, through: :user_parcelles
  belongs_to :tag, optional: true
  after_create :update_polygon_coordinates
  attribute :polygon, :st_polygon, srid: 4326, geographic: true
  before_update :default!
  before_create :default!

  scope :access_shared_between, ->(users) { joins(:user_parcelles).where(user_parcelles: { user: users }) }
  scope :tags, ->() { Tag.joins(:parcelles).where(parcelles: self) }

  validates :reference_cadastrale, presence: { message: 'doit être renseigné' }
  validates :code_officiel_geographique, presence: { message: 'doit être renseigné' }

  def code_section
    # résultat à 2 caractères
    result = reference_cadastrale.scan(/\D/).join.upcase
    prepend_zero(result, 2)
  end

  def numero_parcelle
    # résultat à 4 caractères
    result = reference_cadastrale.scan(/\d/).join
    prepend_zero(result, 4)
  end


  def to_hash
    { attributes: {
        reference_cadastrale: reference_cadastrale,
        surface: surface
        },
      coordinates: polygon.present? ? polygon.coordinates : nil,
      tag_color: tag.present? ? tag.color : nil
    }
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
    begin
      data = Factory.parse_wkt(polygon)
      update(polygon: data)
    rescue Exception => e
      Rails.logger.debug e.class
      Rails.logger.debug e.message
      Rails.logger.debug e.backtrace.join("\n")
    end
  end

  def default!
    self.surface = 0 if self.surface.nil?
    self.annee_plantation = nil if self.annee_plantation.nil?
    self.distance_rang = 100 if self.distance_rang.nil?
    self.distance_pieds = 110 if self.distance_pieds.nil?
  end
end
