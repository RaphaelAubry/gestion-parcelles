class AddTownToParcelle < ActiveRecord::Migration[7.0]
  def change
    add_column :parcelles, :town, :string
  end
end
