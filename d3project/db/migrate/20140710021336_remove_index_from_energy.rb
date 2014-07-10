class RemoveIndexFromEnergy < ActiveRecord::Migration
  def change
    remove_index :energy_data, name: "index_energy_data_on_state_id_and_year"
  end
end
