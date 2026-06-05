class AddInvoiceReferenceToInvoiceLines < ActiveRecord::Migration[7.0]
  def change
    add_reference :invoice_lines, :invoice, foreign_key: true
  end
end
