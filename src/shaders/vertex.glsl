precision lowp float;

uniform vec3 uCenter;
uniform float uTime;

out float vDistanceToCenter;
out float vWave;

void main() {
  vDistanceToCenter = distance(position, uCenter);
  float cycle = 2.7;
  float stepTime = mod(uTime, cycle);
  float t = cycle * 0.5 - abs(stepTime - cycle * 0.5);

  float wave = position.z + (sin(position.x * 22.0 * t) / 12.0);
  vWave = wave;

  vec4 mvPosition = modelViewMatrix * vec4(vec3(position.xy, wave), 1.0);
  gl_Position = projectionMatrix * mvPosition;
}