class EnergyDataController < ApplicationController

  def index
  end

  def show
    @search_state = ((State.find_by abrev:(params[:state].upcase)) || (State.find_by name:(params[:state].upcase))) || (State.last)
    @state = params[:state]
    source = params[:source]
    binding.pry
  end

  private
    def energy_datum_params
      params.require(:energy_datum).permit(:state)
    end
end
