angular.module('modalTest', ['ui.bootstrap', 'dialogs.main', 'pascalprecht.translate', '720kb.socialshare', 'uiGmapgoogle-maps', 'ngDialog', 'geolocation', 'facebook'])
        .config(function (FacebookProvider) {
            FacebookProvider.init('433973590092596');
        })

        .controller('dialogServiceTest', function ($scope, $rootScope, dialogs, dealData, $location, ngDialog, $interval, geolocation, Facebook, $http, $window) {

            $scope.name = 'yes';
            $scope.confirmed = 'No confirmation yet!';
            $scope.totalDisplayed = 20;
            $scope.selectedIndex = 'Featured';
//            $rootScope.fbUserID = 4;
//            $rootScope.fbStatus = 'connected';
            $rootScope.recommended = [];
            Facebook.getLoginStatus(function (response) {
                //console.log(response.status); //connected or unknown

                if (response.status == "connected") {
                    Facebook.api('/me', function (response) {
                        $rootScope.fbStatus = "connected";
                        //$scope.deviceId = response.id;
                        $rootScope.fbUserID = response.id;

                        //for rendering the recommended deals
                        console.log($rootScope.fbUserID);
                        $http.get('http://localhost:8080/thegoodlife2015/recServlet?fbID=' + $rootScope.fbUserID).success(function (resp) {
                            var recommendedIds = resp.recommendations;
                            //console.log(resp);
                            angular.forEach($rootScope.deals, function (deal) {
                                angular.forEach(recommendedIds, function (id) {
                                    if (parseInt(deal.offerID) === id) {
                                        $rootScope.recommended.push(deal);
                                    }
                                })
                            });
                            //console.log($rootScope.recommended);
                        });
                    });
                }
            });

            $scope.launch = function (deal) {
                $scope.modalFreezeBG = 'overflow:hidden; position:fixed';
                $rootScope.deal = deal;
                var dlg = dialogs.confirm(deal);
                dlg.result.then(function (btn) {
                    $scope.confirmed = 'You confirmed "Yes."';
                }, function (btn) {
                    $scope.confirmed = 'You confirmed "No."';
                    $scope.modalFreezeBG = '';
                });
                if (deal.couponId > 0) {
                    checkCoupon(deal);
                }
            }; // end launch


            $rootScope.launchRecommendation = function (deal) {
                $scope.modalFreezeBG = 'overflow:hidden; position:fixed';
                $rootScope.deal = deal;
                var dlg = dialogs.confirm(deal);
                dlg.result.then(function (btn) {
                    $scope.confirmed = 'You confirmed "Yes."';
                }, function (btn) {
                    $scope.confirmed = 'You confirmed "No."';
                    $scope.modalFreezeBG = '';
                });
                if (deal.couponId > 0) {
                    checkCoupon(deal);
                }
            }; // end launch

            //dropdown for sorting and filter
            $scope.filterOptions = {
                options: [
                    {id: 1, name: '--- Select ---', value: "all"},
                    {id: 2, name: 'Latest', value: "offerID"},
                    {id: 3, name: 'MasterCard® Exclusive', value: "All Standard Chartered MasterCard Cards only"},
                    {id: 4, name: 'Visa Exclusive', value: "All Standard Chartered Visa Cards only"},
                    {id: 5, name: 'Expiring Deals', value: "validTill"}
                ]
            };

            $scope.filterItem = {
                option: $scope.filterOptions.options[0]
            };

            //load more function for deals
            $scope.loadMore = function () {
                $scope.totalDisplayed += 20;
            };//end load more

            geolocation.getLocation().then(function (data) {
                $rootScope.coords = {lat: data.coords.latitude, long: data.coords.longitude};
                $scope.showNearMe = true;
            }, function (error) {
                $rootScope.geoError = error;
                $scope.showNearMe = false;
            });


            //passing v6 webservice data into $scope
            dealData.then(function (data) {
                $rootScope.deals = data.offer.added.list;
                $rootScope.coupons = data.coupon.added.list;
                $rootScope.allCategories = data.category.added.list;
                var dealID = window.location.search.substring(1);
                if (dealID > 0) {
                    var deal;
                    for (i = 0; i < data.offer.added.list.length; i++) {
                        if (dealID === data.offer.added.list[i].offerID) {
                            deal = data.offer.added.list[i];
                            console.log(deal);
                        }
                    }
                    for (i = 0; i < data.coupon.added.list.length; i++) {
                        if (dealID === data.coupon.added.list[i].couponId) {
                            deal = data.coupon.added.list[i];
                            console.log(deal);
                        }
                    }

                    sharingOnLoad(deal);
                }
            });

            var sharingOnLoad = function (deal) {
                $rootScope.deal = deal;
                var dlg = dialogs.confirm(deal);
                dlg.result.then(function (btn) {
                    $scope.confirmed = 'You confirmed "Yes."';
                }, function (btn) {
                    $scope.confirmed = 'You confirmed "No."';
                });
            }; // end launch


            //check current page(category) user is on
            $scope.catClass = function (selectedCat) {
                $scope.selectedIndex = selectedCat;
                //$scope.clearSearch();
            };

            //check current page(sub-category) user is on
            $scope.navClass = function (page) {
                var currentRoute = $location.path().substring(1) || '';
                //$location.path(currentRoute);
                return page === currentRoute ? 'active' : '';
            };

            //filter by letter
            $scope.alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

            $scope.setActiveLetter = function (letter) {
                $scope.selectedIndex = 'All_Deals';
                $rootScope.activeLetter = letter;
                $scope.hide_featured = true;
                $scope.coupons_table = false;
                $scope.search = null;
                $scope.searchText = null;
                $rootScope.searchText = null;
                $scope.filterCat = null;
                $scope.filterSubCat = null;
                $scope.showSubCat = null;
                $scope.sortingOption = null;
                $scope.selectedCard = '';
                $scope.sortingOption = null;
                $scope.filterItem.option = $scope.filterOptions.options[0];
            };

            $scope.setActiveSearch = function (searchText) {
                $scope.selectedIndex = 'All_Deals';
                $rootScope.searchText = searchText;
                $scope.hide_featured = true;
                $scope.coupons_table = false;
            };

            function clearSearchCatSubCat() {
                $rootScope.searchText = null;
                $scope.searchText = null;
                $rootScope.activeLetter = null;
                $scope.search = null;
                $scope.filterCat = null;
                $scope.filterSubCat = null;
                $scope.showSubCat = null;
            }

            $scope.$watch('filterItem', function () {
                $scope.reverse = false;
                $scope.selectedCard = '';
                $scope.sortingOption = null;

                if ($scope.filterItem.option.id === 2) {
                    $scope.selectedIndex = 'All_Deals';
                    $scope.sortingOption = $scope.filterItem.option.value;
                    $scope.reverse = true;
                    $scope.selectedCard = '';
                    clearSearchCatSubCat();

                } else if ($scope.filterItem.option.id === 5) {
                    $scope.selectedIndex = 'All_Deals';
                    $scope.sortingOption = $scope.filterItem.option.value;
                    $scope.reverse = false;
                    $scope.selectedCard = '';
                    clearSearchCatSubCat();
                } else if ($scope.filterItem.option.id === 3) {
                    $scope.selectedIndex = 'All_Deals';
                    $scope.selectedCard = $scope.filterItem.option.value;
                    $scope.sortingOption = null;
                    clearSearchCatSubCat();
                } else if ($scope.filterItem.option.id === 4) {
                    $scope.selectedIndex = 'All_Deals';
                    $scope.selectedCard = $scope.filterItem.option.value;
                    $scope.sortingOption = null;
                    clearSearchCatSubCat();
                }
            }, true);

            $scope.dining = function (deal) {
                return deal.categoryID === '6';
            };

            $scope.online = function (deal) {
                return deal.categoryID === '30';
            };

            $scope.lifestyle = function (deal) {
                return deal.categoryID === '11' || deal.categoryID === '13';
            };

            $scope.featuredDeals = function (deal) {
                //return deal.isFeatured === '1' || deal.keywords.indexOf("home_feature")>-1;
                return deal.keywords.indexOf("home_feature") > -1;
            };

            $scope.priortyDeals = function (deal) {
                return deal.cardType.indexOf("Visa Infinite") > -1;
            };

            $scope.diningSubCat = function (category) {
                return category.superCategoryID === '6';
            };

            $scope.onlineSubCat = function (category) {
                return category.superCategoryID === '30';
            };

            $scope.lifestyleSubCat = function (category) {
                return category.superCategoryID === '11' || category.superCategoryID === '13';
            };

            $scope.returnScope = function () {
                return $scope;
            };

            //clear search in $scope and reset loaded display
            $scope.clearSearch = function () {
                $scope.search = null;
                $rootScope.searchText = null;
                $rootScope.activeLetter = null;
                $scope.filterItem.option = $scope.filterOptions.options[0];
                $scope.totalDisplayed = 20;
                $scope.searchText = null;
            };

            //validate non-empty/empty sub-category
            $scope.subCategories = function (categories) {
                $scope.subCategory = [];

                for (var i = 0; i < categories.length; i++) {
                    var count = 0;
                    var subCatId = categories[i].subCategoryId;

                    for (var j = 0; j < $rootScope.deals.length; j++) {
                        var deal = $rootScope.deals[j];

                        if (deal.subCatID === subCatId) {
                            count++;
                        }
                    }
                    if (count !== 0) {
                        $scope.subCategory.push(categories[i]);
                    }
                }

                return $scope.subCategory;
            };

            //check deal priority for banner display
            $scope.showBanner = function (deal) {
                var isFeatured = deal.isFeatured == 1;
                var cardType = deal.cardType;
                var isMaster = cardType.toLowerCase().indexOf("mastercard") > -1;
                var isVisa = cardType.toLowerCase().indexOf("visa") > -1;

                //return {background-image: url(img/exclusive.png)}
                if (isFeatured && isMaster && isVisa) {
                    return "exclusive.png";
                } else if (isMaster && isVisa) {
                    return '';
                } else if (isFeatured && isMaster) {
                    return "master.png";
                } else if (isFeatured && isVisa) {
                    return "visa.png";
                } else if (isMaster) {
                    return "master.png";
                } else if (isVisa) {
                    return "visa.png";
                } else if (isFeatured) {
                    return "exclusive.png";
                } else {
                    return '';
                }
            };

            //Time trigger notification
            //$scope.notification = false;

            function dateObj(d) {
                var parts = d.split(/:|\s/),
                        date = new Date();
                if (parts.pop().toLowerCase() == 'pm')
                    parts[0] = (+parts[0]) + 12;
                date.setHours(+parts.shift());
                date.setMinutes(+parts.shift());
                return date;
            }

            $interval(function () {
                var now = new Date();

                if (now < dateObj('11:59 AM') && now > dateObj('7:00 AM')) {
                    $scope.openDefault("time_triggered_deal_1");
                } else if (now < dateObj('1:59 PM') && now > dateObj('12:00 PM')) {
                    $scope.openDefault("time_triggered_deal_2");
                } else if (now < dateObj('3:59 PM') && now > dateObj('2:00 PM')) {
                    $scope.openDefault("time_triggered_deal_3");
                } else if (now < dateObj('5:59 PM') && now > dateObj('4:00 PM')) {
                    $scope.openDefault("time_triggered_deal_4");
                } else {
                    $scope.openDefault("time_triggered_deal_5");
                }
            }, 5000, 1);

            $scope.openDefault = function (keyword) {
                var timeTriggeredDeals = [];
                angular.forEach($rootScope.deals, function (deal, key) {
                    if (deal.keywords.indexOf(keyword) > -1) {
                        this.push(deal);
                    }
                }, timeTriggeredDeals);

                if (timeTriggeredDeals.length != 0) {
//                    angular.forEach($rootScope.deals, function (deal, key) {
//                        this.push(deal);
//                    }, timeTriggeredDeals);
//                    $rootScope.chosenDeal = timeTriggeredDeals[Math.floor(Math.random() * timeTriggeredDeals.length)];
                    $rootScope.chosenDeal = timeTriggeredDeals[Math.floor(Math.random() * timeTriggeredDeals.length)];
                    var dialog = ngDialog.open({
                        template:
                                '<div class="ngdialog-message">' +
                                '<h3 ng-show="chosenDeal">{{chosenDeal.merchantName|cut:true:30:" ..."}}</h3>' +
                                '<img src="img/notif.png">' +
                                '<p ng-show="chosenDeal" ng-bind-html="chosenDeal.promoDesc|cut:true:50"></p>' +
                                '<div class="ngdialog-buttons">' +
                                '<div class="ngdialog-buttons"><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog(chosenDeal)">Find out more</button></div>' +
                                '</div>' +
                                '</div>',
                        plain: true,
                        showClose: true
                    });
                    dialog.closePromise.then(function (data) {
                        if (data.value.categoryID) {
                            $scope.launch(data.value);
                        } else {
                            dialog.close();
                        }
                    });
                    setTimeout(function () {
                        dialog.close();
                    }, 8000);
                }

            };


            $scope.distance = function (coords, deal) {
                if (typeof $rootScope.geoError === 'string') {
                    console.log($rootScope.geoError);
                    return 0;
                }
                var arr = [];
                var R = 6378100; // Radius of the earth in m
                for (var i = 0; i < deal.outletCount; i++) {
                    var dLat = (deal.outletList[i].latitude - coords.lat) * (Math.PI / 180);
                    var dLon = (deal.outletList[i].longitude - coords.long) * (Math.PI / 180);
                    var a =
                            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                            Math.cos(coords.lat * Math.PI / 180) * Math.cos(deal.outletList[i].latitude * Math.PI / 180) *
                            Math.sin(dLon / 2) * Math.sin(dLon / 2);
                    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                    var d = R * c; // Distance in m
                    arr.push(Math.round(d));
                }
                if (arr.length !== 0) {
                    var ret = Math.min.apply(Math, arr);
                    if (ret > 1000) {
                        return (Math.round(ret / 10)) / 100 + 'km';
                    } else {
                        return ret + 'm';
                    }
                }
            };

            //facebook login
            //check if user is already login
//            $interval(function () {
//                Facebook.getLoginStatus(function (response) {
//                    //console.log(response.status); //connected or unknown
//                    if (response.status == "connected") {
//                        Facebook.api('/me', function (response) {
//                            $rootScope.fbStatus = "connected";
//                            //$scope.deviceId = response.id;
//                            $rootScope.fbUserID = "1";
//                        });
//                    } else {
//                        $rootScope.fbUserID = 1;
//                    }
//                });
//            }, 500, 1);
            function checkCoupon(coupon) {
                $http.get('http://localhost:8080/thegoodlife2015/checkCoupon?deviceId=' + $rootScope.fbUserID + '&couponId=' + coupon.couponId).
                        success(function (data) {
//                            console.log(coupon.couponId);
//                            console.log(data.response.status);
//                            console.log(data);
//                            console.log($scope.fbStatus);
//                            console.log($scope.deviceId);
                            $scope.tranToken = data.tranToken;
                            $rootScope.redeemStatus = data.response.status;
                        });
            }
            function redeemCoupon(coupon) {
                $http.get('http://localhost:8080/thegoodlife2015/redeemCoupon?deviceId=' + $rootScope.fbUserID + '&couponId=' + coupon.couponId + '&tranToken=' + $scope.tranToken).
                        success(function (data) {
                            //console.log(data);
                        });
            }
            $scope.logout = function () {
                Facebook.logout(function (response) {
                    console.log('See you again!');
                    $window.location.replace("/thegoodlife2015");
                });
            };

            $rootScope.clickRedeem = function (coupon) {
                if ($rootScope.fbStatus == "connected") {
                    checkCoupon(coupon);
                    if ($rootScope.redeemStatus == 2) {
                        redeemCoupon(coupon);
                        $window.location.replace("http://localhost:8080/thegoodlife2015/index.html?" + coupon.couponId);
                    }
                } else {
                    Facebook.login(function (response) {
                        if (response.status === 'connected') {
                            // Logged into your app and Facebook.
                            Facebook.api('/me', function (response) {
                                //console.log(response.id);
                                $rootScope.fbStatus = "connected";
                                //$scope.deviceId = response.id;
                                $window.location.replace("/thegoodlife2015");
                            });
                        }
                    }, {
                        scope: 'email',
                        auth_type: 'rerequest'
                    });
                }
            };

            $scope.login = function () {
                Facebook.login(function (response) {
                    if (response.status === 'connected') {
                        // Logged into your app and Facebook.
                        $rootScope.fbStatus = "connected";
                        //$scope.deviceId = response.id;
                        $window.location.replace("/thegoodlife2015");
                    }
                }, {
                    scope: 'email',
                    auth_type: 'rerequest'
                });
            };
        }) // end controller(dialogsServiceTest)

        .factory('dealData', function ($http, $q) {
            var deferred = $q.defer();
//            $http.get('https://tgl.standardchartered.com/bridgeheadi18n/V6/offers/offerdetails?country=SG&lang=en&deviceId=0&offerVersion=0&couponVersion=0&categoryVersion=0').then(function (resp) {
//                deferred.resolve(resp.data);
//            });

//            $http.get('http://thegoodlife2015-jhgoh.rhcloud.com/getDeals').then(function (resp) {
//                deferred.resolve(resp.data);
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
            };
            return fallbackSrc;
        })

        //parse deal.date string to date
        .filter('myDate', function ($filter) {
            var angularDateFilter = $filter('date');
            return function (theDate) {
                var newDate = new Date(theDate);
                return newDate;
                //return newDate.format('d M Y');
            };
        })

        //filter by letter
        .filter('firstLetter', function ($rootScope) {
            return function (input) {
                input = input || [];
                var out = [];
                if ($rootScope.activeLetter != null) {
                    input.forEach(function (item) {
                        //console.log("current item is", item, item.charAt(0));
                        if (item.merchantName.charAt(0).toLowerCase() == $rootScope.activeLetter) {
                            out.push(item);
                        }
                    });
                    return out;
                } else {
                    return input;
                }
            }
        })

        //custom search
        .filter('customSearch', function ($rootScope) {
            //diacritics library
            function removeAccents(value) {
                var accent = [
                    /[\300-\306]/g, /[\340-\346]/g, // A, a
                    /[\310-\313]/g, /[\350-\353]/g, // E, e
                    /[\314-\317]/g, /[\354-\357]/g, // I, i
                    /[\322-\330]/g, /[\362-\370]/g, // O, o
                    /[\331-\334]/g, /[\371-\374]/g, // U, u
                    /[\321]/g, /[\361]/g, // N, n
                    /[\307]/g, /[\347]/g, // C, c
                ],
                        noaccent = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u', 'N', 'n', 'C', 'c'];

                for (var i = 0; i < accent.length; i++) {
                    value = value.replace(accent[i], noaccent[i]);
                }

                return value;
            }

            return function (input) {
                input = input || [];
                var out = [];
                if ($rootScope.searchText != null) {
                    var searchInput = $rootScope.searchText;
                    var tempCategory = $rootScope.allCategories;

                    var categorySearchId = "";
                    var subCategorySearchId = "";

                    tempCategory.forEach(function (category) {
                        //console.log(category.superCategoryID + " " + category.categoryName);
                        if (searchInput.toLowerCase() == category.categoryName.toLowerCase()) {
                            categorySearchId = category.superCategoryID;
                        } else {
                            category.subCategories.forEach(function (subCategory) {
                                if (searchInput.toLowerCase() == subCategory.subCategoryName.toLowerCase()) {
                                    subCategorySearchId = subCategory.subCategoryId;
                                }
                            })
                        }
                    })

                    input.forEach(function (item) {
//                if (item.merchantName.charAt(0).toLowerCase() == $rootScope.activeLetter) {
//                    out.push(item);
//                }
                        if (categorySearchId != null && item.categoryID == categorySearchId) {
                            out.push(item);
                        } else if (subCategorySearchId != null && item.subCatID == subCategorySearchId) {
                            out.push(item);
                        } else {
                            if (removeAccents(item.cardType.toLowerCase()).indexOf(searchInput.toLowerCase()) > -1) {
                                out.push(item);
                            } else if (removeAccents(item.merchantName.toLowerCase()).indexOf(searchInput.toLowerCase()) > -1) {
                                out.push(item);
                            } else if (removeAccents(item.promoConditions.toLowerCase()).indexOf(searchInput.toLowerCase()) > -1) {
                                out.push(item);
                            } else if (removeAccents(item.promoDesc.toLowerCase()).indexOf(searchInput.toLowerCase()) > -1) {
                                out.push(item);
                            }

                        }
                    })
                    return out;
                } else {
                    return input;
                }
            }
        })

        //Google map
        .controller('mapCtrl', function ($scope, $rootScope) {
            $scope.showMap = true;
            $scope.map = {center: {latitude: 1.3000, longitude: 103.8000}, zoom: 10, bounds: {}};
            $scope.options = {scrollwheel: false};

            $scope.reset = function () {
                $scope.map = {center: {latitude: 1.3000, longitude: 103.8000}, zoom: 10, bounds: {}};
                for (var i = 0; i < $scope.outletMarkers.length; i++) {
                    $scope.outletMarkers[i].show = false;
                }
            };

            var createMarker = function (i, object) {
                var latitude = '';
                var longitude = '';
                var addr = '';
                var name = '';
                if (object.offerID > 0) {
                    latitude = object.outletList[i].latitude;
                    longitude = object.outletList[i].longitude;
                    addr = object.outletList[i].outletAddress;
                    name = object.outletList[i].outletName;
                }
                if (object.couponId > 0) {
                    latitude = object.mcouponOutletList[i].latitude;
                    longitude = object.mcouponOutletList[i].longitude;
                    addr = object.mcouponOutletList[i].outletAddress;
                    name = object.mcouponOutletList[i].outletName;
                    ;

                }

                var ret = {
                    latitude: latitude,
                    longitude: longitude,
                    title: name + '<br/>' + addr,
                    show: false,
                    id: i
                };

                ret.onClick = function () {
                    for (var i = 0; i < $scope.outletMarkers.length; i++) {
                        $scope.outletMarkers[i].show = false;
                    }
                    $scope.map.zoom = 13;
                    ret.show = true;
                    $scope.$apply();
                };
                return ret;
            };
            var createCurrentMarker = function () {
                var ret = {
                    latitude: $rootScope.coords.lat,
                    longitude: $rootScope.coords.long,
                    title: "You're here",
                    show: false,
                    icon: 'img/current-location.png',
                    id: i
                };
                ret.onClick = function () {
                    for (var i = 0; i < $scope.outletMarkers.length; i++) {
                        $scope.outletMarkers[i].show = false;
                    }
                    $scope.map.zoom = 13;
                    ret.show = true;
                    $scope.$apply();
                };
                return ret;
            };
            $scope.outletMarkers = [];
            var markers = [];
            if ($rootScope.deal.couponId > 0) {
                for (var i = 0; i < $rootScope.deal.outletCount; i++) {
                    markers.push(createMarker(i, $rootScope.deal));
                    console.log("more than zero");
                }
            } else {
                for (var i = 0; i < $rootScope.deal.outletCount; i++) {
                    markers.push(createMarker(i, $rootScope.deal));
                }
            }


            if (typeof $rootScope.geoError !== 'string' && typeof $rootScope.coords !== 'undefined') {
                markers.push(createCurrentMarker());
            }

            $scope.outletMarkers = markers;
        });


