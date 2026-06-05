class CreateInvoices < ActiveRecord::Migration[7.0]
  def change
    create_table :invoices do |t|
      t.string :invoicee
      t.string :invoicer
      t.date :invoice_date
      t.integer :year
      t.decimal :total_amount, precision: 12, scale: 2
      t.string :number
      t.references :contract, foreign_key: true
      t.string :contract_type
      t.decimal :contract_quantity, precision: 10, scale: 2
      t.float :contract_percentage
      t.string :contract_name

      t.timestamps
    end
  end
end
