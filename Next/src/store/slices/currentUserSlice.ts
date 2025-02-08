
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { currentUser } from "@/types/CurrentUser"
import { fetchWrapper } from "@/utils/fetch"

interface CurrentUserState {
    user: currentUser | null
    status: "idle" | "loading" | "succeeded" | "failed"
    error: string | null
}

const initialState: CurrentUserState = {
    user: null,
    status: "idle",
    error: null,
}

export const fetchCurrentUser = createAsyncThunk("currentUser/fetchCurrentUser", async () => {
    const response = await fetchWrapper('/api/user', 'GET')
    return response
})

const currentUserSlice = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrentUser.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.user = action.payload
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message || null
            })
    },
})

export default currentUserSlice.reducer

