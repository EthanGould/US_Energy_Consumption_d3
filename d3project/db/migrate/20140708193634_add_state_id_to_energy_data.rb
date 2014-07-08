class AddStateIdToEnergyData < ActiveRecord::Migration
  def change
    add_reference :energy_data, :state, index: true
  end
end
