function initDocumentationNav() {

    var containerSel = '.documentation__nav',
        $commonMenu = $(containerSel).children('.sidebar__nav'),
        menuTitleSel = '.sidebar__nav__title',
        menuListSel = '.sidebar__nav__links';

    $commonMenu.on('click', 'a', function(ev) {
        ev.preventDefault();

        var id = $(this).attr('href'),
            target = $(id).offset().top - 150,
            duration = getScrollDuration(target);

        // history.pushState(null, null, id);

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
}
