var cardCount;
var selectedCards = new Array();
var cardObj;
var filterArr = new Array();

var expandCardid;

if (!Array.prototype.indexOf)
{
    Array.prototype.indexOf = function(elt /*, from*/) {
        var len = this.length;

        var from = Number(arguments[1]) || 0;
        from = (from < 0)
            ? Math.ceil(from)
            : Math.floor(from);
        if (from < 0)
            from += len;

        for (; from < len; from++) {
            if (from in this && this[from] === elt)
                return from;
        }

        return -1;
    };
}

if (!Array.prototype.reduce)
{
    Array.prototype.reduce = function(fun /*, initial*/) {
        var len = this.length;

        if (typeof fun != "function")
            throw new TypeError();

        // no value to return if no initial value and an empty array
        if (len == 0 && arguments.length == 1)
            throw new TypeError();

        var i = 0;

        if (arguments.length >= 2) {
            var rv = arguments[1];
        } else {
            do {
                if (i in this) {
                    rv = this[i++];
                    break;
                }
                
                // if array contains no values, no initial value to return
                if (++i >= len)
                    throw new TypeError();
            } while (true);
        }

        for (; i < len; i++) {
            if (i in this)
                rv = fun.call(null, rv, this[i], i, this);
        }

        return rv;
    };
}

function getObject(a){return document.getElementById(a)}

function loadComparePage(){
    document.location = 'credit-card-comparefe5f.html?cards=' + selectedCards;
}

function addCard(id){
	/*$('#creditcardsmalllist').append(getObject('TILE_SMALL_CARD').innerHTML).fadeIn();
		
	getObject('cs_title').innerHTML = cardObj[id].title;
	getObject('card_small_img').src = 'assets/pws/images/credit-cards/' + cardObj[id].img;
	
	getObject('cs_id').id = 'cs_id_' + id;
	
	getObject('cs_title').id = 'cs_title_' + id;
	getObject('card_small_img').id = 'card_small_img_' + id;
	getObject('cs_close').id = 'cs_close_' + id;*/
	
	$('#selectedcardlist').append(getObject('TILE_SELECTED_CARD_LIST').innerHTML).fadeIn();
	getObject('cslist_title').innerHTML = cardObj[id].title;
	
	getObject('cslist_id').id = 'cslist_id_' + id;
	
	getObject('cslist_title').id = 'cslist_title_' + id;
	getObject('cslist_close').id = 'cslist_close_' + id;
}

function removeCard(id){
	//$('#cs_id_' + id).detach();

    $('#cslist_id_' + id).detach();
}

function selectCard(chkbox){
	var id = chkbox.id.split('_')[2];
	
	if(selectedCards.indexOf(id) == -1){
		selectedCards.push(id);
		chkbox.className  = 'compare compare-on';
		chkbox.innerHTML = 'Selected';
		addCard(id);
	}
	else{
		selectedCards.splice(selectedCards.indexOf(id), 1);
		chkbox.className  = 'compare';
		chkbox.innerHTML = 'Click to compare';
		removeCard(id);
	}
	
	showHideSmallCardList();
}
	
function selectCardFromPopup(chkbox){
	var id = expandCardid;
	
	if(selectedCards.indexOf(id) == -1){
		selectedCards.push(id);
		chkbox.className  = 'compare compare-on';
		getObject('check_box_' + id).className  = 'compare compare-on';
		getObject('check_box_' + id).innerHTML = 'Selected';
		chkbox.innerHTML = 'Selected';
		addCard(id);
	}
	else{
		selectedCards.splice(selectedCards.indexOf(id), 1);
		chkbox.className  = 'compare';
		getObject('check_box_' + id).className  = 'compare';
		getObject('check_box_' + id).innerHTML = 'Click to compare';
		chkbox.innerHTML = 'Click to compare';
		removeCard(id);
	}
		
	showHideSmallCardList();
}
	
function deselectCard(chkbox){
	var id = chkbox.id.split('_')[2];
	
	if(selectedCards.indexOf(id) == -1){
		
	}
	else{
		selectedCards.splice(selectedCards.indexOf(id), 1);
		getObject('check_box_' + id).className  = 'compare';
		getObject('check_box_' + id).innerHTML = 'Click to compare';
		removeCard(id);
	}
	
	showHideSmallCardList();
}
	
