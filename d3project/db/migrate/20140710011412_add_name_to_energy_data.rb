class AddNameToEnergyData < ActiveRecord::Migration
  def change
    add_column :energy_data, :name, :string
  end
end
