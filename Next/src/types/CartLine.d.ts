export interface CartLineItem {
    productPriceId: number; 
    quantity: number; 
    price: number;    
  }

export interface CartLineResponse {
    cartLines: CartLineItem[];
}