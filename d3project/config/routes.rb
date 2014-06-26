Rails.application.routes.draw do
  root to: "energy_data#index"
  get 'd3/data', to: 'energy_data#show'
  resources :energy_data

end
