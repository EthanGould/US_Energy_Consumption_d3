Rails.application.routes.draw do
  root to: "energy_data#index"
  get 'datachart', to: 'energy_data#show'
  post 'datachart', to: 'energy_data#show'
  resources :energy_data

end
