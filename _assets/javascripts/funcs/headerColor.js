function headerColor() {

    var bodySel = 'body',
        headerSel = 'header',
        headerHalfHeight = 0.5 * $(headerSel).outerHeight();


    function setHeaderColor() {

        var featuresSlideSel = '#features-slide',
            customersSlideSel = '#customers-slide',
            lastSlideSel = '#last-slide',
            featuresSlideHeight = $(featuresSlideSel).outerHeight(),
            customersSlideHeight = $(customersSlideSel).outerHeight(),
            lastSlideHeight = $(lastSlideSel).outerHeight(),
            featuresSlideOffset = $(featuresSlideSel).offset().top,
            customersSlideOffset = $(customersSlideSel).offset().top,
            changeCondition1 = featuresSlideOffset + 0.5*featuresSlideHeight - headerHalfHeight,
            changeCondition2 = customersSlideOffset + 0.5*customersSlideHeight - headerHalfHeight;

        if ($(bodySel).hasClass('at-desktop')) {

            if ($(window).scrollTop() < 1 || $(window).scrollTop() >= $('#slides').outerHeight() - lastSlideHeight)
                $(headerSel).find('svg#logo').removeClass('top-translated');
            else
                $(headerSel).find('svg#logo').addClass('top-translated');

        }

        if ($(bodySel).hasClass('at-mobile'))
            changeCondition2 = customersSlideOffset + 0.66*customersSlideHeight - headerHalfHeight;


        if (($(window).scrollTop() <= changeCondition1) || ($(window).scrollTop() >= changeCondition2)) {

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

    }

    if ($('.page').length > 0) {
        $(headerSel).addClass('white-bg');
        $(headerSel).find('svg#logo').addClass('smaller');
        $(headerSel).find('svg').removeClass('white');
        $(headerSel).find('nav a').removeClass('white');
    }
    else {
        setHeaderColor();
        $(window).on('scroll', setHeaderColor);
    }

}
