# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include SessionsHelper

  private

  def logged_in_user
    return if login?

    store_location
    flash[:error] = '请登录'
    redirect_to new_sessions_url
  end
end
