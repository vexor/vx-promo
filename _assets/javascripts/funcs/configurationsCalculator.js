function initConfigurationsCalculator() {

    var commitsCountSel = '#configuration-commits-count',
        durationValueSel = '#configuration-duration-value',
        costSel = '#configuration-cost',
        commitsSliderSel = '#configuration-commits',
        durationSliderSel = '#configuration-duration',
        period = 'day',
        periodCoeff = calculatePeriodCoeff();

    // Commits slider
    $(commitsSliderSel).slider({
        animate: 400,
        max: 20,
        min: 1,
        step: 1,
        value: 10,
        slide: function(event, ui) { $(commitsCountSel).text(ui.value * periodCoeff); },
        stop: function(event, ui) { calculateCost(); }
    }).draggable();


    // Duration slider
    $(durationSliderSel).slider({
        animate: 400,
        max: 20,
        min: 1,
        step: 1,
        value: 10,
        slide: function(event, ui) { $(durationValueSel).text(ui.value); },
        stop: function(event, ui) { calculateCost(); }
    }).draggable();


    // Toggle period of payment
    $('.cost-per').on('click', function() {
        var $el = $(this);

        if (!$el.hasClass('active')) {
            $el.siblings('.cost-per').removeClass('active');
            $el.addClass('active');

            period = $('.cost-per.active').data('period');
            periodCoeff = calculatePeriodCoeff();

            $(commitsCountSel).text($(commitsSliderSel).slider('value') * periodCoeff);

            calculateCost();
        }
    });

    function calculatePeriodCoeff() {
        if (period == 'month')
            return 20;
        else if (period == 'day')
            return 1;
    }

    // Calculate cost of configuration
    function calculateCost() {
        var cost,
            commits = parseInt($(commitsCountSel).text()),
            duration = parseInt($(durationValueSel).text());

        cost = (commits * 0.01*duration).toFixed(2);
        $(costSel).text(cost);
    }

}
