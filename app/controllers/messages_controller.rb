class MessagesController < ApplicationController
  include RoomMessage

  def create
    content = params[:content]
    notice(content)
  end
end
