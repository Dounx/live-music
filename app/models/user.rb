# frozen_string_literal: true

class User < ApplicationRecord
  has_many :rooms, dependent: :destroy

  validates :name, allow_blank: false, uniqueness: true

  has_secure_password
  has_secure_password :remember, validations: false

  def self.new_token
    SecureRandom.base58(24)
  end

  def remember
    token = User.new_token
    update(remember: token) && token
  end

  def forget
    update(remember: nil)
  end

  def messages
    Message.where('to_class = ? AND to_id = ?', self.class.name, id)
  end
end
