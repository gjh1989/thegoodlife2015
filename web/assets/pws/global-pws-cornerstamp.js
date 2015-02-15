 
/* $.Isotope.prototype._masonryResizeChanged = function () {
    return true;
};

$.Isotope.prototype._masonryReset = function () {
    // layout-specific props
    this.masonry = {};
    this._getSegments();
    var i = this.masonry.cols;
    this.masonry.colYs = [];
    while (i--) {
        this.masonry.colYs.push(0);
    }
    if (this.options.masonry.cornerStampSelector) {
        var $cornerStamp = this.element.find(this.options.masonry.cornerStampSelector),
            stampWidth = $cornerStamp.outerWidth(true) - (this.element.width() % this.masonry.columnWidth),
            cornerCols = Math.ceil(stampWidth / this.masonry.columnWidth),
            cornerStampHeight = $cornerStamp.outerHeight(true);
        for (i = Math.max(this.masonry.cols - cornerCols, cornerCols); i < this.masonry.cols; i++) {
            this.masonry.colYs[i] = cornerStampHeight;
        }
    }
	
	
};*/

var csEntryArr = new Array();
csEntryArr.push('index.html');
csEntryArr.push('en/index.html');
csEntryArr.push('zh/index.html');
csEntryArr.push('pk/index.html');
csEntryArr.push('ke/index.html');
csEntryArr.push('ng/index.html');
csEntryArr.push('id/index.html');
csEntryArr.push('id/en/index.html');
csEntryArr.push('gh/index.html');
csEntryArr.push('bw/index.html');
csEntryArr.push('zm/index.html');
csEntryArr.push('ae/index.html');
csEntryArr.push('tw/index.html');
csEntryArr.push('tw/en/index.html');
csEntryArr.push('in/index.html');
csEntryArr.push('my/index.html');
csEntryArr.push('cn/index.html');
csEntryArr.push('cn/en/index.html');
csEntryArr.push('hk/index.html');
csEntryArr.push('hk/zh/index.html');
csEntryArr.push('sg/index.html');
 
 
if(csEntryArr.indexOf(getPagePath()) > -1){
        $.Isotope.prototype._masonryResizeChanged=function(){return true};$.Isotope.prototype._masonryReset=function(){this.masonry={};this._getSegments();var i=this.masonry.cols;this.masonry.colYs=[];while(i--){this.masonry.colYs.push(0)}if(this.options.masonry.cornerStampSelector){var $cornerStamp=this.element.find(this.options.masonry.cornerStampSelector),stampWidth=$cornerStamp.outerWidth(true)-(this.element.width()%this.masonry.columnWidth),cornerCols=Math.ceil(stampWidth/this.masonry.columnWidth),cornerStampHeight=$cornerStamp.outerHeight(true);for(i=Math.max(this.masonry.cols-cornerCols,cornerCols);i<this.masonry.cols;i++){this.masonry.colYs[i]=cornerStampHeight}}};
        }