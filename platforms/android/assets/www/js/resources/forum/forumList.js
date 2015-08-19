"use strict";

function forumList ($resource, BaseUrl){
    
    var token = localStorage.getItem('token');
    return $resource(BaseUrl + '?wstoken='+token+'&wsfunction=mod_forum_get_forum_discussions&moodlewsrestformat=json' , {},{
    save: {
            method: "POST",
            isArray: true,
            headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
        }
    });
}

angular.module('StarterApp').constant('BaseUrl' , 'http://178.62.38.232/moodle/webservice/rest/server.php')
  .factory('forumList', forumList);