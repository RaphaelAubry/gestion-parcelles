class CreateTags < ActiveRecord::Migration[7.0]
  def change
    create_table :tags do |t|
      t.string :name
      t.text :description
      t.string :color
      t.references :user

      t.timestamps
    end
  end
end
