import { OrbitControls } from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";
import { degToRad } from "three/src/math/MathUtils.js";

interface IGeometryHelper {
  createGeometry: () => THREE.BufferGeometry;
  createGUI: (update: () => void) => void;
}

class PlaneGeometryHelper implements IGeometryHelper {
  private args = {
    width: 1,
    height: 1,
    widthSegments: 1,
    heightSegments: 1,
  };

  public createGeometry() {
    return new THREE.PlaneGeometry(
      this.args.width,
      this.args.height,
      this.args.widthSegments,
      this.args.heightSegments
    );
  }

  public createGUI(update: () => void) {
    const gui = new GUI();
    gui.add(this.args, "width", 1, 30).onChange(update);
    gui.add(this.args, "height", 1, 30).onChange(update);
    gui.add(this.args, "widthSegments", 1, 30).step(1).onChange(update);
    gui.add(this.args, "heightSegments", 1, 30).step(1).onChange(update);
  }
}
class RingGeometryHelper implements IGeometryHelper {
  private args = {
    innerRadius: 0.5,
    outerRadius: 1,
    thetaSegments: 8,
    phiSegments: 8,
    thetaStart: 0,
    thetaLength: 360,
  };

  public createGeometry() {
    return new THREE.RingGeometry(
      this.args.innerRadius,
      this.args.outerRadius,
      this.args.thetaSegments,
      this.args.phiSegments,
      degToRad(this.args.thetaStart),
      degToRad(this.args.thetaLength)
    );
  }

  public createGUI(update: () => void) {
    const gui = new GUI();
    gui.add(this.args, "innerRadius", 0.1, 2).onChange(update);
    gui.add(this.args, "outerRadius", 0.1, 2).onChange(update);
    gui.add(this.args, "thetaSegments", 1, 32, 1).onChange(update);
    gui.add(this.args, "phiSegments", 1, 30, 2).onChange(update);
    gui.add(this.args, "thetaStart", 0, 360).onChange(update);
    gui.add(this.args, "thetaLength", 0, 360).onChange(update);
  }
}

class SphereGeometryHelper implements IGeometryHelper {
  private args = {
    radius: 1,
    widthSegments: 32,
    heightSegments: 16,
    phiStart: 0,
    phiLength: 360,
    thetaStart: 0,
    thetaLength: 180,
  };

  public createGeometry() {
    return new THREE.SphereGeometry(
      this.args.radius,
      this.args.widthSegments,
      this.args.heightSegments,
      degToRad(this.args.phiStart),
      degToRad(this.args.phiLength),
      degToRad(this.args.thetaStart),
      degToRad(this.args.thetaLength)
    );
  }

  public createGUI(update: () => void) {
    const gui = new GUI();
    gui.add(this.args, "radius", 0.5, 2, 0.01).onChange(update);
    gui.add(this.args, "widthSegments", 3, 64).onChange(update);
    gui.add(this.args, "heightSegments", 2, 32).onChange(update);
    gui.add(this.args, "phiStart", 0, 360).onChange(update);
    gui.add(this.args, "phiLength", 0, 360).onChange(update);
    gui.add(this.args, "thetaStart", 0, 180).onChange(update);
    gui.add(this.args, "thetaLength", 0, 180).onChange(update);
  }
}

class TorusGeometryHelper implements IGeometryHelper {
  private args = {
    radius: 1,
    tube: 0.3,
    radialSegments: 16,
    tubularSegments: 100,
    arc: 360,
  };

  public createGeometry() {
    return new THREE.TorusGeometry(
      this.args.radius,
      this.args.tube,
      this.args.radialSegments,
      this.args.tubularSegments,
      degToRad(this.args.arc)
    );
  }

  public createGUI(update: () => void) {
    const gui = new GUI();
    gui.add(this.args, "radius", 0, 2, 0.01).onChange(update);
    gui.add(this.args, "tube", 0, 2, 0.01).onChange(update);
    gui.add(this.args, "radialSegments", 2, 30, 1).onChange(update);
    gui.add(this.args, "tubularSegments", 3, 200, 1).onChange(update);
    gui.add(this.args, "arc", 0, 360).onChange(update);
  }
}

