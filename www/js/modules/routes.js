"use strict";
function config ($locationProvider, $routeProvider){
    
    $routeProvider.when('/login', {
        templateUrl: 'js/modules/security/login/login.tpl.html',
        controller: 'loginController',
        controllerAs : 'login'
    }).when('/', {
        templateUrl: 'js/modules/courses/list/listCourses.tpl.html',
        controller: 'listCoursesController',
        controllerAs : 'listCourses'
    }).when('/user', {
        templateUrl: 'js/modules/user/details/userDetails.tpl.html',
        controller: 'userDetailsController',
        controllerAs : 'userDetails'
    }).when('/course/:courseId/:signaturePos', {
        templateUrl: 'js/modules/courses/details/detailsCourse.tpl.html',
        controller: 'detailsCoursesController',
        controllerAs : 'detailsCourses'
    });
}

angular.module('StarterApp')
.config(config);
