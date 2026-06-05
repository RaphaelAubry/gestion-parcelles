class FermageContract < Contract
  def fixed_rent?
    true
  end

  def initial_percentage
    100
  end

  def initial_quantity
    quantity
  end
end