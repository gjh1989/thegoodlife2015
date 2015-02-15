
var cardCount;
var selectedCards = new Array();
var cardObj;
var filterArr = new Array();

var listCardCount;

var smallCardWidth = 179;

function getObject(a){return document.getElementById(a)}
function ExtractNumber(a){var b=parseInt(a);return b==null||isNaN(b)?0:b}

if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this && this[from] === elt)
        return from;
    }
    return -1;
  };
}

if (!Array.prototype.reduce)
{
  Array.prototype.reduce = function(fun /*, initial*/)
  {
    var len = this.length;
    if (typeof fun != "function")
      throw new TypeError();

    // no value to return if no initial value and an empty array
    if (len == 0 && arguments.length == 1)
      throw new TypeError();

    var i = 0;
    if (arguments.length >= 2)
    {
      var rv = arguments[1];
    }
    else
    {
      do
      {
        if (i in this)
        {
          rv = this[i++];
          break;
        }

        // if array contains no values, no initial value to return
        if (++i >= len)
          throw new TypeError();
      }
      while (true);
    }

    for (; i < len; i++)
    {
      if (i in this)
        rv = fun.call(null, rv, this[i], i, this);
    }

    return rv;
  };
}

function adjustContainerWidth(){
	
	var contwid = selectedCards.length*200;
	var sc = getObject('compare-conainer');
	
	$('#compare-conainer').css('width', contwid);
	
	var mainmaskwid = ExtractNumber($('#compare-scroll').css('width'));
	
	if(contwid > mainmaskwid){
		//scroll drag
		
		$( "#compare-conainer" ).draggable({
		axis: "x",
		scroll: false,
		start: function(event, ui){
			
			},
		
		drag: function (event, ui){
			
			},
		stop: function(event, ui){
			//alert($('#compare-scroll').css('left'))
			var sc = event.target;
			var left = ExtractNumber(event.target.style.left);
			var wid = ExtractNumber(event.target.style.width);
			
			
			if(left < -(wid-mainmaskwid)){
				
				pos = -(wid-mainmaskwid);
				twn_top_list = new Tween(sc.style, 'left', Tween.strongEaseOut,ExtractNumber(sc.style.left),pos,.4,'px');
				twn_top_list.start();
				}
			else if(left > 0){
				
				pos = 0;
				twn_top_list = new Tween(sc.style, 'left', Tween.strongEaseOut,ExtractNumber(sc.style.left),pos,.4,'px');
				twn_top_list.start();
				}/**/
			}
		});	
		}
	else{
		//remove scroll drag
		//$( "#compare-conainer" ).draggable( "destroy" );
		pos = 0;
		twn_compare_list = new Tween(sc.style, 'left', Tween.strongEaseOut,ExtractNumber(sc.style.left),pos,.4,'px');
		twn_compare_list.start();
		}
	
	var left = ExtractNumber(sc.style.left);
	var wid = ExtractNumber(sc.style.width);
	
	if(left < -(wid-mainmaskwid)){
		pos = -(wid-mainmaskwid);
		pos = pos > 0 ? 0 : pos;
		twn_top_list = new Tween(sc.style, 'left', Tween.strongEaseOut,ExtractNumber(sc.style.left),pos,.4,'px');
		twn_top_list.start();
		}
		
	if(mainmaskwid == 783){
		if(selectedCards.length > 4){
			$('#compare-right-arrow').css('display', 'block');
			$('#compare-left-arrow').css('display', 'block');
			$('#compare-right-arrow').css('left', c_wid-40);
			$('#compare-right-arrow').css('top', c_hgt/2 - 25);
	
			$('#compare-left-arrow').css('left', 0);
			$('#compare-left-arrow').css('top', c_hgt/2 - 25);
			}
		else{
			$('#compare-right-arrow').css('display', 'none');
			$('#compare-left-arrow').css('display', 'none');
			}
		}
	else{
		if(contwid > mainmaskwid){
			$('#compare-right-arrow').css('display', 'block');
			$('#compare-left-arrow').css('display', 'block');
			$('#compare-right-arrow').css('left', c_wid-40);
			$('#compare-right-arrow').css('top', c_hgt/2 - 25);
	
			$('#compare-left-arrow').css('left', 0);
			$('#compare-left-arrow').css('top', c_hgt/2 - 25);
			}
		else{
			$('#compare-right-arrow').css('display', 'none');
			$('#compare-left-arrow').css('display', 'none');
			}
		}
	
	
	$('#compare-right-arrow').css('left', c_wid-40);
	$('#compare-right-arrow').css('top', c_hgt/2 - 25);
	
	$('#compare-left-arrow').css('left', 0);
	$('#compare-left-arrow').css('top', c_hgt/2 - 25);	
	}	

	
