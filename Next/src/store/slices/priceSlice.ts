  import { createSlice, PayloadAction } from "@reduxjs/toolkit";
  import { $Enums, ProductPrice } from "@prisma/client";
import { ProductPriceItem } from "@/types/ProductPrice";
  // interface PriceState {
  //   selectedPrice: ProductPrice | null; 
  // }

  interface PriceState{
    selectedprice: ProductPriceItem | null;
  }

  const initialState: PriceState = {
  selectedprice: null,
  };
  


  export const priceSlice = createSlice({
    name: "price",
    initialState,
    reducers: {
      setSelectedPrice: (state, action: PayloadAction<ProductPriceItem>) => {
        state.selectedprice = action.payload
      },
    },
  });

  export const { setSelectedPrice } = priceSlice.actions;
  export default priceSlice.reducer;
