import { OrbitControls } from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";

class App {
  private domApp: Element;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;

  constructor() {
    console.log("Hello three.js");

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
    this.camera.position.z = 20;

    new OrbitControls(this.camera, this.renderer.domElement);
  }

  private setupLight() {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    this.scene.add(light);
  }

  private setupModels() {
    const gameBox = new THREE.BoxGeometry(1);
    const material = new THREE.MeshStandardMaterial();
    const box = new THREE.Mesh(gameBox, material);

    // const matrixS = new THREE.Matrix4().makeScale(0.5, 0.5, 0.5);
    // const matrixR = new THREE.Matrix4().makeRotationX(
    //   THREE.MathUtils.degToRad(45)
    // );
    // const matrixT = new THREE.Matrix4().makeTranslation(0, 2, 0);
    // box.applyMatrix4(matrixS);
    // box.applyMatrix4(matrixR);
    // box.applyMatrix4(matrixT);

    // 위 코드와 아래 코드는 같은 결과를 나타낸다. 다만 행렬로 직접 변환할때는 적용 순서에 주의해야 한다. 그 이유는 행렬의 곱셈 순서가 바뀌면 결과가 달라지기 때문이다.

    // 아래와 같이 position과 rotation scale을 사용하면 Three.js가 내부적으로 크기 -> 회전 -> 이동 순서로 적용된다.
    // box.position.x = 2;
    box.position.set(0, 2, 0);
    // 한 번에 설정도 가능
    box.rotation.x = THREE.MathUtils.degToRad(45);
    box.scale.set(0.5, 0.5, 0.5);

    this.scene.add(box);

    const axeOfScene = new THREE.AxesHelper(5);
    this.scene.add(axeOfScene);
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
