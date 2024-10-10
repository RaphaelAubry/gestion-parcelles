class CreateOffers < ActiveRecord::Migration[7.0]
  def change
    create_table :offers do |t|
      t.string :name
      t.float :price
      t.string :unit
      t.references :supplier

      t.timestamps
    end
  end
end
