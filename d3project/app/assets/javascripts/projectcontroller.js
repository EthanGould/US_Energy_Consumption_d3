ProjectApp.controller('ProjectController', function ($scope){

  $scope.myData = [
    {name: 'Ethan', city: 'Boston'},
    {name: 'Hanna', city: 'Beluga'},
    {name: 'George', city: 'New York'}
  ];

  $scope.addCustomer = function () {
    $scope.myData.push(
      {
        name: $scope.newCustomer.name,
        city: $scope.newCustomer.city
      });
  };
});
