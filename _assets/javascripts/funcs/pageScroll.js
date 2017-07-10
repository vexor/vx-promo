function initPageScroll() {

    var onepageWrapSel = '#slides',
        onepageSlideSel = 'section.slide';

    if (!isMobile.any) {

        $(onepageWrapSel).onepage_scroll({
            sectionContainer: onepageSlideSel,
            animationTime: 600,
            loop: false,
            pagination: false,
            keyboard: false,

            beforeMove: function (index) {
                classToggler('.last-slide', 'footer', 'visible', 290);
                classToggler('.first-slide, .last-slide', 'header nav a, header svg', 'white', 290, 290);
                classToggler('.last-slide', '.last-slide', 'turned-gif', 290, 600);
            },

            afterMove: function (index) {
                featuresToggler();
            }
        });

    }
    else if($(onepageWrapSel).hasClass('onepage-wrapper'))
       $(onepageWrapSel).destroy_onepage_scroll(onepageSlideSel);

}
