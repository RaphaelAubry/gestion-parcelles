class Invoice < ApplicationRecord
  INSTANCE_VARIABLES = %i[invoicer invoicee invoice_date year total_amount number contract_name]

  has_many :invoice_lines, inverse_of: :invoice, dependent: :nullify
  belongs_to :user

  accepts_nested_attributes_for :invoice_lines, allow_destroy: true, reject_if: :all_blank

  before_validation :calculate_total_amount
  after_create :update_invoice_lines_year

  validates :invoice_date, presence: true
  validate :must_have_at_least_one_line
  
  def must_have_at_least_one_line
    if invoice_lines.reject(&:marked_for_destruction?).empty?
      errors.add(:invoice_lines, "La facture doit contenir au moins une ligne")
    end
  end

  def calculate_total_amount
    self.total_amount = invoice_lines.reject(&:marked_for_destruction?)
                                     .sum { |line| line.amount.to_d }
  end

  def update_invoice_lines_year
    invoice_lines.update(year: year)
  end
end
