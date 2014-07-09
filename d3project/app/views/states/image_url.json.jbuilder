if @state.present?
  json.state_name @state.name
  json.state_abbreviation @state.abrev
  json.image_url @state.url
else
  json.error "State not found."
end