//custom truncate function for data display
angular.module('ng').filter('cut', function () {
    return function (value, wordwise, max, tail) {
        if (!value)
            return '';
        max = parseInt(max, 10);
        if (!max)
            return value;
        if (value.length <= max)
            return value;
        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
            }
        }

        return value + (tail || ' …');
    };
});
/**
 * Note:
 * 		1. This version requires Angular UI Bootstrap >= v0.10.0 with templates
 *              2. This version requires angular-translate for i18n support
 */

//== Controllers =============================================================//

angular.module('dialogs.controllers', ['ui.bootstrap.modal', 'pascalprecht.translate', 'facebook'])
        .config(function (FacebookProvider) {
            FacebookProvider.init('433973590092596');
        })
        /**
         * Default translations in English.
         * 
         * Use angular-translate's $translateProvider to provide translations in an
         * alternate language.
         *
         * $translateProvider.translations('[lang]',{[translations]});
         * To use alternate translations set the preferred language to your desired
         * language.
         * $translateProvider.preferredLanguage('[lang]');
         */
        .config(['$translateProvider', function ($translateProvider) {
                $translateProvider.translations('en-US', {
                    DIALOGS_ERROR: "Error",
                    DIALOGS_ERROR_MSG: "An unknown error has occurred.",
                    DIALOGS_CLOSE: "Close",
                    DIALOGS_PLEASE_WAIT: "Please Wait",
                    DIALOGS_PLEASE_WAIT_ELIPS: "Please Wait...",
                    DIALOGS_PLEASE_WAIT_MSG: "Waiting on operation to complete.",
                    DIALOGS_PERCENT_COMPLETE: "% Complete",
                    DIALOGS_NOTIFICATION: "Notification",
                    DIALOGS_NOTIFICATION_MSG: "Unknown application notification.",
                    DIALOGS_CONFIRMATION: "Confirmation",
                    DIALOGS_CONFIRMATION_MSG: "Confirmation required.",
                    DIALOGS_OK: "OK",
                    DIALOGS_YES: "Save",
                    DIALOGS_NO: "No"
                });
                $translateProvider.preferredLanguage('en-US');
            }]) // end config

        .controller('confirmDialogCtrl', ['$scope', '$modalInstance', '$translate', 'header', 'msg', 'Utils', 'imgUrl', '$http', function ($scope, $modalInstance, $translate, header, msg, Utils, imgUrl, $http) {
                //-- Variables -----//

                $scope.header = $scope.deal.merchantName;
                $scope.msg = $scope.deal;
                //checking the validity of image's url
                Utils.isImage($scope.deal.promoImage).then(function (result) {
                    $scope.imgUrl = result;
                });
                //-- Methods -----//

                $scope.no = function () {
                    $modalInstance.dismiss('no');
                }; // end close

                $scope.yes = function () {
                    $modalInstance.close('yes');
                }; // end yes

                $scope.onTextClick = function ($event) {
                    $event.target.select();
                };

                $scope.see_map = function (address) {
                    window.open('https://www.google.com.sg/maps/place/' + address, '_blank');
                };

                //for rendering the rating bar
                $scope.dealRate = -1;

                $http.get('/thegoodlife2015/retrieveRating/' + $scope.fbUserID + '/' + $scope.deal.offerID).success(function (resp) {
                    $scope.dealRate = resp.rate;
                });

                $scope.rateFunction = function (rating) {
                    alert("Rating selected - " + rating);
                };

                if ($scope.recommended.length > 0) {
                    $scope.recommended.sort(function (recDeal1, recDeal2) {
                        return calculateContentSimilarity($scope.deal, recDeal1) - calculateContentSimilarity($scope.deal, recDeal2);
                    });
                }

                $scope.contentBased = [];
                var noRec = 0;

                if ($scope.recommended.length > 0) {
                    for (var i = $scope.recommended.length - 1; noRec < 4; i--) {
                        if ($scope.deal.offerID !== $scope.recommended[i].offerID && $scope.contentBased.indexOf($scope.recommended[i]) == -1) {
                            $scope.contentBased.push($scope.recommended[i]);
                            //console.log($scope.recommended[i]);
                            noRec = noRec + 1;
                        }
                    }
                }

                function calculateContentSimilarity(deal, recDeal) {
                    var simil = 0;
                    if (deal.categoryID === recDeal.categoryID) {
                        simil = simil + 1;
                        //console.log("category same = " + deal.categoryID);
                    }
                    if (deal.subCatID === recDeal.subCatID) {
                        simil = simil + 2;
                        //console.log("subCatID same = " + deal.subCatID);
                    }
                    if (deal.cardType === recDeal.cardType) {
                        simil = simil + 1;
                        //console.log("cardType same = " + deal.cardType);
                    }
                    if (deal.merchantName === recDeal.merchantName) {
                        simil = simil + 3;
                        //console.log("merchantName same = " + deal.merchantName)
                    }

                    var dealKw = deal.keywords.split(",");
                    var recDealKw = recDeal.keywords.split(",");
                    var temp = intersect_safe(dealKw, recDealKw).length;
                    simil = simil + temp;
                    //console.log("keywords match = " + temp)

                    var dealMn = deal.merchantName.split(" ");
                    var recDealmn = recDeal.merchantName.split(" ");
                    temp = intersect_safe(dealMn, recDealmn).length;
                    simil = simil + temp;
                    //console.log("merchantName match = " + temp)

                    var dealPc = deal.promoConditions.split("");
                    var recDealPc = recDeal.promoConditions.split("");
                    temp = intersect_safe(dealPc, recDealPc).length * 0.5;
                    simil = simil + temp;
                    //console.log("promoConditions match = " + temp)

                    var dealPd = deal.promoDesc.split(" ");
                    var recDealPd = recDeal.promoDesc.split(" ");
                    temp = intersect_safe(dealPd, recDealPd).length * 0.5;
                    simil = simil + temp;
                    //console.log("promoDesc match = " + temp)

                    /* finds the intersection of 
                     * two arrays in a simple fashion.  
                     *
                     * PARAMS
                     *  a - first array, must already be sorted
                     *  b - second array, must already be sorted
                     *
                     * NOTES
                     *
                     *  Should have O(n) operations, where n is 
                     *    n = MIN(a.length(), b.length())
                     */
                    function intersect_safe(a, b)
                    {
                        var ai = 0, bi = 0;
                        var result = new Array();

                        while (ai < a.length && bi < b.length)
                        {
                            if (a[ai] < b[bi]) {
                                ai++;
                            }
                            else if (a[ai] > b[bi]) {
                                bi++;
                            }
                            else /* they're equal */
                            {
                                result.push(a[ai]);
                                ai++;
                                bi++;
                            }
                        }

                        return result;
                    }


                    return simil;
                }
                ;
            }]) // end ConfirmDialogCtrl / dialogs.controllers
        .factory('Utils', function ($q) {
            return {
                isImage: function (src) {

                    var deferred = $q.defer();
                    var image = new Image();
                    image.onerror = function () {
                        deferred.resolve("img/wrong_img_link.png");
                    };
                    image.onload = function () {
                        deferred.resolve(src);
                    };
                    image.src = src;
                    return deferred.promise;
                }
            };
        })
        .directive('selectOnClick', function () {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    element.on('click', function () {
                        this.select();
                        console.log("selected");
                    });
                }
            };
        })

        //directive for rating bar
        .directive("starRating", function ($rootScope, $http, Facebook, $window) {
            return {
                restrict: "A",
                template: "<ul class='rating'>" +
                        "  <li ng-repeat='star in stars' ng-class='star' ng-click='toggle(" + $rootScope.fbUserID + ", deal.offerID, deal.categoryID, deal.subCatID, $index)'>" +
                        "    <i class='fa fa-star'></i>" + //&#9733
                        "  </li>" +
                        "</ul>",
                scope: {
                    ratingValue: "=",
                    max: "=",
                    deal: "=",
                    onRatingSelected: "&"

                },
                link: function (scope, elem, attrs) {
                    var updateStars = function () {
                        scope.stars = [];
                        for (var i = 0; i < scope.max; i++) {
                            scope.stars.push({
                                filled: i < scope.ratingValue
                            });
                        }
                    };
                    scope.toggle = function (fbUserID, offerID, catID, subCatID, index) {
                        if ($rootScope.fbStatus == "connected") {
                            scope.ratingValue = index + 1;
                            console.log('/thegoodlife2015/recordRating?fbID=' + fbUserID + '&offerID=' + offerID + '&catID=' + catID + '&subCatID=' + subCatID + '&rate=' + (index + 1));
                            $http.get('/thegoodlife2015/recordRating?fbID=' + fbUserID + '&offerID=' + offerID + '&catID=' + catID + '&subCatID=' + subCatID + '&rate=' + (index + 1)).success(function (resp) {
                            });
                        } else {
                            Facebook.login(function (response) {
                                if (response.status === 'connected') {
                                    // Logged into your app and Facebook.
                                    Facebook.api('/me', function (response) {
                                        $rootScope.fbStatus = "connected";
                                        $rootScope.fbUserID = response.id;
                                        $window.location.replace("/thegoodlife2015");
                                    });
                                }
                            }, {
                                scope: 'email',
                                auth_type: 'rerequest'
                            });
                        }


                        scope.onRatingSelected({
                            rating: index + 1
                        });
                    };
                    scope.$watch("ratingValue", function (oldVal, newVal) {
                        if (newVal) {
                            updateStars();
                        }
                    });

                }
            };
        });

