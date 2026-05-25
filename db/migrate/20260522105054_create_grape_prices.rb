class CreateGrapePrices < ActiveRecord::Migration[7.0]
  def change
    create_table :grape_prices do |t|
      t.string :source
      t.integer :year
      t.string :area
      t.string :unit
      t.string :town
      t.string :grape_type
      t.decimal :price, precision: 10, scale: 2

      t.timestamps
    end
  end
end
