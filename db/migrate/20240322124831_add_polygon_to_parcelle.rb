class AddPolygonToParcelle < ActiveRecord::Migration[7.0]
  def change
    add_column :parcelles, :polygon, :st_polygon, geographic: true
  end
end
