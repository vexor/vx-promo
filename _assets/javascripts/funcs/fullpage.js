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
        afterPlayer();
        $('head > meta[name="theme-color"]').attr('content', isWhiteSection(index) ? '#FFFFFF' : '#333399');
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
        beforePlayer();

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
  var isWhite = isWhiteSection(window.toIndex);
  var edgeSection = window.toIndex === 1 || window.toIndex === lastSection;
  $header
    .toggleClass('white-blur', isWhite)
    .toggleClass('blue-blur white', !isWhite)
    .find('svg#logo').toggleClass('smaller', !edgeSection);
}

function afterHeader() {
  // if (window.toIndex === 1) {
  $header.removeClass('white-blur blue-blur');
  // }
}

// Player

var autopaused = false;

function beforePlayer() {
  playerFlow(fromIndex, function (player) {
    player.getPaused().then(function(paused) {
      if (!paused) {
        autopaused = true;
        player.pause();
      }
    });
  });
}

function afterPlayer() {
  playerFlow(toIndex, function (player) {
    if (autopaused) {
      autopaused = false;
      player.play();
    }
  });
}

function playerFlow(slideIndex, callback) {
  if (slideIndex === 2) {
    var player = getVexorPromoPlayer();
    if (player) {
      callback(player);
    }
  }
}

var vexorPromoPlayer;

function getVexorPromoPlayer() {
  return vexorPromoPlayer || (vexorPromoPlayer = Vimeo && new Vimeo.Player(document.getElementById('vexor-video')));
}

// ---

function isWhiteSection(sectionIndex) {
  return whiteSections.indexOf(sectionIndex) !== -1;
}

window.runAfterSlide = function (callback) {
  if (window.animationDirection) {
    window.runAfterSlideCallback = callback;
  } else {
    callback();
  }
};