function cardRollOver(obj){
	var id = obj.id.split('_')[1];
	getObject('expand_btn_' + id).style.visibility = 'visible';
}
	
function cardRollOut(obj){
	var id = obj.id.split('_')[1];
	getObject('expand_btn_' + id).style.visibility = 'hidden';
}
	
function showHideSmallCardList(){
	if(selectedCards.length == 0){
		$('.select-card-holder').slideUp();
		$('#compare-btn-holder').hide();
		$('#selectedcardlist_stat').html('No cards selected');
	}
	else{
		$('.select-card-holder').slideDown();
		
		if(selectedCards.length > 1){
			$('#compare-btn-holder').fadeIn();
		}
		else{
			$('#compare-btn-holder').fadeOut();
		}
		$('#selectedcardlist_stat').html(selectedCards.length + ' card' + (selectedCards.length > 1 ? 's' : '') + ' selected');
	}
}

function filterCards(filter){
	for(i=0;i<cardCount;i++){
		var id = card_data.cards.card[i].id;
		
		//alert(cardObj[id].filter.item.length)
		if(filter.length == 0){
			//$('#cardid_' + id).show();
			
			$('#searchTempContainer').html('');
			
			if(getObject('cardid_' + id) == null) {
				$('#searchTempContainer').append(getObject('TILE_MAIN_CARD').innerHTML);
			
				getObject('title').innerHTML = cardObj[id].title;
				getObject('sub_txt').innerHTML = cardObj[id].sub_txt;
				getObject('b_txt1').innerHTML = cardObj[id].b_txt1;
				getObject('b_txt2').innerHTML = cardObj[id].b_txt2;
				getObject('b_txt3').innerHTML = cardObj[id].b_txt3;
				getObject('card_img').src = cardObj[id].img;
				//getObject('apply_now_btn').href = cardObj[id].applynow;
				
				if(cardObj[id].applynow == '#'){
						getObject('per-cc-ccl{id}').innerHTML = 'Invitation Only';
				}
				
				
				for(j=0;j<cardObj[id].filter.item.length;j++){
					$('#cardid').addClass(cardObj[id].filter.item[j].toLowerCase());
				}

				getObject('cardid').id = 'cardid_' + id;
				
				getObject('title').id = 'title_' + id;
				getObject('sub_txt').id = 'sub_txt_' + id;
				getObject('b_txt1').id = 'b_txt1_' + id;
				getObject('b_txt2').id = 'b_txt2_' + id;
				getObject('b_txt3').id = 'b_txt3_' + id;
				getObject('card_img').id = 'card_img_' + id;
				getObject('per-cc-ccl{id}').id = getObject('per-cc-ccl{id}').id.replace('{id}', id);
				getObject('check_box').id = 'check_box_' + id;
				getObject('expand_btn').id = 'expand_btn_' + id;
				
				$creditcards.isotope( 'insert', $('#cardid_' + id) )
			}
			
		} else {
			isfilteredcard = false;
			for(j=0;j<cardObj[id].filter.item.length;j++) {
				filter_item = cardObj[id].filter.item[j];
				if(filter.indexOf(filter_item) > -1){
					isfilteredcard = true;
	            }
            }

			if(isfilteredcard){
				//$('#cardid_' + id).show();
				
				$('#searchTempContainer').html('');
			
				if(getObject('cardid_' + id) == null){
					$('#searchTempContainer').append(getObject('TILE_MAIN_CARD').innerHTML);
				
					getObject('title').innerHTML = cardObj[id].title;
					getObject('sub_txt').innerHTML = cardObj[id].sub_txt;
					getObject('b_txt1').innerHTML = cardObj[id].b_txt1;
					getObject('b_txt2').innerHTML = cardObj[id].b_txt2;
					getObject('b_txt3').innerHTML = cardObj[id].b_txt3;
					getObject('card_img').src = cardObj[id].img;
					//getObject('apply_now_btn').href = cardObj[id].applynow;
					
					if(cardObj[id].applynow == ''){
						//getObject('apply_now_btn').style.visibility = 'hidden';
					}
					
					for(j=0;j<cardObj[id].filter.item.length;j++){
						$('#cardid').addClass(cardObj[id].filter.item[j].toLowerCase());
					}
					
					
					getObject('cardid').id = 'cardid_' + id;
					
					getObject('title').id = 'title_' + id;
					getObject('sub_txt').id = 'sub_txt_' + id;
					getObject('b_txt1').id = 'b_txt1_' + id;
					getObject('b_txt2').id = 'b_txt2_' + id;
					getObject('b_txt3').id = 'b_txt3_' + id;
					getObject('card_img').id = 'card_img_' + id;
					getObject('per-cc-ccl{id}').id = getObject('per-cc-ccl{id}').id.replace('{id}', id);
					getObject('check_box').id = 'check_box_' + id;
					getObject('expand_btn').id = 'expand_btn_' + id;
					
					$creditcards.isotope( 'insert', $('#cardid_' + id) )
				}
				
			} else {
				//$('#cardid_' + id).hide();
				$creditcards.isotope( 'remove', $('#cardid_' + id) );
			}
		}
    }

    // Set click events on Apply Now buttons after cards are filtered
    setApplyNowLinkClickEvent();
    //injectCTAparams();
	injectCTAparams2();
}
	
