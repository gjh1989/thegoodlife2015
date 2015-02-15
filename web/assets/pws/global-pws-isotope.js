
  var $creditcards = $('#creditcardlist');
  var $pinboard = $('#pinboard');
  
$(function () {
    $pinboard.imagesLoaded( function(){
    $pinboard.isotope({
        itemSelector: '.pinned-items',
		
		getSortData : {
			sort_update : function( $elem ) {
				return parseInt( $elem.find('.sort_update').text(), 10 );
				},
		 
			sort_popular : function( $elem ) {
				return parseInt( $elem.find('.sort_popular').text(), 10 );
				},
				
			sort_recommend : function( $elem ) {
				return parseInt( $elem.find('.sort_recommend').text(), 10 );
				}
			},
		
        masonry: {
            cornerStampSelector: '.corner-stamp'
        }
    });});
	//$pinboard.isotope('reLayout');
    var $optionSets = $('#tagOptions .option-set'),
        $optionLinks = $optionSets.find('a');
    $optionLinks.click(function () {
        var $this = $(this);
        // don't proceed if already selected
        if ($this.hasClass('selected')) {
            return false;
        }
        var $optionSet = $this.parents('.option-set');
        $optionSet.find('.selected').removeClass('selected');
        $this.addClass('selected');
        // make option object dynamically, i.e. { filter: '.my-filter-class' }
        var options = {},
            key = $optionSet.attr('data-option-key'),
            value = $this.attr('data-option-value');
        // parse 'false' as false boolean
        value = value === 'false' ? false : value;
        options[key] = value;
        if (key === 'layoutMode' && typeof changeLayoutMode === 'function') {
            // changes in layout modes need extra logic
            changeLayoutMode($this, options)
        } else {
            // otherwise, apply new options
            $pinboard.isotope(options);
        }
        return false;
    });
    $pinboard.infinitescroll({
        navSelector: '#page_nav',
        // selector for the paged navigation 
        nextSelector: '#page_nav a',
        // selector for the NEXT link (to page 2)
        itemSelector: '.pinned-items'
        // selector for all items you'll retrieve
     
    },
	
    // call Isotope as a callback
    function (newElements) {
        $pinboard.isotope('insert', $(newElements));
    });
	
	// kill scroll binding
   $(window).unbind('.infscr');
	
	$('a#loadMore').click(function(){
      $(document).trigger('retrieve.infscr');
      return false;
    });
	
	// remove the paginator when we're done.
    $(document).ajaxError(function(e,xhr,opt){
      if (xhr.status == 404) $('#options').slideDown("fast");
    });

      
    
     
      
     $creditcards.imagesLoaded( function(){
      
      $creditcards.isotope({
        itemSelector: '.credit-card-select'
      });
     
       
      });
     $creditcards.isotope('reLayout');
      // change size of clicked element
     /* $('.elements').on('click', '.expand', function(e){
			e.preventDefault();
			var $this = $(this);
			$this.parents('.elements').toggleClass('expanded').siblings().removeClass('expanded'); 
			$creditcards.isotope('reLayout');			
		});*/
		
        $('#filtertags').on( 'click', 'a', function() {
			$(this).parent().toggleClass("active");	$("#filtertags dd:first-child").removeClass("active");								
			var selector = $(this).data('filter');
			if ( selector !== '*' ) {
			  // include corner-stamp in filter
			  // so it never gets filtered out
			  selector = selector; 
			}
		 else if ( selector == '*' ) {
			  // include corner-stamp in filter
			  // so it never gets filtered out
			   $(this).parent().toggleClass("active").siblings().removeClass("active");
			} else { 
			
			$("#filtertags dd:first-child").removeClass("active");
			
			}
			
			
			$creditcards.isotope({ filter: selector });
			
		  });
		
		

        
    });
 
