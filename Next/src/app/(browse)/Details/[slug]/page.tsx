    import React from 'react'
    import { getProduct } from '@/actions/getProduct'

    interface Product {
        name: string;
        // add other properties if needed
    }

    interface ProductProps {
        params: { slug: string }
    }


    const ProductPage = async ({ params }: ProductProps) => {
      try {
        // Ensure getProduct is awaited and returns a valid response
        const product = await getProduct({ slug: params.slug });
        console.log(product);
      
        if (!product) {
            return (
                <div>
                    <h1>Product Not Found</h1>
                    <p>The product with the slug "{params.slug}" does not exist.</p>
                </div>
            );
        }
        if (product.ImagesProduct[0].size === "wide") {
            return (
               
                <div className="flex flex-col md:flex-row items-center md:items-start md:justify-center min-h-screen p-4">
                <div className="w-full md:w-1/2 flex justify-center">
                    <img
                        src={`/assets/products/${product.ImagesProduct[0].src}`}
                        alt={product.name}
                        className="object-contain max-h-screen"
                    />
                </div>
                <div className="w-full md:w-1/2 mt-4 md:mt-0 md:ml-4">
                    <div>wide</div>
                    <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                    {/* <p className="text-xl mb-2"><strong>Price:</strong> ${product.price.toFixed(2)}</p> */}
                    
                    
                    <p className="text-lg mb-2"><strong>Stock:</strong> {product.stock} units available</p>
                    {product.productPrices.map((priceObj, index) => (
                        <p key={index} className="text-lg mb-2">
                            <strong>Price {index + 1}:</strong> ${priceObj.price.toFixed(2)} ({priceObj.type.name})
                        </p>
                    ))}
                    <p className="text-lg mb-2"><strong>Favorites Count:</strong> {product.favoritesCount}</p>
                    <p className="text-lg mb-2"><strong>Collection:</strong> {product.collections.name}</p>
                    <p className="text-lg mb-2"><strong>Series:</strong> {product.series.name}</p>
                    <p className="text-lg mb-2"><strong>Artist:</strong> {product.artist?.profile?.username}</p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-2">Comments</h2>
                </div>
            </div>
            );
        } else if (product.ImagesProduct[0].size === "tall") {
            return (
                <div className="flex flex-col md:flex-row items-center md:items-start md:justify-center min-h-screen p-4">
                    <div className="w-full md:w-1/2 flex justify-center">
                        <img
                            src={`/assets/products/${product.ImagesProduct[0].src}`}
                            alt={product.name}
                            className="object-contain max-h-screen"
                        />
                    </div>
                    <div className="w-full md:w-1/2 mt-4 md:mt-0 md:ml-4">
                    <div>tall</div>
                        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                         
                    <p className="text-lg mb-2"><strong>Stock:</strong> {product.stock} units available</p>
                    {product.productPrices.map((priceObj, index) => (
                        <p key={index} className="text-lg mb-2">
                            <strong>Price {index + 1}:</strong> ${priceObj.price.toFixed(2)} ({priceObj.type.name})
                        </p>
                    ))}
                        <p className="text-lg mb-2"><strong>Favorites Count:</strong> {product.favoritesCount}</p>
                        <p className="text-lg mb-2"><strong>Collection:</strong> {product.collections.name}</p>
                        <p className="text-lg mb-2"><strong>Series:</strong> {product.series.name}</p>
                        <p className="text-lg mb-2"><strong>Artist:</strong> {product.artist?.profile?.username}</p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Comments</h2>
                    </div>
                </div>
            );
        } else if (product.ImagesProduct[0].size === "square") {
            return (
                <div className="flex flex-col md:flex-row items-center md:items-start md:justify-center min-h-screen p-4">
                    <div className="w-full md:w-1/2 flex justify-center">
                        <img
                            src={`/assets/products/${product.ImagesProduct[0].src}`}
                            alt={product.name}
                            className="object-contain max-h-screen"
                        />
                    </div>
                    <div className="w-full md:w-1/2 mt-4 md:mt-0 md:ml-4">
                        <div>square</div>
                        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                        {/* <p className="text-xl mb-2"><strong>Price:</strong> ${product.price.toFixed(2)}</p> */}
                        
                    <p className="text-lg mb-2"><strong>Stock:</strong> {product.stock} units available</p>
                    {product.productPrices.map((priceObj, index) => (
                        <p key={index} className="text-lg mb-2">
                            <strong>Price {index + 1}:</strong> ${priceObj.price.toFixed(2)} ({priceObj.type.name})
                        </p>
                    ))}
                        <p className="text-lg mb-2"><strong>Favorites Count:</strong> {product.favoritesCount}</p>
                        <p className="text-lg mb-2"><strong>Collection:</strong> {product.collections.name}</p>
                        <p className="text-lg mb-2"><strong>Series:</strong> {product.series.name}</p>
                        <p className="text-lg mb-2"><strong>Artist:</strong> {product.artist?.profile?.username}</p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Comments</h2>
                    </div>
                </div>
            );
        }    
    } catch (error) {
        console.error('Error fetching product:', error);

        return (
            <div>
                <h1>Error</h1>
                <p>There was an error loading the product. Please try again later.</p>
            </div>
        );
    }
    };

    export default ProductPage;