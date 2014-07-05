$(document).rady(function(){

  var data = [10,50,70];
  var r = 100;
  var p = Math.PI * 2;
  var color = d3.scale.ordinal()
    .range(["red", "blue", "orange"]);

  var canvas = d3.select("body").append("svg")
    .attr("width", 500)
    .attr("height", 500);

  var group = canvas.append("g")
    .attr("transform", "translate(100, 100)");

  var arc = d3.svg.arc()
    .innerRadius(r - 60)
    .outerRadius(r)
    .startAngle(0)
    .endAngle(p);

  group.append("path")
    .attr("d", arc);
  // data does into here
  var pie =  d3.layout.pie()
    .value(function (d) {return d;});

  //append
  var arcs = group.selectAll(".arc")
    .data(pie(data))
    .append("g")
    .attr("class", "arc");

  arcs.append("path")
    .attr("d", arc)
    .attr("fill", function(d) {return color(d); });
});
