Rails.application.routes.draw do
  resources :states, only: [:index, :show]
  resources :energy_data, only: [:index, :show]
  get 'states/image_url/:state_abbreviation', to: 'states#image_url', as: :state_image
  root to: 'energy_data#show', defaults: {state: "CALIFORNIA", source: 'CATWG'}
end
