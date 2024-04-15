class AddGuestsToUsers < ActiveRecord::Migration[7.0]
  def change
    add_reference :users, :owner, foreign_key: { to_table: :users }
    add_reference :users, :guest, foreign_key: { to_table: :users }
  end
end
