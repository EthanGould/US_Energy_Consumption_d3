var App = App || {};

App.getURLParameter = function (name) {
  return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]);

};

App.apiCall = function(e){
  e.preventDefault();
  var api_key = "18AB54E6F91CCCB8A299192515814BDE";
  var source = "GETCB";
  var state = App.getURLParameter('state');
      state = state.toUpperCase();
  var request = "http://api.eia.gov/series/?api_key=" + api_key + "&series_id=ELEC.CONS_TOT.COW-" + state + "-98.A";
};

App.createD3 = function(data_object){

  var margin = {top: 20, right: 30, bottom: 30, left: 60},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

  var x = d3.scale.ordinal()
      .rangeRoundBands([0, width], 0.1);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var chart = d3.select(".filter-chart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  var state = App.getURLParameter('state');
      state = state.toUpperCase();
  var source = App.getURLParameter('source');
  var data = d3.json("http://localhost:3000/energy_call?state=" + state + "&energy_source=" + source , function(error, dataPair) {
    x.domain(dataPair.map(function(d) { return d.year; }));
    y.domain([0, d3.max(dataPair, function(d) { return d.amount; })]);

    colorScale = d3.scale.linear()
    .domain([200000, 300000]) // 0 is red 60 blue
    .range(['light green', 'green']);

    chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    chart.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    chart.selectAll(".bar")
        .data(dataPair)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("fill", function(d) {return colorScale(d.amount ); })
        .transition()
        .attr("y", - 500)
        .transition()
        .duration(1000)
        .attr("x", function(d) { return x(d.year); })
        .attr("y", function(d) { return y(d.amount); })
        .attr("height", function(d) { return height - y(d.amount) ; })
        .attr("width", x.rangeBand());
  });

  function type(d) {
    d.amount = +d.amount; // coerce to number
    return d;
  }
};


$(document).ready(function(){
  $(".filter-button").on('click', App.apiCall );
});

