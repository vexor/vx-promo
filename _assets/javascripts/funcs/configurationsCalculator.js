function initConfigurationsCalculator() {
    var commitsCountSel = '#configuration-commits-count',
        durationValueSel = '#configuration-duration-value',
        costSel = '#configuration-cost';

    // Commits slider
    $('#configuration-commits').slider({
        animate: 400,
        max: 1000,
        min: 10,
        step: 10,
        value: 200,

        slide: function( event, ui ) { $(commitsCountSel).text(ui.value); },

        stop: function(event, ui) { calculateCost(); }
    });

    // Duration slider
    $('#configuration-duration').slider({
        animate: 400,
        max: 100,
        min: 1,
        step: 1,
        value: 15,

        slide: function( event, ui ) { $(durationValueSel).text(ui.value); },

        stop: function(event, ui) { calculateCost(); }
    });

    // Toggle Day/Month costs
    $('.cost-per').on('click', function() {
        var $el = $(this);

        if (!$el.hasClass('active')) {
            var currentCost = $(costSel).text(),
                periodCoeff = 30,
                discount = 1;

            if ($el.data('period') == 'month')
                $(costSel).text(Math.round(currentCost * periodCoeff * discount));
            else if ($el.data('period') == 'day')
                $(costSel).text(Math.round(currentCost / periodCoeff));

            $el.siblings('.cost-per').removeClass('active');
            $el.addClass('active');
        }
    });

    // Calculate cost of configuration
    function calculateCost() {
        var cost,
            commitsCoeff = 100,
            commits = $(commitsCountSel).text(),
            duration = $(durationValueSel).text();

        cost = commits/commitsCoeff * duration;

        $(costSel).text(Math.round(cost));
    }
}
