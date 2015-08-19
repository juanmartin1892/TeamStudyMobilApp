"use strict";

function loginController (Login,User,$location){

// onSuccess Callback
// This method accepts a Position object, which contains the
// current GPS coordinates
//
    var self = this;
    
    var token = localStorage.getItem('token');
    var user =                                             JSON.parse(localStorage.getItem('user'));
    
    if(token && user){
        $location.path("/").replace();
    }
    
    self.send = function(){
        Login.get({UserName : self.user.name,Pass : self.user.pass}).$promise.then(
            //succes
            function(data){
                //It is logged
                if (data.token) {
                    localStorage.setItem("token", data.token);
                    console.log(data.token);
                    
                    User.get({token : data.token}).$promise.then(
                        //succes
                        function(resp){
                            localStorage.setItem("user", JSON.stringify(resp));
                            window.location.reload();  
                        },
                        //error
                        function(resp){
                            console.log(resp);
                        } 
                    );
                } 
                //It is not logged
                else {
                    self.error = "El nombre de usuario o la contraseña son incorrectos";
                    console.log(data.error);
                }
            },
            //error
            function(error){
                console.log(error);
            }
        );
    };
    
}

angular.module('StarterApp').controller('loginController' ,loginController);
