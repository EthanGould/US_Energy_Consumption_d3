// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).ready(function(){
  $('#state').change(App.callAPI);
  $(".filter-button").click(App.filterResults);
});

var App = App || {};

App.callAPI = function(){
    var state_abrv = $(this).children(':selected').val();
    $("#current-state").val(state_abrv);
    $.get( "states/image_url/" + state_abrv, function( data ) {
      console.log(data.state_abbreviation);
      $("#state-image").attr("src", data.image_url);
      // $(".chart-title").text("Metric tons of energy from  used in " + data.state_name);
    });
};

App.filterResults = function(){
  var state_abrv = $("#current-state").val();
  var tmp_filter = this.id;
  $.get("states/state_data/" + state_abrv, function(data){
      var dataArray = data.energy_data[tmp_filter];
      var dataSpread = App.getMaxNumber(dataArray);
      App.makeChart(dataSpread);
    });

};

App.getMaxNumber = function(energyData){
  var min = Number.POSITIVE_INFINITY;
  var max = Number.NEGATIVE_INFINITY;
  var tmp;
  for (var i=energyData.length-1; i>=0; i--) {
    tmp = energyData[i].amount;
      if (tmp < min) min = tmp;
      if (tmp > max) max = tmp;
  }
  console.log(max, min);
  return [max, min, energyData];
};

App.makeChart = function(energyData){

  $('.chart-title').text(energyData[2][0].name); //make div alert for not enough data if max < than X
  $('.bar-chart').empty();
  var yearAmount = energyData[2];
    yearAmount.forEach(function(set){
     var $aYear = $('<div>').attr('id', set.year).attr('class', 'bar').attr('style', 'width:' + set.amount*0.02 + "%");
     $('.bar-chart').append($aYear);
    });
};
