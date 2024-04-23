class CreateInvitations < ActiveRecord::Migration[7.0]
  def change
    create_table :invitations do |t|
      t.integer :guest_id
      t.integer :owner_id

      t.timestamps
    end
  end
end
