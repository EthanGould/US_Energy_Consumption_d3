json.array!(@energy_data) do |energy_datum|
  json.extract! energy_datum, :id
  json.url energy_datum_url(energy_datum, format: :json)
end
