Rails.application.routes.draw do
  resources :states, only: [:index, :show]
  resources :energy_data, only: [:index, :show]

  root to: 'energy_data#show'
end
