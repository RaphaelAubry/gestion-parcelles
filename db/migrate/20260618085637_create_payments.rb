class CreatePayments < ActiveRecord::Migration[7.0]
  def change
    create_table :payments do |t|
      t.date :payment_date
      t.decimal :amount, precision: 10, scale: 2
      t.references :invoice, foreign_key: true
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
