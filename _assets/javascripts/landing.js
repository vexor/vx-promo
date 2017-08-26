//= require libs/jquery.min.js
//= require libs/jquery-ui.min.js
//= require libs/jquery-ui-touch-punch.min.js
//= require libs/slick.min.js
//= require libs/is-mobile.min.js
//= require_directory ./funcs

$(function() {

    headerColor();

    initConfigurationsCalculator();

    initReviewsSlider();

    prepareAuth();

    if (!isMobile.any) {
        $('body').addClass('at-desktop');

        scrollParams();

        scrollbarWidth();

        firstSlideAnimations();

        featuresSlideAnimations();

        lastSlideAnimations();
    }

    if (isMobile.phone) {
        $('body').addClass('at-mobile');
        initSlidedMenu();
    }

    $(document).on('body:load', prepareAuth);

    $(window).on('resize', function() {
        //
        // headerColor();
        //
        // firstSlideAnimations();
        //
        // featuresSlideAnimations();
        //
        // lastSlideAnimations();

    });

});
