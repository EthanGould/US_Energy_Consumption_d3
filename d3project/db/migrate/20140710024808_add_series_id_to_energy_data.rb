class AddSeriesIdToEnergyData < ActiveRecord::Migration
  def change
    add_column :energy_data, :series_id, :string
  end
end
