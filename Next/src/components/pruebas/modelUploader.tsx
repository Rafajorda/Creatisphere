'use client';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useState } from 'react';

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

    const processModel = async (file: Blob | MediaSource) => {
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
                            triangleCount += geometry.index.count / 3; // Indexed geometry
                        } else {
                            triangleCount += geometry.attributes.position.count / 3; // Non-indexed
                        }
                    }
                });
                setTriangleCount(triangleCount);
                console.log("📌 Model Metadata:");
                console.log("📂 File Name:", (file as File).name);
                console.log("📏 File Size:", fileSize);
                console.log("🔺 Triangles:", triangleCount);
                console.log("🔺 Triangles:", triangleCount);

                // Save the file to public/assets/3d
                const reader = new FileReader();
                reader.onload = () => {
                    const buffer = reader.result;
                    const blob = new Blob([buffer as ArrayBuffer], { type: 'model/gltf-binary' });
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    fetch('/api/upload', {
                        method: 'POST',
                        body: JSON.stringify({
                            fileName: (file as File).name.replace('.gltf', '.glb'),
                            fileData: Buffer.from(buffer as ArrayBuffer).toString('base64')
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
                    const saveButton = document.createElement('button');
                    saveButton.textContent = 'Save Model';
                    saveButton.onclick = () => {
                        link.click();
                        document.body.removeChild(saveButton);
                    };
                    document.body.appendChild(saveButton);
                };
                reader.readAsArrayBuffer(file as Blob);

                URL.revokeObjectURL(fileURL); // Clean up object URL
                resolve();
            }, undefined, (error: any) => reject(error));
        });
    };

    return (
        <div className="p-4">
            <h2 className="text-lg font-bold">Upload 3D Model</h2>
            <select className="border p-2 rounded-md mt-2">
                <option>Select a 3D model</option>
                {selectedFile && <option>{selectedFile.name}</option>}
            </select>
            <input
                type="file"
                accept=".gltf, .glb"
                onChange={handleFileChange}
                className="block mt-4 p-2 border rounded-md"
            />
            {selectedFile && (
                <div className="mt-4">
                    <p className="text-sm">File Size: {(selectedFile.size / 1024).toFixed(2)} KB</p>
                    <p className="text-sm">Triangles: {triangleCount}</p>
                    <button
                        onClick={() => processModel(selectedFile)}
                        className="mt-4 p-2 bg-blue-500 text-white rounded-md"
                    >
                        Save Model
                    </button>
                </div>
            )}
        </div>
    );
}

export default ModelUploader;
