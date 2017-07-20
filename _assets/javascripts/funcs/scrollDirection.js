function scrollDirection() {
    var windowScrollY = 0; // initial value

    $(window).on('scroll', function() {
        var windowCurrentScrollY = $(this).scrollTop();

        if (windowCurrentScrollY > windowScrollY)
            window.scrollDirection = 1;
        else
            window.scrollDirection = -1;

        windowScrollY = windowCurrentScrollY;
    });
}
