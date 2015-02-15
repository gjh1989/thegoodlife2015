/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module("RatingApp", [])
.controller("RatingCtrl", function($scope) {
  $scope.rating = 5;
  $scope.rateFunction = function(rating) {
    alert("Rating selected - " + rating);
  };
})
.directive("starRating", function($rootScope) {
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
.factory('recordRating', function($http, $q, offerID, subCatID){
    var deferred = $q.defer();

    $http.get('/recordRating?offerID=' + offerID + '&subCatID=' + subCatID).then(function (resp) {
        deferred.resolve(resp.data);
    });

    return deferred.promise;
});

