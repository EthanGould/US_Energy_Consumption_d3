class EnergyDataController < ApplicationController
  before_action :set_energy_datum, only: [:show, :edit, :update, :destroy]

  # GET /energy_data
  # GET /energy_data.json
  def index
    @energy_data = EnergyDatum.response("AK")
    @return_data = @energy_data["series"][0]["data"]
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
