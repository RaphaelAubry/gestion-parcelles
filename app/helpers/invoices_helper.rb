module InvoicesHelper
  def form_surface(contract, object)
    case contract.type
    when 'MetayageContract' then 1
    when 'FermageContract' then object.surface
    else 1
    end
  end
end
