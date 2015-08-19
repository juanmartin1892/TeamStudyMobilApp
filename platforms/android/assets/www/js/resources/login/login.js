"use strict";

function Login ($resource, LoginUrl){
  return $resource(LoginUrl + '?username=:UserName&password=:Pass&service=moodle_mobile_app' , {UserName : '@_UserName',Pass : '@_Pass'});
}

angular.module('StarterApp').constant('LoginUrl' , 'http://178.62.38.232/moodle/login/token.php')
  .factory('Login', Login);
