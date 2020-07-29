# frozen_string_literal: true

module RoomMessageUtils
  def create_rooms_message(action, data)
    Message.build(
      action: action,
      data: data,
      from: current_user,
      to: @room
    ).deliver
  end

  def notice(content)
    data = {
      type: 'notice',
      data: "#{current_user.name} #{content}"
    }
    create_rooms_message('broadcast', data)
  end
end