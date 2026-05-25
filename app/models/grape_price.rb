class GrapePrice < ApplicationRecord
  HEADERS = %w(source year area unit town grape_type price).freeze

  validates :year, uniqueness: {
    scope: [:town, :price]
  }

  def self.policy_class
    Admin::GrapePricePolicy
  end
end
