function prepareAuth() {
    $(document).on('click', 'a[data-action="sign-up"]', function() {
        ga('send', 'event', 'sign_up', 'click')
    });

    $(document).on('click', 'a[data-action="sign-in"]', function() {
        ga('send', 'event', 'sign_in', 'click');
    });
}