//== Services ================================================================//

angular.module('dialogs.services', ['ui.bootstrap.modal', 'dialogs.controllers'])

        .provider('dialogs', [function () {
                var b = true; // backdrop
                var k = true; // keyboard
                var w = 'dialogs-default'; // windowClass
                var copy = true; // controls use of angular.copy
                var wTmpl = null; // window template
                var wSize = 'lg'; // large modal window default

                /**
                 * Use Backdrop
                 * 
                 * Sets the use of the modal backdrop.  Either to have one or not and
                 * whether or not it responds to mouse clicks ('static' sets the 
                 * backdrop to true and does not respond to mouse clicks).
                 *
                 * @param	val 	mixed	(true, false, 'static')
                 */
                this.useBackdrop = function (val) { // possible values : true, false, 'static'
                    if (angular.isDefined(val))
                        b = val;
                }; // end useStaticBackdrop

                /**
                 * Use ESC Close
                 * 
                 * Sets the use of the ESC (escape) key to close modal windows.
                 *
                 * @param	val 	boolean
                 */
                this.useEscClose = function (val) { // possible values : true, false
                    if (angular.isDefined(val))
                        k = (!angular.equals(val, 0) && !angular.equals(val, 'false') && !angular.equals(val, 'no') && !angular.equals(val, null) && !angular.equals(val, false)) ? true : false;
                }; // end useESCClose

                /**
                 * Use Class
                 *
                 * Sets the additional CSS window class of the modal window template.
                 *
                 * @param	val 	string
                 */
                this.useClass = function (val) {
                    if (angular.isDefined(val))
                        w = val;
                }; // end useClass

                /**
                 * Use Copy
                 * 
                 * Determines the use of angular.copy when sending data to the modal controller.
                 *
                 * @param	val 	boolean
                 */
                this.useCopy = function (val) {
                    if (angular.isDefined(val))
                        copy = (!angular.equals(val, 0) && !angular.equals(val, 'false') && !angular.equals(val, 'no') && !angular.equals(val, null) && !angular.equals(val, false)) ? true : false;
                }; // end useCopy

                /**
                 * Set Window Template
                 *
                 * Sets a path to a template to use overriding modal's window template.
                 *
                 * @param	val 	string
                 */
                this.setWindowTmpl = function (val) {
                    if (angular.isDefined(val))
                        wTmpl = val;
                }; // end setWindowTmpl

                /**
                 * Set Size
                 *
                 * Sets the modal size to use (sm,lg), requires Angular-ui-Bootstrap 0.11.0 and Bootstrap 3.1.0 + 
                 *
                 * @param	val 	string (sm,lg)
                 */
                this.setSize = function (val) {
                    if (angular.isDefined(val))
                        wSize = (angular.equals(val, 'sm') || angular.equals(val, 'lg')) ? val : wSize;
                }; // end setSize

                this.$get = ['$modal', function ($modal) {

                        return {
                            /**
                             * Confirm Dialog
                             *
                             * @param	header 	string
                             * @param	msg 	string
                             */
                            confirm: function (header, msg, imgUrl, sz) {
                                if (angular.isDefined(sz))
                                    sz = (angular.equals(sz, 'sm') || angular.equals(sz, 'lg')) ? sz : wSize;
                                else
                                    sz = wSize;
                                return $modal.open({
                                    templateUrl: '/dialogs/confirm.html',
                                    controller: 'confirmDialogCtrl',
                                    backdrop: b,
                                    keyboard: k,
                                    windowClass: w,
                                    size: sz,
                                    resolve: {
                                        header: function () {
                                            return angular.copy(header);
                                        },
                                        msg: function () {
                                            return angular.copy(msg);
                                        },
                                        imgUrl: function () {
                                            return angular.copy(imgUrl);
                                        }
                                    }
                                }); // end modal.open
                            } // end confirm


                        }; // end return

                    }]; // end $get
            }]); // end provider

