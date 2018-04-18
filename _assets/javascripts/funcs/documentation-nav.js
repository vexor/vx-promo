//= require ./subscribeAnimationFrame

function initDocumentationNav() {
  var $nav = $('.documentation__nav');
  if ($nav.length === 0) {
    return;
  }
  var $mobileDocsItem = $('.mobile-menu li:first');
  var $page = $('main.page');
  if (!window.$body) {
    window.$body = $('body');
  }
  if (!window.$footer) {
    window.$footer = $('.footer');
  }
  var isMobilePoint = false;

  $nav.on('click', 'a', function(ev) {
    ev.preventDefault();
    var $link = $(this);
    if (isMobilePoint) {
      if ($link.parent().hasClass('sidebar__nav__title') && !$link.parent().hasClass('untoggle')) {
        return;
      }
      menuClose(function () {
        scrollByLink($link);
      });
      return;
    }
    scrollByLink($link);
  });

  function scrollByLink($link) {
    var id = $link.attr('href');
    var target = $(id).offset().top - $('.documentation__content').offset().top;
    var duration = getScrollDuration(target);

    window.docScrolling = true;
    $('html, body').stop(true).animate({ scrollTop: target }, duration, function () {
      // window.location.href = id;
      window.docScrolling = false;
      scrollToShowActiveItems();
      if (window.history && history.replaceState) {
        history.replaceState({}, '', id);
      }
    });
  }

  var menuTitleSel = '.sidebar__nav__title';
  var menuListSel = '.sidebar__nav__links';

  function toggleLink($link, callback) {
    $nav.stop(true);
    $link
      .toggleClass('toggled')
      .next(menuListSel).stop(true).slideToggle(400, callback);
  }

  $nav.on('click', menuTitleSel + ':not(.untoggle)', function(ev) {
    toggleLink($(ev.currentTarget));
  });

  var $contentAnchors = $('a.anchor[id]');

  $contentAnchors.each(function (index, element) {
    var $anchor = $(element);
    var $anchorLinks = $nav.find('a[href="#' + $anchor.attr('id') + '"]');
    $anchor.data('$anchorLinks', $anchorLinks);
  });

  var tops = new Array($contentAnchors.length);

  function recalcTops() {
    $contentAnchors.each(function (index, element) {
      var $anchor = $(element);
      tops[index] = $anchor.offset().top;
    });
  }

  var $togglableLists = $nav.find(menuListSel);
  var $allAnchorLinks = $nav.find('a[href^="#"]');

  subscribeAnimationFrame(null, function(props, prevProps, changed) {
    if (changed.width || changed.height || changed.bodyHeight) {
      recalcTops();
    }

    var topPadding = 0.1 * props.height + 100;
    var topDetection = props.scrollTop + topPadding;
    var bottomDetection = props.scrollBottom - topPadding / 2;

    $contentAnchors.each(function (index, element) {
      var $anchor = $(element);
      var anchorLine = tops[index];
      var nextAnchorLine = index === (tops.length - 1) ? anchorLine : tops[index + 1];
      var visible = topDetection < nextAnchorLine && anchorLine < bottomDetection;
      $anchor.data('$anchorLinks').toggleClass('active', visible);
    });

    if (changed.navBottom) {
      $nav.css('bottom', props.navBottom);
    }

    if (changed.width) {
      switch (matchBreakpoint(props, prevProps, 'tablet')) {
        case -1:
          isMobilePoint = true;
          moveNavToSide();
          break;
        case 1:
          isMobilePoint = false;
          returnNav();
          break;
      }
    }

    if (window.docScrolling) {
      return;
    }

    $togglableLists.each(function (index, element) {
      var $list = $(element);
      var $link = $list.prev(menuTitleSel);
      var toggled = $link.hasClass('toggled');
      var hasActive = $list.find('a.active').length > 0;
      if (toggled && !hasActive || !toggled && hasActive) {
        toggleLink($link, scrollToShowActiveItems);
      }
    });

    scrollToShowActiveItems();
  },
  true,
  function (props) {
    var scrollBottom = props.scrollTop + props.height;
    var bodyHeight = $body.height();
    var distanceToBottom = bodyHeight - (props.scrollTop + props.height);
    return {
      scrollBottom: scrollBottom,
      bodyHeight: bodyHeight,
      // distanceToBottom: distanceToBottom,
      navBottom: Math.max(0, $footer.height() - distanceToBottom)
    };
  });

  function matchBreakpoint(props, prevProps, point) {
    var pointWidth = breakpoints[point + 'Width'];
    if ((!prevProps.width || prevProps.width >= pointWidth) && props.width < pointWidth) {
      return -1;
    } else if ((!prevProps.width || prevProps.width < pointWidth) && props.width >= pointWidth) {
      return 1;
    }
    return 0;
  }

  var scrollingItems = false;

  function scrollToShowActiveItems() {
    if (scrollingItems) {
      return;
    }
    scrollingItems = true;
    var minTop = Infinity;
    var maxTop = 0;
    $allAnchorLinks.filter('.active:visible').each(function (index, element) {
      var top = $(element).position().top;
      if (top < minTop) { minTop = top; }
      if (top > maxTop) { maxTop = top; }
    });
    var navTop = $nav.scrollTop();
    var newTop = null;
    if (0 > minTop) {
      newTop = minTop
    } else if (0 < (maxTop += 45 - $nav.height())) {
      newTop = maxTop;
    }
    if (newTop !== null) {
      var duration = Math.sqrt(Math.abs(newTop - navTop)) * 50;
      $nav.stop(true).animate({ scrollTop: navTop + newTop }, duration, function () {
        scrollingItems = false;
      });
      return;
    }
    scrollingItems = false;
  }

  var $wrapperItem = $('<li></li>');
  $wrapperItem.hide().insertAfter($mobileDocsItem);

  function moveNavToSide() {
    $wrapperItem.show().append($nav);
  }

  function returnNav() {
    $page.prepend($nav);
    $wrapperItem.show();
  }
}

function getScrollDuration(target) {
  var currentTop = $(window).scrollTop();
  var distance = Math.abs(currentTop - target);
  return Math.round(Math.sqrt(distance) * 15);
}
