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
  has_many :invitations, foreign_key: :owner_id, dependent: :destroy
  has_many :invitations, foreign_key: :guest_id, dependent: :destroy

  has_many :invitations_to_guest, foreign_key: :owner_id, class_name: 'Invitation', dependent: :destroy
  has_many :guests, through: :invitations_to_guest, source: :guest
  has_many :invitations_from_owner, foreign_key: :guest_id, class_name: 'Invitation', dependent: :destroy
  has_many :owners, through: :invitations_from_owner, source: :owner

  has_many :tags, dependent: :destroy
  has_many :suppliers, dependent: :destroy
  has_many :offers, through: :suppliers
  has_many :comments, dependent: :destroy
  has_one_attached :avatar, dependent: :destroy

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
