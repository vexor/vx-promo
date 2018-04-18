function animateFigures(callback) {
  if (glEnabled()) {
    var glAsset = $('[data-gl-assets]').data('glAssets');
    if (glAsset) {
      $.getScript(glAsset, function () {
        if (callback) {
          setTimeout(callback, 100);
        }
      });
    }
  } else {
    $('.gif[data-fallback]').each(function () {
      var $gif = $(this);
      $gif.css({
        backgroundImage: 'url("' + $gif.data('fallback') + '")'
      });
    });
    if (callback) {
      setTimeout(callback, 100);
    }
  }
}

function glEnabled() {
  try {
    var canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
}
