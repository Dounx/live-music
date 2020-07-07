class RoomsController < ApplicationController
  def show
    @room = Room.find(params[:id])
  end

  def index
    @rooms = current_user.rooms
  end
end
