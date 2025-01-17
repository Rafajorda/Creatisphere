import { CollectionItem } from "@/types/Collection";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { fetchWrapper } from "@/utils/fetch";

interface CollectionState {
    collections: CollectionItem[];
    loading: boolean;
    error?: string;
}

const initialState: CollectionState = {
    collections: [],
    loading: false,
    error: undefined,
};

export const fetchCollections = createAsyncThunk(
    "collections/fetchCollections",
    async () => {
        const response = await fetchWrapper(`/api/collections`, 'GET');
        return response.collections;
    }
);

const collectionSlice = createSlice({
    name: "collection",
    initialState,
    reducers: {
        pageUnloaded: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCollections.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(fetchCollections.fulfilled, (state, action) => {
                state.loading = false;
                state.collections = action.payload;
            })
            .addCase(fetchCollections.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { pageUnloaded } = collectionSlice.actions;

export const selectCollections = (state: RootState) => state.collection.collections;
export const selectLoading = (state: RootState) => state.collection.loading;
export const selectError = (state: RootState) => state.collection.error;

export default collectionSlice.reducer;