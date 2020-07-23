# frozen_string_literal: true

class Room < ApplicationRecord
  belongs_to :user

  has_secure_token
end
