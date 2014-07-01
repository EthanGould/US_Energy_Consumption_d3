class EnergyDataController < ApplicationController
  respond_to :json
  # GET /energy_data
  # GET /energy_data.json
  def index
    if params[:search]
      @return_data = EnergyDatum.response(params[:search])
    else
      @return_data = EnergyDatum.response("NY")
    end
    years_array = return_data["series"][0]["data"]
    d3_data = data_years(years_array)
    binding.pry
  end

  def data_years(array)
    array.map do |item|
      {year: item[0], amount: item[1]}
    end
  end

  private
    def
    # Never trust parameters from the scary internet, only allow the white list through.
    def energy_datum_params
      params.require(:energy_datum).permit(:search)
      binding.pry
    end
end
