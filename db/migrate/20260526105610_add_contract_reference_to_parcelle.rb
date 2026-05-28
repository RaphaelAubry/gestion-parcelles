class AddContractReferenceToParcelle < ActiveRecord::Migration[7.0]
  def change
    add_reference :parcelles, :contract, foreign_key: true
  end
end
