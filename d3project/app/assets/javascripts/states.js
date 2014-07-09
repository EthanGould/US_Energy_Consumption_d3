// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).ready(function(){
  $('#state').change(App.callAPI);
});

var App = App || {};

App.callAPI = function(){
    var state_abrv = $(this).children(':selected').val();
    $.get( "states/image_url/" + state_abrv, function( data ) {
      console.log(data.state_abbreviation);

      $("#state-image").attr("src", data.image_url);
      $(".chart-title").text("Metric tons of coal used in " + data.state_name);
    });

    $.get("states/state_data/" + state_abrv, function(data){
      dataArray = data.energy_data;
      d3Data = App.arrayToHash(dataArray);
      console.log(d3Data);
    });
};
App.arrayToHash = function(array){
    var returnHash = {};
    array.forEach(function(array){ returnHash[array.year] = array.amount; });
    return returnHash;
};
