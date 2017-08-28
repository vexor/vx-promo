function headerColor() {

    var bodySel = 'body',
        headerSel = 'header',
        headerHalfHeight = $(headerSel).outerHeight()/2;

    if ($('#documentation').length > 0) {
        $(headerSel).addClass('white-bg');
        $(headerSel).find('svg#logo').addClass('smaller');
        $(headerSel).find('svg').removeClass('white');
        $(headerSel).find('nav a').removeClass('white');
    }
    else {
        var firstSlideSel = '#first-slide',
            lastSlideSel = '#last-slide',
            firstSlideHeight = $(firstSlideSel).outerHeight(),
            lastSlideOffset = $(lastSlideSel).offset().top;

        $(window).on('scroll', function () {
            if ($(window).scrollTop() <= firstSlideHeight - headerHalfHeight || $(window).scrollTop() >= lastSlideOffset - headerHalfHeight) {
                if ($(bodySel).hasClass('at-desktop'))
                    $(headerSel).find('svg#logo').removeClass('smaller');

                if ($(bodySel).hasClass('at-mobile'))
                    $(headerSel).removeClass('white-bg');

                $(headerSel).find('svg').addClass('white');
                $(headerSel).find('nav a').addClass('white');
            }
            else {
                if ($('body').hasClass('at-desktop'))
                    $(headerSel).find('svg#logo').addClass('smaller');

                if ($(bodySel).hasClass('at-mobile'))
                    $(headerSel).addClass('white-bg');

                $(headerSel).find('svg').removeClass('white');
                $(headerSel).find('nav a').removeClass('white');
            }
        });
    }

}
