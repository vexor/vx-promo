window.VexorTextureShader = {
  uniforms: {
    time: { value: 1.4 },
    threshold: { value: 0.1 },
  },

  vertexShader: [
    'varying vec2 vUv;',
    'void main() {',
    '  vUv = uv;',
    '  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );',
    '  gl_Position = projectionMatrix * mvPosition;',
    '}'
  ].join("\n"),

  fragmentShader: [
    'uniform float time;',
    'uniform float threshold;',
    'varying vec2 vUv;',
    'void main( void ) {',
    '  vec2 position = vUv;',
    '  float color_1_r = 0.2;',
    '  float color_1_g = 0.2;',
    '  float color_1_b = 0.6;',
    '  float color_2_r = 0.42;',
    '  float color_2_g = 0.86;',
    '  float color_2_b = 0.74;',
    '  float pi = 3.1415926535897932384626433832795;',
    '  float f_line = sin((position.x - 0.08 * position.y) * pi * 200.0 - time);',
    '  float k = 0.0;',
    '  if (f_line < 0.0) {',
    '    k = -1.0;',
    '  } else {',
    '    k = 1.0;',
    '  }',
    '  float f_line_a = abs(f_line);',
    '  float sk = 0.0;',
    '  if (f_line_a < threshold) {',
    '    sk = (threshold - f_line_a) / threshold;',
    '    k = f_line * sk + k * (1.0 - sk);',
    '  }',
    '  k = (k + 1.0) / 2.0;',
    '  float color_r = color_1_r + (color_2_r - color_1_r) * k;',
    '  float color_g = color_1_g + (color_2_g - color_1_g) * k;',
    '  float color_b = color_1_b + (color_2_b - color_1_b) * k;',
    '  gl_FragColor = vec4(vec3(color_r, color_g, color_b), 1.0);',
    '}'
  ].join("\n")
};
