App = App || {};

$(document).ready(function(){
  $("#state").change(App.pieAPI);
});

App.pieAPI = function(){
  var allValuesPerYear = [];
  var energyTotals = {};
  stateAbrev = $("#state").val();
  $.get("states/pie_data/" + stateAbrev, function(data){
    // gets total amount of each energy source
    for (var source in data){
      allValuesPerYear = [data[source]];
      for (var i = 0; i < allValuesPerYear[0].length; i++){
        energyTotals[source] = (allValuesPerYear[0][i].amount);
      }
    }
    // creates a data array [{ source: "HY", amount: 20431 }]
    // var d3Data = [];
    // var pieHash = {};
    // energyTotals.forEach(function(source){
    //   pieHash.type = source;
    //   pieHash.amount = energyTotals[source];
    // });
    //   d3Data.push(pieHash);
    App.makePieChart(energyTotals);
  });
};

App.makePieChart = function(dataHash){

  var width = 300,
      height = 300,
      radius = Math.min(width, height) / 2;

  var color = d3.scale.ordinal()
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

  var arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

  var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.amount; });

  var svg = d3.select(".col-md-6").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  data = dataHash;

  var g = svg.selectAll(".arc")
      .data(pie.data)
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.type); });

  g.append("text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.data.$.type(DOMelementArray); });
};
