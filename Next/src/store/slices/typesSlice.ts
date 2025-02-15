import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { fetchWrapper } from "@/utils/fetch";
import { TypeItem } from "@/types/Type";

interface TypesState {
    types: TypeItem[];
    loading: boolean;
    error?: string;
}

const initialState: TypesState = {
    types: [],
    loading: false,
    error: undefined,
};

export const fetchTypes = createAsyncThunk(
    "types/fetchctypes",
    async () => {
        const response = await fetchWrapper(`/api/types`, 'GET');
        return response.types;
    }
);

const typesSlice = createSlice({
    name: "types",
    initialState,
    reducers: {
        pageUnloaded: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTypes.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(fetchTypes.fulfilled, (state, action) => {
                state.loading = false;
                state.types = action.payload;
            })
            .addCase(fetchTypes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { pageUnloaded } = typesSlice.actions;

export const selectTypes = (state: RootState) => state.types.types;
export const selectLoading = (state: RootState) => state.types.loading;
export const selectError = (state: RootState) => state.types.error;

export default typesSlice.reducer;