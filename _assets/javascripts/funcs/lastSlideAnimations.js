function lastSlideAnimations() {

    var lastSlideSel = '#last-slide',
        lastSlideOffset = $(lastSlideSel).offset().top;

    $(window).on('scroll', function() {
        var gifScrollCoeff = 3,
            gifTopPosition = getGifFinalPosition();

        if ($(window).scrollTop() >= lastSlideOffset - gifScrollCoeff*gifTopPosition && $(window).scrollTop() <= lastSlideOffset)
            $(lastSlideSel).find('figure.gif').css('top', (lastSlideOffset - $(window).scrollTop())/gifScrollCoeff - gifTopPosition);
    });

    function getGifFinalPosition() {
        if ($(window).width() >= 1600 - window.scrollWidth && $(window).height() >= 1080)
            return 415;
        else if ($(window).width() >= 1366 - window.scrollWidth)
            return 310;
        else
            return 266;
    }

}
