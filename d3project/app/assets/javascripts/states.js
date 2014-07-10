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
      $(".chart-title").text("Metric tons of coal used in " + data.state_name);
    });

    $.get("states/state_data/" + state_abrv, function(data){
      var dataArray = data.energy_data.PA;
      var dataSpread = App.getMaxNumber(dataArray);
      App.makeChart(dataSpread);
    });
};

App.filterResults = function(){
  var state_abrv = $("#current-state").val(); // drop down child :selected
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

  var $one = $('.chart').find('#2013');
  var $two = $('.chart').find('#2012');
  var $three = $('.chart').find('#2011');
  var $four = $('.chart').find('#2010');
  var $five = $('.chart').find('#2009');
  var $six = $('.chart').find('#2008');
  var $seven = $('.chart').find('#2007');
  var $eight = $('.chart').find('#2006');
  var $nine = $('.chart').find('#2005');
  var $ten = $('.chart').find('#2004');
  var $elev = $('.chart').find('#2003');
  var $twelv = $('.chart').find('#2002');
  var $thirt = $('.chart').find('#2001');

  $one.attr('style', 'width:' + (energyData[2][0].amount/(energyData[0] * 0.01) + '%') );
  $two.attr('style', 'width:' + (energyData[2][1].amount/(energyData[0] * 0.01) + '%') );
  $three.attr('style', 'width:' + (energyData[2][2].amount/(energyData[0] * 0.01) + '%') );
  $four.attr('style', 'width:' + (energyData[2][3].amount/(energyData[0] * 0.01) + '%') );
  $five.attr('style', 'width:' + (energyData[2][4].amount/(energyData[0] * 0.01) + '%') );
  $six.attr('style', 'width:' + (energyData[2][5].amount/(energyData[0] * 0.01) + '%') );
  $seven.attr('style', 'width:' + (energyData[2][6].amount/(energyData[0] * 0.01) + '%') );
  $eight.attr('style', 'width:' + (energyData[2][7].amount/(energyData[0] * 0.01) + '%') );
  $nine.attr('style', 'width:' + (energyData[2][8].amount/(energyData[0] * 0.01) + '%') );
  $ten.attr('style', 'width:' + (energyData[2][9].amount/(energyData[0] * 0.01) + '%') );
  $elev.attr('style', 'width:' + (energyData[2][10].amount/(energyData[0] * 0.01) + '%') );
  $twelv.attr('style', 'width:' + (energyData[2][10].amount/(energyData[0] * 0.01) + '%') );
  $thirt.attr('style', 'width:' + (energyData[2][11].amount/(energyData[0] * 0.01) + '%') );

};
