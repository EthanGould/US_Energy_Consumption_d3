class AddIndex < ActiveRecord::Migration
  def change
    add_index :energy_data, [:state_id, :year, :name], unique: true
  end
end
