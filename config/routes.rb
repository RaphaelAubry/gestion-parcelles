Rails.application.routes.draw do
  root "pages#home"

  resources :parcelles

  get '/carte', to: 'parcelles#carte', as: :carte
end
