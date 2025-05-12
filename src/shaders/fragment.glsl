precision lowp float;

uniform float uTime;

in float vDistanceToCenter;
in float vWave;

out vec4 fragColor;

const float GAMMA = 2.2;

void main() {
  float glow = exp(-1.0 * vDistanceToCenter * vDistanceToCenter);

  vec3 color = vec3(sin(uTime), glow, cos(uTime));
  vec3 finalColor = pow(color, vec3(1.0 / GAMMA));
  
  fragColor = vec4(finalColor, vWave);
}