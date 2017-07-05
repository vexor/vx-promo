function classToggler(slideSelector, itemSelector, className, delayAdd, delayRem) {

     if ($(slideSelector).hasClass('active')) {

         if (delayAdd && delayAdd != undefined && delayAdd != '')
             setTimeout(function () { $(itemSelector).addClass(className); }, delayAdd);
         else
             $(itemSelector).addClass(className);

     }
     else {

         if (delayRem && delayRem != undefined && delayRem != '')
             setTimeout(function () { $(itemSelector).removeClass(className); }, delayRem);
         else
             $(itemSelector).removeClass(className);

     }

}