function setFilter(f, obj){
	//alert(f)
	if(f == 'ALLCARDS'){
		filterArr = new Array();
		filterCards(filterArr);
		$("#filtertags li").removeClass("active").children("#filter_all_cards").addClass("active");
		return;
	}
	else{
		$("#filter_all_cards").removeClass("active");
	}
	
	if(filterArr.indexOf(f) == -1){
		filterArr.push(f);
	}
	else{
		filterArr.splice(filterArr.indexOf(f), 1);
		
		if(filterArr.length == 0){
			$("#filter_all_cards").addClass("active");
		}
		else{
			$("#filter_all_cards").removeClass("active");
		}
	}
	
	//alert(filterArr)
	filterCards(filterArr);
}
	
function onCardClick(id){
	// console.log(cardObj[id].viewdetails);
	window.location.href = cardObj[id].viewdetails;
/*
	expandCardid = id;
	var ctaName = "per-cc-ccl" + id;
	
	getObject('detailpop_title').innerHTML = cardObj[id].title;
	// getObject('detailpop_sub_txt').innerHTML = cardObj[id].sub_txt;
	getObject('detailpop_b_txt1').innerHTML = cardObj[id].b_txt1;
	getObject('detailpop_b_txt2').innerHTML = cardObj[id].b_txt2;
	getObject('detailpop_b_txt3').innerHTML = cardObj[id].b_txt3;
	
	if(cardObj[id].b_txt3 == ''){
		$('#detailpop_b_txt3').css('visibility', 'hidden');
	}
	else{
		$('#detailpop_b_txt3').css('visibility', 'visible');
	}
	
	getObject('detailpop_img').src = cardObj[id].img;
	$('#detailpop_applynow_btn + p').remove();
	if(cardObj[id].applynow == '#'){
		//getObject('detailpop_applynow_btn').style.display = 'none';
		if (cta_data.urls[current_location_key][ctaName].apply_now != "") {
			getObject('detailpop_applynow_btn').innerHTML = 'Invitation Only';
			getObject('detailpop_applynow_btn').style.display = 'block';
		}
		else {
			$('#detailpop_applynow_btn').after("<p class='invite-only' style='text-align:center'>By Invitation Only</p>");
			getObject('detailpop_applynow_btn').style.display = 'none';
		}
	}
	else{
		getObject('detailpop_applynow_btn').style.display = 'block';
		getObject('detailpop_applynow_btn').innerHTML = 'Apply Now';
	}
	
	$('#detailpop_applynow_btn').attr('data-apply-now-existing','');
	$('#detailpop_applynow_btn').attr('data-apply-now-b','');
	$('#detailpop_applynow_btn').attr('data-apply-now-existing-b','');
	//getObject('detailpop_applynow_btn').href = cardObj[id].applynow;
	getObject('detailpop_applynow_btn').href = cta_data.urls[current_location_key][ctaName].apply_now;
	if (cta_data.urls[current_location_key][ctaName].apply_now_existing !== '') {
			$('#detailpop_applynow_btn').attr('data-apply-now-existing', cta_data.urls[current_location_key][ctaName].apply_now_existing);
	}
	if (cta_data.urls[current_location_key][ctaName].apply_now_b !== '') {
			$('#detailpop_applynow_btn').attr('data-apply-now-b', cta_data.urls[current_location_key][ctaName].apply_now_b);
	}
	if (cta_data.urls[current_location_key][ctaName].apply_now_existing_b !== '') {
			$('#detailpop_applynow_btn').attr('data-apply-now-existing-b', cta_data.urls[current_location_key][ctaName].apply_now_existing_b);
	}
	if (cta_data.urls[current_location_key][ctaName].data_id !== '') {
			$('#detailpop_applynow_btn').attr('data-id', cta_data.urls[current_location_key][ctaName].data_id);
	}
	getObject('detailpop_viewdetails_btn').href = cardObj[id].viewdetails;
	
	if(selectedCards.indexOf(id) == -1){
		getObject('detailpop_check_box').className  = 'compare';
		getObject('detailpop_check_box').innerHTML  = 'Click to compare';
	}
	else{
		getObject('detailpop_check_box').className  = 'compare compare-on';
		getObject('detailpop_check_box').innerHTML  = 'Selected';
	}
*/
}

