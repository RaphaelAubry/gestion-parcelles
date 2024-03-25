class CreateParcelles < ActiveRecord::Migration[7.0]
  def change
    create_table :parcelles do |t|
      t.string :reference_cadastrale, default: ""
      t.string :lieu_dit, default: ""
      t.string :code_officiel_geographique, default: ""
      t.integer :surface, default: 0
      t.integer :annee_plantation, default: 0
      t.integer :distance_rang, default: 0
      t.integer :distance_pieds, default: 0

      t.timestamps
    end
  end
end
