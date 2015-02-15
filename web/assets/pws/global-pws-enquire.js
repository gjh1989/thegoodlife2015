$(window).bind("load", function () {
    $('.sticky .hidden-items').slideUp();
    // cache body for speed
    var $body = $("body");
    var allcontent = $(".brand-header .nav-bar .flyout .sub-menu-article");
    var $accohdr = $(".brand-header .nav-bar .flyout h4.subheader");
    // DRY up handler creation
    var handler = function () {
        $accohdr.removeClass('active');
        allcontent.slideUp('normal');
        if ($(this).next().is(':hidden') == true) {
            $(this).addClass('active');
            $(this).next().slideDown('normal');
        }
    };
    var $capsel = $("#selectedCap");
    var $unimenu = $("#universalNav");
    var $capmenu = $("#mainNav");
    var $logbox = $("#loginBox");
    var $logbut = $("#megaLogin");
    var $megabox = $("#megaNav");
    var $megabut = $("#megaMenu");
    var $waystab = $("#ways-to-bank-tabs");
    var $othermenus = $("#utilityNav.nav-bar > li.animated-menu > a:first-child");
    var megaHandler = function () {
        if ($megabox.is(':hidden') == true) {
            $megabox.slideDown('normal');
            $logbox.slideUp('normal');
            $(this).removeClass("open");
            $logbut.removeClass("open");
            $capmenu.addClass("sticky-nav");
        } else {
            $megabox.slideUp('normal');
            $(this).addClass("open");
            $capmenu.removeClass("sticky-nav");
        }
    };
    var loginHandler = function () {
        if ($logbox.is(':hidden') == true) {
            $logbox.slideDown('normal');
            $(this).addClass("open");
            $megabut.addClass("open");
            $megabox.slideUp('normal');
            $capmenu.addClass("sticky-nav");
        } else {
            $logbox.slideUp('normal');
            $(this).removeClass("open");
            $capmenu.removeClass("sticky-nav");
        }
    };

    function menuReg(className) {
        return {
            match: function () {
                $body.addClass(className);  
	            allcontent.hide();
                $accohdr.bind('click', handler);
                $logbut.bind('click', loginHandler);
                $megabut.bind('click', megaHandler);
                $logbox.fadeOut().hide();
                if ($waystab.is('.vertical')) {
                    $waystab.removeClass("vertical");
                } else {}
            
                $('html').bind('click', function () {
                    $('#universalNav').hide();
                });
                $('#utilityNav').bind('hover', function () {
                    $('#universalNav').hide();
                });
                $('.menu-wrap').bind('click', function (event) {
                    event.stopPropagation();
                });
                $('#selectedCap').bind('click', function (event) {
                    $('#universalNav').toggle();
                    $(this).toggleClass("openCap");
                });
            },
            unmatch: function () {
                $body.removeClass(className);
                allcontent.show();
                $accohdr.unbind('click', handler);
                $unimenu.removeClass('blockmenu').show();
                $logbut.unbind('click', loginHandler).removeClass("open");
                $logbox.fadeIn().show();
                if ($waystab.is('.vertical')) {} else {
                    $waystab.addClass("vertical");
                }
            }
        };
    }
    // hook up our "media queries"
    enquire.register("screen and (max-width : 767px)", menuReg("lt-768")).listen();
});
$(window).bind("load resize", function () {
    var $bulletpoint = $("ul.orbit-bullets")
    var bw = $bulletpoint.width();
    var bh = $(".banner-thumbs ul").innerHeight();
    enquire.register("screen and (min-width: 768px)", [{
        match: function () {
            // if matches 768 width
            $bulletpoint.css({
                'margin-left': '-' + bw / 2 + 'px',
                'margin-bottom': '-' + bh + 'px'
            });
            $("ul.orbit-bullets li").css("height", bh - 4);
            $('.icon-listing li header').setAllToMaxHeight();
            $('.common-contact-block .panel').setAllToMaxHeight();
			  $( ".block-grid" ).each(function(){
				$(this).find('.content-excerpt').setAllToMaxHeight();
				
				});
				
            $('.home-page #loginBox').waypoint(function (event, direction) {
                if (direction === 'down') {
                    $(this).slideUp();
                } else {
                    $(this).slideDown();
                }
            });
            $('.sub-page #loginBox').waypoint(function (event, direction) {
                if (direction === 'down') {
                    if ($('#extendLogin').is(':visible')) {
                        loginboxanim();
                    }
                }
            });
            $("#initLogin").live("click", function () {
                $("#extendLogin").slideDown();
                $("#loginBox").addClass("login-open");
                $("#miniLogin").slideUp();
            });
            $(document).mouseup(function (e) {
                var loginbox = $(".sub-page #extendLogin");
                if (loginbox.has(e.target).length === 0) {
                    loginbox.slideUp().removeClass("login-open");
                    $(".sub-page #miniLogin").slideDown();
                }
            });
        },
        unmatch: function () {
            $bulletpoint.css({
                'margin-left': '-' + bw / 2 + 'px',
                'margin-bottom': '-20px'
            });
            $("ul.orbit-bullets li").css("height", "12px");
            $('#loginBox').waypoint('destroy');
           
        }
    }]).listen();
});