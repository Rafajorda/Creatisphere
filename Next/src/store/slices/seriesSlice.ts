import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { fetchWrapper } from "@/utils/fetch";
import { SeriesItem } from "@/types/Series";

interface SeriesState {
    series: SeriesItem[];
    loading: boolean;
    error?: string;
}

const initialState: SeriesState = {
    series: [],
    loading: false,
    error: undefined,
};

export const fetchSeries = createAsyncThunk(
    "series/fetchSeries",
    async () => {
        const response = await fetchWrapper(`/api/series`, 'GET');
        return response.series;
    }
);

const seriesSlice = createSlice({
    name: "series",
    initialState,
    reducers: {
        pageUnloaded: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSeries.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(fetchSeries.fulfilled, (state, action) => {
                state.loading = false;
                state.series = action.payload;
            })
            .addCase(fetchSeries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { pageUnloaded } = seriesSlice.actions;

export const selectSeries = (state: RootState) => state.series.series;
export const selectLoading = (state: RootState) => state.series.loading;
export const selectError = (state: RootState) => state.series.error;

export default seriesSlice.reducer;