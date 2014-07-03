app.controller('ProjectController', function ($scope, $http){

  $scope.myData = [];

  $scope.handleData = function(data, status){
    $scope.myData = data;
    console.log(data);
  };

  $scope.fetch = function(){
    $http.get('http://localhost:3000/json').success($scope.handleData);
  };
});
