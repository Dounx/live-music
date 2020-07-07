# frozen_string_literal: true

class SessionsController < ApplicationController
  def new; end

  def create
    @user = User.find_by(name: params[:session][:name])
    if @user&.authenticate(params[:session][:password])
      login @user
      params[:session][:remember_me] ? remember(@user) : forget(@user)
      redirect_to rooms_url
    else
      flash.now[:danger] = 'Wrong name or password'
      render 'new'
    end
  end

  def destroy
    logout if login?
    flash[:success] = 'Logout Successful'
    redirect_to root_url
  end
end
