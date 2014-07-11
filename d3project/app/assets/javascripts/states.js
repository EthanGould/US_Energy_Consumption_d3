// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).ready(function(){
  $('#state').change(App.callAPI);
  $(".filter-button").click(App.filterResults);
  $(".filter-button").click(App.compareResults);
});

var App = App || {};

App.callAPI = function(){
    var state_abrv = $(this).children(':selected').val();
    $("#current-state").val(state_abrv);
    $.get( "states/image_url/" + state_abrv, function( data ) {
      console.log(data.state_abbreviation);
      $("#state-image").attr("src", data.image_url);
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

App.compareResults = function(){
  $('.compare-chart').empty();
  var state_abrv = $("#current-state").val();
  var all = [];
  var energyHash = {};
  var stateHash = {};
  $.get("states/all_state_data/state_data", function(data){

    for (var currentState in data){
      state = data[currentState];
      $stateBar = $('<div>').attr('id', currentState);
      for (var currentSource in state){
        amount = state[currentSource];
        $stateBar.attr('class', currentSource + ' bar');
        for (var currentAmount in currentSource){
          $stateBar.attr('style', 'width:' + amount + "%");
          currentAmount = state[currentSource];
          $('.compare-chart').append($stateBar);
        }
      }
      console.log($stateBar);
    }
  });
};

App.getMaxNumber = function(energyData){
  var min = Number.POSITIVE_INFINITY;
  var max = Number.NEGATIVE_INFINITY;
  var sum = 0;
  var tmp;
  for (var i=energyData.length-1; i>=0; i--) {
    tmp = energyData[i].amount;
      if (tmp < min) min = tmp;
      if (tmp > max) max = tmp;
  }
  energyData.forEach(function(set){
    sum += sum + parseInt(set.amount);
  });
  var avg = (sum/((energyData.length*100000000000000))).toFixed(2);
  console.log(max, min, avg);
  return [max, min, avg, energyData];
};

App.makeChart = function(energyData){

  var max = energyData[0];
  var min = energyData[1];
  var avg = energyData[2];

  $('#max').text("Max: " + max + " Btu");
  $('#min').text("Min: " + min + " Btu");
  $('#avg').text("Average: " + avg + " Btu");
  $('.chart-title').text(energyData[3][0].name);
  $('.bar-chart').empty();
  if (max > 0) {
    var yearAmount = energyData[3];
      yearAmount.forEach(function(set){
       var $aYear = $('<div>').attr('id', set.year).attr('class', 'bar').attr('style', 'width:' + (set.amount/max)*10 + "%");
       $('.bar-chart').append($aYear);
      });
  }
  else {
    var $noData = $("<div><h1>NO DATA</h1></div>").attr('class', 'no-data');
    $('.bar-chart').append($noData);
  }
};

    // console.log(data);
    // for (var currentState in data){
    //   var state = data[currentState];
    //   for (var source in state) {
    //     energyHash[source] = state[source];
    //   }
    //   stateHash[currentState] = energyHash;
    // }
    // console.log(stateHash);




