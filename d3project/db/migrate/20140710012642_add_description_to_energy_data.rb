class AddDescriptionToEnergyData < ActiveRecord::Migration
  def change
    add_column :energy_data, :description, :text
  end
end
