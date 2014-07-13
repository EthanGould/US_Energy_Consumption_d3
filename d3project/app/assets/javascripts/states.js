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
      App.makeChart(dataArray);
    });

};

App.getMaxNumber = function(energyData){
  var min = Number.POSITIVE_INFINITY;
  var max = Number.NEGATIVE_INFINITY;
  var sum = 0;
  var tmp;

  // finds max and min of passed data values
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
  return [max, min, avg];
};

App.makeChart = function(energyData){
  analytics = App.getMaxNumber(energyData);
  console.log(analytics);
  var max = analytics[0];
  var min = analytics[1];
  var avg = analytics[2];

  $('#max').text("Max: " + max + " Btu");
  $('#min').text("Min: " + min + " Btu");
  $('#avg').text("Average: " + avg + " Btu");
  $('.chart-title').text(energyData[0].name);

  $('.chart').empty();

  var values = [];

  barData = energyData.slice(20, -1);

  for (var i=0; i < barData.length; i++){
    values.push(barData[i].amount);
  }

  var highestAmount = Math.max.apply(null, values);

var vis = d3.select('.chart'),
    WIDTH = 500,
    HEIGHT = 300,
    MARGINS = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 60
    },
    xRange = d3.scale.ordinal().rangeRoundBands([MARGINS.left, WIDTH - MARGINS.right], 0.1).domain(barData.map(function(d) {
      return d.year;
    }));

    yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0,highestAmount]);

  xAxis = d3.svg.axis()
    .scale(xRange)
    .tickValues([1980, 1985, 1990, 1995, 2000, 2005, 2010]);

  yAxis = d3.svg.axis()
    .scale(yRange)
    .orient("left");

  vis.append('svg:g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
    .call(xAxis);

  vis.append('svg:g')
    .attr('class', 'y axis')
    .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
    .call(yAxis);

  vis.selectAll('rect')
    .data(barData)
    .enter()
    .append('rect')
    .attr('x', function(d) { // sets the x position of the bar
      return xRange(d.year);
    })
    .attr('y', function(d) { // sets the y position of the bar
      return yRange(d.amount);
    })
    .attr('width', "10px") // sets the width of bar
    .attr('height', function(d) {      // sets the height of bar
      return ((HEIGHT - MARGINS.bottom) - yRange(d.amount));
    });
};
