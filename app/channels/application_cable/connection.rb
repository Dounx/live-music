# frozen_string_literal: true

module ApplicationCable
  class Connection < ActionCable::Connection::Base
    include SessionsHelper

    identified_by :user

    def connect
      self.user = find_verified_user
      logger.add_tags 'ActionCable', user.name
    end

    private

    def find_verified_user
      if (verified_user = current_user)
        verified_user
      else
        reject_unauthorized_connection
      end
    end

    def session
      @request.session
    end
  end
end
