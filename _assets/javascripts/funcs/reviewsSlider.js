function initReviewsSlider() {
    $('#reviews').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        // centerMode: true,
        centerPadding: '0',
        cssEase: "ease",
        speed: 800,
        variableWidth: true,
        dots: true,
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 2,
                    speed: 400
                }
            }
        ]
    });
}
