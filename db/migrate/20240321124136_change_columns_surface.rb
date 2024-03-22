class ChangeColumnsSurface < ActiveRecord::Migration[7.0]
  def change
    change_column :parcelles, :surface, :float
  end
end
