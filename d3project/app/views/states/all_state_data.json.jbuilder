@states.each do |state|
  most_recent = {}
  EnergyDatum.select(:series_id).group(:series_id).pluck(:series_id).each do |id|
    most_recent[id] = state.energy_data.select{|data| data.series_id == id}.first.amount
  end

  json.set! state.name, most_recent
end
