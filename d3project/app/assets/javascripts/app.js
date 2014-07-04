var ProjectApp = angular.module('ProjectApp', ['ngRoute', 'templates']); //dependency injections go in array

ProjectApp.config(function ($routeProvider) {
  $routeProvider
    .when('/',
      {
        templateUrl: 'side_menu.html'
      }
      );
});
