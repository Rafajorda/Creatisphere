import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchWrapper } from "@/utils/fetch"

interface FavoritesState {
    favorites: string[]
    status: "idle" | "loading" | "succeeded" | "failed"
    error: string | null
}

const initialState: FavoritesState = {
    favorites: [],
    status: "idle",
    error: null,
}

export const addFavorite = createAsyncThunk("favorites/add", async (slug: string) => {
    console.log(`addfavorite: ${slug}`);
    await fetchWrapper(`/api/products/${slug}/favorite`, "POST")
    return slug
})

export const removeFavorite = createAsyncThunk("favorites/remove", async (slug: string) => {
    console.log(`removeFavorite: ${slug}`);
    await fetchWrapper(`/api/products/${slug}/favorite`, "DELETE")
    return slug
})

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addFavorite.pending, (state) => {
                state.status = "loading"
            })
            .addCase(addFavorite.fulfilled, (state, action) => {
                state.status = "succeeded"
                if (!state.favorites.includes(action.payload)) {
                    state.favorites.push(action.payload)
                }
            })
            .addCase(addFavorite.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message || null
            })
            .addCase(removeFavorite.pending, (state) => {
                state.status = "loading"
            })
            .addCase(removeFavorite.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.favorites = state.favorites.filter((slug) => slug !== action.payload)
            })
            .addCase(removeFavorite.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message || null
            })
    },
})

export default favoritesSlice.reducer

