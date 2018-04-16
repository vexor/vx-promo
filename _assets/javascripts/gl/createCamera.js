window.createCamera = function (cameraSettings) {
  // console.log('createCamera', cameraSettings);

  var right = cameraSettings.width / 2;
  var top = cameraSettings.height / 2;
  var camera = new THREE.OrthographicCamera(-right, right, top, -top, 1, 2000);
  camera.position.x = 300;
  camera.position.z = 40;
  camera.zoom = cameraSettings.zoom;
  camera.updateProjectionMatrix();

  return camera;
};

window.updateCamera = function (camera, cameraSettings) {
  // console.log('updateCamera', camera, cameraSettings);

  camera.right = cameraSettings.width / 2;
  camera.top = cameraSettings.height / 2;
  camera.left = -camera.right;
  camera.bottom = -camera.top;
  camera.zoom = cameraSettings.zoom;
  camera.updateProjectionMatrix();
};
