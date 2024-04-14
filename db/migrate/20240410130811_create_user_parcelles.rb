class CreateUserParcelles < ActiveRecord::Migration[7.0]
  def change
    create_table :user_parcelles do |t|
      t.references :user
      t.references :parcelle

      t.timestamps
    end
  end
end
