# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :logged_in_user, except: %i[new create]

  def show
    @user = current_user
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    token = params[:activation][:token]
    activation = Activation.find_by(token: token)

    if activation&.use && @user.save
      flash[:success] = '注册成功'
      redirect_to new_sessions_url
    else
      flash[:error] = '激活码错误'
      render 'new'
    end
  end

  def edit
    @user = current_user
  end

  def update
    @user = current_user
    if @user.update(user_params)
      flash[:success] = '更新成功'
      redirect_to rooms_path
    else
      render 'edit'
    end
  end

  def destroy
    current_user.destroy
    flash[:success] = '删除成功'
    redirect_to users_url
  end

  private

  def user_params
    params.require(:user).permit(:name, :password, :password_confirmation)
  end
end
