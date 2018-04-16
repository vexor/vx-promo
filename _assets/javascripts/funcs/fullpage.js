//= require libs/jquery.fullpage.min.js

window.visibleSections = {
  1: true,
  2: false,
  3: false,
  4: false,
  5: true,
};

var lastSection = 5;
var whiteSections = [3, 4];

window.fullpageScrollingSpeed = 700;
window.toIndex = 1;
window.fromIndex = lastSection;

function fullpageInit() {
  if (!window.$header) {
    window.$header = $('header.header');
  }

  var $slides = $('#slides');

  if ($slides.length > 0) {
    $slides.fullpage({
      sectionSelector: '.slide',
      slideSelector: '.deep-slide',
      fixedElements: '.header',
      menu: 'nav.mobile-down',
      // normalScrollElements: '.slick-slide, .configuration-slide__calculator',
      scrollingSpeed: fullpageScrollingSpeed,
      touchSensitivity: 10,

      afterLoad: function (anchorLink, index) {
        // console.log('afterLoad', anchorLink, index, window.leaveTimestamp && window.animationTimestamp - window.leaveTimestamp);
        visibleSections[window.fromIndex] = false;
        afterFigure();
        afterHeader();

        // $('body').removeClass('animation-' + window.animationDirection);
        window.animationDirection = false;
        if (window.runAfterSlideCallback) {
          window.runAfterSlideCallback();
          window.runAfterSlideCallback = null;
        }
      },

      onLeave: function (index, nextIndex, direction) {
        window.fromIndex = index;
        window.toIndex = nextIndex;
        visibleSections[index] = true;
        visibleSections[nextIndex] = true;
        beforeFigure();
        beforeHeader();

        if (window.animationTimestamp) {
          window.leaveTimestamp = window.animationTimestamp;
          window.animationDirection = direction;
          // $('body').addClass('animation-' + window.animationDirection);
          // console.log('animationDirection', animationDirection);
        }
      },
    });
  }
}

var $figureElement;

function getFigureElement() {
  return $figureElement || ($figureElement = $('#figure').parent());
}

function beforeFigure() {
  if (window.fromIndex === 1) {
    getFigureElement()
      .addClass('with-transition')
      .addClass('with-transition-top');
  } else if (window.toIndex === 1) {
    getFigureElement()
      .addClass('with-transition-top');
    setTimeout(function() {
      getFigureElement()
        .addClass('with-transition')
        .removeClass('with-transition-top');
    }, 1);
  }
}

function afterFigure() {
  if (window.fromIndex === 1 || window.toIndex === 1) {
    getFigureElement()
      .removeClass('with-transition')
      .removeClass('with-transition-top');
  }
}


// Header

function beforeHeader() {
  var isWhiteSection = whiteSections.indexOf(window.toIndex) !== -1;
  var edgeSection = window.toIndex === 1 || window.toIndex === lastSection;
  $header
    .toggleClass('white-blur', isWhiteSection)
    .toggleClass('blue-blur white', !isWhiteSection)
    .find('svg#logo').toggleClass('smaller', !edgeSection);
}

function afterHeader() {
  // if (window.toIndex === 1) {
  $header.removeClass('white-blur blue-blur');
  // }
}


window.runAfterSlide = function (callback) {
  if (window.animationDirection) {
    window.runAfterSlideCallback = callback;
  } else {
    callback();
  }
};
