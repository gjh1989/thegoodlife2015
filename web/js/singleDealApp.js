angular.module('singleDealApp', ['720kb.socialshare', 'ngMap', 'ngSanitize'])
        .controller('singleDealController', function ($scope, dealData) {

            dealData.then(function (data) {
                $scope.allDeals = data.offer.added.list;
                $scope.allCategories = data.category.added.list;
                $scope.dealID = window.location.search.substring(1);
            });


        }) // end controller(dialogsServiceTest)
        .factory('dealData', function ($http, $q) {
            var deferred = $q.defer();

//            //easyXDM for cross-domain request
//            var xhr = new easyXDM.Rpc({
//                remote: "http://localhost:8888/thegoodlife/index.html"
//            }, {
//                remote: {
//                    request: {} // request is exposed by /cors/
//                }
//            });
//
//            xhr.request({
//                url: "https://tgl.standardchartered.com/bridgeheadi18n/V6/offers/offerdetails?country=SG&lang=en&deviceId=0&offerVersion=0&couponVersion=0&categoryVersion=0",
//                method: "POST",
//                data: {foo: "bar"}
//            }, function (response) {
//                deferred.resolve(response.data);
//                console.log("inside xdm");
//                console.log(response.data);
//            });


            $http.get('webservice.json').then(function (resp) {
                deferred.resolve(resp.data);
            });

            return deferred.promise;
        })

        //replace missing picture on pins
        .directive('fallbackSrc', function () {
            var fallbackSrc = {
                link: function postLink(scope, iElement, iAttrs) {
                    iElement.bind('error', function () {
                        angular.element(this).attr("src", iAttrs.fallbackSrc);
                    });
                }
            }
            return fallbackSrc;
        })
        .filter('myDate', function ($filter) {
            var angularDateFilter = $filter('date');
            return function (theDate) {
                var newDate = new Date(theDate);
                return newDate;
                //return newDate.format('d M Y');
            }
        })
        //Google map
        .controller('EventSimpleCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
                var marker, map;
                $scope.$on('mapInitialized', function (evt, evtMap) {
                    map = evtMap;
                    marker = map.markers[0];
                    map.setCenter(new google.maps.LatLng(1.3000, 103.8000));
                });
                $scope.centerChanged = function (event) {
                    $timeout(function () {
                        map.panTo(marker.getPosition());
                    }, 3000);
                }
                $scope.click = function (outlet) {
                    map.setZoom(13);
                    map.setCenter(outlet.latLng);
                }
            }]);



/**
 * Note:
 * 		1. This version requires Angular UI Bootstrap >= v0.10.0 with templates
 *      2. This version requires angular-translate for i18n support
 */
