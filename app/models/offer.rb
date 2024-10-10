class Offer < ApplicationRecord
  belongs_to :supplier

  INSTANCE_VARIABLES = %i[name price unit supplier_id]
end
