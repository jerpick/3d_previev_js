import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.117.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/loaders/GLTFLoader.js';


let scene, camera, renderer, hlight, controls;

      function init() {

        const texture = new THREE.TextureLoader().load( "bg.jpg" );
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;

        scene = new THREE.Scene();
        scene.background = texture

        const spotLight = new THREE.SpotLight( 0x404040, 5);
        spotLight.position.set( 1000, 100, 100 );
        spotLight.position.set( 1000, 100, 100 );
        // spotLight.map = new THREE.TextureLoader().load( url );
        spotLight.Angle = Math.PI/6
        spotLight.castShadow = true;

        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;

        spotLight.shadow.camera.near = 500;
        spotLight.shadow.camera.far = 4000;
        spotLight.shadow.camera.fov = 30;

        scene.add( spotLight );

        camera = new THREE.PerspectiveCamera(40,window.innerWidth/window.innerHeight,1,5000);
        camera.rotation.y = 45/180*Math.PI;
        camera.position.x = 800;
        camera.position.y = 500;
        camera.position.z = 1000;

        hlight = new THREE.AmbientLight (0x404040,0.5);
        scene.add(hlight);

        var directionalLight = new THREE.DirectionalLight(0x00d5ff,.1);
        directionalLight.position.set(0,1,0);
        directionalLight.castShadow = true;
        scene.add(directionalLight);
        var light = new THREE.PointLight(0xc4c4c4,1);
        light.position.set(0,300,500);
        scene.add(light);
        var light2 = new THREE.SpotLight(0xc4c4c4,0.1);
        light2.position.set(500,100,0);
        scene.add(light2);
        var light3 = new THREE.SpotLight(0xc4c4c4,0.1);
        light3.position.set(0,0,300);
        light3.castShadow = true;
        scene.add(light3);
        var light4 = new THREE.PointLight(0x00d5ff,);
        light4.position.set(-500,300,500);
        scene.add(light4);

        renderer = new THREE.WebGLRenderer({antialias:true});
        renderer.setSize(window.innerWidth,window.innerHeight);
        document.body.appendChild(renderer.domElement);

        controls = new OrbitControls(camera, renderer.domElement);
        controls.addEventListener('change', renderer);

        let loader = new GLTFLoader();
        loader.load('scene.gltf', function(gltf){
          var car = gltf.scene.children[0];
          car.scale.set(150.5,150.5,150.5);
          scene.add(gltf.scene);
          animate();
        });
      }
      function animate() {
        renderer.render(scene,camera);
        requestAnimationFrame(animate);
      }
      init();