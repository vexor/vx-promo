function initSlidedMenu() {
  if (!window.$body) {
    window.$body = $('body');
  }
  if (!window.$header) {
    window.$header = $('header.header');
  }
  window.$menuToggle = $('#menu-toggle');
  if (window.$menuToggle.length === 0) {
    return;
  }
  var clicked = false;
  window.$menuToggle.on('click', function() {
    if (clicked) {
      return false;
    }
    clicked = true;
    setTimeout(function () { clicked = false; }, 100);
    var hasCloseStyle = window.$menuToggle.hasClass('close-icon');
    if (hasCloseStyle) {
      menuClose();
    } else if (!window.menuShow) {
      window.runAfterSlide(menuOpen);
    }
    return false;
  });
}

function menuOpen() {
  window.$menuToggle.addClass('close-icon');
  window.menuShow = true;
  if (window.pageKey === 'index') {
    $.fn.fullpage.setAllowScrolling(false);
    $header.removeClass('white-blur blue-blur').addClass('white')
      .find('svg#logo').removeClass('smaller');
  } else {
    $('html').addClass('unscrollable');
    $header.removeClass('white-blur').addClass('white');
  }
  $body.addClass('menu-show');
}

function menuClose(callback) {
  window.$menuToggle.removeClass('close-icon');
  $body.removeClass('menu-show');
  if (window.pageKey === 'index') {
    beforeHeader();
    afterHeader();
  } else {
    $header.addClass('white-blur').removeClass('white');

    $('html').removeClass('unscrollable');
    if (typeof callback === 'function') {
      callback();
    }
  }
  setTimeout(function() {
    window.menuShow = false;
    if (window.pageKey === 'index') {
      $.fn.fullpage.setAllowScrolling(true);
      if (typeof callback === 'function') {
        callback();
      }
    } else {
      // $('html').removeClass('unscrollable');
      // if (typeof callback === 'function') {
      //   callback();
      // }
    }
  }, 450);
}
