;
(function ($, window, undefined) {
    'use strict';
    var $doc = $(document),
        Modernizr = window.Modernizr;
    $(document).ready(function () {
        $.fn.foundationAlerts ? $doc.foundationAlerts() : null;
        $.fn.foundationButtons ? $doc.foundationButtons() : null;
        $.fn.foundationAccordion ? $doc.foundationAccordion() : null;
        $.fn.foundationNavigation ? $doc.foundationNavigation() : null;
        $.fn.foundationCustomForms ? $doc.foundationCustomForms() : null;
        $.fn.foundationTabs ? $doc.foundationTabs({
            callback: $.foundation.customForms.appendCustomMarkup
        }) : null;
        $.fn.foundationTooltips ? $doc.foundationTooltips() : null;
   
        $.fn.placeholder ? $('input, textarea').placeholder() : null;
    });
    // UNCOMMENT THE LINE YOU WANT BELOW IF YOU WANT IE8 SUPPORT AND ARE USING .block-grids
    $('.block-grid.two-up>li:nth-child(2n+1)').css({
        clear: 'both'
    });
    $('.block-grid.three-up>li:nth-child(3n+1)').css({
        clear: 'both'
    });
    $('.block-grid.four-up>li:nth-child(4n+1)').css({
        clear: 'both'
    });
    $('.block-grid.five-up>li:nth-child(5n+1)').css({
        clear: 'both'
    });
    // Hide address bar on mobile devices (except if #hash present, so we don't mess up deep linking).
    if (Modernizr.touch && !window.location.hash) {
        $(window).load(function () {
            setTimeout(function () {
                window.scrollTo(0, 1);
            }, 0);
        });
    }
})(jQuery, this);
$(function () {
    var sbox = $('#search-box');
    var sbox2 = $('#cardSearch_txt');
    var sboxbut = $('#mob-search');
    var smobclose = $('#mob-close');
    sbox.focus(function () {
        $("#utilityNav").switchClass("nav-on", "nav-off", 100);
        $(this).switchClass("sbox-on", "sbox-off", 200);
        $("#searchbar").switchClass("search-on", "search-off", 100);
        smobclose.switchClass("sclose-on", "sclose-off", 100);
    }).blur(function () {
        $("#utilityNav").switchClass("nav-off", "nav-on", 100);
        $(this).switchClass("sbox-off", "sbox-on", 100);
        $("#searchbar").switchClass("search-off", "search-on", 100);
        smobclose.switchClass("sclose-off", "sclose-on", 100);
    });
    smobclose.blur(function () {
        $("#utilityNav").switchClass("nav-off", "nav-on", 100);
        $(this).switchClass("sbox-off", "sbox-on", 100);
        $("#searchbar").switchClass("search-off", "search-on", 100);
        smobclose.switchClass("sclose-off", "sclose-on", 100);
    });
    sbox2.focus(function () {
        $(this).switchClass("sbox-on", "sbox-off", 200);
    }).blur(function () {
        $(this).switchClass("sbox-off", "sbox-on", 100);
    });
    var container = $(".more-items").hide();
	$('.share-drop').bind('hover', function (e) {
        if (container.is(':visible')) {
            container.slideUp().parent().removeClass("active-more");
        } else {
            container.slideDown().parent().addClass("active-more");
        }
    });
    $('#filter_more_btn .more-link').bind('click', function (e) {
        if (container.is(':visible')) {
            container.slideUp().parent().removeClass("active-more");
        } else {
            container.slideDown().parent().addClass("active-more");
        }
    });
});
$(document).mouseup(function (e) {
    var container = $(".more-items");
    if (container.has(e.target).length === 0) {
        container.slideUp().parent().removeClass("active-more");
    }
});
$(window).load(function () {
    $('#featured').orbit({
        animation: 'fade',
        // fade, horizontal-slide, vertical-slide, horizontal-push
        animationSpeed: 800,
        // how fast animtions are
        timer: true,
        // true or false to have the timer
        resetTimerOnClick: false,
        // true resets the timer instead of pausing slideshow progress
        advanceSpeed: 5000,
        // if timer is enabled, time between transitions
        pauseOnHover: false,
        // if you hover pauses the slider
        startClockOnMouseOut: false,
        // if clock should start on MouseOut
        startClockOnMouseOutAfter: 1000,
        // how long after MouseOut should the timer start again
        directionalNav: false,
        // manual advancing directional navs
        captions: true,
        // do you want captions?
        captionAnimation: 'fade',
        // fade, slideOpen, none
        captionAnimationSpeed: 800,
        // if so how quickly should they animate in
        bullets: true,
        // true or false to activate the bullet navigation
        bulletThumbs: true,
        // thumbnails for the bullets
        bulletThumbLocation: '',
        // location from this file where thumbs will be
        afterSlideChange: function () {},
        // empty function
        fluid: true // or set a aspect ratio for content slides (ex: '4x3')
    });
});
$(function () {
    // The same for all waypoints
    $('body').delegate('article > section.inpage-content', 'waypoint.reached', function (event, direction) {
        var $active = $(this);
        if (direction === "up") {
            $active = $active.prev();
        }
        if (!$active.length) $active = $active.end();
        $('.section-active').removeClass('section-active');
        $active.addClass('section-active');
        $('.link-active').removeClass('link-active');
        $('a[href=#' + $active.attr('id') + ']').addClass('link-active');
    });
    // Register each section as a waypoint.
    $('article .inpage-content').waypoint({
        offset: '50%'
    });
    // Wicked credit to
    // http://www.zachstronaut.com/posts/2009/01/18/jquery-smooth-scroll-bugs.html
    var scrollElement = 'html, body';
    $('html, body').each(function () {
        var initScrollTop = $(this).attr('scrollTop');
        $(this).attr('scrollTop', initScrollTop + 1);
        if ($(this).attr('scrollTop') == initScrollTop + 1) {
            scrollElement = this.nodeName.toLowerCase();
            $(this).attr('scrollTop', initScrollTop);
            return false;
        }
    });
    // Smooth scrolling for internal links
	$(".infobox-anchor-link").find("a[href^='#']").click(function (event) {
        event.preventDefault();
        var $this = $(this),
            target = this.hash,
            $target = $(target).offset().top -80
            //alert($target);
            $(scrollElement).stop().animate({
                'scrollTop': $target 
            }, 500, 'swing', function () {
              //  window.location.hash = target;
            });
    });
    $(".inpage-links").find("a[href^='#']").click(function (event) {
        event.preventDefault();
        var $this = $(this),
            target = this.hash,
            $target = $(target).offset().top -80
            //alert($target);
            $(scrollElement).stop().animate({
                'scrollTop': $target 
            }, 500, 'swing', function () {
              //  window.location.hash = target;
            });
    });
});
// scroll body to 0px on click
$('.back-to-top').bind('click', function (e) {
    e.preventDefault()
    $('body,html').animate({
        scrollTop: 0
    }, 800);
});
$(document).ready(function () {
	
    $('.back-to-top').addClass('hidden');
    $.waypoints.settings.scrollThrottle = 10;
    $('#mainNav').waypoint(function (event, direction) {
        $('.back-to-top').toggleClass('hidden', direction === "up");
    }, {
        offset: '-100%'
    });
    $('.stick-items').waypoint(function (event, direction) {
        if (direction === 'down') {
            $(this).switchClass("stick-on", "stick-off", 100);
        } else {
            $(this).switchClass("stick-off", "stick-on", 100);
        }
    }, {
        offset: 120
    });
    $('.inpage-links').waypoint(function (event, direction) {
        if (direction === 'down') {
            $(this).next(".inpage-sections").switchClass("inpage-on", "inpage-off", 100);
        } else {
            $(this).next(".inpage-sections").switchClass("inpage-off", "inpage-on", 100);
        }
    });
    $('.mast-sub-header.stick-items').waypoint({
        offset: -100
    });
    $('.select-card-holder.stick-items').waypoint({
        offset: -100
    });

	
	
});

