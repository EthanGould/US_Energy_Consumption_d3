class EnergyDataController < ApplicationController

  # GET /energy_data
  # GET /energy_data.json
  def index
    if params[:state].nil?
      @api_response = EnergyDatum.response("AK")
    else
      @api_response = EnergyDatum.response(params[:state][:state])
    end
    @return_data = @api_response["series"][0]["data"]
    @graph_years = data_years(@return_data)
  end

  def data_years(array)
    @years = Array.new
    array.each do |array|
      @years << array[0].to_i
    end
    return @years
    # @years = Hash.new
    # array.each do |year, number|
    #   @years[year] = number
    # end
    # return @years
  end

  private
    def
    # Never trust parameters from the scary internet, only allow the white list through.
    def energy_datum_params
      params.require(:energy_datum).permit(:state)
    end
end
