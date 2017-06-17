function classToggler(slideSelector, itemSelector, className, delay) {

     if (delay && delay != undefined && delay != '') {

         if ($(slideSelector).hasClass('active'))
             setTimeout(function () { $(itemSelector).addClass(className); }, delay);
         else
             setTimeout(function () { $(itemSelector).removeClass(className); }, delay);

     } else {

         if ($(slideSelector).hasClass('active'))
             $(itemSelector).addClass(className);
         else
             $(itemSelector).removeClass(className);

    }

}
