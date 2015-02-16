/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module("RatingApp", ['ngResource'])
.controller("RatingCtrl", function($scope, retrieveRating) {
  $scope.rating = 5;
  $scope.dealRate = 5;
  //to retrieve rating of a deal using factory retrieveRating goes here
  $scope.dealRate = retrieveRating.get({fbID:1, offerID:20});
  $scope.dealRate.$promise.then(function(data) {
    $scope.dealRate = data.rate;
    console.log(data);
  });
  
  
//    $http.get('/getOneRating?fbID=1&offerID=20').success(function(data){
//        console.log(data);
//    })
  $scope.rateFunction = function(rating) {
    alert("Rating selected - " + rating);
  };
})
.directive("starRating", function($rootScope, $http) {
  return {
    restrict : "A",
    template : "<ul class='rating'>" +
               "  <li ng-repeat='star in stars' ng-class='star' ng-click='toggle("+ $rootScope.deal.offerID + "," + $rootScope.deal.subCatID + ",$index)'>" +
               "    <i class='fa fa-star'></i>" + //&#9733
               "  </li>" +
               "</ul>",
    scope : {
      ratingValue : "=",
      max : "=",
      onRatingSelected : "&"
      
    },
    link : function(scope, elem, attrs) {
      var updateStars = function() {
        scope.stars = [];
        for ( var i = 0; i < scope.max; i++) {
          scope.stars.push({
            filled : i < scope.ratingValue
          });
        }
      };
      scope.toggle = function(offerID, subCatID, index) {
        scope.ratingValue = index + 1;
        $http.get('/recordRating?fbID='+ 1 + '&offerID=' + offerID + '&subCatID=' + subCatID + '&rate=' + (index + 1)).then(function (resp) {
            console.log(resp.data);
        });
        console.log(offerID + "-" + subCatID +"-"+ (index + 1));
        scope.onRatingSelected({
          rating : index + 1
        });
      };
      scope.$watch("ratingValue", function(oldVal, newVal) {
        if (newVal) { updateStars(); }
      });
      
    }
  };
})

.factory('retrieveRating', ['$resource', function($resource){
    return $resource('/retrieveRating/:fbID/:offerID', {fbID:'@fbID', offerID:'offerID'}); 
}]);

