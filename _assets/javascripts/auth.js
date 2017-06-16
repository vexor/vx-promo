function prepareAuth() {
    $(document).on("click", "a[data-signup]", function(){
        ga('send', 'event', 'sign_up', 'click')
    });

    $(document).on("click", "a[data-signin]", function(){
        ga('send', 'event', 'sign_in', 'click');
    });
}

$(document).on('ready, page:load', prepareAuth());
