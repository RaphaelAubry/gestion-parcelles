class User < ApplicationRecord
  include FilterModelConcern

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :user_parcelles
  has_many :parcelles, through: :user_parcelles
  has_many :guests, class_name: "User", foreign_key: "owner_id"
  has_many :owners, class_name: "User", foreign_key: "guest_id"

  Guest_INSTANCE_VARIABLES = [:email]

  def owns_parcelle?(parcelle)
    parcelles.include?(parcelle)
  end
end
