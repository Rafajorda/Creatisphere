// cartSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CartProductItem } from '@/types/CartProduct';  
import { CartLineItem } from '@/types/CartLine';        
import { fetchWrapper } from '@/utils/fetch';  // Asegúrate de importar tu `fetchWrapper`


export const fetchPriceForProduct = createAsyncThunk(
  'cart/fetchPriceForProduct',
  async (productId: number) => {
    const priceData = await fetchWrapper<{ price: number }>(`/product/${productId}/price`);
    return priceData.price;
  }
);

// Estado inicial
interface CartState {
  cartId: number | null;
  cartLines: CartLineItem[];
  total: number;
  status: 'ACTIVE' | 'INACTIVE';
}

const initialState: CartState = {
  cartId: null,
  cartLines: [],
  total: 0,
  status: 'ACTIVE',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    addProductToCart(state, action: PayloadAction<CartProductItem>) {
      const newProduct = action.payload;

      const existingCartLine = state.cartLines.find(
        (line: { productPriceId: number; }) => line.productPriceId === newProduct.productPriceid
      );

      if (existingCartLine) {
        // Si el producto ya existe, solo aumentamos la cantidad
        existingCartLine.quantity += newProduct.quantity;
      } else {
        // Si el producto no está en el carrito, lo agregamos como una nueva línea
        state.cartLines.push({
          productPriceId: newProduct.productPriceid,
          quantity: newProduct.quantity,
          price: 0, // Inicializamos con 0, ya que el precio lo obtendremos asincrónicamente
        });
      }

      // Recalcular el total
      state.total = state.cartLines.reduce(
        (sum: number, line: { price: number; quantity: number; }) => sum + line.price * line.quantity,
        0
      );
    },

    // Acción para eliminar un producto del carrito
    removeProductFromCart(state, action: PayloadAction<number>) {
      const productId = action.payload;
      state.cartLines = state.cartLines.filter((line: { productPriceId: number; }) => line.productPriceId !== productId);

      // Recalcular el total
      state.total = state.cartLines.reduce(
        (sum: number, line: { price: number; quantity: number; }) => sum + line.price * line.quantity,
        0
      );
    },

    // Acción para vaciar el carrito
    clearCart(state) {
      state.cartLines = [];
      state.total = 0;
      state.status = 'INACTIVE';
    },

    
    updateProductQuantity(state, action: PayloadAction<{ productId: number; quantity: number }>) {
      const { productId, quantity } = action.payload;
      const existingCartLine = state.cartLines.find((line: { productPriceId: number; }) => line.productPriceId === productId);

      if (existingCartLine) {
        existingCartLine.quantity = quantity;
      }

      // Recalcular el total
      state.total = state.cartLines.reduce(
        (sum: number, line: { price: number; quantity: number; }) => sum + line.price * line.quantity,
        0
      );
    },

    // Acción para cambiar el estado del carrito (activo/inactivo)
    setCartStatus(state, action: PayloadAction<'ACTIVE' | 'INACTIVE'>) {
      state.status = action.payload;
    },

    // Acción para inicializar el carrito con un cartId ya existente
    setCartId(state, action: PayloadAction<number>) {
      state.cartId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPriceForProduct.fulfilled, (state, action) => {
        // Cuando obtenemos el precio, lo actualizamos en las líneas correspondientes
        const price = action.payload;
        state.cartLines = state.cartLines.map((line: { productPriceId: number; price: number; quantity: number; }) => {
          if (line.productPriceId === action.meta.arg) {
            line.price = price;  // Actualizamos el precio del producto
          }
          return line;
        });

        // Recalcular el total
        state.total = state.cartLines.reduce(
          (sum: number, line: { price: number; quantity: number; }) => sum + line.price * line.quantity,
          0
        );
      })
      .addCase(fetchPriceForProduct.rejected, (state, action) => {
        // Si la consulta falla, podemos manejar el error aquí
        console.error('Error fetching product price', action.error);
      });
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  clearCart,
  updateProductQuantity,
  setCartStatus,
  setCartId,
} = cartSlice.actions;

export default cartSlice.reducer;