function expandDetails(btnobj){
	var id = btnobj.id.split('_')[2];
	onCardClick(id);
}
	
function onTitleClick(btnobj){
	var id = btnobj.id.split('_')[1];
	onCardClick(id);
	//$('#expand_modal').reveal({animation: 'fade', closeOnBackgroundClick: false});
}
	
function onSearchTextChange(txtobj){
	var stxt = txtobj.value.toLowerCase();
	
	for(i=0;i<cardCount;i++){
		var id = card_data.cards.card[i].id;
		var ct = cardObj[id].title.toLowerCase();
		
		if(ct.indexOf(stxt) > -1){
			$('#searchTempContainer').html('');
			
			if(getObject('cardid_' + id) == null){
				$('#searchTempContainer').append(getObject('TILE_MAIN_CARD').innerHTML);
			
				getObject('title').innerHTML = cardObj[id].title;
				getObject('sub_txt').innerHTML = cardObj[id].sub_txt;
				getObject('b_txt1').innerHTML = cardObj[id].b_txt1;
				getObject('b_txt2').innerHTML = cardObj[id].b_txt2;
				getObject('b_txt3').innerHTML = cardObj[id].b_txt3;
				getObject('card_img').src = cardObj[id].img;
				//getObject('apply_now_btn').href = cardObj[id].applynow;
				
				//if(cardObj[id].applynow == ''){
					//getObject('apply_now_btn').style.visibility = 'hidden';
				//}
				
				if(cardObj[id].applynow == '#'){
						getObject('per-cc-ccl{id}').innerHTML = 'Invitation Only';
				}
				
				for(j=0;j<cardObj[id].filter.item.length;j++){
					$('#cardid').addClass(cardObj[id].filter.item[j].toLowerCase());
				}
				
				
				getObject('cardid').id = 'cardid_' + id;
				
				getObject('title').id = 'title_' + id;
				getObject('sub_txt').id = 'sub_txt_' + id;
				getObject('b_txt1').id = 'b_txt1_' + id;
				getObject('b_txt2').id = 'b_txt2_' + id;
				getObject('b_txt3').id = 'b_txt3_' + id;
				getObject('card_img').id = 'card_img_' + id;
				getObject('per-cc-ccl{id}').id = getObject('per-cc-ccl{id}').id.replace('{id}', id);
				getObject('check_box').id = 'check_box_' + id;
				getObject('expand_btn').id = 'expand_btn_' + id;
				
				$creditcards.isotope( 'insert', $('#cardid_' + id) );
			}
			
		}
		else{
			$creditcards.isotope( 'remove', $('#cardid_' + id) );
		}
	}
}

