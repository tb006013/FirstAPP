(function($){
	$.fn.backTop = function(opts){
		// $(this).fadeOut();
		var _default = {
			container:$('.connect')
		}
		var opt = $.extend(_default, opts);
		if(opts.container.scrollTop() > $(window).height()){
			$(this).fadeIn();
		}else{
			$(this).fadeOut();
		}
		$(this).on('touchstart', function(event) {
			opts.container.scrollTop(0);
			// event.preventDefault();
			/* Act on the event */
		});
	}
})(jQuery)