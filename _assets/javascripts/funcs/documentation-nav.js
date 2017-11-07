function initDocumentationNav() {

    var htmlSel = 'html',
        headerSel = 'header',
        navSel = '.documentation__nav',
        $commonMenu = $(navSel).children('.sidebar__nav'),
        menuTitleSel = '.sidebar__nav__title',
        menuListSel = '.sidebar__nav__links';


    $commonMenu.on('click', 'a', function(ev) {
        ev.preventDefault();

        var id = $(this).attr('href'),
            target = $(id).offset().top - $('.documentation__content').offset().top,
            duration = getScrollDuration(target);

        // history.pushState(null, null, id);

        if ($(window).width() + window.scrollbarWidth < breakpoints.tabletWidth) {
            $('#doc-nav-open').removeClass('active');
            $(navSel).removeClass('opened');
            $(htmlSel).removeClass('unscrollable');

            setTimeout(function () {
                $('html, body').animate({ scrollTop: target }, duration);
            }, 400);
        }
        else
            $('html, body').animate({ scrollTop: target }, duration);
    });


    $(menuTitleSel+':not(.toggled)').on('click', 'a', function() {
        $(menuTitleSel+'.toggled').removeClass('toggled')
                                  .next(menuListSel).slideUp(400);

        $(this).parent(menuTitleSel+':not(.untoggle)').addClass('toggled')
                                                      .next(menuListSel).slideDown(400);
    });


    $(menuListSel).on('click', 'a:not(.active)', function() {
        $(menuListSel).find('a.active').removeClass('active');
        $(this).addClass('active');
    });


    $(headerSel).on('click', '#doc-nav-open', function() {
        var navTopPos = $(window).scrollTop() + $(headerSel).outerHeight();

        $(this).toggleClass('active');
        $(navSel).css('top', navTopPos).toggleClass('opened');

        if ($(navSel).hasClass('opened'))
            $(htmlSel).addClass('unscrollable');
        else
            $(htmlSel).removeClass('unscrollable');
    });
}
