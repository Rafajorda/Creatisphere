import React from "react"
import { AddtoCartButton } from "@/components/Cart/AddtoCartbutton"
import PriceSelector from "@/components/Cart/PriceSelector"
import PriceDisplay from "@/components/Cart/PriceDisplay"
import { ProductItem } from "@/types/Product"
import ModelViewer3d from "@/components/viewer/3dmodelviewer"
import Write_report from "@/components/report/write_report"

interface ListDetailsProps {
    product: ProductItem 
}



const ListDetails = ({ product }: ListDetailsProps) => {
    const defaultPrice = product.productPrices[0] || null
    const imageSize = product.ImagesProduct[0].size


    

    return (
        <div
            className={`flex flex-col ${imageSize === "wide" ? "lg:flex-row" : "md:flex-row"} items-start justify-between w-full max-w-7xl mx-auto px-4 py-8`}
        >
            <div
                className={`w-full ${imageSize === "wide" ? "lg:w-2/3" : imageSize === "tall" ? "md:w-1/3" : "md:w-1/2"} mb-8 ${imageSize !== "wide" ? "md:mb-0" : "lg:mb-0"}`}
            >
                {product.file && product.file.endsWith(".glb") ? (
                    <ModelViewer3d modelUrl={product.file} userid={product.artist.id} />
                ) : (
                    <img src={`/assets/products/${product.artist.id}/${product.ImagesProduct[0].src}`} alt={product.name} className="w-full h-auto" />
                )}
                 <Write_report productId={product.id} />
                <p className="text-lg">{product.description}</p>
               
            </div>
            
            <div
                className={`w-full ${imageSize === "wide" ? "lg:w-1/3" : imageSize === "tall" ? "md:w-2/3" : "md:w-1/2"} ${imageSize !== "wide" ? "md:pl-8" : "lg:pl-8"}`}
            >
                <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                <div className="space-y-4 mb-8">
                    
                    <div className="mb-6">
                        <PriceSelector prices={product.productPrices} defaultPrice={defaultPrice} />
                        {defaultPrice !== null && <PriceDisplay defaultPrice={defaultPrice} />}
                    </div>

                    <p className="text-lg">
                        <span className="font-semibold">Artist:</span> <a href={`http://localhost:3000/Profile/${product.artist?.profile?.username}`} className="text-blue-500 hover:underline">{product.artist?.profile?.username}</a>
                    </p>
                    <p className="text-lg">
                        <span className="font-semibold">Triangles:</span> {product.triangles}
                    </p>
                    <p className="text-lg">
                        <span className="font-semibold">File Size:</span> {product.fileSize} KB
                    </p>

                    {defaultPrice !== null && <AddtoCartButton product={product} defaultPrice={defaultPrice} />}
                </div>

            </div>
        </div>
    )
}

export default ListDetails

