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
end
