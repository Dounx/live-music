# frozen_string_literal: true

class SessionsController < ApplicationController
  def new; end

  def create
    @user = User.find_by(name: params[:session][:name])
    if @user&.authenticate(params[:session][:password])
      login @user
      params[:session][:remember_me] ? remember(@user) : forget(@user)
      flash[:success] = '登陆成功'
      redirect_to rooms_url
    else
      flash.now[:error] = '用户名或密码错误'
      render 'new'
    end
  end

  def destroy
    logout if login?
    redirect_to root_url
  end
end
