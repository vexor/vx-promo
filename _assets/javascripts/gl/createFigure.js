//= require ./VexorTextureShader.js

function CustomSinCurve(scale) {
  THREE.Curve.call(this);
  this.scale = (scale === undefined) ? 1 : scale;
}

CustomSinCurve.prototype = Object.create(THREE.Curve.prototype);

CustomSinCurve.prototype.constructor = CustomSinCurve;

CustomSinCurve.prototype.getPoint = function (t) {
  t = (Math.PI * 2) * t;
  var s = Math.sin(t);
  var c = Math.cos(t);
  var r = 2 + 6 * c;
  var ty = 1 + (-r * c) * 0.205 - 0.25;
  var tx = (-r * s) * 0.205;
  var tz = s * 0.65;

  return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
};

window.createFigure = function () {
  var path = new CustomSinCurve(20);
  var geometry = new THREE.TubeGeometry(path, 200, 6, 100, true);
  var shaderMaterial = new THREE.ShaderMaterial(VexorTextureShader);

  return new THREE.Mesh(geometry, shaderMaterial);
};
