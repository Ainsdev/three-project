import './style.css'
import * as THREE from 'three';

//Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(35);




//lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(-25, -7, 15);
scene.add(pointLight);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

//helpers
// const lightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(lightHelper);

//Starts
function addStar() {
    var geometry = new THREE.SphereGeometry(0.10, 12, 12);
    var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x, y, z);
    star.castShadow = true;
    scene.add(star);
}
Array(2000).fill().forEach(addStar);

//background
const spaceTexture = new THREE.TextureLoader().load('https://static.photocdn.pt/images/articles/2017/05/03/iStock-511459498.jpg');
scene.background = spaceTexture;

//planet
const planetTexture = new THREE.TextureLoader().load('https://i.ibb.co/h94JBXy/saturn3-ljge5g.jpg');
planetTexture.anisotropy = 16;
const planet = new THREE.Mesh(new THREE.SphereGeometry(4, 24, 24), new THREE.MeshStandardMaterial({ map: planetTexture }));
scene.add(planet);

//moon 
const moonTexture = new THREE.TextureLoader().load('./assets/moon.jpg');
const moon = new THREE.Mesh(
    new THREE.SphereGeometry(2, 32, 32),
    new THREE.MeshStandardMaterial({
        map: moonTexture,
        
    })
);
scene.add(moon);
moon.position.set(-43,-8, -5);

//Camera move
function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    camera.position.z = t * -0.009;
    camera.position.x = t * -0.004;
    camera.rotation.y = t * -0.0002;
}
document.body.onscroll = moveCamera;
moveCamera();

function animate() {
    requestAnimationFrame(animate);
    planet.rotation.x += 0.005;
    planet.rotation.y += 0.0003;
    planet.rotation.z += 0.001;
    moon.rotation.x += 0.005;
    moon.rotation.z += 0.005;
    renderer.render(scene, camera);
}
animate();