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
    temp = State.where(abrev: params[:state_abbreviation])
    if temp.size == 1
      @state = temp.first
    else
      flash[:error] = "Could not find state"
      redirect_to state_path
    end
  end
end
