class EnergyDatum < ActiveRecord::Base
  belongs_to :state

  @api_key = ENV["API_KEY"]

  # def self.response(state)
  #   api_url = "http://api.eia.gov/series/?api_key=#{@api_key}&series_id=ELEC.CONS_TOT.COW-#{state}-98.A"
  #   HTTParty.get(api_url)
  # end

  def self.get_energy_type(state, source)
    api_url = "http://api.eia.gov/series/?api_key=#{@api_key}&series_id=SEDS.#{source}.#{state}.A "
    HTTParty.get(api_url)
  end
end
