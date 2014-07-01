var ready = function() {
  if (location.pathname === "/") {
    $("[data-scroll]").smoothScroll();
  }
}

$(document).ready(ready)
$(document).on("page:load", ready)

