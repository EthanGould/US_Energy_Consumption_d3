class EnergyDataController < ApplicationController
  before_action :set_energy_datum, only: [:show, :edit, :update, :destroy]

  # GET /energy_data
  # GET /energy_data.json
  def index
    @api_response = EnergyDatum.response("AK")
    @return_data = @api_response["series"][0]["data"]
    @graph_years = data_years(@return_data)
  end

  def data_years(array)
    @years = Array.new
    array.each do |array|
      @years << array[0]
    end
    return @years
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_energy_datum
      @energy_datum = EnergyDatum.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def energy_datum_params
      params[:energy_datum]
    end
end
