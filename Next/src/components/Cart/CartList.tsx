import React from "react"


interface CartListProps{
  
    cart :any;
}

export const CartList =  ({ cart }: CartListProps) => {
     const cartItems =cart;
    console.log("patata");
   console.log(cartItems);
    console.log("patata");
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return <p className="text-gray-700">No items in the cart yet.</p>;
    }

    const total = cartItems.reduce((accum, cartItem: any) => {
      const itemPrice = cartItem.productPrice.price;
      return accum + itemPrice;
    }, 0);
  
  
    return (
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold mb-4">Cart</h1>
        {cartItems.map((cartItem: any) => (
          <div key={cartItem.id} className="flex items-center justify-between border-b border-gray-300 py-2">
            <div className="flex items-center">
             
             <img
                src={`/assets/products/${cartItem.productPrice.product.ImagesProduct[0].src}`}
                alt={cartItem.productPrice.product.name}
                className="object-contain h-16 w-16"
                ></img>
              <div className="ml-4">
                <h2 className="text-xl font-bold">{cartItem.productPrice.product.name}</h2> 
                <div className ="ml-auto">
                  <p className="text-lg ">Price: ${cartItem.productPrice.price.toFixed(2)}</p>
                </div>
              </div>
            </div>
           
          </div>
        ))}
         <div className="mt-4 text-left">
                <h3 className="text-2xl font-bold">Total: ${total.toFixed(2)}</h3>
          </div>
      </div>
      
    );
  };