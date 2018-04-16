function createGetProps($target, getExternalProps) {
  if (!$target) {
    $target = $(window);
  }
  return function getProps() {
    var props = {
      scrollTop: Math.min(Math.max(0, $target.scrollTop()), 3000000),
      width: $target.width(),
      height: $target.height()
    };
    return getExternalProps ? $.extend(props, getExternalProps(props)) : props;
  };
}

window.subscribeAnimationFrame = function($target, prepareFrame, doWhile, getExternalProps) {
  var getProps = createGetProps($target, getExternalProps);
  var props = {};

  function handleFrame(timestamp) {
    var newProps = getProps();
    var changed = {};
    var anyChanged = false;
    Object.keys(newProps).forEach(function (propKey) {
      changed[propKey] = newProps[propKey] !== props[propKey];
      if (!anyChanged && changed[propKey]) {
        anyChanged = true;
      }
    });
    if (anyChanged) {
      prepareFrame(newProps, props, changed, timestamp);
      props = newProps;
    }
    if ((typeof doWhile !== 'function') || doWhile(newProps, timestamp)) {
      window.requestAnimationFrame(handleFrame);
    }
  }

  window.requestAnimationFrame(handleFrame);
};
