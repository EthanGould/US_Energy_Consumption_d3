class EnergyDataController < ApplicationController

  def index
    if params[:state]
      @energy_datum = EnergyDatum.joins(:state).where('states.abrev = ?', params[:state])
    else
      @energy_datum = EnergyDatum.all
    end

    respond_to do |format|
      format.html
      format.json { render json: @energy_datum }
    end
  end

  def show
  end

  private
    def energy_datum_params
      params.require(:energy_datum).permit(:state)
    end
end
