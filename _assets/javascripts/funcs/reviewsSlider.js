function initReviewsSlider() {
    $('#reviews').slick({
        asNavFor: '#reviewers',
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        speed: 700,
        responsive: [
        //     {
        //         breakpoint: 1600,
        //         settings: {
        //             slidesToShow: 2,
        //             speed: 800 // BUG: this value is setted for 1366
        //         }
        //     },
        //     {
        //         breakpoint: 1366,
        //         settings: {
        //             speed: 700 // BUG: this value is setted as default
        //         }
        //     },
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
        arrows: false,
        centerMode: true,
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
