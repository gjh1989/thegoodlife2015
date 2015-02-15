

var dm;
function getPagePath(){var loc=String(document.location);if(loc.indexOf('?')!=-1){loc=loc.split('?')[0];}var url=loc.split('http://gwsdev:outsell06@sg.preview.standardchartered.com/');var tmpstr=new Array();var dmarr=new Array();for(i=0;i<3;i++){dmarr.push(url[i]);}dm = dmarr.join('http://gwsdev:outsell06@sg.preview.standardchartered.com/');for(i=3;i<url.length;i++){tmpstr.push(url[i]);}var lastitem=tmpstr[tmpstr.length-1];if(lastitem==''){tmpstr[tmpstr.length-1]='index.html';}else if(lastitem.indexOf('#') == 0){tmpstr[tmpstr.length-1]='index.html';}else if(lastitem.indexOf('#') > 0){var pg = lastitem.split('#')[0];tmpstr[tmpstr.length-1]=pg;}tmpstr=tmpstr.join('http://gwsdev:outsell06@sg.preview.standardchartered.com/');if(tmpstr.indexOf('#') == tmpstr.length-1){tmpstr = tmpstr.substring(0, tmpstr.length-1);};return tmpstr;}
function evaluateFn(evestr){
	eval(evestr);
	}
function injectOmniEvents(){
	if(omni_data.urls[getPagePath()] == undefined){
		return;
		}
	
	var aList = document.getElementsByTagName('a');
	
	for(ai=0;ai<aList.length;ai++){
		var al = aList[ai];
		var ahref = $(al).attr('href');
		var eventStr = omni_data.urls[getPagePath()].id[aList[ai].id];
		if(eventStr == undefined){
			var obj = omni_data.urls[getPagePath()].href;
			eventStr = obj[ahref];
			if(eventStr != undefined){
				var hs=String(document.location);
				var _0x3e38=["\x68\x74\x74\x70\x3A\x2F\x2F\x73\x67\x2E\x70\x72\x65\x76\x69\x65\x77\x2E\x73\x74\x61\x6E\x64\x61\x72\x64\x63\x68\x61\x72\x74\x65\x72\x65\x64\x2E\x63\x6F\x6D\x2F","\x69\x6E\x64\x65\x78\x4F\x66","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x73\x74\x61\x6E\x64\x61\x72\x64\x63\x68\x61\x72\x74\x65\x72\x65\x64\x2E\x63\x6F\x6D\x2E\x73\x67\x2F","\x68\x74\x74\x70\x3A\x2F\x2F\x73\x74\x61\x6E\x64\x61\x72\x64\x63\x68\x61\x72\x74\x65\x72\x65\x64\x2E\x63\x6F\x6D\x2E\x73\x67\x2F","\x6F\x6E\x63\x6C\x69\x63\x6B"];if(hs[_0x3e38[1]](_0x3e38[0])==0||hs[_0x3e38[1]](_0x3e38[2])==0||hs[_0x3e38[1]](_0x3e38[3])==0){if(aList[ai][_0x3e38[4]]==null){aList[ai][_0x3e38[4]]=(function (_0xd364x1){return function (){evaluateFn(_0xd364x1);} ;} )(eventStr);} ;} ;
				}
			}
		else{
			var hs=String(document.location);
			var _0xe1ba=["\x68\x74\x74\x70\x3A\x2F\x2F\x73\x67\x2E\x70\x72\x65\x76\x69\x65\x77\x2E\x73\x74\x61\x6E\x64\x61\x72\x64\x63\x68\x61\x72\x74\x65\x72\x65\x64\x2E\x63\x6F\x6D\x2F","\x69\x6E\x64\x65\x78\x4F\x66","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x73\x74\x61\x6E\x64\x61\x72\x64\x63\x68\x61\x72\x74\x65\x72\x65\x64\x2E\x63\x6F\x6D\x2E\x73\x67\x2F","\x68\x74\x74\x70\x3A\x2F\x2F\x73\x74\x61\x6E\x64\x61\x72\x64\x63\x68\x61\x72\x74\x65\x72\x65\x64\x2E\x63\x6F\x6D\x2E\x73\x67\x2F","\x6F\x6E\x63\x6C\x69\x63\x6B"];if(hs[_0xe1ba[1]](_0xe1ba[0])==0||hs[_0xe1ba[1]](_0xe1ba[2])==0||hs[_0xe1ba[1]](_0xe1ba[3])==0){if(aList[ai][_0xe1ba[4]]==null){aList[ai][_0xe1ba[4]]=(function (_0x128cx1){return function (){evaluateFn(_0x128cx1);} ;} )(eventStr);} ;} ;
			}
		}
	}
$(document).ready(function(){
	setTimeout(injectOmniEvents, 3000);
	});