function listCards(){
	for(i=0;i<cardCount;i++){
		var id = card_data.cards.card[i].id;
		
		if (i == 0) {
			$('#creditcardlist').append(getObject('TILE_MAIN_CARD_PROMO_1').innerHTML);
		}
		if (i==6 && getObject('TILE_MAIN_CARD_PROMO_2')) {
			$('#creditcardlist').append(getObject('TILE_MAIN_CARD_PROMO_2').innerHTML);
		}
		cardObj[id] = card_data.cards.card[i];
		
		$('#creditcardlist').append(getObject('TILE_MAIN_CARD').innerHTML);
		
		
		getObject('title').innerHTML = cardObj[id].title;
		getObject('sub_txt').innerHTML = cardObj[id].sub_txt;
		getObject('b_txt1').innerHTML = cardObj[id].b_txt1;
		getObject('b_txt2').innerHTML = cardObj[id].b_txt2;
		getObject('b_txt3').innerHTML = cardObj[id].b_txt3;
		getObject('card_img').src = cardObj[id].img;
		getObject('per-cc-ccl{id}').title = cardObj[id].title;
		
		if(cardObj[id].applynow == '#'){
		    //getObject('cta-ccccl{id}-btn').style.visibility = 'hidden';
				getObject('per-cc-ccl{id}').innerHTML = 'Invitation Only';
		}
		
		for(j=0;j<cardObj[id].filter.item.length;j++){
			$('#cardid').addClass(cardObj[id].filter.item[j].toLowerCase());
		}
		
		getObject('cardid').id = 'cardid_' + id;
		
		getObject('title').id = 'title_' + id;
		getObject('sub_txt').id = 'sub_txt_' + id;
		getObject('b_txt1').id = 'b_txt1_' + id;
		getObject('b_txt2').id = 'b_txt2_' + id;
		getObject('b_txt3').id = 'b_txt3_' + id;
		getObject('card_img').id = 'card_img_' + id;
		getObject('per-cc-ccl{id}').id = getObject('per-cc-ccl{id}').id.replace('{id}', id);
		getObject('check_box').id = 'check_box_' + id;
		getObject('expand_btn').id = 'expand_btn_' + id;
	}

	$('a.compare').click(function(obj){
		return false;
	});
}
	
var c_wid;
var c_hgt;

var filter_btns = new Array('filter_all_cards', 'filter_cashback', 'filter_rewards' , 'filter_travel', 'filter_shopping' , 'filter_insurance_premium', 'filter_platinum');
var filter_count = filter_btns.length;
var filterWidths = new Array();
var moreWidth;

function ExtractNumber(a) {
    var b = parseInt(a); 
    return b == null || isNaN(b) ? 0 : b
}

