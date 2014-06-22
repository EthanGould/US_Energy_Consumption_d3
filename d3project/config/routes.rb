Rails.application.routes.draw do
  root 'energy_data#index'
  resources :energy_data

end
