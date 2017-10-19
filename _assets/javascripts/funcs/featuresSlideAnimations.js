function featuresSlideAnimations() {

    var headerSel = 'header',
        featuresSlideSel = '#features-slide',
        infoBlockSel = '#features-info',
        contentSel = '#features-content',
        video = document.getElementById('vexor-video'),
        headerHeight = $(headerSel).outerHeight(),
        featuresSlideOffset = $(featuresSlideSel).offset().top - 0.5*headerHeight,
        featuresSlideHeight = $(featuresSlideSel).outerHeight(),
        nextSlideOffset = featuresSlideOffset + headerHeight;

    // $(window).on('scroll', function() {
    //     if ($(window).scrollTop() > featuresSlideOffset && $(window).scrollTop() < nextSlideOffset) {
    //
    //         $(featuresSlideSel).find(contentSel).children().addClass('playing');
    //         video.play();
    //
    //         // if (window.scrollDirection > 0 && $(window).scrollTop() > nextSlideOffset - 0.4*$(contentSel).children().outerHeight()) {
    //         //     animateContent(1, nextSlideOffset);
    //         // }
    //         //
    //         // if (window.scrollDirection < 0 && $(window).scrollTop() < featuresSlideOffset + 0.4*$(contentSel).children().outerHeight()) {
    //         //     animateContent(-1, featuresSlideOffset);
    //         // }
    //     }
    //     else {
    //         $(featuresSlideSel).find(contentSel).children().removeClass('playing');
    //         video.pause();
    //     }
    //
    //     // if ($(window).scrollTop() > nextSlideOffset) {
    //     //     $(featuresSlideSel).find(contentSel).addClass('bottomed');
    //     // }
    //     // else {
    //     //     $(featuresSlideSel).find(contentSel).removeClass('bottomed');
    //     // }
    // });



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
                $(contentSel).children('.features-slide__content__item[data-item="fae"]').css('z-index', zIndex1);
                $(contentSel).children('.features-slide__content__item[data-item="asm_asn"]').css('z-index', zIndex2);
            }, 450);

            $(contentSel).addClass('blink');

            setTimeout(function () {
                $(contentSel).removeClass('blink');
            }, 900);
        }
    }

}
