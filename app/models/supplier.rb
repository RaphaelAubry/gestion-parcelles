class Supplier < ApplicationRecord
  belongs_to :user
  has_many :offers, dependent: :destroy

  INSTANCE_VARIABLES = %i[name phone email]
end
