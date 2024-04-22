class AddTagReferenceToParcelle < ActiveRecord::Migration[7.0]
  def change
    add_reference :parcelles, :tag, foreign_key: true
  end
end
