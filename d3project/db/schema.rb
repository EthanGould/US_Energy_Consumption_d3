# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140710025352) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "energy_data", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.decimal  "amount"
    t.integer  "year"
    t.integer  "state_id"
    t.string   "name"
    t.text     "description"
    t.string   "series_id"
  end

  add_index "energy_data", ["state_id", "year", "series_id"], name: "index_energy_data_on_state_id_and_year_and_series_id", unique: true, using: :btree
  add_index "energy_data", ["state_id"], name: "index_energy_data_on_state_id", using: :btree

  create_table "states", force: true do |t|
    t.string "name"
    t.string "abrev"
    t.text   "url"
  end

end
