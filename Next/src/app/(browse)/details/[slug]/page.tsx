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

        return (
            <div>
                <h1>{product.name}</h1>
                <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
                <p><strong>Status:</strong> {product.status}</p>
                <p><strong>Stock:</strong> {product.stock} units available</p>
                <p><strong>Favorites Count:</strong> {product.favoritesCount}</p>
                <p><strong>Collection:</strong> {product.collections.name}</p>
                <p><strong>Series:</strong> {product.series.name}</p>
                <p><strong>Artist:</strong> {product.artist?.profile?.username}</p>
            </div>
        );
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