import { useCallback, useEffect } from "react"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
// import { useSelector, useDispatch } from "react-redux"
import { type RootState, useAppSelector, useAppDispatch } from "../store/store"
import { toggleFilter, setFiltersFromUrl } from "@/store/slices/filtersSlice"
import { selectCollections } from "@/store/slices/collectionSlice"
import { selectCategories } from "@/store/slices/categoriesSlice"
import { selectSeries } from "@/store/slices/seriesSlice"

export const useFilters = () => {
    const dispatch = useAppDispatch();
    const filters = useAppSelector((state: RootState) => state.filters)
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

            if (category === "" && value === "") {
                newParams.delete("Collection")
                newParams.delete("Category")
                newParams.delete("Series")
                newParams.delete("Name")
                newParams.delete("page")
                newParams.delete("reset")
                router.push(pathname + "?" + newParams.toString())
                return
            }

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

    const collections = useAppSelector(selectCollections)
    const categories = useAppSelector(selectCategories)
    const series = useAppSelector(selectSeries)

    const filterList = {
        Collection: collections.map((collection) => collection.slug),
        Category: categories.map((category) => category.slug),
        Series: series.map((serie) => serie.slug),
    }

    return { filters, toggleFilterValue, isActive, filterList }
}

