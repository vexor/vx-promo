function initGDPRPanel() {
    if (readCookie("gdpr_panel_state") != "hidden") {
        $('.gdpr-cookies').removeClass('hidden');
    }

    $('.gdpr-cookies .close').on('click', function() {
        createCookie("gdpr_panel_state", "hidden");
        $('.gdpr-cookies').addClass('hidden');
    });
}
