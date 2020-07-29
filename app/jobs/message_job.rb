# frozen_string_literal: true

class MessageJob < ApplicationJob
  queue_as :default

  def perform(message_json)
    message = Message.new
    message.from_json(message_json)
    message.broadcast
  end
end
