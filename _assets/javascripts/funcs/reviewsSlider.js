function initReviewsSlider() {

    $('#reviews').slick({
        asNavFor: '#reviewers',
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
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

    var reviewersSlidesCnt = $('body').hasClass('at-tablet') ? 3 : 5;

    $('#reviewers').slick({
        asNavFor: '#reviews',
        slidesToShow: reviewersSlidesCnt,
        slidesToScroll: 1,
        arrows: false,
        centerMode: true,
        centerPadding: '0',
        focusOnSelect: true,
        speed: 500,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    mobileFirst: true,
                    centerMode: false,
                    slidesToShow: 2
                }
            }
        ]
    });
}
