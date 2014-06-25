Rails.application.routes.draw do
  root to: "energy_data#index"
  resources :energy_data

end
