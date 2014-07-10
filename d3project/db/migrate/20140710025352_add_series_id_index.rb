class AddSeriesIdIndex < ActiveRecord::Migration
  def change
    add_index :energy_data, [:state_id, :year, :series_id], unique: true
  end
end
