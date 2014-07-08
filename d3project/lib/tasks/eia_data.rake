namespace :eia_data do
  desc "Imports EIA data for all states"
  task import_all_states: :environment do
    State.all.each do |state|
      state.request_and_save_energy_data
    end
  end
end
