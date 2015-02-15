function getSubChanCode() {
	var subChanCookie = $.cookie('subChanCookie');
	var subChanCode = jQuery.query.get("subChanCode")+"";
	if( subChanCode != "" && subChanCode != "true" && subChanCode != "undefined" ) {
		//$.cookie('subChanCookie', null);
		//$.cookie('subChanCookie', subChanCode, { expires: 30, path: '/', domain: 'sg.preview.standardchartered.com', secure: false });
		//$.cookie('subChanCookie', subChanCode, { expires: 30, path: '/', domain: 'standardchartered.com', secure: false });
		//$.cookie('subChanCookie', subChanCode, { expires: 30, path: '/', domain: 'scb-sg.pwwasia3.com', secure: false });
		$.cookie('subChanCookie', subChanCode, { expires: 30, path: '/', domain: 'sc.com', secure: true });
		//$.cookie('subChanCookie', subChanCode, { expires: 30, path: '/', domain: 'standardchartered.com.sg', secure: false });
	} else if( subChanCookie != null && subChanCookie != "" ) {
		subChanCode = subChanCookie;
	} else {
		subChanCode = "";
	}
	$('.formlink').each(function(){
		if( $(this).attr('href').split('.')[0] == 'https://forms/' ){
			if( $(this).attr('href').indexOf("?") == -1 ) {
				$(this).attr('href', $(this).attr('href')+'?subChanCode='+subChanCode);				
			} else if( $(this).attr('href').indexOf("&subChanCode=") == -1 ) {
				$(this).attr('href', $(this).attr('href')+'&subChanCode='+subChanCode);	
			}
		}
	});
	return subChanCode;
}
