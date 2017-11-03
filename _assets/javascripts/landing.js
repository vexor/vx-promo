//= require libs/jquery.min.js
//= require libs/jquery-ui.min.js
//= require libs/jquery-ui-touch-punch.min.js
//= require libs/slick.min.js
//= require libs/is-mobile.min.js
//= require_directory ./funcs

$(function() {

    headerColor();
    initSlidedMenu();

    // common desktop scripts
    if (!isMobile.any) {
        $('body').addClass('at-desktop');
        scrollParams();
        scrollbarWidth();
    }

    // common mobile scripts
    if (isMobile.phone) {
        $('body').addClass('at-mobile');
    }

    if (isMobile.tablet) {
        $('body').addClass('at-tablet');
    }

    if (isMobile.apple.device) {
        $('#features-slide .features-slide__content__item').addClass('without-play-icon');
    }

    // index page's scripts
    if ($('.page').length < 1) {
        initConfigurationsCalculator();
        initReviewsSlider();

        // slides animation if desktop
        if (!isMobile.any) {
            firstSlideAnimations();
            featuresSlideAnimations();
            lastSlideAnimations();
        }

        // play/pause video
        $('.features-slide__content__item').on('click', function() {
            var videoParentEl = $(this),
                video = document.getElementById('vexor-video');

            if (video.paused) {
                videoParentEl.addClass('playing');
                video.play();
            }
            else {
                video.pause();
                videoParentEl.removeClass('playing');
            }
        });
    }
    // scripts for other pages
    else {
        $('body').addClass('alternate');
        $('footer').addClass('inversed');

        if ($('#documentation').length > 0)
            initDocumentationNav();
    }

});

$(document).on('ready, body:load', prepareAuth());
