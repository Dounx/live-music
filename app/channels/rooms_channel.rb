# frozen_string_literal: true

class RoomsChannel < ApplicationCable::Channel
  include RoomMessageUtils

  def subscribed
    @room = Room.find(params[:id])
    stream_for @room
    notice('已加入')
  end

  def unsubscribed
    notice('已退出')
  end

  def broadcast(data)
    return unless @room.user == current_user

    action = data['action']
    data.delete('action')

    create_rooms_message(action, data)
  end
end
