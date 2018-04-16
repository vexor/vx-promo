function featuresSlideAnimations() {
  // play/pause video
  var video = document.getElementById('vexor-video');
  var $videoParentEl = $('.features-slide__content__item');

  video.onplay = function() {
    $videoParentEl.addClass('playing');
  };

  video.onpause = function() {
    $videoParentEl.removeClass('playing');
  };

  $videoParentEl.on('click', function() {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });
}