class CylinderGeometryHelper implements IGeometryHelper {
  private args = {
    radiusTop: 0.5,
    radiusBottom: 0.5,
    height: 1,
    radialSegments: 8,
    heightSegments: 1,
    openEnded: false,
    thetaStart: 0,
    thetaLength: 360,
  };

  public createGeometry() {
    return new THREE.CylinderGeometry(
      this.args.radiusTop,
      this.args.radiusBottom,
      this.args.height,
      this.args.radialSegments,
      this.args.heightSegments,
      this.args.openEnded,
      THREE.MathUtils.degToRad(this.args.thetaStart),
      THREE.MathUtils.degToRad(this.args.thetaLength)
    );
  }

  public createGUI(update: () => void) {
    const gui = new GUI();
    gui.add(this.args, "radiusTop", 0, 10, 0.01).onChange(update);
    gui.add(this.args, "radiusBottom", 0, 10, 0.01).onChange(update);
    gui.add(this.args, "height", 0, 10, 0.01).onChange(update);
    gui.add(this.args, "radialSegments", 1, 100, 1).onChange(update);
    gui.add(this.args, "heightSegments", 1, 100, 1).onChange(update);
    gui.add(this.args, "openEnded").onChange(update);
    gui.add(this.args, "thetaStart", 0, 360, 1).onChange(update);
    gui.add(this.args, "thetaLength", 0, 360, 1).onChange(update);
  }
}
class ConeGeometryHelper implements IGeometryHelper {
  private args = {
    radius: 0.5,
    height: 1,
    radialSegments: 8,
    heightSegments: 1,
    openEnded: false,
    thetaStart: 0,
    thetaLength: 360,
  };

  public createGeometry() {
    return new THREE.ConeGeometry(
      this.args.radius,
      this.args.height,
      this.args.radialSegments,
      this.args.heightSegments,
      this.args.openEnded,
      THREE.MathUtils.degToRad(this.args.thetaStart),
      THREE.MathUtils.degToRad(this.args.thetaLength)
    );
  }

  public createGUI(update: () => void) {
    const gui = new GUI();
    gui.add(this.args, "radius", 0, 10, 0.01).onChange(update);
    gui.add(this.args, "height", 0, 10, 0.01).onChange(update);
    gui.add(this.args, "radialSegments", 1, 100, 1).onChange(update);
    gui.add(this.args, "heightSegments", 1, 100, 1).onChange(update);
    gui.add(this.args, "openEnded").onChange(update);
    gui.add(this.args, "thetaStart", 0, 360, 1).onChange(update);
    gui.add(this.args, "thetaLength", 0, 360, 1).onChange(update);
  }
}

class CircleGeometryHelper implements IGeometryHelper {
  private args = {
    radius: 1,
    segments: 32,
    thetaStart: 0,
    // 원의 시작 각도
    thetaLength: 360,
    // 시작 각도에서 연장되어 원이 만들어질 각도
  };

  public createGeometry() {
    return new THREE.CircleGeometry(
      this.args.radius,
      this.args.segments,
      THREE.MathUtils.degToRad(this.args.thetaStart),
      THREE.MathUtils.degToRad(this.args.thetaLength)
    );
  }

  public createGUI(update: () => void) {
    const gui = new GUI();
    gui.add(this.args, "radius", 0, 10, 0.01).onChange(update);
    gui.add(this.args, "segments", 1, 100, 1).onChange(update);
    gui.add(this.args, "thetaStart", 0, 360, 1).onChange(update);
    gui.add(this.args, "thetaLength", 0, 360, 1).onChange(update);
  }
}
class BoxGeometryHelper implements IGeometryHelper {
  private args = {
    width: 1,
    height: 1,
    depth: 1,
    widthSegments: 1,
    heightSegments: 1,
    depthSegments: 1,
  };
  createGeometry() {
    return new THREE.BoxGeometry(
      this.args.width,
      this.args.height,
      this.args.depth,
      this.args.widthSegments,
      this.args.heightSegments,
      this.args.depthSegments
    );
  }

