json.state_abrev  @state.abrev
json.state_name   @state.name
json.energy_data do
  all_data = {}
  EnergyDatum.select(:series_id).group(:series_id).pluck(:series_id).each do |series|
    all_data[series] = EnergyDatum.where(:series_id => series).where(:state_id => @state.id)
    json.set! series, all_data[series].reverse
  end
end
