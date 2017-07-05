//= require_directory ./libs
//= require_directory ./funcs

$(function() {
    prepareAuth();

    initPageScroll();

    initReviewsSlider();

    $(window).on('resize', initPageScroll);

    $(document).on('body:load', prepareAuth);
});