function moveCardsLeft(){
	var sc = getObject('compare-conainer');
	var c_pos = ExtractNumber(sc.style.left);
	var wid = selectedCards.length*200;//ExtractNumber(sc.style.width);
	var mainmaskwid = ExtractNumber($('#compare-scroll').css('width'));
	
	var pos = c_pos - 200;
	
	if(pos < -(wid-mainmaskwid)){
		pos = -(wid-mainmaskwid);
		pos = pos > 0 ? 0 : pos;
		}
	
	twn_compare_list = new Tween(sc.style, 'left', Tween.strongEaseOut,c_pos,pos,.4,'px');
	twn_compare_list.start();
	}
	
function moveCardsRight(){
	var sc = getObject('compare-conainer');
	var c_pos = ExtractNumber(sc.style.left);
	var wid = selectedCards.length*200;//ExtractNumber(sc.style.width);
	var mainmaskwid = ExtractNumber($('#compare-scroll').css('width'));
	
	var pos = c_pos + 200;
	
	if(pos > 0){
		pos = 0;
	}
	
	twn_compare_list = new Tween(sc.style, 'left', Tween.strongEaseOut,c_pos,pos,.4,'px');
	twn_compare_list.start();
}	

function addCard(id){
	$('#compare-conainer').append(getObject('TILE_COMPARE_CARD').innerHTML);
		
	getObject('card_title').innerHTML = cardObj[id].title;
	getObject('card_img').src = cardObj[id].img;

	getObject('per-cc-ccc{id}-a').href = cardObj[id].applynow;
	getObject('per-cc-ccc{id}-b').href = cardObj[id].applynow;
	getObject('view_details_btn1').href = cardObj[id].viewdetails;
	getObject('view_details_btn2').href = cardObj[id].viewdetails;

	if(cardObj[id].applynow == '#'){
			getObject('per-cc-ccc{id}-a').innerHTML = 'Invitation Only';
			getObject('per-cc-ccc{id}-b').innerHTML = 'Invitation Only';
	} else {
			getObject('per-cc-ccc{id}-a').innerHTML = 'Apply Now';
			getObject('per-cc-ccc{id}-b').innerHTML = 'Apply Now';
	}

	getObject('per-cc-ccc{id}-a').id = getObject('per-cc-ccc{id}-a').id.replace('{id}', id);
	getObject('per-cc-ccc{id}-b').id = getObject('per-cc-ccc{id}-b').id.replace('{id}', id);
	getObject('view_details_btn1').id = 'view_details_btn1_' + id;
	getObject('view_details_btn2').id = 'view_details_btn2_' + id;
	
	getObject('cardid').id = 'cardid_' + id;
	getObject('card_title').id = 'card_title_' + id;
	getObject('card_img').id = 'card_img_' + id;
	
	getObject('card_remove').id = 'card_remove_' + id;
	

	
	for(var d in cardObj[id]){
		//alert(d + ' - ' + cardObj[id][d])
		if(getObject(d) == null){
			
		}
		else{
			getObject(d).innerHTML = cardObj[id][d];
			getObject(d).id = d + '_' + id;
		}
	}

    compareClass();
	adjustContainerWidth();
    // Set click events on Apply Now buttons after cards are filtered
    setApplyNowLinkClickEvent();
    injectCTAparams2();
}

function compareClass(){
    if (selectedCards.length > 0) {
	    $(".card-container").addClass("compare-on").removeClass("compare-off");
	} else {
	    $(".card-container").addClass("compare-off").removeClass("compare-on");
    }
}
function removeCard(id){
	$('#cardid_' + id).detach();
	compareClass();
}

