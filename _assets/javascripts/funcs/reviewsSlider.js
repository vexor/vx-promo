function initReviewsSlider() {

    $('#reviews').slick({
        asNavFor: '#reviewers',
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: true,
        speed: 700,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    mobileFirst: true,
                    arrows: false
                }
            }
        ]
    });

    $('#reviewers').slick({
        asNavFor: '#reviews',
        slidesToShow: 5,
        slidesToScroll: 1,
        swipe: false,
        arrows: false,
        centerMode: true,
        centerPadding: '0',
        focusOnSelect: true,
        speed: 500,
        responsive: [
            {
                breakpoint: breakpoints.tabletWidth-1,
                settings: {
                    mobileFirst: true,
                    centerMode: false,
                    slidesToShow: 2
                }
            },
            {
                breakpoint: breakpoints.smallDesktopWidth-1,
                settings: {
                    slidesToShow: 3
                }
            }
        ]
    });
}
