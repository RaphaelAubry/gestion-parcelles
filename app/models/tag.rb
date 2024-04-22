class Tag < ApplicationRecord
  include FilterModelConcern

  belongs_to :user
  has_many :parcelles, dependent: :nullify

  validates :name, uniqueness: { scope: :user, message: 'Nom déjà utilisé' }

  scope :parcelles_from_batch, ->(parcelles) { joins(:parcelles).where(parcelles: parcelles ) }
end
