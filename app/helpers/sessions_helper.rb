# frozen_string_literal: true

module SessionsHelper
  def login(user)
    session[:user_id] = user.id
  end

  def logout
    forget(current_user)
    session.delete(:user_id)
    @current_user = nil
  end

  def remember(user)
    token = user.remember
    return unless token

    cookies.permanent.signed[:user_id] = user.id
    cookies.permanent[:remember] = token
  end

  def forget(user)
    user.forget
    cookies.delete(:user_id)
    cookies.delete(:remember)
  end

  def current_user
    if (user_id = session[:user_id])
      @current_user ||= User.find_by(id: user_id)
    elsif (user_id = cookies.signed[:user_id])
      user = User.find_by(id: user_id)
      if user&.authenticate_remember(cookies[:remember])
        login(user)
        @current_user = user
      end
    end
  end

  def login?
    !current_user.nil?
  end

  def current_user?(user)
    user == current_user
  end

  def redirect_back_or(default)
    redirect_to(session[:forwarding_url] || default)
    session.delete(:forwarding_url)
  end

  def store_location
    session[:forwarding_url] = request.original_url if request.get?
  end
end
