# frozen_string_literal: true

class RoomsChannel < ApplicationCable::Channel
  def subscribed
    @room = Room.find(params[:id])
    stream_for @room
  end

  def unsubscribed; end

  def sync(data)
    return unless @room.user == current_user

    p data
    # create_rooms_message(data)
  end

  private

  def create_rooms_message(action, data)
    Message.build(
      action: action,
      channel: RoomsChannel,
      data: data,
      from: current_user,
      to: @room
    ).save
  end

  def notice(content)
    data = "#{current_user.name} #{content}"
    create_rooms_message('notice', data)
  end
end