function selectCard(chkbox){
	var id = chkbox.id.split('_')[3];
	
	if(selectedCards.indexOf(id) == -1){
		selectedCards.push(id);
		//chkbox.style.background = '#00FF00';
		chkbox.className  = 'compare compare-on';
		addCard(id);
	}
	else{
		selectedCards.splice(selectedCards.indexOf(id), 1);
		//chkbox.style.background = '#AAAAAA';
		chkbox.className  = 'compare';
		removeCard(id);
	}
		
	adjustContainerWidth();
}

function deselectCard(chkbox){
	var id = chkbox.id.split('_')[2];
	
	if(selectedCards.indexOf(id) == -1){
		
		}
	else{
		selectedCards.splice(selectedCards.indexOf(id), 1);
		getObject('cs_check_box_' + id).className  = 'compare';
		removeCard(id);
		}
	
	adjustContainerWidth();
	}

function listCompareCards(){
	$('#compare-conainer').html('');
	
	for(i=0;i<selectedCards.length;i++){
		var id = selectedCards[i];
		
		$('#compare-conainer').append(getObject('TILE_COMPARE_CARD').innerHTML);
		
		getObject('card_title').innerHTML = cardObj[id].title;
		getObject('card_img').src = cardObj[id].img;

		getObject('per-cc-ccc{id}-a').href = cardObj[id].applynow;
		getObject('per-cc-ccc{id}-b').href = cardObj[id].applynow;
		getObject('view_details_btn1').href = cardObj[id].viewdetails;
		getObject('view_details_btn2').href = cardObj[id].viewdetails;
		
		if(cardObj[id].applynow == '#'){
			getObject('per-cc-ccc{id}-a').innerHTML = 'Invitation Only';
			getObject('per-cc-ccc{id}-b').innerHTML = 'Invitation Only';
		} else {
			getObject('per-cc-ccc{id}-a').innerHTML = 'Apply Now';
			getObject('per-cc-ccc{id}-b').innerHTML = 'Apply Now';
		}

		getObject('per-cc-ccc{id}-a').id = getObject('per-cc-ccc{id}-a').id.replace('{id}', id);
		getObject('per-cc-ccc{id}-b').id = getObject('per-cc-ccc{id}-b').id.replace('{id}', id);
		getObject('view_details_btn1').id = 'view_details_btn1_' + id;
		getObject('view_details_btn2').id = 'view_details_btn2_' + id;
		
		getObject('cardid').id = 'cardid_' + id;
		getObject('card_title').id = 'card_title_' + id;
		getObject('card_img').id = 'card_img_' + id;
	
		getObject('card_remove').id = 'card_remove_' + id;
		
		getObject('cs_check_box_' + id).className  = 'compare compare-on';
		
		
		for(var d in cardObj[id]){
			//alert(d + ' - ' + cardObj[id][d])
			if(getObject(d) == null){
				
			}
			else{
				getObject(d).innerHTML = cardObj[id][d];
				getObject(d).id = d + '_' + id;
			}
		}
	}
		
	compareClass();
	adjustContainerWidth();

	// Set click events on Apply Now buttons after cards are filtered
	setApplyNowLinkClickEvent();
	injectCTAparams2();
}

