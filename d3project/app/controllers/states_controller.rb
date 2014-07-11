class StatesController < ApplicationController
  def index
    @states = State.all
    respond_to do |format|
      format.html
      format.json { render json: @states }
    end
  end

  def show
    @state = State.find(params[:id])
    respond_to do |format|
      format.html
      format.json { render json: @state }
    end
  end

  def image_url
    @state = State.where(abrev: params[:state_abbreviation].upcase).first
  end

  def state_data
    @state = State.where(abrev: params[:state_abbreviation].upcase).first
  end

  def all_state_data
    @states = State.all
  end
end
