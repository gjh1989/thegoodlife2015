function investQuickAccess(targ, selObj, restore) { //v3.0
  //eval(targ+".location='http://www.standardchartered.com.sg/personal-banking/investment/en/"+selObj.options[selObj.selectedIndex].value+"'");
  if (selObj.selectedIndex != 0)
    window.open('http://www.standardchartered.com.sg/personal-banking/investment/en/' + selObj.options[selObj.selectedIndex].value, '_blank');
  if (restore) selObj.selectedIndex = 0;
}
$(window).load(function(){
  switch (getPageSection()) {
    case "ways-to-bank":
    case "borrow":
    case "credit-card":
    case "sme":
      $('#featured').trigger('orbit.stop');
      break;
    default:
      break;
  }
});
function getPageSection(){var a,b=$($("#page").attr("class").split(" "));return-1!==$.inArray("home-page",b)?"home-page":(b.each(function(b,c){-1!==c.indexOf("section-")&&(a=c.substring(8))}),a)}
	
function slideSwitch() {
    var $active = $('.credit-cards .banner-block div.active');

	if ($active.length == 1) return;
    if ( $active.length == 0 ) $active = $('.credit-cards .banner-block div:last');

    var $next =  $active.next().length ? $active.next()
        : $('.credit-cards .banner-block div:first');

    $active.addClass('last-active');
        
    $next.css({opacity: 0.0})
        .addClass('active')
        .animate({opacity: 1.0}, 1000, function() {
            $active.removeClass('active last-active');
        });
}

$(function() {
	if ($('#megaNav .credit-cards').length > 0) {
    	setInterval( "slideSwitch()", 3000 );
	}

  //Shortcut keys
  var keys = {};
  $(document).keydown(function (e) { keys[e.which] = true; printKeys(); });
  $(document).keyup(function (e) { delete keys[e.which]; printKeys(); });
  function printKeys() {
    var html = '';
    for (var i in keys) {
      if (!keys.hasOwnProperty(i)) continue;
    }
    if (keys[66] == true && keys[79] == true) {
      callToolUsage("SK-onlinebanking");
      window.open("https://ibank.standardchartered.com.sg/nfs/login.htm");
      delete keys[66]; delete keys[79];
    }
    if (keys[67] == true && keys[85] == true) {
      callToolUsage("SK-contactus");
      window.open("http://gwsdev:outsell06@sg.preview.standardchartered.com/contact-us/index.html");
      delete keys[67]; delete keys[85];
    }
    if (keys[38] == true && keys[83] == true) {
      callToolUsage("SK-scrollup");
      $('body,html').animate({ scrollTop: 0 }, 800);
      delete keys[38]; delete keys[83];
    }
  }
  //End shortcut keys

});

//Added on 15 Nov 2013 - For Homepage Masthead Clickthru
//Open link in new window for Banner
function openNewWin(myurl) {
	window.open(myurl, "_blank");
}
function openWin(myurl) {
	window.location = myurl;
}
//Added on 21 Feb 2014 - For Floodlight onclick tags
function callFloodlight_new(source, type, cat) {
	var tag_url="https://fls.doubleclick.net/activityi;src=" + source + ";type=" + type + ";cat=" + cat + ";ord=1;num="+Math.floor(Math.random()*999999)+"?";
	if(document.getElementById("DCLK_FLDiv")){var flDiv=document.getElementById("DCLK_FLDiv");}
	else{var flDiv=document.body.appendChild(document.createElement("div"));flDiv.id="DCLK_FLDiv";flDiv.style.display="none";}
	var DCLK_FLIframe=document.createElement("iframe");
	DCLK_FLIframe.id="DCLK_FLIframe_"+Math.floor(Math.random()*999999);
	DCLK_FLIframe.src=tag_url;
	flDiv.appendChild(DCLK_FLIframe);
}
function callFloodlight_same(source, type, cat) {
	var tag_url="https://fls.doubleclick.net/activityi;src=" + source + ";type=" + type + ";cat=" + cat + ";ord=1;num="+Math.floor(Math.random()*999999)+"?";
	if(document.getElementById("DCLK_FLDiv")){var flDiv=document.getElementById("DCLK_FLDiv");}
	else{var flDiv=document.body.appendChild(document.createElement("div"));flDiv.id="DCLK_FLDiv";flDiv.style.display="none";}
	var DCLK_FLIframe=document.createElement("iframe");
	DCLK_FLIframe.id="DCLK_FLIframe_"+Math.floor(Math.random()*999999);
	DCLK_FLIframe.src=tag_url;
	flDiv.appendChild(DCLK_FLIframe);
	setTimeout("window.location.href = 'http://www.google.com/';", 1000);
	
}

function callStaticFL(source, type, cat) {
	var axel = Math.random() + "";
	var num = axel * 1000000000000000000;
	var tag_url = new Image();
	tag_url.src = "https://ad.doubleclick.net/activity;src=" + source + ";type=" + type + ";cat=" + cat + ";ord=1;num="+num+"?";
}


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function pageInteraction() {

}

function callToAction() {

}

function callToolUsage() {
	
}