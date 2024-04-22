# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_04_18_123009) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "postgis"

  create_table "parcelles", force: :cascade do |t|
    t.string "reference_cadastrale", default: ""
    t.string "lieu_dit", default: ""
    t.string "code_officiel_geographique", default: ""
    t.float "surface", default: 0.0
    t.integer "annee_plantation", default: 0
    t.integer "distance_rang", default: 0
    t.integer "distance_pieds", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.geography "polygon", limit: {:srid=>4326, :type=>"st_polygon", :geographic=>true}
    t.bigint "tag_id"
    t.index ["tag_id"], name: "index_parcelles_on_tag_id"
  end

  create_table "table_tags", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.string "color"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tags", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.string "color"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_tags_on_user_id"
  end

  create_table "user_parcelles", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "parcelle_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["parcelle_id"], name: "index_user_parcelles_on_parcelle_id"
    t.index ["user_id"], name: "index_user_parcelles_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "surname"
    t.string "phone"
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "owner_id"
    t.bigint "guest_id"
    t.text "table_preferences"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["guest_id"], name: "index_users_on_guest_id"
    t.index ["owner_id"], name: "index_users_on_owner_id"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "parcelles", "tags"
  add_foreign_key "users", "users", column: "guest_id"
  add_foreign_key "users", "users", column: "owner_id"
end
