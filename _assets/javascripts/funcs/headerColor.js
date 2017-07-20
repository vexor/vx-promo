function headerColor() {

    var headerSel = 'header',
        firstSlideSel = '#first-slide',
        lastSlideSel = '#last-slide',
        headerHalfHeight = $(headerSel).outerHeight()/2,
        firstSlideHeight = $(firstSlideSel).outerHeight(),
        lastSlideOffset = $(lastSlideSel).offset().top;

    $(window).on('scroll', function() {
        if ($(window).scrollTop() <= firstSlideHeight - headerHalfHeight || $(window).scrollTop() >= lastSlideOffset - headerHalfHeight) {
            $(headerSel).find('svg#logo').removeClass('smaller');
            $(headerSel).find('svg').addClass('white');
            $(headerSel).find('nav a').addClass('white');
        }
        else {
            $(headerSel).find('svg#logo').addClass('smaller');
            $(headerSel).find('svg').removeClass('white');
            $(headerSel).find('nav a').removeClass('white');
        }
    });

}
