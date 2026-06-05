class CreateInvoiceLines < ActiveRecord::Migration[7.0]
  def change
    create_table :invoice_lines do |t|
      t.integer :year
      t.decimal :price, precision: 10, scale: 2
      t.decimal :quantity, precision: 10, scale: 2
      t.decimal :amount, precision: 10, scale: 2
      t.string :reference_cadastrale
      t.string :lieu_dit
      t.float :surface
      t.float :percentage
      t.string :contract_type
     
      t.timestamps
    end
  end
end
