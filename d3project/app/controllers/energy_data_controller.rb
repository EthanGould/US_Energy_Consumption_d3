class EnergyDataController < ApplicationController
  # respond_to :json
  # GET /energy_data
  # GET /energy_data.json
  def index
    if params[:search].present?
      @state = (State.find_by abrev:(params[:search].upcase)) || (State.find_by name:(params[:search].upcase))
    else
      @state = State.first
    end
    @@search = @state.abrev
  end


  def show
    if @@search
      return_data = EnergyDatum.response(@@search)
    end
    years_array = return_data["series"][0]["data"].reverse!
    data = data_to_hash(years_array)
    render json: data
  end

  def energy_call
    call = EnergyDatum.get_energy_type("AK", "NGPZB")
    energy_array = call["series"][0]["data"][0..11]
    data = data_to_hash(energy_array)
    render json: data
  end

  def data_to_hash(array)
    array.map { |item| {year: item[0], amount: item[1]} }
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def energy_datum_params
      params.require(:energy_datum).permit(:search)
    end
end
