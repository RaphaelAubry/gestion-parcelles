class CreateTableTag < ActiveRecord::Migration[7.0]
  def change
    create_table :table_tags do |t|
      t.string :name
      t.text :description
      t.string :color

      t.timestamps
    end
  end
end
