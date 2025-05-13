import * as THREE from "three";

import Stats from "three/examples/jsm/libs/stats.module.js";

import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

import "./style.css";

const canvas = document.getElementById("app") as HTMLCanvasElement;
let time = 0;

// Stats
const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
);
camera.position.z = getAdaptiveCameraPositionZ(innerWidth);
scene.add(camera);

// Half-Sphere
const center = new THREE.Vector3();

const geometry = new THREE.SphereGeometry(1, 180, 180, 0, Math.PI, 0, Math.PI);
geometry.computeBoundingBox();
geometry.boundingBox?.getCenter(center);
const material = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uCenter: { value: center },
  },
  vertexShader,
  fragmentShader,
  side: THREE.DoubleSide,
  glslVersion: THREE.GLSL3,
});
const circle = new THREE.Mesh(geometry, material);
scene.add(circle);

// Renderer
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas,
});
renderer.setSize(innerWidth, innerHeight);

let prevTime = 0;
const frameTime = 1000 / 60;
const render = () => {
  stats.begin();
  const currentTime = Date.now();
  const elapsed = currentTime - prevTime;

  if (elapsed > frameTime) {
    time += 0.006;
    circle.material.uniforms.uTime.value = time;
    renderer.render(scene, camera);

    prevTime = currentTime - (prevTime % frameTime);
  }
  stats.end();
};

renderer.setAnimationLoop(render);

function getAdaptiveCameraPositionZ(width: number) {
  if (width <= 365) {
    return 6;
  } else if (width <= 475) {
    return 5;
  } else if (width <= 670) {
    return 4;
  } else if (width <= 1115) {
    return 3;
  } else {
    return 2;
  }
}

// Resize
addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.position.z = getAdaptiveCameraPositionZ(innerWidth);
  camera.updateProjectionMatrix();

  renderer.setSize(innerWidth, innerHeight);
});
