Rails.application.routes.draw do

  root to: 'energy_data#index'
  get '/show', to: 'energy_data#show'
  get 'angular/index'
  get '/json', to: 'energy_data#api_json'

end
