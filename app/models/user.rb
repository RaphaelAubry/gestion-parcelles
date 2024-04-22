class User < ApplicationRecord
  include FilterModelConcern

  Guest_INSTANCE_VARIABLES = [:email]

  before_destroy :remove_associations

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :user_parcelles
  has_many :parcelles, through: :user_parcelles
  has_many :guests, class_name: "User", foreign_key: "owner_id"
  has_many :owners, class_name: "User", foreign_key: "guest_id"
  has_many :tags, dependent: :destroy

  store :table_preferences, accessors: Parcelle::INSTANCE_VARIABLES, prefix: :parcelles

  def owns_parcelle?(parcelle)
    parcelles.include?(parcelle)
  end

  def self.table_preferences_attributes
    Parcelle::INSTANCE_VARIABLES.map { |a| a.to_s.prepend('parcelles_').to_sym }
  end

  private

  def remove_associations
    associations = [:guests, :owners]
    associations.each { |a| self.send(a).clear }
  end
end
