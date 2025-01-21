import { useCallback, useEffect } from "react"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "../store/store"
import { toggleFilter, setFiltersFromUrl } from "@/store/slices/filtersSlice"

export const useFilters = () => {
    const dispatch = useDispatch<AppDispatch>()
    const filters = useSelector((state: RootState) => state.filters)
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const syncFiltersWithUrl = useCallback(() => {
        const params = new URLSearchParams(searchParams.toString())
        const filtersFromUrl: Record<string, string[]> = {}
        params.forEach((value, key) => {
            filtersFromUrl[key] = value.split(",")
        })
        dispatch(setFiltersFromUrl(filtersFromUrl))
    }, [searchParams, dispatch])

    useEffect(() => {
        syncFiltersWithUrl()
    }, [syncFiltersWithUrl])

    const toggleFilterValue = useCallback(
        (category: string, value: string) => {
            dispatch(toggleFilter({ category, value }))

            const newParams = new URLSearchParams(searchParams.toString())
            const currentValues = newParams.get(category)?.split(",") || []
            let newValues: string[]

            if (currentValues.includes(value)) {
                newValues = currentValues.filter((v) => v !== value)
            } else {
                newValues = [...currentValues, value]
            }

            if (newValues.length > 0) {
                newParams.set(category, newValues.join(","))
            } else {
                newParams.delete(category)
            }

            router.push(pathname + "?" + newParams.toString())
        },
        [dispatch, searchParams, pathname, router],
    )

    const isActive = useCallback(
        (category: string, value: string) => {
            return filters[category]?.includes(value) || false
        },
        [filters],
    )

    return { filters, toggleFilterValue, isActive }
}

