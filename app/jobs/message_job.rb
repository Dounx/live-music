class MessageJob < ApplicationJob
  queue_as :default

  def perform(message)
    message.broadcast
  end
end
