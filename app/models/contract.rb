class Contract < ApplicationRecord
  INSTANCE_VARIABLES = %i[name start_date end_date holder type unit_price unit]

  validates :name, presence: true

  belongs_to :user

  def contract_kind
    self.class.name
  end
end