$(document).ready(function(){
  $('.btn-info').on('click', App.getData);
  // $('form').on('submit', App.getData);
});
var App = App || {};

App.getURLParameter = function (param){
  return decodeURI((RegExp(param + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]);
};

App.arrayToHash = function(array){
  var returnHash = {};
  array.forEach(function(array){ returnHash[array.year] = array.amount; });
  return returnHash;
};
