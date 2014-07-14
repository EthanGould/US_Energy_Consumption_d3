pie_data={}
# @state.name, @state.energy_data.select(:amount, :year, :state_id, :series_id).order(:series_id).each do
EnergyDatum.select(:series_id).group(:series_id).pluck(:series_id).each do |series|
  json.set! series, pie_data[series] = EnergyDatum.select(:amount, :year).where(:series_id => series).where(:state_id => @state.id)
end

