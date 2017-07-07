//= require libs/jquery.min.js
//= require libs/jquery-ui.min.js
//= require libs/onepage-scroll.min.js
//= require libs/slick.min.js
//= require_directory ./funcs

$(function() {
    prepareAuth();

    initPageScroll();

    initConfigurationsCalculator();

    initReviewsSlider();

    // $(window).on('resize', function() {
    //     $("#slides").destroy_onepage_scroll("section.slide");
    //     initPageScroll();
    // });

    $(document).on('body:load', prepareAuth);
});
