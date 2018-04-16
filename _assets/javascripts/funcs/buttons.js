function buttonsEffect() {

  $('button.fx').append('<span class="ripple"></span>')
    .on('mouseenter mouseleave', function(e) {
      var parentOffset = $(this).offset();
      var relX = e.pageX - parentOffset.left;
      var relY = e.pageY - parentOffset.top;
      $(this).children('.ripple').css({
        top: relY,
        left: relX,
      });
    });
}
