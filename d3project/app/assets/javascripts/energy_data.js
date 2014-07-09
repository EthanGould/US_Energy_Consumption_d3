$(document).ready(function(){
  $('.btn-info').on('click', App.getData);
  // $('form').on('submit', App.getData);
});
var App = App || {};

App.getURLParameter = function (param){
  return decodeURI((RegExp(param + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]);
};

App.getData = function(){
    var api_key = "18AB54E6F91CCCB8A299192515814BDE";
    var state = App.getURLParameter(state);
    // var source = App.getURLParameter(source);
    $.ajax({
              type: "GET",
              url: "http://api.eia.gov/series/?api_key=" + api_key + "&series_id=ELEC.CONS_TOT.COW-" + state + "-98.A",
              dataType: 'json',
              success: function(result){
                var d3Data = result.series[0].data;
                console.log(App.arrayToHash(d3Data));
              } // success function
            }); // end ajax
};

App.arrayToHash = function(array){
  var returnHash = {};
  array.forEach(function(val, i){ returnHash[val[0]] = val[1]; });
  return returnHash;
};
