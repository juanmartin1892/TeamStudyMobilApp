"use strict";

function coursesDetails ($resource, BaseUrl){
    
    var token = localStorage.getItem('token');
    return $resource(BaseUrl + '?wstoken='+token+'&wsfunction=core_course_get_contents&moodlewsrestformat=json' , {},{
    save: {
            method: "POST",
            isArray: true,
            headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
        }
    });
}

angular.module('StarterApp').constant('BaseUrl' , 'http://178.62.38.232/moodle/webservice/rest/server.php')
  .factory('coursesDetails', coursesDetails);
