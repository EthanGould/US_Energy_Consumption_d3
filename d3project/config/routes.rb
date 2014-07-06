Rails.application.routes.draw do

  root to: 'energy_data#index'
  get '/show', to: 'energy_data#show'
  get '/energy_call', to: 'energy_data#energy_call'
  get '/json', to: 'energy_data#api_json'

end