function loginboxanim() {
    $("#extendLogin").slideToggle();
    $(this).parents("#loginBox").addClass("login-open");
    $("#miniLogin").slideToggle();
}
/*
 */
$(window).bind("scroll load", function () {
	
	
   $(".card-listing .button").parent("p").prev("p").addClass("content-excerpt");	
   $(".icon-listing .button").parent("p").prev("p").addClass("content-excerpt");	
									
										
    var scrollSticky = $(this).scrollTop();
    if (scrollSticky >= 51) {
        $("#wrapper").addClass("sticky");
    } else {
        $("#wrapper").removeClass("sticky");
    }
});

$(document).ready(function(){
   setTimeout(function(){

$("#alert_info").slideDown();


}, 5000);
});

// Grabs part of the current URL and stores it globally to be used when pulling data from the cta_data object
var current_location_key = '';

$(function () {
    var loc = String(document.location);
    if (loc.indexOf('?') != -1) {
        loc = loc.split('?')[0];
    }

    var url = loc.split('http://gwsdev:outsell06@sg.preview.standardchartered.com/');
    var tmpstr = new Array();
    for (i = 3; i < url.length; i++) {
        tmpstr.push(url[i]);
    }

    var lastitem = tmpstr[tmpstr.length - 1];

    if (lastitem == '') {
        tmpstr[tmpstr.length - 1] = 'index-2.html';
    }
    current_location_key = tmpstr.join('http://gwsdev:outsell06@sg.preview.standardchartered.com/');
});