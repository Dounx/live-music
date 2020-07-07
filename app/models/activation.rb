# frozen_string_literal: true

class Activation < ApplicationRecord
  has_secure_token

  def use
    return false if used?

    toggle!(:used)
  end
end
