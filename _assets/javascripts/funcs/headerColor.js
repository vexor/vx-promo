function headerColor() {

    var bodySel = 'body',
        headerSel = 'header',
        headerHalfHeight = $(headerSel).outerHeight()/2;

    if ($('.page').length > 0) {
        $(headerSel).addClass('white-bg');
        $(headerSel).find('svg#logo').addClass('smaller');
        $(headerSel).find('svg').removeClass('white');
        $(headerSel).find('nav a').removeClass('white');
    }
    else {

        var featuresSlideSel = '#features-slide',
            customersSlideSel = '#customers-slide',
            lastSlideSel = '#last-slide',
            featuresSlideHeight = $(featuresSlideSel).outerHeight(),
            customersSlideHeight = $(customersSlideSel).outerHeight(),
            lastSlideHeight = $(lastSlideSel).outerHeight(),
            featuresSlideOffset = $(featuresSlideSel).offset().top,
            lastSlideOffset = $(lastSlideSel).offset().top;

        $(window).on('scroll', function() {

            if ($(bodySel).hasClass('at-desktop')) {

                if ($(window).scrollTop() < 1 || $(window).scrollTop() == $('#slides').outerHeight() - lastSlideHeight)
                    $(headerSel).find('svg#logo').removeClass('smaller');
                else
                    $(headerSel).find('svg#logo').addClass('smaller');

            }


            if (($(window).scrollTop() <= featuresSlideOffset + 0.5*featuresSlideHeight - headerHalfHeight) || ($(window).scrollTop() >= lastSlideOffset - 0.5*customersSlideHeight - headerHalfHeight)) {

                if ($(bodySel).hasClass('at-mobile'))
                    $(headerSel).removeClass('white-bg');

                $(headerSel).find('svg, nav a')
                    .removeClass('blue')
                    .addClass('white');

            }
            else {

                if ($(bodySel).hasClass('at-mobile'))
                    $(headerSel).addClass('white-bg');

                $(headerSel).find('svg, nav a')
                    .removeClass('white')
                    .addClass('blue');

            }

        });

    }

}
