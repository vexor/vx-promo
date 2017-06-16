//= require_directory ./libs
//= require auth
//= require pageScroll

$(function() {
    initPageScroll();

    prepareAuth();

    $(window).on('resize', initPageScroll);

    $(document).on('body:load', prepareAuth);
});
