"use strict";
angular.module('StarterApp', ['ngRoute','ngResource', 'ngMaterial','ngSanitize']);

angular.module('StarterApp').controller('AppCtrl', ['$scope', '$mdSidenav','$location', function($scope, $mdSidenav,$location){
    var token = localStorage.getItem('token');
    $scope.user = JSON.parse(localStorage.getItem('user'));
    
    $location.path("/user").replace();
    
    if(token === null || $scope.user === null){
        $location.path("/login").replace();
    }
        
    $scope.toggleSidenav = function(menuId) {
        $mdSidenav(menuId).toggle();
    };
    
    $scope.logout = function(){
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.reload();
        $location.path("/login").replace();
    };

}]); 
