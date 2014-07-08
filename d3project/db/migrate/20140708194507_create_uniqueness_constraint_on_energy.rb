class CreateUniquenessConstraintOnEnergy < ActiveRecord::Migration
  def change
    add_index :energy_data, [:state_id, :year], unique: true
  end
end
