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
camera.position.z = 2;
scene.add(camera);

// Circle
const center = new THREE.Vector3();

const geometry = new THREE.SphereGeometry(1, 60);
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

const render = () => {
  stats.begin();

  time += 0.002;
  circle.material.uniforms.uTime.value = time;
  renderer.render(scene, camera);

  stats.end();
};

renderer.setAnimationLoop(render);

// Resize
addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(innerWidth, innerHeight);
});
