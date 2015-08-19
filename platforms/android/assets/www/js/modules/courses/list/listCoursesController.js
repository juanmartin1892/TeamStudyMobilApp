"use strict";

function listCoursesController ($location,CoursesList,coursesDetails,forumList){
    var self = this;
    var user =  JSON.parse(localStorage.getItem('user'));
    CoursesList.save("userid=" + user.userid).$promise.then(function(data){
        self.coursesList = data;
        angular.forEach(data, function(value){
            value.displaySignatures = "hiden";
            coursesDetails.save("courseid=" + value.id).$promise.then(function(resp){
                value.signatures = resp;
            });
        });
    });
    
    self.details = function(courseId,key){
        $location.path('/course/' + courseId + '/' + key).replace();
    };
    
    self.signatures = function(id){
        angular.forEach(self.coursesList, function(value){
            if(value.id === id && value.displaySignatures === "hiden" ){
                value.displaySignatures = "show";
            }else if(value.id === id && value.displaySignatures === "show" ){
                value.displaySignatures = "hiden"; 
            }
        });
    };
}
angular.module('StarterApp').controller('listCoursesController' , listCoursesController);