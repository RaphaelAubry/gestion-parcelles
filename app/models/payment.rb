class Payment < ApplicationRecord
  belongs_to :user
  belongs_to :invoice

  validates :payment_date, presence: true
  validates :user, presence: true
  validates :amount, presence: true
end
