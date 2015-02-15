/* SC Singapore Final Version Element Tracking 21 Sept 2014 */
var dataLayer = dataLayer || [];
var _gaq = _gaq || [];
var current_url = window.location.href;
var debugSCConsole = true;
var eventName = "track_element";

String.prototype.toTitleCase = function() {
	var i, j, str, lowers, uppers;
	if (!this.length) {
		return "";
	}
	str = this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});

	// Certain minor words should be left lowercase unless 
	// they are the first or last words in the string
	lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At',
		'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'];
	for (i = 0, j = lowers.length; i < j; i++)
		str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'),
				function(txt) {
					return txt.toLowerCase();
				});

	// Certain words such as initialisms or acronyms should be left uppercase
	uppers = ['Id', 'Tv'];
	for (i = 0, j = uppers.length; i < j; i++)
		str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'),
				uppers[i].toUpperCase());

	return str;
}

function sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue) {
	var eventLabel = eventLabel || "";
	var eventValue = eventValue || 0;

	if (debugSCConsole == true) {
		console.log('eventCategory : ' + eventCategory + '\n' + 'eventAction : ' + eventAction + '\n' + 'eventLabel : ' + eventLabel + '\n' + 'eventValue : ' + eventValue);
	}
	var data = {};
	data['event'] = eventName;
	data['form_field_category'] = eventCategory;
	data['form_field_action'] = eventAction;
	if (eventLabel !== "") {
		data['form_field_label'] = eventLabel;
	}
	if (eventValue !== 0) {
		data['form_field_value'] = eventValue;
	}
	dataLayer.push(data);
}
//Function to identify page name
function get_pagename()
{
	var current_page = decodeURIComponent(current_url.split("http://gwsdev:outsell06@sg.preview.standardchartered.com/").pop().split(".")[0]);

	if (current_page == '' || current_page == null)
	{
		final_page = decodeURIComponent(current_url.split("http://gwsdev:outsell06@sg.preview.standardchartered.com/").slice(-2, -1)[0]);
	}
	else if (current_page == 'index')
	{
		final_page = decodeURIComponent(current_url.split("http://gwsdev:outsell06@sg.preview.standardchartered.com/").slice(-2, -1));
	}
	else
	{
		final_page = current_page;
	}

	return final_page;
}

function typeofMouseClick(t) {
	var isTranslated = "";
	if (jQuery('html').hasClass('translated-ltr') || jQuery('html').hasClass('translated-rtl')) {
		isTranslated = " : _Translated";
	}
	if (t === 2) {
		return "*MiddleClick" + isTranslated;
	}
	if (t === 3) {
		return "*RightClick" + isTranslated;
	}
	return "*LeftClick" + isTranslated;
}

if (typeof String.prototype.trim !== 'function') {
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, '');
	};
}
if (!window.location.origin) {
	window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
}

