function initPageScroll(){

    // TODO: add condition for mobile/tablet?

    $("#slides").onepage_scroll({
        sectionContainer: "section.slide",
        animationTime: 600,
        loop: false,
        pagination: false,
        keyboard: false,

        beforeMove: function(index) {
            classToggler('.last-slide', 'footer', 'visible', 290);
            classToggler('.first-slide, .last-slide', 'header nav a, #logo', 'white', 290, 290);
            classToggler('.last-slide', '.last-slide', 'turned-gif', 290, 600);
        },

        afterMove: function(index) {
            featuresToggler();
        }
    });

}
