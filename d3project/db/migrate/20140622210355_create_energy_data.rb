class CreateEnergyData < ActiveRecord::Migration
  def change
    create_table :energy_data do |t|

      t.timestamps
    end
  end
end
