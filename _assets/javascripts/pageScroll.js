function initPageScroll(){
    // TODO: add condition for mobile/tablet?
    $("#slides").onepage_scroll({
        sectionContainer: "section",
        animationTime: 500,
        loop: false,
        pagination: false,
        keyboard: false,

        beforeMove: function(index) {
            if ($('.last-slide').hasClass('active'))
                setTimeout(function() { $('footer').addClass('visible'); }, 240 );
            else
                $('footer').removeClass('visible');
        }
    });
}
