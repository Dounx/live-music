# frozen_string_literal: true

module ApplicationCable
  class Channel < ActionCable::Channel::Base
    # Rename user to current_user
    def current_user
      user
    end
  end
end
