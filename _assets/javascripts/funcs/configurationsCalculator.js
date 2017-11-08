function initConfigurationsCalculator() {

    var costValueSel = '#configuration-cost-value',
        commitsCountSel = '#configuration-commits-count',
        durationValueSel = '#configuration-duration-value',
        costSliderSel = '#configuration-cost',
        commitsSliderSel = '#configuration-commits',
        durationSliderSel = '#configuration-duration',
        period = 'day',
        periodCoeff = getPeriodCoeff();


    // Cost slider
    $(costSliderSel).slider({
        max: 4,
        min: 0.1,
        step: 0.1,
        value: 1,
        slide: function(event, ui) { $(costValueSel).val('$'+(ui.value*periodCoeff)); },
        stop: function(event, ui) { updateSlidersValues(ui.value); }
    }).draggable();

    // Commits slider
    $(commitsSliderSel).slider({
        max: 20,
        min: 1,
        step: 1,
        value: 10,
        slide: function(event, ui) { $(commitsCountSel).val(ui.value*periodCoeff); },
        stop: function(event, ui) { updateSlidersValues(false, ui.value); }
    }).draggable();

    // Duration slider
    $(durationSliderSel).slider({
        max: 20,
        min: 1,
        step: 1,
        value: 10,
        slide: function(event, ui) { $(durationValueSel).val(ui.value); },
        stop: function(event, ui) { updateSlidersValues(false, false, ui.value); }
    }).draggable();


    function getPeriodCoeff() {
        if (period == 'month')
            return 20;
        else if (period == 'day')
            return 1;
    }

    function updateSlidersValues(cost, commits, duration) {

        if (cost) {
            duration = parseInt($(durationValueSel).val());
            commits = Math.floor(cost*periodCoeff / duration * 100);

            if (commits > 20*periodCoeff) {
                commits = 20*periodCoeff;
                duration = Math.floor(cost*periodCoeff / commits * 100);
            }
            else if (commits < 1*periodCoeff) {
                commits = 1*periodCoeff;
                duration = 1;
            }

            $(commitsSliderSel).slider('value', Math.floor(commits / periodCoeff));
            $(durationSliderSel).slider('value', duration);
            $(commitsCountSel).val(commits);
            $(durationValueSel).val(duration);

            return [commits, duration];
        }

        if (commits) {
            duration = parseInt($(durationValueSel).val());
            cost = (commits * 0.01*duration).toFixed(2);
            $(costSliderSel).slider('value', cost);
            $(costValueSel).val('$'+cost*periodCoeff);

            return cost;
        }

        if (duration) {
            commits = Math.floor($(commitsCountSel).val() / periodCoeff);
            cost = (commits * 0.01*duration).toFixed(2);
            $(costSliderSel).slider('value', cost);
            $(costValueSel).val('$'+cost*periodCoeff);

            return cost;
        }

    }


    // Toggle period of payment
    $('.period').on('click', function() {
        var $el = $(this),
            prevPeriodCoeff = periodCoeff;

        if (!$el.hasClass('active')) {
            $el.siblings('.period').removeClass('active');
            $el.addClass('active');

            period = $('.period.active').data('period');
            periodCoeff = getPeriodCoeff();

            var commits = Math.floor($(commitsCountSel).val() / prevPeriodCoeff) * periodCoeff,
                cost = $(costValueSel).val();

            cost = (cost.substring(1, cost.length) / prevPeriodCoeff * periodCoeff).toFixed(2);

            $(commitsCountSel).val(commits);
            $(costValueSel).val('$'+cost);
        }
    });

}
