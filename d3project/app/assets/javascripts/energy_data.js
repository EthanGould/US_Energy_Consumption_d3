// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
window.onload = function() {
  // var scaleEnergyToCircle = d3.scale.linear()
  //   .range([0, 20]);

  // var scaleYearToHeight = d3.scale.linear()
  //   .range([0, 20]);

  // var data = d3.json("http://localhost:3000", function(error, dataPair) {
  //   scaleEnergyToCircle.domain([0, d3.max(dataPair.map(function(dataHash) { return dataHash.amount;}))]); //scales width of circles

  //   d3.select("#energies")
  //     .selectAll("circle")
  //     .data(dataPair)
  //     .enter()
  //       .append("circle")
  //       .attr("fill", "rgba(120, 156, 204, 0.4)")
  //       .attr("stroke", "blue")
  //       .attr("stroke-width", "1")
  //       .attr("cy", function(dataSet) { return 200 - dataSet.year / 100; })
  //       .attr("cx", function(dataSet, index) { return (index+1) * 80; })
  //       .attr('r', function(dataSet) { return scaleEnergyToCircle(dataSet.amount * 2 ); });
  // });
    var margin = {top: 20, right: 30, bottom: 30, left: 40},
      width = 700 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

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

  var chart = d3.select(".chart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var data = d3.json("http://localhost:3000", function(error, dataPair) {
    x.domain(dataPair.map(function(d) { return d.year; }));
    y.domain([0, d3.max(dataPair, function(d) { return d.amount; })]);

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
        .style("fill", "tomato")
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
