import { ProductItem } from "@/types/Product";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { fetchWrapper } from "@/utils/fetch";

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

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async () => {
        const response = await fetchWrapper(`/api/products`, 'GET');
        return response.products;
    }
);

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        pageUnloaded: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { pageUnloaded } = productSlice.actions;

export const selectProducts = (state: RootState) => state.product.products;
export const selectLoading = (state: RootState) => state.product.loading;
export const selectError = (state: RootState) => state.product.error;

export default productSlice.reducer;