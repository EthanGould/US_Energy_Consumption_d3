class EnergyDatum < ActiveRecord::Base
  belongs_to :state

  def self.response(state)
    api_url = "http://api.eia.gov/series/?api_key=#{ENV["API_KEY"]}&series_id=ELEC.CONS_TOT.COW-#{self.state.abrev}-98.A"
    HTTParty.get(api_url)
  end

  def self.get_energy_type(state, source)
    api_url = "http://api.eia.gov/series/?api_key=#{ENV["API_KEY"]}&series_id=SEDS.#{source}.#{self.state.abrev}.A "
    HTTParty.get(api_url)
  end
end
