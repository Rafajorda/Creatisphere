import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { fetchWrapper } from "@/utils/fetch";
import { CategoryItem } from "@/types/Category";

interface CategoriesState {
    categories: CategoryItem[];
    loading: boolean;
    error?: string;
}

const initialState: CategoriesState = {
    categories: [],
    loading: false,
    error: undefined,
};

export const fetchCategories = createAsyncThunk(
    "categories/fetchcategories",
    async () => {
        const response = await fetchWrapper(`/api/categories`, 'GET');
        return response.categories;
    }
);

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        pageUnloaded: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { pageUnloaded } = categoriesSlice.actions;

export const selectCategories = (state: RootState) => state.categories.categories;
export const selectLoading = (state: RootState) => state.categories.loading;
export const selectError = (state: RootState) => state.categories.error;

export default categoriesSlice.reducer;