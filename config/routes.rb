Rails.application.routes.draw do
  root to: "pages#home"

  devise_for :users
  resources :users
  resources :invitations, except: [:edit, :update]
  post '/invitations/table', to: 'invitations#table'

  resources :parcelles
  resources :parcelle do
    resources :comments, only: [:new, :create]
  end
  post '/parcelles/table', to: 'parcelles#table'
  get '/carte', to: 'parcelles#carte', as: :carte

  resources :comments, except: [:new, :create]

  resources :tags
  post '/tags/table', to: 'tags#table'

  resources :suppliers
  resources :supplier do
    resources :offers, only: [:new, :create]
  end
  post '/suppliers/table', to: 'suppliers#table'

  resources :offers, except: [:new, :create]
  post '/offers/table', to: 'offers#table'

  get '/mapbox_token', to: 'maps#token', as: :mapbox_token
end
