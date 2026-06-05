module InvoiceContractable
  extend ActiveSupport::Concern

  InvoiceContract = Data.define(:id, :name, :display_type, :quantity, :percentage) do
    def fermage?
      display_type == "Fermage"
    end

    def metayage?
      display_type == "Métayage"
    end
  end

  def build_invoice_contract(invoice)
    InvoiceContract.new(id: @invoice.contract_id.nil? ? "" : @invoice.contract_id,
                        name: @invoice.contract_name, 
                        display_type: @invoice.contract_type, 
                        quantity: @invoice.contract_quantity, 
                        percentage: @invoice.contract_percentage)
    
  end
end