//== Module ==================================================================//

angular.module('dialogs.main', ['dialogs.services', 'ngSanitize']) // requires angular-sanitize.min.js (ngSanitize) //code.angularjs.org/1.2.1/angular-sanitize.min.js

        // Add default templates via $templateCache
        .run(['$templateCache', '$interpolate', function ($templateCache, $interpolate) {

                // get interpolation symbol (possible that someone may have changed it in their application instead of using '{{}}')
                var startSym = $interpolate.startSymbol();
                var endSym = $interpolate.endSymbol();
                $templateCache.put('/dialogs/confirm.html',
                        //import overlay.css for styles
                        //'<link rel="stylesheet" href="css/overlay.css">' +
                        //button to close
                        '<div class="overlay-back">' + //start of padding div
                        '<a type="button" class="close-modal" ng-click="no()"></a>' +
                        //title of popup
                        '<div class="modal-header dialog-header-confirm">' +
                        '<h4 class="modal-title">' + startSym + 'header' + endSym + '</h4>' +
                        '<div ng-if="msg.offerID > 0" star-rating deal="deal" rating-value="dealRate" max="5"></div>' +
                        '</div>' +
                        //body of popup
                        '<div class="modal-body" id="overlay">' +
                        //image of merchant
                        '<div class="merc-img">' +
                        '<img src="' + startSym + 'imgUrl' + endSym + '">' +
                        //redeem button
                        '<button ng-click="clickRedeem(msg)" class="button medium radius green" ng-if="msg.couponId > 0 && redeemStatus == 2">Redeem</button>' +
                        '<button class="button medium radius blue" ng-if="msg.couponId > 0 && redeemStatus != 2">Redeemed</button>' +
                        '</div>' +
                        //details of deal
                        '<div class="main-details">' +
                        '<h6>Offer:</h6>' +
                        '<p ng-bind-html="msg.promoDesc"></p>' +
                        '</div>' + //maindetails

                        '<div class="main-details-cards">' +
                        '<h6>Eligible Cards:</h6>' +
                        '<p ng-bind-html="msg.cardType"></p>' +
                        '</div>' + //maindetails

                        '<div class="main-details">' +
                        '<h6>Valid Till:</h6>' +
                        '<p>{{deal.validTill| myDate | date:"d MMM y"}}</p>' +
                        '</div>' + //maindetails

                        '<div ng-class="{true:\'details\', false:\'online-details\'}[msg.isOnlineMerchant == 0 || msg.couponId > 0]">' +
                        '<h6>Terms & Conditions:</h6>' +
                        '<p ng-bind-html="msg.promoConditions"></p>' +
                        //----- Google map
                        '</div>' + //details

                        '<div class="outlet-list">' +
                        '<div class="online-details">' +
                        '<h6>Outlets:</h6>' +
                        '<div ng-repeat="outlet in msg.outletList">' +
                        '<p>&bull; {{outlet.outletName}} - {{outlet.outletAddress}} <a class="outlet-link" ng-click="see_map(outlet.outletAddress);">See map</a></p>' +
                        '</div>' +
                        //----- Google map
                        '</div>' + //details
                        '</div>' + //oulet-list

                        '<div ng-controller="mapCtrl" ng-if="msg.isOnlineMerchant == 0 || msg.couponId > 0" class="popup-gmap">' +
                        '<div id="map_canvas">' +
                        '<ui-gmap-google-map center="map.center" zoom="map.zoom" draggable="true" options="options" bounds="map.bounds">' +
                        '<ui-gmap-markers models="outletMarkers" coords="\'self\'" icon="\'icon\'" click="\'onClick\'">' +
                        '<ui-gmap-windows show="\'show\'">' +
                        '<div ng-non-bindable>{{title}}</div>' +
                        '</ui-gmap-windows>' +
                        '</ui-gmap-markers>' +
                        '</ui-gmap-google-map>' +
                        //-----END of google map
                        '</div>' +
                        '<a id="map-reset-button" ng-click="reset()">Reset</a>' +
                        '</div>' +
                        '<div style="margin-bottom: 20px;"></div>' +
                        //social sharing
                        //----- social sharing of the site without numbers
                        //facebook
                        '<h6>Share this link:</h6>' +
                        '<div class="btn-share-separator">' +
                        '<div class="bs-col2 line-tablet">' +
                        '<div class="bs-line-compress" ng-if="msg.offerID > 0">' +
                        '<a class="bs-btn-fb bs-btn-medium bs-center-content bs-radius bg-btn-share" socialshare="" socialshare-provider="facebook"  socialshare-url="http://sg.preview.standardchartered.com/sg/thegoodlifetest/index.html?{{msg.offerID}}">' +
                        '</a>' +
                        '</div>' +
                        '<div class="bs-line-compress" ng-if="msg.couponId > 0">' +
                        '<a class="bs-btn-fb bs-btn-medium bs-center-content bs-radius bg-btn-share" socialshare="" socialshare-provider="facebook"  socialshare-url="http://sg.preview.standardchartered.com/sg/thegoodlifetest/index.html?{{msg.couponId}}">' +
                        '</a>' +
                        '</div>' +
                        '</div>' +
                        //twitter

                        '<div class="bs-col2 line-tablet">' +
                        '<div class="bs-line-compress" ng-if="msg.offerID > 0">' +
                        '<a class="bs-btn-twitter bs-btn-medium bs-center-content bs-radius bg-btn-share" socialshare="" socialshare-provider="twitter" socialshare-text="Check out this great deal from The Good Life® at {{msg.merchantName}} @ " socialshare-via="ahhahahah" socialshare-url="http://sg.preview.standardchartered.com/sg/thegoodlifetest/index.html?{{msg.offerID}}"  socialshare-hashtags="TGLapp">' +
                        '</a>' +
                        '</div>' +
                        '<div class="bs-line-compress" ng-if="msg.couponId > 0">' +
                        '<a class="bs-btn-twitter bs-btn-medium bs-center-content bs-radius bg-btn-share" socialshare="" socialshare-provider="twitter" socialshare-text="Check out this great deal from The Good Life® at {{msg.merchantName}} @ " socialshare-via="ahhahahah" socialshare-url="http://sg.preview.standardchartered.com/sg/thegoodlifetest/index.html?{{msg.couponId}}"  socialshare-hashtags="TGLapp">' +
                        '</a>' +
                        '</div>' +
                        '</div>' +
                        //google

                        '<div class="bs-col2 line-tablet">' +
                        '<div class="bs-line-compress" ng-if="msg.offerID > 0">' +
                        '<a class="bs-btn-google bs-btn-medium bs-center-content bs-radius bg-btn-share" socialshare="" socialshare-provider="google+" socialshare-url="http://sg.preview.standardchartered.com/sg/thegoodlifetest/index.html?{{msg.offerID}}">' +
                        '</a>' +
                        '</div>' +
                        '<div class="bs-line-compress" ng-if="msg.couponId > 0">' +
                        '<a class="bs-btn-google bs-btn-medium bs-center-content bs-radius bg-btn-share" socialshare="" socialshare-provider="google+" socialshare-url="http://sg.preview.standardchartered.com/sg/thegoodlifetest/index.html?{{msg.couponId}}">' +
                        '</a>' +
                        '</div>' +
                        '</div>' + '</div>' +
                        //end social sharing


                        '<div class="main-details">' +
                        '<br><br><input ng-if="msg.offerID > 0" type="text" class="linkCopyInput" ng-click="onTextClick($event)" value="http://sg.preview.standardchartered.com/sg/thegoodlifetest/index.html?{{msg.offerID}}" title="This url is for sharing" readonly="readonly"/>' +
                        '<input ng-if="msg.couponId > 0" type="text" class="linkCopyInput" ng-click="onTextClick($event)" value="http://sg.preview.standardchartered.com/sg/thegoodlifetest/index.html?{{msg.couponId}}" title="This url is for sharing" readonly="readonly"/>' +
                        '<p></p>' +
                        '</div>' + //maindetails


                        '<div ng-if="msg.offerID > 0"><h6>People also viewed</h6>' +
                        '<article class="inpage-sections inpage-on">' +
                        '<section class="inpage-content section-active" id="featured-cards">' +
                        '<div class="row" style="margin:0 !important">' +
                        '<div class="twelve columns">' +
                        '<div class="pin-container variable-sizes isotope">' +
                        '<article ng-repeat="eachRecmd in contentBased track by $index" class="elements credit-card-select business cashback isotope-item">' +
                        '<div class="panel" id="deals-display" ng-click="no(); launchRecommendation(eachRecmd);" style="cursor:pointer">' +
                        '<header style="height:103px"> <img ng-src="{{eachRecmd.promoImage}}" fallback-src="img/wrong_img_link.png"></header>' +
                        '<div class="elm-content-area cf">' +
                        '<h5 class="card-title">{{eachRecmd.merchantName|cut:true:25:\' ...\'}}</h5>' +
                        '<p ng-bind-html="eachRecmd.promoDesc|cut:true:60:\' ...\'"></p>' +
                        '</div>' +
                        '<div style="position: absolute; top: 0; left: 0; width: 61px; height: 61px; background-repeat: no-repeat; z-index: 2;" ng-style="{\'background-image\': \'url(img/{{showBanner(eachRecmd)}})\'}"></div>' +
                        '<footer class="collapse" style="height:30px;">' +
                        '<div class="columns text-center">' +
                        'Valid till {{eachRecmd.validTill| myDate | date:\'d MMM y\'}}' +
                        '<img src="img/info.png" alt="" style=" height:7%; width:7%; float: right; position:relative"/>' +
                        '</div>' +
                        '</footer>' +
                        '</div>' +
                        '</article>' +
                        '</div>' +
                        '</section>' +
                        '</article>' +
                        '</div>' + //--end of ng-if for recommendations

                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>'); //--end of padding div

            }]); // end run / dialogs

