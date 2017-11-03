function initSlidedMenu() {

    var htmlSel = 'html',
        bodySel = 'body',
        headerSel = 'header',
        footerSel = 'footer',
        mainSel = 'main',
        menuSel = '#mobile-menu';


    $(bodySel).on('click', '#menu-open', function() {
        $(htmlSel).addClass('unscrollable');
        $('#menu-open, #doc-nav-open').hide();

        setTimeout(function() {
            $(menuSel).addClass('translated');
            $(footerSel).addClass('translated');
            $(mainSel).addClass('translated');
            $(headerSel).find('svg').addClass('separate-white');
            $(headerSel).find('nav a').addClass('separate-white');
            $(headerSel).addClass('without-bg');
        }, 100);

        setTimeout(function() { $('#menu-close').show(); }, 200);
    });


    $(bodySel).on('click', '#menu-close', function() {
        $('#menu-close').hide();

        setTimeout(function() {
            $(mainSel).removeClass('translated');
            $(footerSel).removeClass('translated');
            $(menuSel).removeClass('translated');
        }, 100);

        setTimeout(function() {
            $(headerSel).find('svg').removeClass('separate-white');
            $(headerSel).find('nav a').removeClass('separate-white');
        }, 200);

        setTimeout(function() {
            $(headerSel).removeClass('without-bg');
            $('#menu-open, #doc-nav-open').show();
        }, 300);

        setTimeout(function() { $(htmlSel).removeClass('unscrollable'); }, 400);
    });

}
