"use client"

import React, { useEffect } from "react"
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
    SheetFooter,
    SheetOverlay,
} from "@/components/ui/sheet"
// import { useAppDispatch, useAppSelector } from "@/store/store"
// import { fetchCollections, selectCollections } from "@/store/slices/collectionSlice"

// const collections = useAppSelector(selectCollections);
// const dispatch = useAppDispatch();

// useEffect(() => {
//     dispatch(fetchCollections())
// }, []);

const filters = {
    category: ["portraits", "backgrounds", "Vestido", "Chaqueta"],
    Talla: ["XS", "S", "M", "L", "XL"],
    // collections: collections,
    Estilo: ["Casual", "Formal", "Deportivo", "Elegante"],
}

export function Filters() {
    const [open, setOpen] = React.useState(false)
    const { toggleFilterValue, isActive } = useFilters()

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
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Filtros</SheetTitle>
                    <SheetDescription>Selecciona las categorías que deseas filtrar</SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    {Object.entries(filters).map(([category, indexes]) => (
                        <div key={category} className="space-y-2">
                            <h3 className="font-medium">{category}</h3>
                            <div className="flex flex-wrap gap-2">
                                {indexes.map((index) => (
                                    <Button
                                        key={index}
                                        variant={isActive(category, index) ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => toggleFilterValue(category, index)}
                                    >
                                        {index}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <SheetFooter>
                    <Button onClick={() => setOpen(false)}>Aplicar filtros</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

