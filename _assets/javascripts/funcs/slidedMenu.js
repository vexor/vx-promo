function initSlidedMenu() {

    var bodySel = 'body',
        htmlSel = 'html',
        headerSel = 'header',
        mainSel = 'main',
        menuSel = '#mobile-menu';

    $(bodySel).on('click', '#menu-open', function() {
        $(htmlSel).addClass('unscrollable');
        $('#menu-open, #doc-nav-open').hide();

        setTimeout(function() {
            $(mainSel).addClass('translated');
            $(menuSel).addClass('translated');
            $(headerSel).find('svg').addClass('separate-white');
            $(headerSel).find('nav a').addClass('separate-white');
            $(headerSel).addClass('without-bg');
        }, 100);

        setTimeout(function() { $('#menu-close').show(); }, 200);
    });

    $(bodySel).on('click', '#menu-close', function() {
        $('#menu-close').hide();

        setTimeout(function() {
            $(menuSel).removeClass('translated');
            $(mainSel).removeClass('translated');
        }, 100);

        setTimeout(function() {
            $(headerSel).removeClass('without-bg');
            $(headerSel).find('svg').removeClass('separate-white');
            $(headerSel).find('nav a').removeClass('separate-white');
        }, 200);

        setTimeout(function() { $('#menu-open, #doc-nav-open').show(); }, 300);

        setTimeout(function() { $(htmlSel).removeClass('unscrollable'); }, 400);
    });

}
