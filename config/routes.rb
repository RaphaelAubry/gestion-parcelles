Rails.application.routes.draw do
  devise_for :users
  root to: "pages#home"

  resources :parcelles
  get '/carte', to: 'parcelles#carte', as: :carte

end
