class MetayageContract < Contract
  def revenue_sharing?
    true
  end

  def initial_percentage
    quantity
  end

  def initial_quantity
    0
  end
end