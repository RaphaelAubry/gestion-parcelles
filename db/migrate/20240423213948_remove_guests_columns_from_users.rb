class RemoveGuestsColumnsFromUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :guest_id
    remove_column :users, :owner_id
  end
end
