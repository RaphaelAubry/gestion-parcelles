Rails.application.routes.draw do
  root to: "pages#home"

  devise_for :users
  resources :users

  get 'guests/edit', to: 'guests#edit_guests', as: :edit_guests
  patch 'guests', to: 'guests#update_guests', as: :update_guests
  get 'guests/index', to: 'guests#index', as: :guests
  get 'guests/edit/:guest_id', to: 'guests#edit_guest', as: :edit_guest
  delete 'guests/:guest_id', to: 'guests#destroy', as: :guest

  resources :parcelles
  get '/carte', to: 'parcelles#carte', as: :carte

  resources :tags
end
