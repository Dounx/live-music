Rails.application.routes.draw do
  resources :rooms
  resources :users
  resource :sessions
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'rooms#index'
end
