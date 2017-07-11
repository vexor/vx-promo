function initSlidedMenu() {

    var bodySel = 'body';

    $(bodySel).on('click', '#menu-open', function() {

        $('.first-slide').addClass('menu-opened');
        $('#menu-open').hide();
        $('#menu-close').show();

        setTimeout(function() {
            $('.first-slide__menu, .first-slide__sign-up').fadeIn(300);
        }, 300);

    });

    $(bodySel).on('click', '#menu-close', function() {

        $('.first-slide__menu, .first-slide__sign-up').fadeOut(300);

        setTimeout(function() {
            $('.first-slide').removeClass('menu-opened');
            $('#menu-close').hide();
            $('#menu-open').show();
        }, 300);

    });

}