function listTopCards(){
	$('#top_list').css('width', cardCount*smallCardWidth);
	
	for(i=0;i<cardCount;i++){
		var id = card_data.cards.card[i].id;
		
		cardObj[id] = card_data.cards.card[i];
		
		$('#top_list').append(getObject('TILE_SMALL_CARD').innerHTML);
		
		
		getObject('cs_title').innerHTML = cardObj[id].title;
		getObject('cs_img').src = cardObj[id].img;
		getObject('cs_id').id = 'cs_id_' + id;
		getObject('cs_title').id = 'cs_title_' + id;
		getObject('cs_img').id = 'cs_img_' + id;
		getObject('cs_check_box').id = 'cs_check_box_' + id;
		}
		
	listCompareCards();
	
	
	$( "#top_list" ).draggable({
		axis: "x",
		
		start: function(event, ui){
			
			},
		
		drag: function (event, ui){
			
			},
		stop: function(event, ui){
			var sc = event.target;
			var left = ExtractNumber(event.target.style.left);
			//var wid = ExtractNumber(event.target.style.width);
			var wid = listCardCount*smallCardWidth;
			var maskwid = ExtractNumber($('#card-scroll').css('width'));
			
			if(wid < maskwid){
				pos = 0;
				twn_top_list = new Tween(sc.style, 'left', Tween.strongEaseOut,ExtractNumber(sc.style.left),pos,.4,'px');
				twn_top_list.start();
				return;
				}
			
			if(left < -(wid-maskwid)){
				pos = -(wid-maskwid);
				twn_top_list = new Tween(sc.style, 'left', Tween.strongEaseOut,ExtractNumber(sc.style.left),pos,.4,'px');
				twn_top_list.start();
				}
			else if(left > 0){
				pos = 0;
				twn_top_list = new Tween(sc.style, 'left', Tween.strongEaseOut,ExtractNumber(sc.style.left),pos,.4,'px');
				twn_top_list.start();
				}
			}
		});	
	}
	
function slideTopListLeft(){
	var maskwid = ExtractNumber($('#card-scroll').css('width'));
	//var wid = ExtractNumber($('#top_list').css('width'));
	var wid = listCardCount*smallCardWidth;
	var currviewcount = Math.floor(maskwid/smallCardWidth);
	var currx = ExtractNumber($('#top_list').css('left'));
	var sc = getObject('top_list');
	var newx = currx - (currviewcount*smallCardWidth);
	
	if(wid < maskwid){
		return;
		}
	
	if(newx < -(wid-maskwid)){
		pos = -(wid-maskwid);
		twn_top_list = new Tween(sc.style, 'left', Tween.strongEaseOut,currx,pos,.4,'px');
		twn_top_list.start();
		}
	else{
		pos = newx;
		twn_top_list = new Tween(sc.style, 'left', Tween.strongEaseOut,currx,pos,.4,'px');
		twn_top_list.start();
		}
	}
function slideTopListRight(){
	var maskwid = ExtractNumber($('#card-scroll').css('width'));
	//var wid = ExtractNumber($('#top_list').css('width'));
	var wid = listCardCount*smallCardWidth;
	var currviewcount = Math.floor(maskwid/smallCardWidth);
	var currx = ExtractNumber($('#top_list').css('left'));
	var sc = getObject('top_list');
	var newx = currx + (currviewcount*smallCardWidth);
	
	if(wid < maskwid){
		return;
		}
	
	if(newx > 0){
		pos = 0;
		twn_top_list = new Tween(sc.style, 'left', Tween.strongEaseOut,currx,pos,.4,'px');
		twn_top_list.start();
		}
	else{
		pos = newx;
		twn_top_list = new Tween(sc.style, 'left', Tween.strongEaseOut,currx,pos,.4,'px');
		twn_top_list.start();
		}
	}
	
var c_hgt;
var c_wid;



var filter_btns = new Array('filter_all_cards', 'filter_shopping', 'filter_rewards', 'filter_cashback', 'filter_insurance_premium');
var filter_count = filter_btns.length;
var filterWidths = new Array();
var moreWidth;

function ExtractNumber(a){var b=parseInt(a);return b==null||isNaN(b)?0:b}

function filterCards(filter){
	listCardCount = 0;
	
	for(i=0;i<cardCount;i++){
		var id = card_data.cards.card[i].id;
		
		//alert(cardObj[id].filter.item.length)
		if(filter.length == 0){
			$('#cs_id_' + id).fadeIn();
			listCardCount = cardCount;
			}
		else{
			isfilteredcard = false;
			
			
			for(j=0;j<cardObj[id].filter.item.length;j++){
				filter_item = cardObj[id].filter.item[j];
				if(filter.indexOf(filter_item) > -1){
					isfilteredcard = true;
					listCardCount++;
					}
				}
			if(isfilteredcard){
				$('#cs_id_' + id).fadeIn();
				
				}
			else{
				$('#cs_id_' + id).fadeOut();
				}
			}
		}
	
	//----move top list to 0 position
	var sc = getObject('top_list');
	pos = 0;
	var currx = ExtractNumber($('#top_list').css('left'));
	twn_top_list = new Tween(sc.style, 'left', Tween.strongEaseOut,currx,pos,.4,'px');
	twn_top_list.start();
	}
	
