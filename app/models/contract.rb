class Contract < ApplicationRecord
  INSTANCE_VARIABLES = %i[name start_date end_date holder type quantity unit]

  belongs_to :user
  has_many :parcelles, dependent: :nullify

  validates :name, presence: true

  def contract_kind
    self.class.name
  end

  def display_type
    I18n.t("contracts.types.#{type}")
  end

  def display_start_date
    start_date&.strftime("%d/%m/%Y")
  end

  def display_end_date
    end_date&.strftime("%d/%m/%Y")
  end

  def display_quantity
    case self.class.name
      when "MetayageContract"
        "#{quantity.round} %"
      when "FermageContract"
        "#{quantity.round}"
      else
        quantity.round
    end
  end
end