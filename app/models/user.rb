# frozen_string_literal: true

class User < ApplicationRecord
  has_many :rooms, dependent: :destroy
  has_secure_password
  has_secure_password :remember, validations: false
end
