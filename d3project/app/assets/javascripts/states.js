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
      var dataArray = data.energy_data;
      var dataSpread = App.getMaxNumber(dataArray);
      App.makeChart(dataSpread);
    });
};
// var data = (dataObject, function(error, dataObject) {
//     x.domain(dataObject.forEach(function(d) {return d.year; }));
//     y.domain([0, d3.max(dataObject, function(d) { return d.amount; })]);

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

  $one.attr('style', 'width:' + (energyData[2][0].amount/(energyData[0] * 0.05) + '%') );
  $two.attr('style', 'width:' + (energyData[2][1].amount/(energyData[0] * 0.05) + '%') );
  $three.attr('style', 'width:' + (energyData[2][2].amount/(energyData[0] * 0.05) + '%') );
  $four.attr('style', 'width:' + (energyData[2][3].amount/(energyData[0] * 0.05) + '%') );
  $five.attr('style', 'width:' + (energyData[2][4].amount/(energyData[0] * 0.05) + '%') );
  $six.attr('style', 'width:' + (energyData[2][5].amount/(energyData[0] * 0.05) + '%') );
  $seven.attr('style', 'width:' + (energyData[2][6].amount/(energyData[0] * 0.05) + '%') );
  $eight.attr('style', 'width:' + (energyData[2][7].amount/(energyData[0] * 0.05) + '%') );
  $nine.attr('style', 'width:' + (energyData[2][8].amount/(energyData[0] * 0.05) + '%') );
  $ten.attr('style', 'width:' + (energyData[2][9].amount/(energyData[0] * 0.05) + '%') );
  $elev.attr('style', 'width:' + (energyData[2][10].amount/(energyData[0] * 0.05) + '%') );
  $twelv.attr('style', 'width:' + (energyData[2][10].amount/(energyData[0] * 0.05) + '%') );
  $thirt.attr('style', 'width:' + (energyData[2][11].amount/(energyData[0] * 0.05) + '%') );

};
