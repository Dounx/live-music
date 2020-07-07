# frozen_string_literal: true

class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    token = params[:activation][:token]
    activation = Activation.find_by(token: token)

    if activation&.use
      flash[:success] = 'Register Successful'
      redirect_to new_sessions_url
    else
      flash[:warn] = 'Wrong Activation Code'
      render 'new'
    end
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      flash[:success] = 'User Info Updated'
    else
      render 'edit'
    end
  end

  def index
    @users = User.where(admin: false)
  end

  def destroy
    User.find(params[:id]).destroy
    flash[:success] = 'User Has Been Deleted'
    redirect_to users_url
  end

  private

  def user_params
    params.require(:user).permit(:name, :password, :password_confirmation)
  end
end
