function headerColor() {

    var bodySel = 'body',
        headerSel = 'header',
        headerHalfHeight = 0.6 * $(headerSel).outerHeight();


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


        if ($(window).width() < breakpoints.tabletWidth)
            changeCondition2 = customersSlideOffset + 0.66*customersSlideHeight - headerHalfHeight;


        if ($(window).width() >= breakpoints.tabletWidth) {

            if ($(window).scrollTop() < 1 || $(window).scrollTop() >= $('#slides').outerHeight() - lastSlideHeight) {
                $(headerSel).find('svg#logo').removeClass('top-translated');
                $(headerSel).removeClass('blue-blur');
            }
            else {
                $(headerSel).find('svg#logo').addClass('top-translated');
                $(headerSel).addClass('blue-blur');
            }

        }


        if (($(window).scrollTop() <= changeCondition1) || ($(window).scrollTop() >= changeCondition2)) {

            if ($(window).width() >= breakpoints.tabletWidth)
                $(headerSel).removeClass('white-blur');

            if ($(window).width() < breakpoints.tabletWidth)
                $(headerSel).removeClass('white-bg');

            $(headerSel).find('svg, nav a')
                .removeClass('blue')
                .addClass('white');

        }
        else {

            if ($(window).width() >= breakpoints.tabletWidth)
                $(headerSel).addClass('white-blur');

            if ($(window).width() < breakpoints.tabletWidth)
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
