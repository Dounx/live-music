# frozen_string_literal: true

require 'sidekiq/web'
require 'admin_constraint'

Rails.application.routes.draw do
  resources :rooms
  resources :users
  resource :sessions

  mount Sidekiq::Web => '/sidekiq', :constraints => AdminConstraint.new

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'rooms#index'
end
