window.createScene = function (figure) {
  var scene = new THREE.Scene();
  var group = new THREE.Group();
  // scene.background = new THREE.Color(0x333399);
  scene.add(group);
  group.add(figure);
  return { group: group, scene: scene };
};
