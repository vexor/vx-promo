//= require gl/three.min.js
//= require gl/createCamera.js
//= require gl/createFigure.js
//= require gl/createRenderer.js
//= require gl/createScene.js

window.pipe1 = null;
window.pipe2 = null;

var mousePos = {
  x: 0,
  y: 0,
  dx: 0,
  dy: 0,
  timestamp: 0,
};

var $window = $(window);

$(init);

$window.on('mousemove', function (event) {
  if (mousePos.timestamp !== 0 && (mousePos.x !== 0 || mousePos.y !== 0)) {
    var dx = event.pageX - mousePos.x;
    var dy = event.pageY - mousePos.y;
    var dt = Math.max(window.animationTimestamp - mousePos.timestamp, 10);
    if (Math.abs(dx) < 500 && Math.abs(dy) < 400) {
      mousePos.dx += dx / dt;
      mousePos.dy += dy / dt;
      // console.log(dx, dy, dt, Math.round(mousePos.dx), Math.round(mousePos.dy));
    }
  }
  mousePos.x = event.pageX;
  mousePos.y = event.pageY;
  if (window.animationTimestamp) {
    mousePos.timestamp = window.animationTimestamp;
  }
});

// window.lastMotion = null;

// window.addEventListener('devicemotion', function(e) {
// e.acceleration
// e.accelerationIncludingGravity
// e.rotationRate (Returns the rate at which the device is rotating around each of its axes in degrees per second)
// e.interval(Returns the interval, in milliseconds, at which data is obtained from the underlaying hardware)
//   window.lastMotion = e;
// }, true);

function init() {
  var figure = createFigure();
  var sceneResult = createScene(figure);
  var $container1 = $('#figure');
  var $container2 = $('.last-slide__media.gif.mazed');
  window.pipe1 = createPipe($container1, sceneResult, 1000);
  window.pipe2 = createPipe($container2, sceneResult, 1150);
  requestAnimationFrame(renderFrame);
}

var firstRender = true;

function renderFrame(timestamp) {
  if (firstRender) {
    firstRender = false;
    pipe1.$canvas.show();
    pipe2.$canvas.show();
  }
  // tension
  mousePos.dx = mousePos.dx * 0.98;
  mousePos.dy = mousePos.dy * 0.98;

  window.animationTimestamp = timestamp;
  var renderPipe1 = visibleSections[1] || window.menuShow;
  var renderPipe2 = visibleSections[5] && ($window.width() >= breakpoints.smallDesktopWidth);
  if (renderPipe1) {
    updatePipe(pipe1);
  }
  if (renderPipe2) {
    updatePipe(pipe2);
  }
  if (renderPipe1 || renderPipe2) {
    updateTexture(renderPipe1, renderPipe2);
  }
  if (renderPipe1) {
    updateCamera1(pipe1);
    // if (window.animationDirection && (window.fromIndex === 1 || window.toIndex === 1)) {
    //   let k = (window.animationTimestamp - window.leaveTimestamp) / window.fullpageScrollingSpeed;
    //   if (toIndex === 1) {
    //     k = 1 - k;
    //   }
    //   pipe1.$container.css({
    //     top: -80 * k + 'vh'
    //   });
    // }
    renderPipe(pipe1);
  }
  if (renderPipe2) {
    updateCamera2(pipe2, timestamp);
    renderPipe(pipe2);
  }
  requestAnimationFrame(renderFrame);
}

window.xk = 0;
window.yk = 0;
window.zk = 0;

function updateCamera1(pipe) {
  var mx = 400;
  // console.log(mousePos.dx, mousePos.dy);
  pipe.group.rotation.y = (Math.min(Math.abs(mousePos.dx), mx) * Math.sign(mousePos.dx)) / (mx * 2);
  pipe.group.rotation.x = -(Math.min(Math.abs(mousePos.dy), mx) * Math.sign(mousePos.dy)) / (mx * 2);
}


function updateCamera2(pipe, timestamp) {
  funnelCamera(pipe.camera, timestamp, 200);
}

function funnelCamera(camera, timestamp, radius) {
  var timer = timestamp * 0.0002;
  camera.position.x = Math.cos(timer) * radius;
  camera.position.z = Math.sin(timer) * radius;
}

function updateTexture(forPipe1, forPipe2) {
  VexorTextureShader.uniforms.time.value += 0.2;
  VexorTextureShader.uniforms.threshold.value = 50 / ((forPipe1 ? pipe1 : pipe2).containerSize.height || 500);
}

function renderPipe(pipe) {
  pipe.camera.lookAt(pipe.scene.position);
  pipe.renderer.render(pipe.scene, pipe.camera);
}

function createPipe($container, sceneResult, frustumSize) {
  var pixelRatio = getPixelRatio();
  var containerSize = getContainerSize($container);
  var cameraSettings = getCameraSettings(containerSize, frustumSize);
  var camera = createCamera(cameraSettings);
  var renderer = createRenderer(containerSize, pixelRatio);
  var $canvas = $(renderer.domElement).hide().appendTo($container);

  return {
    pixelRatio: pixelRatio,
    containerSize: containerSize,

    $container: $container,
    $canvas: $canvas,
    frustumSize: frustumSize,
    camera: camera,
    cameraRadius: Math.sqrt(Math.pow(camera.position.x, 2) + Math.pow(camera.position.z, 2)),
    baseCameraAngle: Math.atan2(camera.position.z, camera.position.x),
    scene: sceneResult.scene,
    group: sceneResult.group,
    renderer: renderer,
  };
}

function getPixelRatio() {
  return 2; // window.devicePixelRatio || 1;
}

function updatePipe(pipe) {
  var pixelRatio = getPixelRatio();
  var containerSize = getContainerSize(pipe.$container);
  var changedContainerSize = changed(pipe.containerSize, containerSize);
  if (changedContainerSize) {
    var cameraSettings = getCameraSettings(containerSize, pipe.frustumSize);
    updateCamera(pipe.camera, cameraSettings);
    pipe.containerSize = containerSize;
    pipe.cameraSettings = cameraSettings;
  }
  if (changedContainerSize || pixelRatio !== pipe.pixelRatio) {
    updateRenderer(pipe.renderer, containerSize, pixelRatio);
    pipe.pixelRatio = pixelRatio;
  }
}

function getCameraSettings(containerSize, frustumSize) {
  return {
    width: frustumSize * containerSize.width / containerSize.height,
    height: frustumSize,
    zoom: 20.5,
  };
}

function getContainerSize($container) {
  return {
    width: $container.width(),
    height: $container.outerHeight(),
  };
}

function changed(a, b) {
  for (var k in a) {
    if (a[k] !== b[k]) {
      return true;
    }
  }
  return false;
}
