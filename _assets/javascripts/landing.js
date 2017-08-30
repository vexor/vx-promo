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

        // slided menu if mobile
        if (isMobile.phone) {
            initSlidedMenu();
        }
    }
    // other pages' scripts
    else {
        $('body').addClass('alternate');
        $('footer').addClass('inversed');
        initDocumentationNav();
    }

});

// $(document).on('body:load', prepareAuth);
