angular.module('modalTest', ['ui.bootstrap', 'dialogs.main', 'pascalprecht.translate', '720kb.socialshare', 'uiGmapgoogle-maps', 'ngDialog', 'RatingApp', 'facebook'])
        .config(function (FacebookProvider) {
            FacebookProvider.init('433973590092596');
        })

        .controller('dialogServiceTest', function ($scope, $rootScope, $timeout, dialogs, dealData, $location, ngDialog, $interval, Facebook) {

            $scope.name = 'yes';
            $scope.confirmed = 'No confirmation yet!';
            $scope.totalDisplayed = 20;
            //filter recommendation

            $scope.launch = function (deal) {
                $scope.modalFreezeBG = 'overflow:hidden; position:fixed';
                var dlg = dialogs.confirm(deal);
                //console.log("opened");
                $rootScope.deal = deal;
                dlg.result.then(function (btn) {
                    $scope.confirmed = 'You confirmed "Yes."';
                }, function (btn) {
                    $scope.confirmed = 'You confirmed "No."';
                    $scope.modalFreezeBG = '';
                    //console.log("closed");
                });
            }; // end launch

            //load more function for deals
            $scope.loadMore = function () {
                $scope.totalDisplayed += 20;
            };//end load more

            //passing v6 webservice data into $scope
            dealData.then(function (data) {
                $rootScope.deals = data.offer.added.list;
                $scope.coupons = data.coupon.added.list;
                $scope.allCategories = data.category.added.list;
//                var sql = "";
//                for (i =0; i <data.offer.added.list.length; i++ ){
//                    var deal = data.offer.added.list[i];
//                    var randInt = (Math.floor(Math.random() * (50 - 1 + 1)) + 1);
//                    var randInt1 = (Math.floor(Math.random() * (5 - 1 + 1)) + 1);
//                    sql = sql + ",(" + randInt + ", " +deal.offerID+ ", "+deal.subCatID+", "+ randInt1+ ")" ; 
//                }
//                for (i =0; i <data.offer.added.list.length; i++ ){
//                    var deal = data.offer.added.list[i];
//                    var randInt = (Math.floor(Math.random() * (50 - 1 + 1)) + 1);
//                    var randInt1 = (Math.floor(Math.random() * (5 - 1 + 1)) + 1);
//                    sql = sql + ",(" + randInt + ", " +deal.offerID+ ", "+deal.subCatID+", "+ randInt1+ ")" ; 
//                }
//                for (i =0; i <data.offer.added.list.length; i++ ){
//                    var deal = data.offer.added.list[i];
//                    var randInt = (Math.floor(Math.random() * (50 - 1 + 1)) + 1);
//                    var randInt1 = (Math.floor(Math.random() * (5 - 1 + 1)) + 1);
//                    sql = sql + ",(" + randInt + ", " +deal.offerID+ ", "+deal.subCatID+", "+ randInt1+ ")" ; 
//                }
//                for (i =0; i <data.offer.added.list.length; i++ ){
//                    var deal = data.offer.added.list[i];
//                    var randInt = (Math.floor(Math.random() * (50 - 1 + 1)) + 1);
//                    var randInt1 = (Math.floor(Math.random() * (5 - 1 + 1)) + 1);
//                    sql = sql + ",(" + randInt + ", " +deal.offerID+ ", "+deal.subCatID+", "+ randInt1+ ")" ; 
//                }
//                console.log(sql);
            });

            //check current page(sub-category) user is on
            $scope.navClass = function (page) {
                var currentRoute = $location.path().substring(1) || '';
                return page === currentRoute ? 'active' : '';
            };

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
                $scope.totalDisplayed = 20;
            };

            //validate non-empty/empty sub-category
            $scope.subCategories = function (categories) {
                $scope.subCategory = [];

                for (var i = 0; i < categories.length; i++) {
                    var count = 0;
                    var subCatId = categories[i].subCategoryId;

                    for (var j = 0; j < $scope.deals.length; j++) {
                        var deal = $scope.deals[j];

                        if (deal.subCatID === subCatId) {
                            count++;
                        }
                    }
                    if (count !== 0) {
                        $scope.subCategory.push(categories[i]);
                    }
                }
                //console.log($scope.subCategory);

                return $scope.subCategory;
            };


            //check deal priority for banner display
            $scope.showBanner = function (deal) {
                var isFeatured = deal.isFeatured == 1;
                var cardType = deal.cardType;
                var isMaster = cardType.indexOf("MasterCard") > -1;
                var isVisa = cardType.indexOf("Visa") > -1;

                //return {background-image: url(img/exclusive.png)}
                if (isFeatured && isMaster && isVisa) {
                    return "exclusive.png";
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
            $scope.notification = false;

            var hourBefore = '15';
            var minBefore = '30';
            var hourAfter = '18';
            var minAfter = '30';

            $interval(function () {
                var currentDate = new Date();
                var hour = currentDate.getHours().toString();
                var minutes = currentDate.getMinutes().toString();

                if (hour == hourBefore) {
                    if (minutes >= minBefore) {
                        $scope.openDefault();
                    }
                } else if (hour == hourAfter) {
                    if (minutes <= minAfter) {
                        $scope.openDefault();
                    }
                } else if (hour >= hourBefore && hour <= hourAfter) {
                    $scope.openDefault();
                }
            }, 5000, 1);

            $scope.openDefault = function () {
                var diningDeals = [];
                angular.forEach($scope.deals, function (deal, key) {
                    if (deal.categoryID == 6) {
                        this.push(deal);
                    }
                }, diningDeals);
                $rootScope.chosenDeal = diningDeals[Math.floor(Math.random() * diningDeals.length)];

                var dialog = ngDialog.open({
                    template:
                            '<div class="ngdialog-message">' +
                            '<h3 ng-show="chosenDeal">{{chosenDeal.merchantName|cut:true:30:" ..."}}</h3>' +
                            '<img src="img/notif.png">' +
                            '<p ng-show="chosenDeal" ng-bind-html="chosenDeal.promoDesc|cut:true:50"></p>' +
                            '<div class="ngdialog-buttons">' +
                            '<div class="ngdialog-buttons"><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog(chosenDeal)">See Deal</button></div>' +
                            '</div>' +
                            '</div>',
                    plain: true,
                    showClose:false
                });
                dialog.closePromise.then(function (data) {
                    if (data.value != '$document') {
                        $scope.launch(data.value);
                    }
                    //
                });
            };

            $scope.loginStatus = 'disconnected';
            $scope.facebookIsReady = false;
            $scope.user = null;

            $scope.login = function () {
                Facebook.login(function (response) {
                    if (response.status === 'connected') {
                        // Logged into your app and Facebook.
                        console.log('Welcome!  Fetching your information.... ');
                        Facebook.api('/me', function (response) {
                            console.log('Good to see you, ' + response.name + '.');
                            $scope.loginStatus = response.status;
                            Facebook.getLoginStatus(function (response) {
                                console.log(response.authResponse.accessToken);
                            });
                        });
                    } else if (response.status === 'not_authorized') {
                        // The person is logged into Facebook, but not your app.
                        console.log('User cancelled login or did not fully authorize.');
                    } else {
                        // The person is not logged into Facebook, so we're not sure if
                        // they are logged into this app or not.
                        console.log('User cancelled login or did not fully authorize.');
                    }
                }, {
                    scope: 'user_friends',
                    auth_type: 'rerequest'
                });
            };

        }) // end controller(dialogsServiceTest)

        .factory('dealData', function ($http, $q) {
            var deferred = $q.defer();
//            $http.get('https://tgl.standardchartered.com/bridgeheadi18n/V6/offers/offerdetails?country=SG&lang=en&deviceId=0&offerVersion=0&couponVersion=0&categoryVersion=0').then(function (resp) {
//                deferred.resolve(resp.data);
//            });

//            $http.get('/thegoodlife2015/getDeals').then(function (resp) {
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

        //
        .filter('recommendFilter', function () {
            return function (deals) {
                var filtered = [];
                angular.forEach(deals, function (deal) {
                    if (parseInt(deal.offerID) === 6157 || parseInt(deal.offerID) === 3887) {
                        filtered.push(deal);
                    }
                });
                return filtered;
            };
        })

        //Google map
        .controller('mapCtrl', function ($scope, $rootScope) {
            $scope.showMap = true;
            $scope.map = {center: {latitude: 1.3000, longitude: 103.8000}, zoom: 10, bounds: {}};
            $scope.options = {scrollwheel: false};
            //console.log($rootScope.deal);

            var createMarker = function (i, object) {
                //console.log(deal);
                var latitude = '';
                var longitude = '';
                var addr = '';
                var name = '';
                if (object.outletList != null) {
                    latitude = object.outletList[i].latitude;
                    longitude = object.outletList[i].longitude;
                    addr = object.outletList[i].outletAddress;
                    name = object.outletList[i].outletName;
                } else {
                    latitude = object.mcouponOutletList[i].latitude;
                    longitude = object.mcouponOutletList[i].longitude;
                    addr = object.mcouponOutletList[i].outletAddress;
                    name = object.mcouponOutletList[i].outletName;
                }

                var ret = {
                    latitude: latitude,
                    longitude: longitude,
                    title: name + '<br/>' + addr,
                    show: false,
                    id: i
                };
                //console.log(ret);

                ret.onClick = function () {
                    //console.log("Clicked!");
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
            for (var i = 0; i < $rootScope.deal.outletCount; i++) {
                //console.log(i);
                markers.push(createMarker(i, $rootScope.deal));
            }
            $scope.outletMarkers = markers;
        })

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

angular.module('dialogs.controllers', ['ui.bootstrap.modal', 'pascalprecht.translate', 'ngResource'])

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

        .controller('confirmDialogCtrl', ['$scope', '$modalInstance', '$translate', 'header', 'msg', 'Utils', 'imgUrl', 'recServlet', function ($scope, $modalInstance, $translate, header, msg, Utils, imgUrl, recServlet) {
                //-- Variables -----//

                $scope.header = $scope.deal.merchantName;
                $scope.msg = $scope.deal;
                //checking the validity of image's url
                Utils.isImage($scope.deal.promoImage).then(function (result) {
                    $scope.imgUrl = result;
                });
                //-- Methods -----//

                $scope.recommendedDeas = recServlet.get({fbID:1, offerID:20});

                $scope.no = function () {
                    $modalInstance.dismiss('no');
                }; // end close

                $scope.yes = function () {
                    $modalInstance.close('yes');
                }; // end yes
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

        .factory('recServlet', ['$resource', function ($resource) {
                return $resource('/recServlet/:fbID');
            }])

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
                            }, // end confirm


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
                        '<link rel="stylesheet" href="css/overlay.css">' +
                        //button to close
                        '<div class="overlay-back">' + //start of padding div
                        '<div type="button" class="close-modal" ng-click="no()" style="cursor: pointer">x</div>' +
                        //title of popup
                        '<div class="modal-header dialog-header-confirm">' +
                        '<h4 class="modal-title">' + startSym + 'header' + endSym + '</h4>' +
                        '<div ng-controller="RatingCtrl">' +
                        '<div star-rating rating-value="dealRate" max="5"></div>' +
                        '</div>' +
                        '</div>' +
                        //body of popup
                        '<div class="modal-body" id="overlay">' +
                        //image of merchant
                        '<div class="merc-img">' +
                        '<img src="' + startSym + 'imgUrl' + endSym + '">' +
                        '</div>' +
                        //details of deal
                        '<div class="main-details">' +
                        '<h6>Offer:</h6>' +
                        '<p ng-bind-html="msg.promoDesc"></p>' +
                        '<h6>Eligible Cards:</h6>' +
                        '<p ng-bind-html="msg.cardType"></p>' +
                        '<h6>Valid Till:</h6>' +
                        '<p>{{deal.validTill| myDate | date:"d MMM y"}}</p>' +
                        '</div>' +
                        '<div class="details">' +
                        '<h6>Terms & Conditions:</h6>' +
                        '<p ng-bind-html="msg.promoConditions"></p>' +
                        //----- Google map
                        '<h6>Outlets:</h6>' +
                        '<div id="map_canvas" ng-controller="mapCtrl">' +
                        '<div ng-if="showMap" >' +
                        '<ui-gmap-google-map center="map.center" zoom="map.zoom" draggable="true" options="options" bounds="map.bounds">' +
                        '<ui-gmap-markers models="outletMarkers" coords="\'self\'" icon="\'icon\'" click="\'onClick\'">' +
                        '<ui-gmap-windows show="\'show\'">' +
                        '<div ng-non-bindable>{{title}}</div>' +
                        '</ui-gmap-windows>' +
                        '</ui-gmap-markers>' +
                        '</ui-gmap-google-map>' +
                        '</div>' +
                        '</div>' +
                        //-----END of google map
                        //----- social sharing of the site without numbers
                        //facebook
                        '<h6>Share this deal:</h6>' +
                        '<div class="btn-share-separator"></div>' +
                        '<div class="bs-col2 line-tablet">' +
                        '<div class="bs-line-compress">' +
                        '<a class="bs-btn-fb bs-btn-medium bs-center-content bs-radius bg-btn-share" socialshare="" socialshare-media="http://720kb.net/assets/img/logo.png" socialshare-provider="facebook" socialshare-url="http://thegoodlife-jhgoh.rhcloud.com/deal.html?{{msg.offerID}}">' +
                        'Facebook' +
                        '</a>' +
                        '</div>' +
                        '</div>' +
                        //twitter
                        '<div class="btn-share-separator mobile tablet"></div>' +
                        '<div class="bs-col2 line-tablet">' +
                        '<div class="bs-line-compress">' +
                        '<a class="bs-btn-twitter bs-btn-medium bs-center-content bs-radius bg-btn-share" socialshare="" socialshare-provider="twitter" socialshare-text="Standard Chartered Bank" socialshare-url="http://thegoodlife-jhgoh.rhcloud.com/deal.html?{{msg.offerID}}" socialshare-hashtags="thegoodlife, scb">' +
                        'Twitter' +
                        '</a>' +
                        '</div>' +
                        '</div>' +
                        //google
                        '<div class="btn-share-separator mobile tablet"></div>' +
                        '<div class="bs-col2 line-tablet">' +
                        '<div class="bs-line-compress">' +
                        '<a class="bs-btn-google bs-btn-medium bs-center-content bs-radius bg-btn-share" socialshare="" socialshare-provider="google+" socialshare-url="http://thegoodlife-jhgoh.rhcloud.com/deal.html?{{msg.offerID}}">' +
                        'Google +' +
                        '</a>' +
                        '</div>' +
                        '</div>' + '</div>' +
                        '<div style="margin-bottom: 20px;"></div>' +
                        '</div>' +
                        '</div>' + //end of modal-body
                        '</div>' +
                        '<div class="overlay-back" style="margin-top:50px; background-color:#f3f3f3 !important;">' + //start of padding div
                        '<div class="modal-header dialog-header-confirm">' +
                        '<h4 class="modal-title">Related Pins</h4>' +
                        '</div>' +
                        '<article class="inpage-sections inpage-on">' +
                        '<section class="inpage-content grey-box section-active" id="featured-cards">' +
                        '<div class="row">' +
                        '<div class="twelve columns">' +
                        '<div class="pin-container variable-sizes isotope">' +
                        '<article ng-repeat="eachRecmd in deals | recommendFilter" class="elements credit-card-select business cashback isotope-item">' +
                        '<div class="panel" id="deals-display" ng-click="$parent.launch(eachRecmd)" style="cursor:pointer">' +
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
                        '</article>' +
                        '</section>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>');
            }]); // end run / dialogs

