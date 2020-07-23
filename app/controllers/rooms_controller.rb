# frozen_string_literal: true

class RoomsController < ApplicationController
  before_action :logged_in_user

  def show
    @room = current_user.rooms.find(params[:id])
  end

  def new
    @room = Room.new
  end

  def create
    room = current_user.rooms.find_or_initialize_by(room_params)

    if room.save
      flash[:success] = '房间已创建！'
      redirect_to room
    else
      render 'new'
    end
  end

  def index; end

  def join
    @room = Room.find_by(token: params[:token])

    render 'show' if @room
  end

  private

  def room_params
    params.require(:room).permit(:playlist_id)
  end
end
