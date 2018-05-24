//= require libs/jquery.min.js
//= require libs/is-mobile.min.js

//= require funcs/cookies.js
//= require funcs/gdpr.js
//= require funcs/animateFigures.js
//= require funcs/buttons.js
//= require funcs/configurationsCalculator.js
//= require funcs/documentation-nav.js
//= require funcs/fullpage.js
//= require funcs/reviewsSlider.js
//= require funcs/slidedMenu.js

window.breakpoints = {
    mobileWidth: 480,
    tabletWidth: 768,
    smallDesktopWidth: 1024,
    mediumDesktopWidth: 1366,
    largeDesktopWidth: 1600
};

$(initPage);

function initPage() {
  window.pageKey = $('[data-page-key]').data('pageKey');

  //console.log('Init!', pageKey);
  if (pageKey === 'index') {
      initIndex();
  } else if (pageKey === 'documentation') {
      initDocumentation();
  }
  initGDPRPanel();
  buttonsEffect();
  initSlidedMenu();
}

function initIndex() {
  fullpageInit();
  animateFigures();

  initConfigurationsCalculator();
  initReviewsSlider();

  // if (isMobile.apple.device) {
  //   $('#features').find('.features-slide__content__item').addClass('without-play-icon');
  // }
}

function initDocumentation() {
  initDocumentationNav();
}
