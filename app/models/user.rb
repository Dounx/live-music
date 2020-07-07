# frozen_string_literal: true

class User < ApplicationRecord
  has_many :rooms, dependent: :destroy

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
end
