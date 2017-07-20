function initConfigurationsCalculator() {

    var commitsCountSel = '#configuration-commits-count',
        durationValueSel = '#configuration-duration-value',
        costSel = '#configuration-cost',
        commitsSliderSel = '#configuration-commits',
        durationSliderSel = '#configuration-duration';

    // Commits slider
    $(commitsSliderSel).slider({
        animate: 400,
        max: 1000,
        min: 10,
        step: 10,
        value: 200,
        slide: function(event, ui) { $(commitsCountSel).text(ui.value); },
        stop: function(event, ui) { calculateCost(); }
    }).draggable();


    // Duration slider
    $(durationSliderSel).slider({
        animate: 400,
        max: 100,
        min: 1,
        step: 1,
        value: 15,
        slide: function(event, ui) { $(durationValueSel).text(ui.value); },
        stop: function(event, ui) { calculateCost(); }
    }).draggable();


    // Toggle period of payment
    $('.cost-per').on('click', function() {
        var $el = $(this);

        if (!$el.hasClass('active')) {
            $el.siblings('.cost-per').removeClass('active');
            $el.addClass('active');
            calculateCost();
        }
    });

    // Calculate cost of configuration
    function calculateCost() {
        var cost,
            periodCoeff,
            discount = 1,
            commits = $(commitsCountSel).text(),
            duration = $(durationValueSel).text(),
            period = $('.cost-per.active').data('period');

        if (period == 'month')
            periodCoeff = 30/100;
        else if (period == 'day')
            periodCoeff = 1/100;

        cost = Math.round(commits * duration * periodCoeff * discount);

        $(costSel).text(Math.round(cost));
    }

}
