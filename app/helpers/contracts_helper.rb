module ContractsHelper
  def display_quantity(object)
    object&.quantity.present? ? object.quantity.round.to_s : "0"
  end
end