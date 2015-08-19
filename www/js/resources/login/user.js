"use strict";

function User ($resource, BaseUrl){
  return $resource(BaseUrl + '?wstoken=:token&wsfunction=core_webservice_get_site_info&moodlewsrestformat=json' , {token : '@_token'});
}

angular.module('StarterApp').constant('BaseUrl' , 'http://178.62.38.232/moodle/webservice/rest/server.php')
  .factory('User', User);
