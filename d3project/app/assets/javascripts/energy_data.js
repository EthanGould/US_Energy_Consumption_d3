// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
window.onload = function() {
  var scaleEnergyToCircle = d3.scale.linear()
    .range([0, 20]);

  var scaleYearToHeight = d3.scale.linear()
    .range([0, 20]);

  var data = d3.json("http://localhost:3000", function(error, dataPair) {
    scaleEnergyToCircle.domain([0, d3.max(dataPair.map(function(dataHash) { return dataHash.amount;}))]); //scales width of circles

    d3.select("#energies")
      .selectAll("circle")
      .data(dataPair)
      .enter()
        .append("circle")
        .attr("fill", "rgba(120, 156, 204, 0.4)")
        .attr("stroke", "blue")
        .attr("stroke-width", "1")
        .attr("cy", function(dataSet) { return dataSet.year; })
        .attr("cx", function(dataSet, index) { return (index+1) * 60; })
        .attr('r', function(dataSet) { return scaleEnergyToCircle(dataSet.amount * 1.5 ); });
  });
};
