(function ($) {
    $.fn.ColorPanel = function (options) {
        var settings = $.extend({
            styleSheet: '#cpswitch'
            , colors: {
                '#02b843': 'css/style.css'
                , '#0984e3': 'css/style.blue.css'
                , '#00b7f0': 'css/style.light.blue.css'
                , '#00cec9': 'css/style.light.green.css'
                , '#fcad1a': 'css/style.yellow.css'
                , '#000000': 'css/style.black.css'
            , }
            , linkClass: 'linka'
            , animateContainer: false
        }, options);
        var panelDiv = this;
		
		$('#cpToggle').click(function(e){
			e.preventDefault();
			 $('ul',panelDiv).slideToggle();
		});
		
        var colors = settings.colors || null;
        if (colors) {
            $.each(colors, function (key, value) {
                var li = $("<li/>");
                var e = $("<a />", {
                    href: value
                    , "class": settings.linkClass, // you need to quote "class" since it's a reserved keyword
                }).css('background-color', key);
                li.append(e);
                $(panelDiv).find('ul').append(li);
            });
            $('ul',panelDiv).on('click', 'a', function (e) {                
                e.preventDefault();
                var CssFile = $(this).attr('href') || 'default.css';
                if (settings.animateContainer) {
                    $(settings.animateContainer).fadeOut(function () {
                        $(settings.styleSheet).attr('href', CssFile);
                        // And then:
                        $(this).fadeIn();
                    });
                }
                else {
                    $(settings.styleSheet).attr('href', CssFile);
                }                
            });
        }
    };
}(jQuery));