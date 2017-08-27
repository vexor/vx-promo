function initReviewsSlider() {
    $('#reviews').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        dots: true,
        speed: 600, // BUG: this value is setted for 1600
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 2,
                    speed: 800 // BUG: this value is setted for 1366
                }
            },
            {
                breakpoint: 1366,
                settings: {
                    speed: 700 // BUG: this value is setted as default
                }
            },
            {
                breakpoint: 1023,
                settings: {
                    mobileFirst: true,
                    arrows: false,
                    speed: 500
                }
            }
        ]
    });
}
