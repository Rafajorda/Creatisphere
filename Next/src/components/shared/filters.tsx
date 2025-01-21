"use client"

import React from "react"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFilters } from "@/hooks/useFilters"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    // SheetFooter,
    SheetOverlay,
} from "@/components/ui/sheet"
import { useAppSelector } from "@/store/store"
import { selectCollections } from "@/store/slices/collectionSlice"
import { selectCategories } from "@/store/slices/categoriesSlice"
import { selectSeries } from "@/store/slices/seriesSlice"

export function Filters() {
    const [open, setOpen] = React.useState(false)
    const { toggleFilterValue, isActive } = useFilters()

    const collections = useAppSelector(selectCollections);
    const categories = useAppSelector(selectCategories);
    const series = useAppSelector(selectSeries);

    console.log(categories);

    const filters = {
        Collection: collections.map((collection) => collection.slug),
        Category: categories.map((category) => category.slug),
        Series: series.map((serie) => serie.slug),
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetOverlay className="bg-transparent" />
            <SheetTrigger asChild>
                <Button
                    variant="default"
                    size="icon"
                    className="fixed bottom-10 right-10 rounded-full w-20 h-12 hover:bg-stone-200 hover:text-black"
                >
                    <Filter className="h-4 w-4" />
                </Button>
            </SheetTrigger>
            <SheetContent className="bg-zinc-200">
                <SheetHeader>
                    <SheetTitle>Filtros</SheetTitle>
                    <SheetDescription>Selecciona las categorías que deseas filtrar</SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    {Object.entries(filters).map(([webo, indexes]) => (
                        <div key={webo} className="space-y-2">
                            <h3 className="font-bold">{webo}</h3>
                            <div className="flex flex-wrap gap-2">
                                {indexes.map((index) => (
                                    <Button
                                        key={index}
                                        variant={isActive(webo, index) ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => toggleFilterValue(webo, index)}
                                    >
                                        {index}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    )
}

