import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface FiltersState {
    [category: string]: string[]
}

const initialState: FiltersState = {}

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        toggleFilter: (state, action: PayloadAction<{ category: string; value: string }>) => {
            const { category, value } = action.payload
            if (!state[category]) {
                state[category] = []
            }
            const index = state[category].indexOf(value)
            if (index > -1) {
                state[category].splice(index, 1)
            } else {
                state[category].push(value)
            }
            if (state[category].length === 0) {
                delete state[category]
            }
        },
        setFiltersFromUrl: (state, action: PayloadAction<FiltersState>) => {
            return action.payload
        },
    },
})

export const { toggleFilter, setFiltersFromUrl } = filtersSlice.actions
export default filtersSlice.reducer

