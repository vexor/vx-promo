window.createRenderer = function (containerSize, pixelRatio) {
  var renderer = new THREE.WebGLRenderer({ antialias: true });

  updateRenderer(renderer, containerSize, pixelRatio);
  renderer.shadowMap.enabled = false;
  renderer.gammaInput = false;
  renderer.gammaOutput = false;

  return renderer;
};

window.updateRenderer = function (renderer, containerSize, pixelRatio) {
  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(containerSize.width, containerSize.height);
};
