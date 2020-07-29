class MessagesController < ApplicationController
  include RoomMessageUtils

  def create
    content = params[:content]
    notice(content)
  end
end
