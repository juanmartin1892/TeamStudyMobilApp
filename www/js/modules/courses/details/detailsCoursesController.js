"use strict";

function detailsCoursesController ($http,$routeParams,coursesDetails,userList){
    var self = this;    
    var couserId = $routeParams.courseId;
    var token = localStorage.getItem('token');
    
    coursesDetails.save("courseid=" + couserId).$promise.then(function(data){
        self.signature = data[$routeParams.signaturePos];
        self.page();
    });
    
    self.page = function() {
        self.pages = [];
        var page = {};
        //Primero metemos la descripcion como primera pagina
        page.name = "Descripcion";
        page.main =  self.signature.summary;
        page.isShow = "show";
        self.pages.push(page);
        
        angular.forEach( self.signature.modules,function(item){
            if(item.modname === "page"){
                var url = item.contents[0].fileurl;
                
                $http.get(url + "&token=" + token).then(function(res){
                    page = {};
                    page.name = item.name;
                    page.modicon = item.modicon;
                    page.main = res.data;
                    page.isShow = "hiden";
                    self.pages.push(page);                
                });
            }
        });
    };
    
    self.forum = function(){
        self.forumList = [];
        angular.forEach( self.signature.modules,function(item){
            if(item.modname === "forum"){
                self.forumList.push(item);
            }
        });
    }
     
    
    self.files = function(){
        self.fileList = [];
        self.folderList = [];
        self.token = token;
        angular.forEach( self.signature.modules,function(item){
            if(item.modname === "resource"){
                item.isShow = "hiden";
                self.fileList.push(item);
            }
        });
        angular.forEach( self.signature.modules,function(item){
            if(item.modname === "folder"){
                item.isShow = "hiden";
                self.folderList.push(item);
            }
        });
        
    };
    
    self.users = function(){
    
        self.userList = [];
        userList.save("courseid=" + couserId).$promise.then(function(res){
            self.userList = res;
        });
        
    }
    
    self.sendEmail = function(email){
        var link = "mailto:"+ email;
        window.location.href = link;
     };
    
    self.pageHiden = function(name,list){
        angular.forEach(list, function(value){
            
            if(value.name === name && value.isShow === "hiden" ){
                value.isShow = "show";
            }else if(value.name === name && value.isShow === "show" ){
                value.isShow = "hiden"; 
            }
        });
    };
}



angular.module('StarterApp').controller('detailsCoursesController' , ['$http','$routeParams','coursesDetails','userList',detailsCoursesController]);