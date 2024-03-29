import { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import starsTexure from '../assets/stars.jpg';
import sunTexure from '../assets/sun.jpg';
import mercuryTexure from '../assets/mercury.jpg';
import venusTexure from '../assets/venus.jpg';
import earthTexure from '../assets/earth.jpg';
import marsTexure from '../assets/mars.jpg';
import jupiterTexure from '../assets/jupiter.jpg';
import saturnTexure from '../assets/saturn.jpg';
import saturnRingTexure from '../assets/saturn_ring.png';
import uranusTexure from '../assets/uranus.jpg';
import uranusRingTexure from '../assets/uranus_ring.png';
import neptuneTexure from '../assets/neptune.jpg';
import plutoTexure from '../assets/pluto.jpg';
// import moonTexture from '../assets/moon.jpg';

const SolarSystem = () => {
  useEffect(() => {
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    const root = document.getElementById('root');
    root.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const orbit = new OrbitControls(camera, renderer.domElement);
    camera.position.set(-90, 140, 140);
    orbit.update();

    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);

    const cubeTextureLoader = new THREE.CubeTextureLoader();
    scene.background = cubeTextureLoader.load([
      starsTexure,
      starsTexure,
      starsTexure,
      starsTexure,
      starsTexure,
      starsTexure,
    ]);
    const textureLoader = new THREE.TextureLoader();

    // Sun
    const sunGeo = new THREE.SphereGeometry(16, 30, 30);
    const sunMat = new THREE.MeshBasicMaterial({
      map: textureLoader.load(sunTexure),
    });
    const sun = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sun);

    // Create Planets

    const createPlanets = (size, texure, position, ring = false) => {
      const geo = new THREE.SphereGeometry(size, 30, 30);
      const mat = new THREE.MeshStandardMaterial({
        map: textureLoader.load(texure),
      });
      const mesh = new THREE.Mesh(geo, mat);
      const obj = new THREE.Object3D();
      obj.add(mesh);
      if (ring) {
        const ringGeo = new THREE.RingGeometry(
          ring.innerRadius,
          ring.outerRadius,
          32
        );
        const ringMat = new THREE.MeshBasicMaterial({
          map: textureLoader.load(ring.texture),
          side: THREE.DoubleSide,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        obj.add(ringMesh);
        ringMesh.position.x = position;
        ringMesh.rotation.x = -0.5 * Math.PI;
      }
      scene.add(obj);
      mesh.position.x = position;

      return { mesh, obj };
    };

    const mercury = createPlanets(3.2, mercuryTexure, 28);
    const venus = createPlanets(5.8, venusTexure, 44);
    const earth = createPlanets(6, earthTexure, 62);
    // const moon = createPlanets(1.5, moonTexture, 64);
    // earth.obj.add(moon.obj);
    // moon.obj.position.x = 6;

    const mars = createPlanets(4, marsTexure, 78);
    const jupiter = createPlanets(4, jupiterTexure, 100);
    const saturn = createPlanets(10, saturnTexure, 138, {
      innerRadius: 10,
      outerRadius: 20,
      texture: saturnRingTexure,
    });
    const uranus = createPlanets(7, uranusTexure, 176, {
      innerRadius: 7,
      outerRadius: 12,
      texture: uranusRingTexure,
    });
    const neptune = createPlanets(7, neptuneTexure, 200);
    const pluto = createPlanets(2.8, plutoTexure, 216);

    // pointLight
    const pointLight = new THREE.AmbientLight(0xffffff);
    scene.add(pointLight);

    // animation
    function animate() {
      // self-rotation
      sun.rotateY(0.004);
      mercury.mesh.rotateY(0.004);
      venus.mesh.rotateY(0.002);
      earth.mesh.rotateY(0.02);
      //   moon.mesh.rotateY(0.01);
      mars.mesh.rotateY(0.018);
      jupiter.mesh.rotateY(0.04);
      saturn.mesh.rotateY(0.038);
      uranus.mesh.rotateY(0.03);
      neptune.mesh.rotateY(0.032);
      pluto.mesh.rotateY(0.008);

      // Sun-rotation
      mercury.obj.rotateY(0.04);
      venus.obj.rotateY(0.015);
      earth.obj.rotateY(0.01);
      //   moon.obj.rotateY(0.00001);
      //   moon.obj.rotateX(0.001);
      mars.obj.rotateY(0.008);
      jupiter.obj.rotateY(0.002);
      saturn.obj.rotateY(0.0009);
      uranus.obj.rotateY(0.0004);
      neptune.obj.rotateY(0.0001);
      pluto.obj.rotateY(0.00007);

      renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);

    window.addEventListener('resize', function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }, []);
};

export default SolarSystem;