(function($) {
	$(document).ready(function() {
		//Identify Page Type 
		var page = get_pagename();
		var page_sg = window.location.toString().replace(window.location.origin.toString(), "");
		switch (page_sg) {
			case '/sg/promotion/tigerair/':
			case '/sg/promotion/tigerair/index.html':
				page = 'promotion-tigerair';
				break;
			case '/sg/credit-cards/cam/':
			case '/sg/credit-cards/cam/index.html':
				page = 'credit-cards-cam';
				break;
			case '/sg/promotion/2014/bonussaver/':
			case '/sg/promotion/2014/bonussaver/index.html':
				page = 'promotion-2014-bonussaver';
				break;
			case '/sg/promotion/2014/platinum/':
			case '/sg/promotion/2014/platinum/index.html':
				page = "promotion-2014-platinum";
				break;
			case '/sg/borrow/cam/':
			case '/sg/borrow/cam/index.html':
				page = "borrow-cam";
				break;
			case '/sg/thegoodlife/':
			case '/sg/thegoodlife/#dining':
			case '/sg/thegoodlife/#retail':
			case '/sg/thegoodlife/#rest_and_relax':
			case '/sg/thegoodlife/#highlights':
			case '/sg/thegoodlife/index.html':
				page = "the-good-life";
				break;
			case '/sg/promotion/esaver/':
			case '/sg/promotion/esaver/index.html':
				page = "promotion-esaver";
				break;
			case '/sg/promotion/2014/fast/':
			case '/sg/promotion/2014/fast/index.html':
				page = "promotion-2014-fast";
				break;
			case '/sg/promotion/2014/ion-gss/':
			case '/sg/promotion/2014/ion-gss/index.html':
				page = "promotion-2014-ion-gss";
				break;
			case '/sg/thegoodlife/':
			case '/sg/thegoodlife/index.html':
				page = "the-good-life";
				break;
			case '/index-world.html':
				page = 'manhattan-home'
			default:
				break;
		}

		var productHomePages = ["save", "borrow", "credit-cards"];
		var specialLandingPages = ["promotion-tigerair", "credit-cards-cam", "promotion-2014-bonussaver", "promotion-2014-platinum", "borrow-cam",
			"the-good-life", "gss", "promotion-esaver", "promotion-2014-ion-gss"];
		var productListPages = ["credit-card-list"];
		var productPages = ["current-bonussaver", "saving-esaver", "360-rewards", "promotions", "loans-cashone", "online-trading", "manhattan-home", "online-unit-trusts"];

		if (page === "sg")
		{
			page_type = "Country Home";
			page_name = "Home";
		}
		else if (productHomePages.indexOf(page) !== -1)
		{
			page_type = "Product Home";
			page_name = page.toTitleCase();
		}
		else if (specialLandingPages.indexOf(page) !== -1)
		{
			page_type = "Special Landing";
			page_name = page.toTitleCase();
			page_name = page.replace(/-/g, " ");
		}
		else if (productListPages.indexOf(page) !== -1)
		{
			page_type = "Product List";
			page_name = page.toTitleCase();
			page_name = page.replace(/-/g, " ");
		}
		else if (productPages.indexOf(page) !== -1)
		{
			page_type = "Product";
			page_name = page.toTitleCase();
			page_name = page.replace(/-/g, " ");
		} else {
			page_type = "Other";
			page_name = page.toTitleCase();
			page_name = page.replace(/-/g, " ");
		}

		if (page == 'index-world') {
			page_name == 'Manhattan Home';
		}

		page_type = page_type.toTitleCase();
		page_name = page_name.toTitleCase();

		eventCategory = '~SG : ^' + page_type + ' : -' + page_name + ' : *Click';
		eventValue = 0;


		if (page_type === 'Product Home' && page_name === 'Car-Insurance') {

			jQuery("a").on('mousedown', function(e) {
				link_name = jQuery(this).text();
				if (jQuery(this).find('img').length > 0) {
					link_name = jQuery(this).find('img').attr('alt') + '';
				}
				eventAction = '_Middle : #Page Body : `' + link_name.toTitleCase();
				eventLabel = '$' + jQuery(this).attr('href') + ' : ' + typeofMouseClick(e.which);
				sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
			});
		}
		//------------------------------------------------------------------------
		//Header Template
		//------------------------------------------------------------------------
		//1. Header Ribbon - Left side links

		///Main Links
		jQuery('ul#universalNav > li > a').mousedown(function(e) {
			var link_name = "";
			link_name = jQuery(this).first().text().trim();
			if (link_name !== "") {
				eventAction = '_Top : #Header : `' + link_name.toTitleCase();
				eventLabel = '$' + jQuery(this).attr('href') + ' : ' + typeofMouseClick(e.which);
				sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
			}
		});
		jQuery("ul#universalNav > li > ul.flyout a").mousedown(function(e) {
			var link_name = "";
			var parent_name = jQuery(this).parents('.has-flyout').find('a').first().text().trim();
			link_name = jQuery(this).first().text().trim();
			if (link_name !== "") {
				eventAction = '_Top : #Header : `' + parent_name.toTitleCase();
				eventLabel = '$' + jQuery(this).attr('href') + ' : @' + link_name.toTitleCase() + ' : ' + typeofMouseClick(e.which);
				sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
			}
		});

		//2. Header ribbon - right side links
		//Main Links
		jQuery('#utilityNav > li > a').mousedown(function(e) {
			str = jQuery(this).text().trim();
			str = str.replace(/\s+/ig, ' ');
			if (str == "") {
				str = jQuery(this).parent('li').first('a').text().trim();
			}
			eventAction = '_Top : #Header : `' + str.toTitleCase();
			eventLabel = '$' + jQuery(this).attr('href') + ' : ' + typeofMouseClick(e.which);
			sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
		});
		jQuery('#utilityNav > li > ul.flyout a').mousedown(function(e) {
			str = jQuery(this).text().trim();
			var parent_name = jQuery(this).parents('.has-flyout').find('a').first().text().trim();
			str = str.replace(/\s+/ig, ' ');
			parent_name = parent_name.replace(/\s+/ig, ' ');
			eventAction = '_Top : #Header : `' + parent_name.toTitleCase();
			eventLabel = '$' + jQuery(this).attr('href') + ' : @' + str.toTitleCase() + ' : ' + typeofMouseClick(e.which);
			sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
		});

		//3. Header ribbon - Search box
		jQuery('#search-box').blur(function(e) {
			search_str = jQuery(this).val();
			if (search_str.length > 0)
			{
				eventAction = '_Top : #Header : `' + 'Search_box';
				eventLabel = '@' + search_str;
				sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
			}
		});

		//4. Header ribbon - Language Selection
		jQuery('.tabs-content li a').mousedown(function(e) {
			country = jQuery(this).text();
			eventAction = '_Top : #Header : `' + 'Country Selection';
			eventLabel = '$' + jQuery(this).attr('href') + ' : @' + country.toTitleCase() + ' : ' + typeofMouseClick(e.which);
			sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
		});

		//5. Login-drop down (self serving ways)
		jQuery('#loginBox a').mousedown(function(e) {
			link_name = jQuery(this).text();
			eventAction = '_Top : #Login-Drop Down : `' + link_name.toTitleCase();
			if (typeof (jQuery(this).attr('href')) == 'undefined' || jQuery(this).attr('href') == '') {
				eventLabel = '@' + link_name.toTitleCase() + ' : ' + typeofMouseClick(e.which);
			} else {
				eventLabel = '$' + jQuery(this).attr('href') + ' : ' + typeofMouseClick(e.which);
			}

			sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
		});

		//6. Mega-Nav (Product Categories)
		//Main Link
		jQuery('#megaNav > li > a').mousedown(function(e) {
			parent_link = jQuery(this).find('h3').text().trim();
			eventAction = '_Top : #Mega-Nav : `' + parent_link.toTitleCase();
			if (jQuery(this).attr('href') == '#') {
				eventLabel = '$' + jQuery(this).parent('li').first('a').attr('href') + ' : ' + typeofMouseClick(e.which);
			} else {
				eventLabel = '$' + jQuery(this).attr('href') + ' : ' + typeofMouseClick(e.which);
			}
			sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
		});
		//Sub links
		jQuery('body').on('mousedown', '#megaNav .flyout a', function(e) {
			link_name = parent_name = "";
			link_name = jQuery(this).text().trim();
			parent_name = jQuery(this).parents('.has-flyout').find('h3').text().trim();
			if (jQuery(this).find('img').length > 0) {
				link_name = jQuery(this).find('img').attr('alt') || jQuery(this).find('img').attr('title') || 'Image';
			}
			eventAction = '_Top : #Mega-Nav : `' + parent_name.toTitleCase();
			eventLabel = '$' + jQuery(this).attr('href') + ' : @' + link_name.toTitleCase() + ' : ' + typeofMouseClick(e.which);
			sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
		});

		//7. Banner - CTA
		jQuery('body').on('mousedown', '.orbit-caption a', function(e) {
			parent_name = '';
			if (jQuery('.orbit-caption').find('.info-box .subheader').length > 0) {
				parent_name = jQuery('.orbit-caption').find('.info-box .subheader').first().text().trim();
			} else if (typeof (jQuery(this).parent('.info-box').find('h2').text()) !== 'undefined' && jQuery(this).parent('.info-box').find('h2').text() !== "") {
				parent_name = jQuery(this).parent('.info-box').find('h2').text().trim();
			} else if (jQuery('.orbit-caption').find('.info-box h1').length > 0) {
				parent_name = jQuery('div.orbit-caption').find('.info-box h1').text();
			}
			link_name = "" + jQuery(this).text();
			eventAction = '_Top : #Banners : `' + parent_name.toTitleCase();
			eventLabel = '$' + jQuery(this).attr('href') + ' : @' + link_name.toTitleCase() + ' : ' + typeofMouseClick(e.which);
			sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
		});
		//8. Banner - Carousel (remaining)
		jQuery('.orbit-bullets li').live('mousedown', function(e) {
			if ($('section.banner-thumbs').text().trim() !== '') {
				link_name = $("section.banner-thumbs li:nth-child(" + jQuery(this).text() + ") h5").text();
				eventAction = '_Top : #Banners : `' + link_name.toTitleCase();
				eventLabel = '@Carousel : ' + typeofMouseClick(e.which);
				sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
			}
		});

		$('body').on('mousedown', '.banner-container .orbit-wrapper #featured img', function(e) {
			current_div = $(this).attr('data-caption');
			parent_name = '';
			if (jQuery('article.orbit-caption' + current_div).find('.info-box .subheader').length > 0) {
				parent_name = jQuery('article.orbit-caption' + current_div).find('.info-box .subheader').first().text().trim();
			} else if (typeof (jQuery('article.orbit-caption' + current_div).find('.info-box').find('h2').text()) !== 'undefined' && jQuery('article.orbit-caption' + current_div).find('.info-box').find('h2').text() !== "") {
				parent_name = jQuery('article.orbit-caption' + current_div).find('.info-box').find('h2').text().trim();
			} else if (jQuery('article.orbit-caption' + current_div).find('.info-box h1').length > 0) {
				parent_name = jQuery('article.orbit-caption' + current_div).find('.info-box h1').text();
			}
			link_name = "" + jQuery('article.orbit-caption' + current_div + ' a').text();
			eventAction = '_Top : #Banners : `' + parent_name.toTitleCase();
			if (typeof (jQuery('article.orbit-caption' + current_div + ' a').attr('href')) !== 'undefined') {
				eventLabel = '$' + jQuery('article.orbit-caption' + current_div + ' a').attr('href') + ' : @' + link_name.toTitleCase() + ' : >BannerImg' + ' : ' + typeofMouseClick(e.which);
				sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
			}
		});
		//9. Bank Logo
		jQuery('.standard-chartered-logo-holder').mousedown(function(e) {
			page_link = window.location.href;
			eventAction = '_Top : #Links to Home Logo : `' + page_link.toTitleCase();
			eventLabel = typeofMouseClick(e.which);
			sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
		});

		//------------------------------------------------------------------------
		//Middle Template
		//------------------------------------------------------------------------

		//27. On line Services / Mobile Services / In person Banking Tab interaction
		jQuery(".scrollnav a").mousedown(function(e) {
			link_name = jQuery(this).text();
			eventAction = '_Middle : #Page Body : `Content Tabs';
			eventLabel = '@' + link_name.toTitleCase() + ' : ' + typeofMouseClick(e.which);
			sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
		});


		//------------------------------------------------------------------------
		//Footer Template
		//------------------------------------------------------------------------
		//12. Footer links
		jQuery('.footer-links a').mousedown(function(e) {
			link_name = jQuery(this).text();
			eventAction = '_Footer : #Footer Links : `' + link_name.toTitleCase();
			eventLabel = '$' + jQuery(this).attr('href') + ' : ' + typeofMouseClick(e.which);
			sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
		});

		//External links, Mail to: links and download documents
		jQuery("a").on('click', function(e) {
			var baseURI = window.location.host;
			var outlink = $(this).attr('href');
			var filetypes = /\.(zip|exe|pdf|doc*|xls*|ppt*|mp3)$/i;
			var javascriptstr = /^javascript\:/i;
			var hash_match = /^#(.*)/i;
			if (typeof (outlink) !== 'undefined' && outlink !== "" && !outlink.match(javascriptstr) && outlink.match(hash_match) == null) {
				if (outlink.indexOf(baseURI) == -1 && outlink.indexOf('http://gwsdev:outsell06@sg.preview.standardchartered.com/') !== 0) {
					text_value = jQuery(this).text().trim();
					if (jQuery(this).find('img').length > 0) {
						text_value = jQuery(this).find('img').attr('alt') || jQuery(this).find('img').attr('title') || 'Image';
					}
					eventAction = '#Outbound : `' + text_value.toTitleCase();
					eventLabel = '$' + outlink + ' : ' + typeofMouseClick(e.which);
					sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
				} else if (outlink.match(/^mailto\:/i)) {
					text_value = jQuery(this).text().trim();
					eventAction = '#Mailto : `' + text_value.toTitleCase();
					eventLabel = '$' + jQuery(this).attr('href') + ' : ' + typeofMouseClick(e.which);
					sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
				}
				if (outlink.match(filetypes) !== null) {
					text_value = jQuery(this).text().trim();
					eventAction = '#Download : `' + text_value.toTitleCase();
					eventLabel = '$' + outlink + ' : ' + typeofMouseClick(e.which);
					sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
				}
			}
		});
		//Back to Top link
		jQuery(".back-to-top a").mousedown(function(e) {
			eventAction = '_Middle : #Page Body : `Arrow';
			eventLabel = '@Up : ' + typeofMouseClick(e.which);
			sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
		});
		//share top nav button

		jQuery('body').on('mousedown', "nav.share-drop li a", function(e) {
			text_value = jQuery(this).first().text().trim();
			eventAction = '_Middle : #Page Body : `Share';
			eventLabel = '@' + text_value.toTitleCase() + ' : ' + typeofMouseClick(e.which);
			sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
		});

		//------------------------------------------------------------------------
		//Body Template
		//------------------------------------------------------------------------
		if (page_type == 'Country Home' && (page_name == 'Home')) {
			//Pin tile heading
			jQuery("#filters a").mousedown(function(e) {
				link_name = jQuery(this).text();
				eventAction = '_Middle : #Pin Tile : `' + link_name.toTitleCase();
				eventLabel = '$' + jQuery(this).attr('href') + ' : ' + typeofMouseClick(e.which);
				sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
			});

			//Pin tile boxes
			jQuery('.tile_pin header img, .tile_pin .elm-content-area h6, .tile_pin .text-right a').live('mousedown', function(e) {
				section_name = jQuery('#filters a[class="selected"]').text().trim();
				link_name = jQuery(this).parentsUntil('.tile_pin').find(".elm-content-area").find("h6").text().trim();
				tagname = jQuery(this).prop("tagName");
				if (tagname === 'IMG') {
					tagname = "Img";
				} else if (tagname === 'A' && jQuery(this).hasClass('icon-only')) {
					tagname = 'Read More Icon';
				} else {
					tagname = 'Title';
				}
				eventAction = '_Middle : #Pin Tile : `' + link_name.toTitleCase();
				eventLabel = '@' + section_name.toTitleCase() + ' : >' + tagname + ' : ' + typeofMouseClick(e.which);
				sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
			});

			//Pin Tile Share
			jQuery('.tile_pin .pin-share-pop .social-share li a').live('mousedown', function(e) {
				link_name = jQuery(this).parentsUntil('.tile_pin').find(".elm-content-area").find("h6").text().trim();
				section_name = jQuery('#filters a[class="selected"]').text();
				eventAction = '_Middle : #Page Body : `PintileShare';
				eventLabel = '$' + jQuery(this).attr('href') + ' : @' + jQuery(this).text().toTitleCase() + ' : >' + link_name.toTitleCase() + ' : ' + typeofMouseClick(e.which);
				sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
			});
			//Load More
			jQuery('body').on('mousedown', '#loadMore_btn', function(e) {
				eventAction = '_Middle : #Pin Tile : `Load More';
				eventLabel = typeofMouseClick(e.which);
				sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
			});

			//Important Information
			jQuery('.elm-rates-list li a').mousedown(function(e) {
				link_name = jQuery(this).text();
				link_href = jQuery(this).attr('href');
				eventAction = '_Middle : #Pin Tile : `Important Information';
				eventLabel = '$' + link_href + ' : @' + link_name.toTitleCase() + ' : ' + typeofMouseClick(e.which);
				sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
			});
			//Important Information - See More
			jQuery('.corner-stamp footer a').live('mousedown', function(e) {
				link_name = jQuery(this).text();
				link_href = jQuery(this).attr('href');
				eventAction = '_Middle : #Pin Tile : `Important Information';
				eventLabel = '$' + link_href + ' : @' + link_name.toTitleCase() + ' : ' + typeofMouseClick(e.which);
				sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
			});
		}

		if (page_type == 'Product List' && page_name == 'Credit Card List') {
			//Page URL : https://www.sc.com/in/credit-cards/credit-card-list.html ------ IP

			//Content Tab
			jQuery("#filter_container a").mousedown(function(e) {
				link_name = jQuery(this).text();
				eventAction = '_Middle : #Page Body : `Content Tabs';
				eventLabel = '@' + link_name.toTitleCase() + ' : ' + typeofMouseClick(e.which);
				sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
			});

			//Apply Now
			jQuery("#creditcardlist .panel a").on('mousedown', function(e) {
				text_value = jQuery(this).text();
				if (text_value == 'Apply Now')
				{
					link_name = jQuery(this).parents(".panel").find("h5").text();
					eventAction = '_Middle : #Page Body : `' + link_name.toTitleCase();
					eventLabel = '@Apply Now' + ' : ' + typeofMouseClick(e.which);
					sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
				}
				else {
					link_name = jQuery(this).parents(".panel").find("h5").text();
					eventAction = '_Middle : #Page Body : `' + link_name.toTitleCase();
					eventLabel = '@Expand' + ' : ' + typeofMouseClick(e.which);
					sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
				}
			});

			//Click to compare
			jQuery("#creditcardlist .panel .compare").mousedown(function(e) {
				link_name = jQuery(this).parents(".panel").find("h5").text();
				eventAction = '_Middle : #Page Body : `' + link_name.toTitleCase();
				eventLabel = '@Click to Compare' + ' : ' + typeofMouseClick(e.which);
				sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
			});

			//click on view details 
			jQuery("#creditcardlist .panel a").mousedown(function(e) {
				text_value = jQuery(this).text();
				if (text_value == 'View Details')
				{
					link_name = jQuery(this).parents(".panel").find("h5").text();
					eventAction = '_Middle : #Page Body : `' + link_name.toTitleCase();
					eventLabel = '@View Details' + ' : ' + typeofMouseClick(e.which);
					sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
				}
			});

			//Click on product title
			jQuery("#creditcardlist h5[class='card-title']").mousedown(function(e) {
				text_value = jQuery(this).text();
				link_name = jQuery(this).parents(".panel").find("h5").text();
				eventAction = '_Middle : #Page Body : `' + link_name.toTitleCase();
				eventLabel = '@Click on Product title' + ' : ' + typeofMouseClick(e.which);
				sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
			});

		}

		if (page_type == 'Special Landing' && page_name == 'The Good Life') {
			jQuery("#menu li a").mousedown(function(e) {
				text_value = jQuery(this).text();
				eventAction = '_Top : #Menu : `' + text_value.toTitleCase();
				eventLabel = '$' + jQuery(this).attr('href') + ' : ' + typeofMouseClick(e.which);
				sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
			});

			jQuery('body').on('mousedown', '#carouselClip #carouselContainer li a', function(e) {
				link_text = jQuery(this).text();
				if (jQuery(this).find('img').length > 0) {
					link_text = jQuery(this).find('img').attr('alt') || jQuery(this).find('img').attr('title');
				}
				eventAction = '_Top : #Banners : `' + link_text.toTitleCase();
				eventLabel = '$' + jQuery(this).attr('href') + ' : ' + typeofMouseClick(e.which);
				sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
			});

			jQuery('body').on('mousedown', '#offer_list .merchant a', function(e) {
				link_text = jQuery(this).text();
				if (jQuery(this).find('img').length > 0) {
					link_text = jQuery(this).find('img').attr('alt') || jQuery(this).find('img').attr('title');
				}
				eventAction = '_Middle : #Page Body : `' + link_text.toTitleCase();
				eventLabel = '$' + jQuery(this).attr('href') + ' : @Title : ' + typeofMouseClick(e.which);
				sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
			});
			jQuery('body').on('mousedown', '#offer_list a.arrow', function(e) {
				link_text = jQuery(this).parents('.offer').find('.merchant a').text();
				eventAction = '_Middle : #Page Body : `' + link_text.toTitleCase();
				eventLabel = '$' + jQuery(this).attr('href') + ' : @Arrow' + ' : ' + typeofMouseClick(e.which);
				sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
			});
			jQuery('body').on('mousedown', '#offer_list .addtofavourites a', function(e) {
				link_text = jQuery(this).text();
				parent_text = jQuery(this).parents('.offer').find('.merchant a').text();
				eventAction = '_Middle : #Page Body : `' + link_text.toTitleCase();
				eventLabel = '$' + jQuery(this).attr('href') + ' : ' + typeofMouseClick(e.which);
				sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
			});
			jQuery('body').on('mousedown', '#offer_list .highlights_list a', function(e) {
				link_text = jQuery(this).text();
				eventAction = '_Middle : #Page Body : `' + link_text.toTitleCase();
				eventLabel = '$' + jQuery(this).attr('href') + ' : ' + typeofMouseClick(e.which);
				sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
			});
			jQuery('body').on('mousedown', '#sidebar a', function(e) {
				link_text = jQuery(this).text();
				if (jQuery(this).find('img').length > 0) {
					link_text = jQuery(this).find('img').attr('alt') || jQuery(this).find('img').attr('title');
				}
				eventAction = '_Middle : #Page Body : `' + link_text.toTitleCase();
				eventLabel = '$' + jQuery(this).attr('href') + ' : ' + typeofMouseClick(e.which);
				sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
			});
		}

		if (page_type == 'Product' && page_name == 'Manhattan Home')
		{
			jQuery('#masthead-bg a').on('mousedown', function(e) {
				link_text = jQuery(this).parents('#home-content-holder').find('#sub-header').text().trim();
				eventAction = '_Top : #Page Body : `' + link_text.toTitleCase();
				eventLabel = '$' + jQuery(this).attr('href') + ' : @' + jQuery(this).text().toTitleCase() + ' : ' + typeofMouseClick(e.which);
				sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
			});

			jQuery('#leftcontent a').on('mousedown', function(e) {
				link_text = jQuery(this).text().trim();
				eventAction = '_Top : #Menu Navigation : `' + link_text.toTitleCase();
				eventLabel = '$' + jQuery(this).attr('href') + ' : ' + typeofMouseClick(e.which);
				sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
			});

			jQuery('#privileges-bg a').on('mousedown', function(e) {
				link_text = jQuery(this).text().trim();
				parent_text = jQuery(this).parents('.privileges').find('.privileges-title-style').text().trim();
				eventAction = '_Middle : #Banners : `' + parent_text.toTitleCase();
				eventLabel = '$' + jQuery(this).attr('href') + ' : @' + link_text.toTitleCase() + ' : ' + typeofMouseClick(e.which);
				sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
			});

		}

		//Click on apply now button
		jQuery(".page-cta a").mousedown(function(e) {
			eventAction = '_Middle : #Page Body : `Floating Bar';
			if (typeof (jQuery(this).attr('href')) !== 'undefined' && jQuery(this).attr('href').indexOf('javascript') != 0) {
				eventLabel = '$' + jQuery(this).attr('href') + ' : @' + jQuery(this).text().trim().toTitleCase() + ' : ' + typeofMouseClick(e.which);
			} else {
				eventLabel = '@' + jQuery(this).text().trim().toTitleCase() + ' : ' + typeofMouseClick(e.which);
			}
			sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
		});

		jQuery('body').on('mousedown', 'article.inpage-sections a, section.inpage-content a', function(e) {
			link_text = jQuery(this).text().trim();
			if (jQuery(this).find('img').length > 0) {
				link_text = jQuery(this).find('img').attr('alt') || jQuery(this).find('img').attr('title') || 'Image';
			}
			link_href = '';
			if (typeof (jQuery(this).attr('href')) !== 'undefined') {
				link_href = jQuery(this).attr('href');
				if (link_href === '') {
					link_href = '#NA';
				}
			} else {
				link_href = '#NA';
			}
			eventAction = '_Middle : #Page Body : `' + link_text.toTitleCase();
			eventLabel = '$' + link_href + ' : ' + typeofMouseClick(e.which);
			sendEventCall(eventName, eventCategory, eventAction, eventLabel, eventValue);
		});
	});
})(jQuery);