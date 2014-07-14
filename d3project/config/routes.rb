Rails.application.routes.draw do
  resources :states, only: [:index, :show]
  resources :energy_data, only: [:index, :show]
  get 'states/pie_data/:state_abbreviation', to: 'states#pie_data'
  get 'states/all_state_data/state_data', to: 'states#all_state_data'
  get 'states/state_data/:state_abbreviation', to: 'states#state_data'
  get 'states/image_url/:state_abbreviation', to: 'states#image_url', as: :state_image
  root to: 'energy_data#show'
end
