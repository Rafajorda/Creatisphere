// 'use client'
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { useEffect, useRef } from 'react';

// interface ModelViewerProps {
//     modelUrl: string;
// }

// function ModelViewer3d({ modelUrl }: ModelViewerProps) {
//     const containerRef = useRef<HTMLDivElement>(null);  

//     useEffect(() => {
//         // Scene, Camera, Renderer
//         const scene = new THREE.Scene();
//         const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//         const renderer = new THREE.WebGLRenderer({ antialias: true });
//         renderer.setClearColor(0x000000, 0);
//         if (containerRef.current) {
//             renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
//             containerRef.current.appendChild(renderer.domElement);
//         }

//         // Lighting
//         const ambientLight = new THREE.AmbientLight(0x404040, 2);
//         scene.add(ambientLight);

//         const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
//         directionalLight.position.set(10, 10, 10);
//         scene.add(directionalLight);

//         // Orbit Controls (Allow movement with mouse)
//         const controls = new OrbitControls(camera, renderer.domElement);
//         controls.enableDamping = true; // Smooth movement
//         controls.dampingFactor = 0.05;
//         controls.screenSpacePanning = true;
//         controls.enableZoom = true; 
//         controls.enablePan = true; // Enable pan
//         controls.minDistance = 10; // Prevent zooming too close
//         controls.maxDistance = 50; // Prevent zooming too far
//         controls.autoRotate = false; // Auto-rotate model
//         controls.autoRotateSpeed = 1.0; // Adjust rotation speed

//         // Load the 3D Model
//         const loader = new GLTFLoader();
//         let model: THREE.Object3D | null = null;
//         loader.load(modelUrl, (gltf: { scene: THREE.Object3D<THREE.Object3DEventMap>; }) => {
//             console.log("Model loaded", gltf);
//             model = gltf.scene;
//             scene.add(model);  
//             model.scale.set(1, 1, 1);
//             model.rotation.set(0,0, 0);
//             model.position.set(0, 0, 0);
            
//         }, undefined, (error: any) => {
//             console.error('Error loading the model', error);
//         });

//         // Set camera position
//         camera.position.set(10, 5, 10);
//         camera.far = 5500; 
//         camera.updateProjectionMatrix();
//         // Resize handling
//         const onWindowResize = () => {
//             if (containerRef.current) {
//                 camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
//                 camera.updateProjectionMatrix();
//                 renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
//             }
//         };

//         window.addEventListener('resize', onWindowResize);

//         // Animation loop
//         const animate = () => {
//             requestAnimationFrame(animate);
//             controls.update(); // Update controls each frame
//             renderer.render(scene, camera);
//         };

//         animate();

//         // Cleanup
//         return () => {
//             window.removeEventListener('resize', onWindowResize);
//             if (containerRef.current && renderer.domElement) {
//                 containerRef.current.removeChild(renderer.domElement);
//             }
//             controls.dispose();
//             if (model) {
//                 scene.remove(model);
//                 model.traverse((child) => {
//                     if ((child as THREE.Mesh).geometry) {
//                         (child as THREE.Mesh).geometry.dispose();
//                     }
//                     if ((child as THREE.Mesh).material) {
//                         if (Array.isArray((child as THREE.Mesh).material)) {
//                             (child as THREE.Mesh).material.forEach((material) => material.dispose());
//                         } else {
//                             (child as THREE.Mesh).material.dispose();
//                         }
//                     }
//                 });
//             }
//             renderer.dispose();
//         };
//     }, [modelUrl]);

//     return (
//         <div className="App">
//             <div id="3d-model-container" ref={containerRef} ></div>
//         </div>
//     );
// }

// export default ModelViewer3d;
'use client'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useEffect, useRef } from 'react';

interface ModelViewerProps {
    modelUrl: string;
}
function ModelViewer3d({ modelUrl }: ModelViewerProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

        if (containerRef.current) {
            containerRef.current.innerHTML = ''; // Clear previous canvas
            renderer.setSize(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            containerRef.current.appendChild(renderer.domElement);
        }

        const ambientLight = new THREE.AmbientLight(0x404040, 2);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
        directionalLight.position.set(10, 10, 10);
        scene.add(directionalLight);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enableZoom = true;
        controls.enablePan = true;
        controls.minDistance = 15;
        controls.maxDistance = 50;

        let model: THREE.Object3D | null = null;
        const loader = new GLTFLoader();
        loader.load(modelUrl, (gltf: { scene: THREE.Object3D<THREE.Object3DEventMap> | null; }) => {
            model = gltf.scene;
            if (model) {
                scene.add(model);
            }
            if (model) {
                model.scale.set(1.5, 1.5, 1.5);
                model.position.set(0, 0, 0);
            }
        }, undefined, (error: any) => {
            console.error('❌ Error loading model', error);
        });

        camera.position.set(10, 5, 10);
        camera.updateProjectionMatrix();

        const onWindowResize = () => {
            if (containerRef.current) {
                camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
            }
        };
        // window.addEventListener('resize', onWindowResize);

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            window.removeEventListener('resize', onWindowResize);
            if (containerRef.current) containerRef.current.removeChild(renderer.domElement);
            controls.dispose();
            if (model) {
                scene.remove(model);
                model.traverse((child) => {
                    if ((child as THREE.Mesh).geometry) {
                        (child as THREE.Mesh).geometry.dispose();
                    }
                    if ((child as THREE.Mesh).material) {
                        if (Array.isArray((child as THREE.Mesh).material)) {
                            (child as THREE.Mesh).material.forEach((mat) => mat.dispose());
                        } else {
                            (child as THREE.Mesh).material.dispose();
                        }
                    }
                });
            }
            renderer.dispose();
        };
    }, [modelUrl]);

    return <div ref={containerRef} style={{  height: '50vh', overflow: 'hidden' }} />;
}

export default ModelViewer3d;
