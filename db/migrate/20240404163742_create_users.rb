class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :name, default: ""
      t.string :surname, default: ""
      t.integer :phone
      t.string :email
      t.boolean :admin

      t.timestamps
    end
  end
end