function setFilter(f, obj){
    console.log('filterCards() in compare');
	if(f == 'ALLCARDS'){
		filterArr = new Array();
		
		$("#filtertags li").removeClass("active");//.children("#filter_all_cards").addClass("active");
		$("#filter_all_cards").addClass("active");
		
		filterCards(filterArr);
		
		return;
		}
	else{
		
		$("#filter_all_cards").removeClass("active");
		
		}
	
	if(filterArr.indexOf(f) == -1){
		filterArr.push(f);
		$("#" + obj.parentNode.id).addClass("active");
		}
	else{
		filterArr.splice(filterArr.indexOf(f), 1);
		$("#" + obj.parentNode.id).removeClass("active");
		
		if(filterArr.length == 0){
			$("#filter_all_cards").addClass("active");
			}
		else{
			$("#filter_all_cards").removeClass("active");
			}
		}
		
	
	
	filterCards(filterArr);
	}
function refreshFilterlayout(){
	//alert(c_wid + ' - ' + filterWidths)
	c_hgt = document.documentElement.clientHeight;
	c_wid = document.documentElement.clientWidth;
	
	var availWid = c_wid >= 1000 ? 1000 : c_wid ;
	var tot_filter_wid = filterWidths.reduce(function(a, b) { return a + b; }, 0);
	
	if(availWid < tot_filter_wid){
		availWid = availWid - moreWidth;
		$('#filter_more_btn').css('display', 'block');
		}
	else{
		$('#filter_more_btn').css('display', 'none');
		}
	
	tmp_sum = 0;
	accom_count = filter_count;
	for(i=0;i<filter_count;i++){
		tmp_sum = tmp_sum + filterWidths[i];
		
		if(tmp_sum > availWid){
			accom_count = i;
			break;
			}
		}
	
	for(j=0;j<accom_count;j++){
		//alert('out ' + filter_btns[j])
		getObject('filter_container').appendChild(getObject(filter_btns[j]));
		}
	
	for(k=accom_count;k<filter_count;k++){
		//alert('in ' + filter_btns[k])
		getObject('filter_more_container').appendChild(getObject(filter_btns[k]));
		}
	}
//c_hgt = document.documentElement.clientHeight;
//c_wid = document.documentElement.clientWidth;

window.onresize = function(){
	if(c_hgt != document.documentElement.clientHeight || c_wid != document.documentElement.clientWidth){
		refreshFilterlayout();
		adjustContainerWidth();
		
		}
	c_hgt = document.documentElement.clientHeight;
	c_wid = document.documentElement.clientWidth;
	//alert("kjg");

	}

jQuery(function($){
	
	
	
	//var width = 0;
//	$('#compare-conainer > article').each(function() {
//		width += $(this).outerWidth( true );
//		});
	//$('#compare-conainer').css('width', width );

	
	if(String(document.location).indexOf('?')!= -1){
		var QS = String(document.location).split('?')[1];
		QSarr = QS.split("&");
		var QSobj = new Object();
		for(i=0;i<QSarr.length;i++){
			tmparr = QSarr[i].split("=");
			QSobj[tmparr[0]] = tmparr[1];
			}
		
		if(QSobj['cards'] !=  undefined){
			if(QSobj['cards'] != ''){
				selectedCards = QSobj['cards'].split(',');
				}
			}
		}
	
	cardCount = listCardCount = card_data.cards.card.length;
	cardObj = new Object();
	
	c_hgt = document.documentElement.clientHeight;
	c_wid = document.documentElement.clientWidth;
	
	listTopCards();
	
	moreWidth = ExtractNumber($('#filter_more_btn').css('width'));
	$('#filter_more_btn').css('display', 'none');
	
	for(i=0;i<filter_count;i++){
		filterWidths.push(ExtractNumber($('#' + filter_btns[i]).css('width')) + ExtractNumber($('#' + filter_btns[i]).css('margin-left')) + 9);
		}
	
	refreshFilterlayout();
});


