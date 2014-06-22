class EnergyDatum < ActiveRecord::Base

  def self.response(state)
    api_key = ENV["API_KEY"]
    api_url = "http://api.eia.gov/series/?api_key=#{api_key}&series_id=ELEC.CONS_TOT.COW-#{state}-98.A"
    HTTParty.get(api_url)
  end
end
