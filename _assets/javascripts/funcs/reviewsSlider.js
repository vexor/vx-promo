function initReviewsSlider() {
    $('#reviews').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        dots: true,
        speed: 400, // FIXME: bug
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 2,
                    speed: 800 // FIXME: bug
                }
            },
            {
                breakpoint: 480,
                settings: {
                    mobileFirst: true,
                    arrows: false
                }
            }
        ]
    });
}
