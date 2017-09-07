//= require libs/jquery.min.js
//= require libs/jquery-ui.min.js
//= require libs/jquery-ui-touch-punch.min.js
//= require libs/slick.min.js
//= require libs/is-mobile.min.js
//= require_directory ./funcs

$(function() {

    headerColor();

    // common desktop scripts
    if (!isMobile.any) {
        $('body').addClass('at-desktop');
        scrollParams();
        scrollbarWidth();
    }

    // common mobile scripts
    if (isMobile.phone) {
        $('body').addClass('at-mobile');
        initSlidedMenu();
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

        $('.features-slide__screenshots__item').on('click', function() {
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
    // other pages' scripts
    else {
        $('body').addClass('alternate');
        $('footer').addClass('inversed');

        if ($('#documentation').length > 0)
            initDocumentationNav();
    }

});

$(document).on('ready, body:load', prepareAuth());
