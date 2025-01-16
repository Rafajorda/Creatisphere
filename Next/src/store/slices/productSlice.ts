import getProducts from "@/actions/getProducts";
import { ProductItem } from "@/types/Product";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ProductState {
    products: ProductItem[];
    loading: boolean;
    error?: string;
}

const initialState: ProductState = {
    products: [],
    loading: false,
    error: undefined,
};

export const getProductsRedux = createAsyncThunk(
    "product/getAllProducts",
    getProducts
);

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        pageUnloaded: () => initialState,
    },
    extraReducers(builder) {
        builder.addCase(getProductsRedux.fulfilled, (state, action) => {
            state.products = action.payload.products;
        })
    },
});

export const { pageUnloaded } = productSlice.actions;

export default productSlice.reducer;