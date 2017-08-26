function initSlidedMenu() {

    var bodySel = 'body',
        htmlSel = 'html',
        headerSel = 'header',
        slidesSel = '#slides',
        menuSel = '#mobile-menu';

    $(bodySel).on('click', '#menu-open', function() {
        $(htmlSel).addClass('unscrollable');

        $(slidesSel).addClass('translated');
        $(menuSel).addClass('translated');

        $(headerSel).find('svg').addClass('separate-white');
        $(headerSel).find('nav a').addClass('separate-white');
        $(headerSel).addClass('without-bg');

        $('#menu-open').hide();
        $('#menu-close').show();
    });

    $(bodySel).on('click', '#menu-close', function() {
        $(slidesSel).removeClass('translated');
        $(menuSel).removeClass('translated');

        $(headerSel).find('svg').removeClass('separate-white');
        $(headerSel).find('nav a').removeClass('separate-white');
        $(headerSel).removeClass('without-bg');

        $(htmlSel).removeClass('unscrollable');

        $('#menu-close').hide();
        $('#menu-open').show();
    });

}
