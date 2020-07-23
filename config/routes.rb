# frozen_string_literal: true

require 'sidekiq/web'
require 'admin_constraint'

Rails.application.routes.draw do
  resources :rooms, except: %i[edit update destroy] do
    get 'join', on: :collection
  end

  resources :users
  resource :sessions, only: %i[new create destroy]

  mount Sidekiq::Web => '/sidekiq', :constraints => AdminConstraint.new

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'rooms#index'
end
