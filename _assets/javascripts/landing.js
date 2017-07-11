//= require libs/jquery.min.js
//= require libs/jquery-ui.min.js
//= require libs/jquery-ui-touch-punch.min.js
//= require libs/onepage-scroll.min.js
//= require libs/slick.min.js
//= require libs/is-mobile.min.js
//= require_directory ./funcs

$(function() {
    prepareAuth();

    initPageScroll();

    initConfigurationsCalculator();

    initReviewsSlider();

    if (isMobile.phone) {
        initSlidedMenu();
    }

    $(document).on('body:load', prepareAuth);

    $(window).on('resize', function() {
        initPageScroll();
    });
});
