function initPageScroll(){

    // TODO: add condition for mobile/tablet?

    $("#slides").onepage_scroll({
        sectionContainer: "section.slide",
        animationTime: 500,
        loop: false,
        pagination: false,
        keyboard: false,

        beforeMove: function(index) {
            classToggler('.last-slide', 'footer', 'visible', 240);
            classToggler('.first-slide, .last-slide', 'header', 'white', 200);
        }
    });

}
