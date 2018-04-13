//= require libs/slick.min.js

function initReviewsSlider() {

  $('#reviews').slick({
    asNavFor: '#reviewers',
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    speed: 700,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: breakpoints.mobileWidth - 1,
        settings: {
          verticalSwiping: false,
          arrows: false,
        }
      },
      {
        breakpoint: breakpoints.tabletWidth - 1,
        settings: {
          verticalSwiping: false,
          arrows: false,
        }
      },
      {
        breakpoint: breakpoints.smallDesktopWidth - 1,
      },
      {
        breakpoint: breakpoints.mediumDesktopWidth - 1,
      },
      {
        breakpoint: breakpoints.largeDesktopWidth - 1,
      },
    ]
  });

  $('#reviewers').slick({
    asNavFor: '#reviews',
    slidesToScroll: 1,
    slidesToShow: 4,
    swipe: true,
    arrows: false,
    centerMode: true,
    centerPadding: '0',
    focusOnSelect: true,
    speed: 700,
    // mobileFirst: true,
    responsive: [
      {
        breakpoint: breakpoints.mobileWidth - 1,
        settings: {
          slidesToShow: 2,
          centerMode: false,
        },
      },
      {
        breakpoint: breakpoints.tabletWidth - 1,
        settings: {
          slidesToShow: 3,
          centerMode: false,
        },
      },
      {
        breakpoint: breakpoints.smallDesktopWidth - 1,
        // settings: {
        //   slidesToShow: 4
        // },
      },
      {
        breakpoint: breakpoints.mediumDesktopWidth - 1,
        // settings: {
        //   slidesToShow: 6
        // },
      },
      {
        breakpoint: breakpoints.largeDesktopWidth - 1,
        // settings: {
        //   slidesToShow: 6
        // },
      },
    ]
  });
}
