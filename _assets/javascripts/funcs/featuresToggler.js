function featuresToggler() {

    if ($('.features-slide').hasClass('active'))
        initFeaturesToggler();
    else
        resetFeaturesToggler();

    function initFeaturesToggler() {
        $('.features-slide__info').addClass('animate');
        $('.features-slide__screenshots').addClass('animate');
    }

    function resetFeaturesToggler() {
        $('.features-slide__info').removeClass('animate');
        $('.features-slide__screenshots').removeClass('animate');
    }
}
