function initReviewsSlider() {
    $('#reviews').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 400,
        variableWidth: true,
        dots: true,
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 2,
                    speed: 800
                }
            }
        ]
    });
}
