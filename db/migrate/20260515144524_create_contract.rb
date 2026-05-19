class CreateContract < ActiveRecord::Migration[7.0]
  def change
    create_table :contracts do |t|
      t.date :start_date
      t.date :end_date
      t.string :name
      t.string :holder
      t.string :type
      t.decimal :unit_price, precision: 10, scale: 2
      t.string :unit

      t.timestamps
    end

    add_index :contracts, :type
  end
end
