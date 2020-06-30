class RoomsController < ApplicationController
  def show
    respond_to do |format|
      format.json { render json: Room.first }
      format.html { render :show }
    end
  end
end
