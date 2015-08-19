"use strict";
function userDetailsController(CoursesList){
    var self = this;
    self.user = JSON.parse(localStorage.getItem('user'));
    console.log(self.user);
    
    CoursesList.save("userid=" + self.user.userid).$promise.then(function(data){
        self.courses = data.length;
    });
}
angular.module('StarterApp').controller('userDetailsController' , userDetailsController);