function featuresSlideAnimations() {

    var featuresSlideSel = '#features-slide',
        infoBlockSel = '#features-info',
        screenshotsSel = '#features-screenshots',
        video = document.getElementById('vexor-video'),
        featuresSlideOffset = $(featuresSlideSel).offset().top,
        featuresSlideHeight = $(featuresSlideSel).outerHeight(),
        nextSlideOffset = featuresSlideOffset + 0.5*featuresSlideHeight;

    $(window).on('scroll', function() {
        if ($(window).scrollTop() > featuresSlideOffset && $(window).scrollTop() < nextSlideOffset) {

            $(featuresSlideSel).find(screenshotsSel).addClass('fixed')
                                                    .children().addClass('playing');
            video.play();

            // if (window.scrollDirection > 0 && $(window).scrollTop() > nextSlideOffset - 0.4*$(screenshotsSel).children().outerHeight()) {
            //     animateContent(1, nextSlideOffset);
            // }
            //
            // if (window.scrollDirection < 0 && $(window).scrollTop() < featuresSlideOffset + 0.4*$(screenshotsSel).children().outerHeight()) {
            //     animateContent(-1, featuresSlideOffset);
            // }
        }
        else {
            $(featuresSlideSel).find(screenshotsSel).removeClass('fixed')
                                                    .children().removeClass('playing');
            video.pause();
        }

        if ($(window).scrollTop() > nextSlideOffset) {
            $(featuresSlideSel).find(screenshotsSel).addClass('bottomed');
        }
        else {
            $(featuresSlideSel).find(screenshotsSel).removeClass('bottomed');
        }
    });

    function animateContent(direction) {
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
            $html.removeClass(backDirectionClass);
            $html.addClass(directionClass);

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
