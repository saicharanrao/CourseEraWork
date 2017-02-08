(function(){
  'use strict';

  angular.module('Assignment1',[])
  .controller('assignController',assignController);

  assignController.$inject=['$scope'];
  function assignController($scope){
    $scope.items="";
    $scope.sayMessage="";

    $scope.checkMethod = function(){

      var output = findMessage($scope.items);
      $scope.sayMessage = output;
    };

    function findMessage(string){
        var finalMsg ="";
        if(string){
            var arrayOfStrings = string.split(',');
            if(arrayOfStrings.length<=3)
            return "Enjoy!";
            else {
              return "Too much!";
            }
        }
        else {
          return "Please enter data first";
        }

    }
  }

})();
