'use client';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useState } from 'react';
import ModelViewer3d from '../viewer/3dmodelviewer';
import { useAppSelector } from '@/store/store';
import { selectCategories } from '@/store/slices/categoriesSlice';
import { useSession } from 'next-auth/react';

interface productForm {
    name: string
    categories: number[]
    file: File | null
    types: []
    triangles: number | null
    fileSize: number | null
    description: string
    email: string
}

function ModelUploader() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [triangleCount, setTriangleCount] = useState<number | null>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;
        const file = files[0];
        if (file) {
            setSelectedFile(file);
            await processModel(file);
        }
    };

    const saveModel = async () => {
        if (!selectedFile) return;
        const fileBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as ArrayBuffer);
            reader.onerror = () => reject(new Error("Failed to read file"));
            reader.readAsArrayBuffer(selectedFile);
        });


        const reader = new FileReader();
        reader.onload = () => {
            // const buffer = reader.result;
            fetch('/api/upload', {
                method: 'POST',
                body: JSON.stringify({
                    fileName: selectedFile.name.replace('.gltf', '.glb'),
                    fileData: Buffer.from(fileBuffer as ArrayBuffer).toString('base64')
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('File uploaded successfully');
                } else {
                    console.error('File upload failed');
                }
            })
            .catch(error => {
                console.error('Error uploading file:', error);
            });
        };
        reader.readAsArrayBuffer(selectedFile);
    };
        

    const processModel = async (file: Blob | MediaSource) => {
        // const  session = useSession();
        // const categories = useAppSelector(selectCategories)



        return new Promise<void>((resolve, reject) => {
            const loader = new GLTFLoader();
            const fileSize = file instanceof Blob ? (file.size / 1024).toFixed(2) + " KB" : "Unknown size"; // Get file size in KB

            // Convert file to Object URL for loading
            const fileURL = URL.createObjectURL(file);

            loader.load(fileURL, (gltf: { scene: { traverse: (arg0: (child: any) => void) => void; }; }) => {
                let triangleCount = 0;

                gltf.scene.traverse((child) => {
                    if (child.isMesh) {
                        const geometry = child.geometry;
                        if (geometry.index) {
                            triangleCount += geometry.index.count / 3;
                        } else {
                            triangleCount += geometry.attributes.position.count / 3; 
                        }
                    }
                });
                setTriangleCount(triangleCount);
                URL.revokeObjectURL(fileURL); // Clean up object URL
                resolve();
            }, undefined, (error: any) => reject(error));
        });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-800">
            <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4 text-center text-black">Upload 3D Model</h2>
            <input
                type="file"
                accept=".gltf, .glb"
                onChange={handleFileChange}
                className="block w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            {selectedFile && (
                <div className="mb-4">
                <ModelViewer3d modelUrl={URL.createObjectURL(selectedFile)} />
                </div>
            )}
            <div className="mt-4">
                {selectedFile && (
                    <>
                <p className="text-sm text-gray-600 mb-2">
                    File Size: {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
                <p className="text-sm text-gray-600 mb-4">Triangles: {triangleCount}</p>
                </>
            )}
                <button
                    onClick={() => { if (selectedFile) saveModel(); }}
                    className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                Save Model
                </button>
            </div>
            </div>
        </div>
    );
}

export default ModelUploader;
