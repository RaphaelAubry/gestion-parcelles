Rails.application.routes.draw do
  root to: "pages#home"

  devise_for :users
  resources :users
  resources :invitations, except: [:edit, :update]
  resources :parcelles
  get '/carte', to: 'parcelles#carte', as: :carte

  resources :tags
  resources :suppliers
  resources :supplier do
    resources :offers, only: [:new, :create]
  end

  resources :offers, except: [:new, :create]
end
