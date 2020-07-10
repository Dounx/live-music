class RoomsController < ApplicationController
  def show
    playlist_id = params[:id].to_i
    @room = current_user.rooms.find_or_create_by(playlist_id: playlist_id)
  end

  def index; end
end
