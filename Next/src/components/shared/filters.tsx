"use client"

import React, { useState } from "react"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFilters } from "@/hooks/useFilters"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetOverlay, } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import Search from "./search"

export function Filters() {
    const [open, setOpen] = useState(false)
    const { toggleFilterValue, isActive, filterList } = useFilters()

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetOverlay className="bg-transparent" />
            <SheetTrigger asChild>
                <Button
                    variant="default"
                    size="icon"
                    aria-label="Filtros"
                    className="bg-zinc-800 border-filter fixed bottom-10 right-10 rounded-full w-20 h-12 hover:bg-zinc-200 hover:text-black"
                >
                    <Filter className="h-4 w-4" />
                </Button>
            </SheetTrigger>
            <SheetContent className="bg-zinc-700 w-full sm:max-w-md">
                <ScrollArea className="h-[calc(100vh-4rem)] pr-4">
                    <SheetHeader>
                        <SheetTitle className="text-white">Filtros</SheetTitle>
                        <SheetDescription className="text-gray-300">
                            {/* Selecciona las categorías que deseas filtrar */}
                        </SheetDescription>
                    </SheetHeader>
                    <Search placeholder="Product's name" />
                    <div className="grid gap-4 py-4">
                        {Object.entries(filterList).map(([filter, indexes]) => (
                            <div key={filter} className="space-y-2">
                                <h3 className="font-bold text-white">{filter}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {indexes.map((index) => (
                                        <Button
                                            key={index}
                                            variant={isActive(filter, index) ? "default" : "outline"}
                                            size="sm"
                                            aria-label={filter}
                                            className="font-bold"
                                            onClick={() => toggleFilterValue(filter, index)}
                                        >
                                            {index}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
                <SheetFooter />
            </SheetContent>
        </Sheet>
    )
}

