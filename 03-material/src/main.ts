import { OrbitControls } from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";

class App {
  private domApp: Element;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;

  constructor() {
    this.domApp = document.querySelector("#app")!;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.domApp.appendChild(this.renderer.domElement);
    this.scene = new THREE.Scene();

    this.setupCamera();
    this.setupLight();
    this.setupModels();
    this.setupEvents();
  }

  private setupCamera() {
    const domApp = this.domApp;
    const width = domApp.clientWidth;
    const height = domApp.clientHeight;

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    this.camera.position.z = 2;

    new OrbitControls(this.camera, this.domApp as HTMLElement);
  }

  private setupLight() {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    this.scene.add(light);
  }

  private setupModels() {
    const vertices = [-1, 1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0];
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    // Float32BufferAttribute 객체는 하나의 값이 32비트 실수 데이터가 저장된 버퍼 객체
    // 3은 배열에서 3개씩 묶어서 하나의 값(좌표)으로 취급하겠다는 의미

    const material = new THREE.LineDashedMaterial({
      color: 0x00ff00,
      dashSize: 0.2,
      gapSize: 0.1,
      scale: 1,
      // scale - 라인 전체의 표현 횟수 지정
    });
    // 재질 적용 시 각 라인의 길이를 알고 있어야 함으로 각 라인의 길이 계산 필요
    const line = new THREE.Line(geometry, material);
    line.computeLineDistances();
    this.scene.add(line);
  }

  private setupEvents() {
    window.onresize = this.resize.bind(this);
    this.resize();
    this.renderer.setAnimationLoop(this.render.bind(this));
  }

  private resize() {
    const domApp = this.domApp;
    const width = domApp.clientWidth;
    const height = domApp.clientHeight;

    const camera = this.camera;
    if (camera) {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    this.renderer.setSize(width, height);
  }

  private update(time: number) {
    time *= 0.001; // ms -> s
  }

  private render(time: number) {
    this.update(time);
    this.renderer.render(this.scene, this.camera!);
  }
}

new App();
