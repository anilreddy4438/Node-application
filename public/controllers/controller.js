var app = angular.module("myApp",[ ]);
app.controller('appCtrl',function($scope,$http){

//window.f = $scope
var refersh = function(){
    $http.get('/contactdata').success(function(response){
        $scope.contactdata = response;
        console.log(response);
        //$scope.contactdata ="";
    });
};
refersh();
    $scope.addContact = function(){
        console.log($scope.contact);
        $http.post('/contactdata',$scope.contact).success(function(response){
            console.log(response);
            console.log('add')
            refersh();
        });
    };
    $scope.remove = function(id){
        console.log(id)
        $http.delete('/contactdata/' + id).success(function(response){
refersh();
        })

    };

    $scope.edit = function(id){
        console.log(id)
        $http.get('/contactdata/' + id).success(function(response){
          $scope.contact = response;
        console.log('edit request');
})
    }

    $scope.update= function(){
        console.log($scope.contact._id)
        $http.put('/contactdata/' + $scope.contact._id , $scope.contact).success(function(response){
            refersh();
        })

    };


    $scope.clean = function(){
        $scope.contact = " ";

    }

    });


