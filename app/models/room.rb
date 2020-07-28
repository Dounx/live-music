# frozen_string_literal: true

class Room < ApplicationRecord
  belongs_to :user

  has_secure_token

  def messages
    Message.where('to_class = ? AND to_id = ?', self.class.name, id)
  end
end
