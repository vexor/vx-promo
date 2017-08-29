function getScrollDuration(target) {

    var currentTop = $(window).scrollTop(),
        rate = 0.5,
        distance;

    distance = Math.abs(currentTop - target);

    if (distance > 20000)
        rate = 0.1;
    else if (distance > 10000)
        rate = 0.2;
    else if (distance > 5000)
        rate = 0.3;
    else if (distance > 2500)
        rate = 0.4;

    return distance * rate;

}
