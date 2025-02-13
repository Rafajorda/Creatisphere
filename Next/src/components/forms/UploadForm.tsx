"use client"
import FileUpload from "@/components/Upload/FileUpload"
import React, { useState } from "react"
import { useAppSelector } from "../../store/store";
import { selectCategories } from "../../store/slices/categoriesSlice";
import { selectSeries } from "../../store/slices/seriesSlice";
import { selectCollections } from "../../store/slices/collectionSlice";
import { selectTypes } from "../../store/slices/typesSlice";
import { Button } from "../ui/button";
import { useFileUpload } from "@/hooks/useFileUpload";
import { set } from "zod";
import { fetchWrapper } from "@/utils/fetch";
import { POST } from "@/app/api/cart/route";
import { toast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";

interface FileWithPreview extends File {
    preview: string;
}

interface ProductForm{
    name: string;
    categories: number[];
    size: string | null; 
    series: number;       
    collection: number;
    types: { id: number; price: number }[]; 
    file: File | null;
    email: string;
}

export default function UploadForm() {
    const session = useSession();
    const [product, setProduct] = useState<ProductForm>({
        name: "",
        categories: [],
        size: "",
        series: 0,
        collection: 0,
        types: [],
        file: null,
        email: session.data?.user.email || "",
    })
     const [loading, setLoading] = useState(false);
     const categories = useAppSelector(selectCategories);
     const series = useAppSelector(selectSeries);
     const collections = useAppSelector(selectCollections);
     const types = useAppSelector(selectTypes);
     const { uploadFiles } = useFileUpload();
    const onFieldChange = (val: Partial<ProductForm>) => {
        setProduct({ ...product, ...val })
    }

    const handleMultiSelect = (e: React.ChangeEvent<HTMLSelectElement>, field: "categories" ) => {
        const selectedValues = Array.from(e.target.selectedOptions, option => Number(option.value));
        setProduct({ ...product, [field]: selectedValues });
    };

    const handleTypeSelection = (typeId: number, price: number) => {
        setProduct(prev => {
            const existingType = prev.types.find(t => t.id === typeId);
            if (existingType) {
                return {
                    ...prev,
                    types: prev.types.map(t => (t.id === typeId ? { ...t, price } : t)),
                };
            } else {
                return {
                    ...prev,
                    types: [...prev.types, { id: typeId, price }],
                };
            }
        });
    };

    const handleFileChange = (file: File) => {
       
        if (file instanceof File) {
            setProduct(prev => ({ ...prev, file }));
        } else {
            console.error("❌ Archivo inválido recibido en UploadForm");
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (product.file instanceof File) {
            const success = await uploadFiles([product.file]); 
            
            console.log(session);
            if (!success) {
                console.error("Error: No se ha podido subir el archivo.");
                setLoading(false);
                return;
            }
            console.log("product");
            console.log(product);
            try{
                product.email = session.data?.user.email || "";
                await fetchWrapper("/api/products", "POST", product).then(() => {
                    toast({ title: "Producto creado exitosamente" });
                });
            }catch{
                toast({ title: "Error al crear el producto"});
            }


        } else {
            console.error("Error: No se ha seleccionado un archivo válido.");
            setLoading(false);
            return;
        }
       
        setLoading(false);
    };
    const handleSizeChange = (size: string) => {
        setProduct(prev => ({
            ...prev,
            size: prev.size === size ? null : size, 
        }));
    }



    return (
        <div className="flex justify-center items-center min-h-screen py-4 px-6">
            <form className="w-full max-w-screen-md space-y-3">
                <section>
                    <h1 className="text-3xl font-bold text-center">Carga de archivos</h1>
                    <FileUpload onFileChange={handleFileChange}/>
                </section>
                <section>
                    <fieldset className="form-group mb-0">
                        <label className="block mb-1">Tamaño</label>
                        <div className="flex flex-wrap gap-2">
                            {["tall", "wide", "square"].map((size) => (
                                <label key={size} className="flex items-center gap-2 cursor-pointer w-1/2 md:w-1/3 lg:w-1/4">
                                    <input
                                        type="checkbox"
                                        value={size}
                                        checked={product.size === size}  
                                        onChange={() => handleSizeChange(size)}
                                        className="form-checkbox h-5 w-5 text-gold"
                                    />
                                    <span className="text-white">{size}</span>
                                </label>
                            ))}
                        </div>
                    </fieldset>
                </section>
                <section>
                    <fieldset className="form-group mb-0">
                        <input
                            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-gold"
                            type="text"
                            name="name"
                            placeholder={"product name"}
                            data-testid="input-name"
                            value={product.name}
                            onChange={(e) => onFieldChange({ name: e.target.value })}
                            disabled={loading}
                        />
                    </fieldset>
                </section>

                <section>
                    <fieldset className="form-group mb-0">
                        <label className="block mb-1">Categorías</label>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <label key={category.id} className="flex items-center gap-2 cursor-pointer w-1/2 md:w-1/3 lg:w-1/4">
                                    <input
                                        type="checkbox"
                                        value={category.id}
                                        checked={product.categories.includes(category.id)}
                                        onChange={(e) => {
                                            const id = Number(e.target.value);
                                            setProduct(prev => ({
                                                ...prev,
                                                categories: e.target.checked
                                                    ? [...prev.categories, id]
                                                    : prev.categories.filter(catId => catId !== id)
                                            }));
                                        }}
                                        className="form-checkbox h-5 w-5 text-gold"
                                    />
                                    <span className="text-white">{category.name}</span>
                                </label>
                            ))}
                        </div>
                    </fieldset>
                </section>

                <section>
                    <fieldset className="form-group mb-0">
                        <label className="block mb-1">Series</label>
                        <select
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-gold text-black"
                            value={product.series}
                            onChange={(e) => setProduct({ ...product, series: Number(e.target.value) })}
                            disabled={loading}
                        >
                            <option value={0}>Seleccione una serie</option>
                            {series.map((series) => (
                                <option key={series.id} value={series.id}>{series.name}</option>
                            ))}
                        </select>
                    </fieldset>
                </section>

                <section>
                    <fieldset className="form-group mb-0">
                        <label className="block mb-1">Colección</label>
                        <select
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-gold text-black"
                            value={product.collection}
                            onChange={(e) => setProduct({ ...product, collection: Number(e.target.value) })}
                            disabled={loading}
                        >
                            <option value={0}>Seleccione una colección</option>
                            {collections.map((collection) => (
                                <option key={collection.id} value={collection.id}>{collection.name}</option>
                            ))}
                        </select>
                    </fieldset>
                </section>

                <section>
                    <fieldset className="form-group mb-0">
                        <label className="block mb-1">Tipos y Precios</label>
                        {types.map((type) => (
                            <div key={type.id} className="flex items-center gap-2 mb-2">
                                <input
                                    type="checkbox"
                                    id={`type-${type.id}`}
                                    onChange={(e) => {
                                        if (!e.target.checked) {
                                            setProduct(prev => ({
                                                ...prev,
                                                types: prev.types.filter(t => t.id !== type.id),
                                            }));
                                        }
                                    }}
                                />
                                <label htmlFor={`type-${type.id}`} className="mr-2">{type.name}</label>
                                <input
                                    type="number"
                                    placeholder="Precio"
                                    className="px-3 py-2 border rounded-lg w-24 text-black"
                                    onChange={(e) => handleTypeSelection(type.id, parseFloat(e.target.value))}
                                    disabled={loading}
                                />
                            </div>
                        ))}
                    </fieldset>
                </section>
                <Button onClick={handleSubmit}>Crear Producto</Button>
            </form>
        </div>
    )
}
