//= require libs/jquery-ui.min.js
//= require libs/jquery-ui-touch-punch.min.js

function initConfigurationsCalculator() {

    var $cost = $('#configuration-cost-value');
    var $commits = $('#configuration-commits-count');
    var $duration = $('#configuration-duration-value');
    var $costSlider = $('#configuration-cost');
    var $commitsSlider = $('#configuration-commits');
    var $durationSlider = $('#configuration-duration');
    var period = 'day';
    var periodCoeff = getPeriodCoeff();
    var price = 0.015;

    function calcCost(commits, duration) { return (commits * price * duration); }
    function getCost(pc) { return parseFloat($cost.val().substring(1)) / pc; }
    function showCost(cost) {
        var formatted = (cost * periodCoeff).toFixed(2).split('.');
        $cost.val('$' + formatted[0] + (formatted[1] !== '00' ? '.' + formatted[1] : ''));
    }

    function getCommits(pc) { return Math.round(parseInt($commits.val()) / pc); }
    function showCommits(commits) { $commits.val(commits * periodCoeff); }

    function getDuration() { return parseInt($duration.val()); }
    function showDuration(duration) { $duration.val(duration + ' min'); }

    // Cost slider
    $costSlider.slider({
        max: 4,
        min: 0.1,
        step: 0.1,
        value: 1,
        slide: function(event, ui) { showCost(ui.value); },
        stop: function(event, ui) { updateSlidersValues(ui.value); }
    }).draggable();

    // Commits slider
    $commitsSlider.slider({
        max: 20,
        min: 1,
        step: 1,
        value: getCommits(periodCoeff),
        slide: function(event, ui) { showCommits(ui.value); },
        stop: function(event, ui) { updateSlidersValues(false, ui.value); }
    }).draggable();

    // Duration slider
    $durationSlider.slider({
        max: 20,
        min: 1,
        step: 1,
        value: getDuration(),
        slide: function(event, ui) { showDuration(ui.value); },
        stop: function(event, ui) { updateSlidersValues(false, false, ui.value); }
    }).draggable();

    updateSlidersValues();

    function getPeriodCoeff() {
        if (period === 'month')
            return 20;
        else if (period === 'day')
            return 1;
    }

    function updateSlidersValues(cost, commits, duration) {

        if (cost) {
            duration = getDuration();
            commits = Math.round(cost / price / duration);

            if (commits > 20) {
                commits = 20;
                duration = Math.round(cost / price / commits);
            }
            else if (commits < 1) {
                commits = 1;
                duration = 1;
            }

            $commitsSlider.slider('value', commits);
            $durationSlider.slider('value', duration);
            showCommits(commits);
            showDuration(duration);
        } else {
            if (!commits) {
                commits = getCommits(periodCoeff);
            }
            if (!duration) {
                duration = getDuration();
            }
            cost = calcCost(commits, duration);
            $costSlider.slider('value', cost);
            showCost(cost);
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

            var commits = getCommits(prevPeriodCoeff);
            var cost = getCost(prevPeriodCoeff);

            showCommits(commits);
            showCost(cost);
        }
    });

  $('input[readonly]').on('click focus touchmove', function (ev) {
    ev.preventDefault();
  });
}
