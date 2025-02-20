'use client'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useEffect, useRef } from 'react';

function App() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Scene, Camera, Renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setClearColor(0x000000, 0);
        if (containerRef.current) {
            renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
            containerRef.current.appendChild(renderer.domElement);
        }

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 2);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
        directionalLight.position.set(10, 10, 10);
        scene.add(directionalLight);

        // Orbit Controls (Allow movement with mouse)
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // Smooth movement
        controls.dampingFactor = 0.05;
        controls.screenSpacePanning = false;
        controls.enableZoom = false; // Disable zoom
        controls.enablePan = false; // Disable pan
        controls.minDistance = 30; // Prevent zooming too close
        controls.maxDistance = 30; // Prevent zooming too far
        controls.autoRotate = false; // Auto-rotate model
        controls.autoRotateSpeed = 1.0; // Adjust rotation speed

        // Load the 3D Model
        const loader = new GLTFLoader();
        loader.load('/assets/3d/radio.glb', (gltf: { scene: THREE.Object3D<THREE.Object3DEventMap>; }) => {
            console.log("Model loaded", gltf);
            scene.add(gltf.scene);  
            gltf.scene.scale.set(1, 1, 1);
            gltf.scene.rotation.set(0, Math.PI/3, 0);
            gltf.scene.position.set(5, -10, 5);
            
        }, undefined, (error: any) => {
            console.error('Error loading the model', error);
        });

        // Set camera position
        camera.position.set(10, 5, 10);
        camera.far = 5500; 
        camera.updateProjectionMatrix();
        // Resize handling
        const onWindowResize = () => {
            if (containerRef.current) {
                camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
            }
        };

        window.addEventListener('resize', onWindowResize);

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update(); // Update controls each frame
            renderer.render(scene, camera);
        };

        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', onWindowResize);
            containerRef.current?.removeChild(renderer.domElement);
            controls.dispose();
        };
    }, []);

    return (
        <div className="App">
            <div id="3d-model-container" ref={containerRef} style={{ width: '830px', height: '830px', marginTop: '-230px' }}></div>
        </div>
    );
}

export default App;
