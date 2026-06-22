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

  resources :contracts
  post '/contracts/table', to: 'contracts#table'
  delete '/contracts/:id/parcelle/:parcelle_id', to: 'contracts#destroy_associated_parcelle', as: :destroy_contract_associated_parcelle

  namespace :admin do 
    resources :grape_prices do
      collection do
        post :import
        post :table
      end
    end
  end

  namespace :finances do
    resources :invoices
    post '/invoices/table', to: 'invoices#table'

    resources :payments
    post '/payments/table', to: 'payments#table'


    get '/reports', to: 'reports#index'
    get '/reports/invoices', to: 'reports#invoices'
    post '/reports/invoices_table', to: 'reports#invoices_table'
  end

  
end
