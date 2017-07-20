function featuresSlideAnimations() {

    var featuresSlideSel = '#features-slide',
        infoBlockSel = '#features-info',
        screenshotsSel = '#features-screenshots',
        featuresSlideOffset = $(featuresSlideSel).offset().top,
        featuresSlideHeight = $(featuresSlideSel).outerHeight(),
        screenshotsBlinkPoint = featuresSlideOffset + 0.5*featuresSlideHeight - $(screenshotsSel).children().outerHeight();


    if ($(window).scrollTop() > featuresSlideOffset + 0.5*featuresSlideHeight) {
        $(featuresSlideSel).find(screenshotsSel).css('top', '100vh');
        $(screenshotsSel).children('.features-slide__screenshots__item[data-item="fae"]').css('z-index', 1);
        $(screenshotsSel).children('.features-slide__screenshots__item[data-item="asm_asn"]').css('z-index', 2);
    }

    $(window).on('scroll', function() {
        if ($(window).scrollTop() > featuresSlideOffset && $(window).scrollTop() < featuresSlideOffset + 0.5*featuresSlideHeight) {
            $(featuresSlideSel).find(screenshotsSel).css('top', $(window).scrollTop() - featuresSlideOffset);

            if (window.scrollDirection > 0 && $(window).scrollTop() > screenshotsBlinkPoint) {
                animateContent(1, featuresSlideOffset + 0.5*featuresSlideHeight);
            }

            if (window.scrollDirection < 0 && $(window).scrollTop() < screenshotsBlinkPoint) {
                animateContent(-1, featuresSlideOffset);
            }
        }
    });

    function animateContent(direction, target) {
        var directionClass, backDirectionClass,
            zIndex1, zIndex2,
            $html = $('html');

        if (direction == 1) {
            zIndex1 = 1;
            zIndex2 = 2;
            directionClass = 'scrolled-down';
            backDirectionClass = 'scrolled-up';
        }
        else if (direction == -1) {
            zIndex1 = 2;
            zIndex2 = 1;
            directionClass = 'scrolled-up';
            backDirectionClass = 'scrolled-down';
        }

        if (!$html.hasClass(directionClass)) {
            $html.addClass('unscrollable');
            $html.removeClass(backDirectionClass);
            $('html, body').animate({ scrollTop: target }, 500);
            $html.addClass(directionClass);
            $html.removeClass('unscrollable');

            setTimeout(function () {
                $(screenshotsSel).children('.features-slide__screenshots__item[data-item="fae"]').css('z-index', zIndex1);
                $(screenshotsSel).children('.features-slide__screenshots__item[data-item="asm_asn"]').css('z-index', zIndex2);
            }, 450);

            $(screenshotsSel).addClass('blink');

            setTimeout(function () {
                $(screenshotsSel).removeClass('blink');
            }, 900);
        }
    }

}
