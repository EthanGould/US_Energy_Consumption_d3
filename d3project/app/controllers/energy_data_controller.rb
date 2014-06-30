class EnergyDataController < ApplicationController
  respond_to :json
  # GET /energy_data
  # GET /energy_data.json
  def index
    # binding.pry
    if params[:search].nil?
      api_response = EnergyDatum.response("AK")
    else
      api_response = EnergyDatum.response(params[:search])
    end
    return_data = api_response["series"][0]["data"]
    @years = data_years(return_data).reverse!
    render "json_index"
    # binding.pry
  end

  def show
    redirect_to action: 'index'
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
      params.require(:energy_datum).permit(:state)
      binding.pry
    end
end
