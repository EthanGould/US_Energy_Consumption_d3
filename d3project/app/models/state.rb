class State < ActiveRecord::Base
  has_many :energy_data
  def request_energy_data
    # SEDS.HYTXB.AL.A - hydro electricity,
    # SEDS.WYTXB.AL.A - wind energy
    # SEDS.GETXB.AL.A - geothermal
    # SEDS.CLTXB.AL.A - coal
    # SEDS.SOTXB.AL.A - solar
    # SEDS.PATXB.AL.A - petroleum
    types = ["HY", "WY", "GE", "CL", "SO", "PA"]

    types.each do |type|
      tmp_series_id = "SEDS.#{type}TXB.#{self.abrev}.A"
      api_request_url = "http://api.eia.gov/series/?api_key=#{ENV["API_KEY"]}&series_id=#{tmp_series_id}"
      api_results = HTTParty.get(api_request_url)
      puts self.name
      puts api_results
      puts " "
      if api_results['data']
        puts "Invalid Series ID. Why?"
      else
        api_results["series"].each do |data_set|
          data_set["data"].each do |pair|
            EnergyDatum.create!(series_id: type, name: data_set["name"], description: data_set["description"], state_id: self.id, year: pair[0], amount: pair[1])
          end
        end
      end
    end
  end

  # This will attempt to save energy data
  # Does not overwrite old data
  # In either case, it will return a set of energy data for the state
  def request_and_save_energy_data
    energy_by_year = self.request_energy_data
    energy_by_year.each do |data_point|
      begin
      self.energy_data.create(year: data_point[0], amount: data_point[1])
      rescue ActiveRecord::RecordNotUnique
        puts "Energy data already saved for #{self.abrev} in #{data_point[0]} "
      end
    end
    self.energy_data
  end

  # STATES = ['Select a state','AL','AK','AZ', 'AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']
end
