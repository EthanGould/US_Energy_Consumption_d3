class EnergyDataController < ApplicationController
  before_action :set_energy_datum, only: [:show, :edit, :update, :destroy]

  # GET /energy_data
  # GET /energy_data.json
  def index
    @energy_data = EnergyDatum.all
  end

  # GET /energy_data/1
  # GET /energy_data/1.json
  def show
  end

  # GET /energy_data/new
  def new
    @energy_datum = EnergyDatum.new
  end

  # GET /energy_data/1/edit
  def edit
  end

  # POST /energy_data
  # POST /energy_data.json
  def create
    @energy_datum = EnergyDatum.new(energy_datum_params)

    respond_to do |format|
      if @energy_datum.save
        format.html { redirect_to @energy_datum, notice: 'Energy datum was successfully created.' }
        format.json { render :show, status: :created, location: @energy_datum }
      else
        format.html { render :new }
        format.json { render json: @energy_datum.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /energy_data/1
  # PATCH/PUT /energy_data/1.json
  def update
    respond_to do |format|
      if @energy_datum.update(energy_datum_params)
        format.html { redirect_to @energy_datum, notice: 'Energy datum was successfully updated.' }
        format.json { render :show, status: :ok, location: @energy_datum }
      else
        format.html { render :edit }
        format.json { render json: @energy_datum.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /energy_data/1
  # DELETE /energy_data/1.json
  def destroy
    @energy_datum.destroy
    respond_to do |format|
      format.html { redirect_to energy_data_url, notice: 'Energy datum was successfully destroyed.' }
      format.json { head :no_content }
    end
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