  createGUI(update: () => void) {
    const gui = new GUI();
    // box geometry 값 변경 시 모델 재생성
    gui.add(this.args, "width", 0, 10, 0.01).onChange(update);
    gui.add(this.args, "height", 0, 10, 0.01).onChange(update);
    gui.add(this.args, "depth", 0, 10, 0.01).onChange(update);
    gui.add(this.args, "widthSegments", 1, 10, 1).onChange(update);
    gui.add(this.args, "heightSegments", 1, 10, 1).onChange(update);
    gui.add(this.args, "depthSegments", 1, 10, 1).onChange(update);
    // 모델 생성 후 값 변경 시 모델 재생성
  }
}

class App {
  private domApp: Element;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private cube?: THREE.Mesh;

  constructor() {
    console.log("Hello three.js");

    this.domApp = document.querySelector("#app")!;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.domApp.appendChild(this.renderer.domElement);
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x00000000, 1, 3.5);

    this.setupCamera();
    this.setupLight();
    this.setupHelpers();
    this.setupModels();
    this.setupControls();
    this.setupEvents();
  }

  private setupCamera() {
    const domApp = this.domApp;
    const width = domApp.clientWidth;
    const height = domApp.clientHeight;

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    this.camera.position.z = 2;
  }

  private setupLight() {
    const lights = [];
    for (let i = 0; i < 3; i++) {
      lights[i] = new THREE.DirectionalLight(0xffffff, 3);
      this.scene.add(lights[i]);
    }

    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);
  }

  private setupHelpers() {
    const axes = new THREE.AxesHelper(10);
    this.scene.add(axes);
    // 빨강 - x, 초록 - y, 파랑 - z

    const grid = new THREE.GridHelper(5, 20, 0xffffff, 0x444444);
    this.scene.add(grid);
  }

  private setupModels() {
    const meshMaterial = new THREE.MeshStandardMaterial({
      color: "0x156289",
      flatShading: true,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75,
    });

    const lineMaterial = new THREE.LineBasicMaterial({
      color: "0xffffff",
      transparent: true,
      opacity: 0.8,
    });

    // const geometryHelper = new BoxGeometryHelper();
    // const geometryHelper = new CircleGeometryHelper();
    // const geometryHelper = new ConeGeometryHelper();
    // const geometryHelper = new CylinderGeometryHelper();
    // const geometryHelper = new TorusGeometryHelper();
    // const geometryHelper = new SphereGeometryHelper();
    // const geometryHelper = new RingGeometryHelper();
    const geometryHelper = new PlaneGeometryHelper();

    const createModel = () => {
      const geometry = geometryHelper.createGeometry();
      const mesh = new THREE.Mesh(geometry, meshMaterial);
      const line = new THREE.LineSegments(
        new THREE.WireframeGeometry(geometry),
        lineMaterial
      );
      // 박스의 특정 면에 선이 없다. 해결해보자
      // 1번 방법 LineSegments 모델의 선을 표현하는 line객체 생성 시 boxGeometry를 사용하면 선이 아닌 면으로 표현된다.
      // 따라서 선을 표현하기 위해서는 LineGeometry를 사용해야 한다.

      // 2번 모든 선 표기하지않고 면을 삼각형으로 표현하지 않고 평평한 면에 대해서는 불필요한 선을 표현하지 않도록 하는 방법
      // EdgesGeometry 사용
      const group = new THREE.Group();
      group.name = "myModel";
      group.add(mesh, line);

      const oldGroup = this.scene.getObjectByName("myModel");
      // 이전 모델 삭제
      if (oldGroup) {
        (oldGroup.children[0] as THREE.Mesh).geometry.dispose();
        (oldGroup.children[1] as THREE.LineSegments).geometry.dispose();
        this.scene.remove(oldGroup);
      }
      this.scene.add(group);
    };

    createModel();
    geometryHelper.createGUI(createModel);
  }

  private setupControls() {
    new OrbitControls(this.camera!, this.domApp! as HTMLElement);
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
    // 회전값 지속적으로 변경하게 해주는 메서드
    time *= 0.001; // ms -> s

    // const cube = this.cube;
    // const cube = this.scene.getObjectByName("myModel");
    // if (cube) {
    //   cube.rotation.x = time;
    //   cube.rotation.y = time;
    // }
  }

  private render(time: number) {
    this.update(time);
    this.renderer.render(this.scene, this.camera!);
  }
}

new App();
