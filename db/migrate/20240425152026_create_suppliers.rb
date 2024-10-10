class CreateSuppliers < ActiveRecord::Migration[7.0]
  def change
    create_table :suppliers do |t|
      t.string :name
      t.integer :phone
      t.string :email
      t.references :user

      t.timestamps
    end
  end
end
