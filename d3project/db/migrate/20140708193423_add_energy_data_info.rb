class AddEnergyDataInfo < ActiveRecord::Migration
  def change
    add_column :energy_data, :amount, :decimal
    add_column :energy_data, :year, :integer
  end
end
