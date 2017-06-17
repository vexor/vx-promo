//= require_directory ./libs
//= require auth
//= require classToggler
//= require pageScroll

$(function() {
    initPageScroll();

    prepareAuth();

    $(window).on('resize', initPageScroll);

    $(document).on('body:load', prepareAuth);
});