function refreshFilterlayout(){
	var availWid = c_wid >= 1000 ? 1000 : c_wid -110 ;
	var tot_filter_wid = filterWidths.reduce(function(a, b) { return a + b; }, 0);
	if(availWid < tot_filter_wid){
		availWid = availWid - moreWidth ;
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

function tileCardsAll(){
    cardCount = card_data.cards.card.length;
	cardObj = new Object();
//	filterArr = new Array();
	listCards();
	
	
	c_hgt = document.documentElement.clientHeight;
	c_wid = document.documentElement.clientWidth;
	
	moreWidth = ExtractNumber($('#filter_more_btn').css('width'));
	$('#filter_more_btn').css('display', 'none');
	
	for(i=0;i<filter_count;i++){
		//alert(ExtractNumber($('#' + filter_btns[i]).css('width')))
		filterWidths.push(ExtractNumber($('#' + filter_btns[i]).css('width')) + ExtractNumber($('#' + filter_btns[i]).css('margin-left')) + 9);
	}
	
	refreshFilterlayout();
}
	
window.onresize = function(){
	if(c_hgt != document.documentElement.clientHeight || c_wid != document.documentElement.clientWidth){
		refreshFilterlayout();
	}
	c_hgt = document.documentElement.clientHeight;
	c_wid = document.documentElement.clientWidth;
}

$("#selectedcardlist_stat").live("click", function(){
    $(".selected-cards-dropdown").fadeToggle();
    $(this).toggleClass("active")
});

var delay;
var qs_filter;

function ondelaycomplete(){
	switch(qs_filter){
		case 'shopping':
			setFilter('SHOPPING', '');
			$("#filter_shopping").addClass("active");
			break;
		case 'cashback':
			setFilter('CASHBACK', '');
			$("#filter_cashback").addClass("active");
			break;
		case 'rewards':
			setFilter('REWARDS', '');
			$("#filter_rewards").addClass("active");
			break;
		case 'insurance':
			setFilter('INSURANCE_PREMIUM', '');
			$("#filter_insurance_premium").addClass("active");
			break;
		case 'platinum':
			setFilter('PLATINUM', '');
			$("#filter_platinum").addClass("active");
			break;
		case 'travel':
			setFilter('TRAVEL', '');
			$("#filter_travel").addClass("active");
			break;
	}
	
	clearInterval(delay);
}

function sanitize(key,val) {
    var encoded = val;
    encoded = encoded.replace(/<script>/gi,"");
    encoded = encoded.replace(/<\/script>/gi,"");
    encoded = encoded.replace(/<script\/>/gi,"");
    if(encoded.match(/%3C/))  { encoded = encoded.replace(/%3C/gi,""); }
    if(encoded.match(/%3E/))  { encoded = encoded.replace(/%3E/gi,""); };
    if(encoded.match(/&lt/))  { encoded = encoded.replace(/&lt/gi,""); }
    if(encoded.match(/&gt/))  { encoded = encoded.replace(/&gt/gi,""); };
    if(encoded.match(/&quot/)){ encoded = encoded.replace(/&quot/gi,""); };
    if(encoded.match(/&amp/)) { encoded = encoded.replace(/&amp/gi,""); };
    if(encoded.match(/&#40/)) { encoded = encoded.replace(/&#40/gi,""); };
    if(encoded.match(/&#41/)) { encoded = encoded.replace(/&#41/gi,""); };
    if (key == 'sort') { encoded = encoded.replace(/[();<>+'"&?]/gi,""); }
    else { encoded =  encoded.replace(/[();<>+'%"&?]/gi,"");}
    if(encoded.match(/%3Cscript%3E/)){ encoded = encoded.replace(/%3Cscript%3E/gi,"");}
    if(encoded.match(/script/)){ encoded = encoded.replace(/script/gi,""); }
    return encoded;
}

$(function () {
	tileCardsAll();
	
	if(String(document.location).indexOf('?')!= -1){
		var QS = String(document.location).split('?')[1];
		QSarr = QS.split("&");
		var QSobj = new Object();
		for(i=0;i<QSarr.length;i++){
			tmparr = QSarr[i].split("=");
			varval = decodeURIComponent(tmparr[1]);
			varval = varval.replace("+"," ");
			QSarr[i] = tmparr[0] + "=" + sanitize(tmparr[0], varval); 
			
			QSobj[tmparr[0]] = sanitize(tmparr[0], varval);
			//QSobj[tmparr[0]] = tmparr[1];
		}
		
		if(QSobj['filter'] !=  undefined){
			if(QSobj['filter'] != ''){
				qs_filter = QSobj['filter'];
				delay = setInterval(ondelaycomplete, 500);
		    }
	    }
    }
});

var currently_selected_card;

$(window).load(function () {
    setApplyNowLinkClickEvent();
		setDetailPopApplyNowClickEvent();
});

function setApplyNowLinkClickEvent() {
    $('.apply-now').unbind('click').click(function (ev) {
        getCurrentlySelectedCard($(this).attr('data-id'));

console.log($(this).attr('data-id'))

        if (currently_selected_card != null) {
            ev.preventDefault();

            currently_selected_card.applynow = ($(this).attr('href') != null) ? $(this).attr('href') : '';
            currently_selected_card.applynowexisting = ($(this).attr('data-apply-now-existing') != null) ? $(this).attr('data-apply-now-existing') : '';
            currently_selected_card.applynow2 = ($(this).attr('data-apply-now-b') != null) ? $(this).attr('data-apply-now-b') : '';
            currently_selected_card.applynowexisting2 = ($(this).attr('data-apply-now-existing-b') != null) ? $(this).attr('data-apply-now-existing-b') : '';

            if (currently_selected_card.applynow2 != '') {
                launchTwoCardApplicationPopup();
            } else if (currently_selected_card.applynowexisting != '') {
                launchStandardCardApplicationPopup()
            } else {
								//if ($(this).text() == "By Invitation Only")
									//document.location.href = currently_selected_card.applynow;
								//else
									window.open(currently_selected_card.applynow, "_pdf");
						}
        }
    });
}

function setDetailPopApplyNowClickEvent() {
	$('#detailpop_applynow_btn').unbind('click').click(function (ev) {
        getCurrentlySelectedCard($(this).attr('data-id'));

        if (currently_selected_card != null) {
            ev.preventDefault();

            currently_selected_card.applynow = ($(this).attr('href') != null) ? $(this).attr('href') : '';
            currently_selected_card.applynowexisting = ($(this).attr('data-apply-now-existing') != null) ? $(this).attr('data-apply-now-existing') : '';
            currently_selected_card.applynow2 = ($(this).attr('data-apply-now-b') != null) ? $(this).attr('data-apply-now-b') : '';
            currently_selected_card.applynowexisting2 = ($(this).attr('data-apply-now-existing-b') != null) ? $(this).attr('data-apply-now-existing-b') : '';

            if (currently_selected_card.applynow2 != '') {
                launchTwoCardApplicationPopup();
            } else if (currently_selected_card.applynowexisting != '') {
                launchStandardCardApplicationPopup()
            } else {
								//if ($(this).text() == "By Invitation Only")
									//document.location.href = currently_selected_card.applynow;
								//else
									window.open(currently_selected_card.applynow, "_pdf");
						}
        }
    });
}

function getCurrentlySelectedCard(id) {
    for (i = 0; i < card_data.cards.card.length; i++) {
        if (id == card_data.cards.card[i].id) {
            currently_selected_card = card_data.cards.card[i];
						break;
        }
    }
}

function launchStandardCardApplicationPopup(selected_card_number) {
    var popup_title;
    var apply_now_current;
    var apply_now_new;

    // Choose which card should be loaded into the popup
    switch (selected_card_number) {
        case '1':
            popup_title = currently_selected_card.titlecard1;
            apply_now_current = currently_selected_card.applynowexisting;
            apply_now_new = currently_selected_card.applynow;
            break;
        case '2':
            popup_title = currently_selected_card.titlecard2;
            apply_now_current = currently_selected_card.applynowexisting2;
            apply_now_new = currently_selected_card.applynow2;
            break;
        default:
            popup_title = currently_selected_card.title;
            apply_now_current = currently_selected_card.applynowexisting;
            apply_now_new = currently_selected_card.applynow;
            break;
    }

    $('#existing-customer-title').html(popup_title);

    // Set up popup events based in selected card
    $('#exisiting-customer-next').unbind('click').click(function (ev) {
        ev.preventDefault();

        var is_existing_customer = $('input[name=existingCardHolder]:checked', '#existingCustomerPopup').val();

        if (is_existing_customer == null || is_existing_customer == '') {
            alert('Please select yes or no');
            return;
        } else if (is_existing_customer == 'YES') {
            launchChangeOfIncomePopup(apply_now_current, apply_now_new);
        } else if (is_existing_customer == 'NO') {
            //document.location.href = apply_now_new;
			$(this).trigger('reveal:close');
			window.open(apply_now_new, "_form");
        }
    });

    $('#existingCustomerPopup').reveal({ animation: 'fade', closeOnBackgroundClick: true });
}

function launchChangeOfIncomePopup(apply_now_current, apply_now_new) {
    $('#changed-income-title').html(currently_selected_card.title);

    $('#changed-income-proceed').unbind('click').click(function (ev) {
        ev.preventDefault();
        var has_changed_income = $('input[name=changedIncome]:checked', '#changedIncomePopup').val();

        if (has_changed_income == null || has_changed_income == '') {
            alert('Please select yes or no');
            return;
        } else if (has_changed_income == 'YES') {
			//document.location.href = apply_now_new;
			$(this).trigger('reveal:close');
			window.open(apply_now_new, "_form");
        } else if (has_changed_income == 'NO') {
            //document.location.href = apply_now_current;
			$(this).trigger('reveal:close');
			window.open(apply_now_current, "_form");
        }
    });

    $('#changedIncomePopup').reveal({ animation: 'fade', closeOnBackgroundClick: true });
}

function launchTwoCardApplicationPopup() {
    // Populate fields in popup
    $('#choose-card-title').html(currently_selected_card.title);
    $('#choose-card-img-1').attr('src', currently_selected_card.img2);
    $('#choose-card-img-2').attr('src', currently_selected_card.img3);
    $('#choose-card-name-1').html(currently_selected_card.titlecard1);
    $('#choose-card-name-2').html(currently_selected_card.titlecard2);

    $('#choose-card-apply').unbind('click').click(function (ev) {
        ev.preventDefault();
        var card_chosen = $('input[name=chooseCard]:checked', '#chooseCardPopup').val();

        if (card_chosen == null || card_chosen == '') {
            alert('Please select your card');
            return;
        } else {
            launchStandardCardApplicationPopup(card_chosen);
        }
    });

    $('#chooseCardPopup').reveal({ animation: 'fade', closeOnBackgroundClick: true });
}