"use client"

import React, { useState } from "react"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFilters } from "@/hooks/useFilters"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetOverlay, } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
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
                    aria-label="Filters"
                    className="bg-zinc-800 border-filter fixed bottom-10 right-10 rounded-full w-20 h-12 hover:bg-zinc-200 hover:text-black"
                >
                    <Filter className="h-4 w-4" />
                </Button>
            </SheetTrigger>
            <SheetContent className="bg-zinc-800/80 w-full sm:max-w-md">
                <ScrollArea className="h-[calc(100vh-4rem)] pr-4">
                    <SheetHeader>
                        <SheetTitle className="text-white">Filters</SheetTitle>
                        <SheetDescription></SheetDescription>
                    </SheetHeader>
                    <Search placeholder="Product's name" />
                    <Accordion type="multiple" className="w-full">
                        <div className="grid gap-4 py-4">
                            {Object.entries(filterList).map(([filter, indexes]) => (
                                <AccordionItem key={filter} value={filter} className="space-y-2 text-white">
                                    <AccordionTrigger>{filter}</AccordionTrigger>
                                    <AccordionContent>
                                        <div key={filter} className="space-y-2">
                                            <div className="flex flex-wrap gap-2">
                                                {indexes.map((index) => (
                                                    <Button
                                                        key={index}
                                                        variant={isActive(filter, index) ? "outline" : "outline"}
                                                        size="sm"
                                                        aria-label={filter}
                                                        className={`font-bold ${isActive(filter, index) ? "text-zinc-700 bg-white" : "text-white bg-zinc-700"
                                                            }`}
                                                        onClick={() => toggleFilterValue(filter, index)}
                                                    >
                                                        {index}
                                                    </Button>
                                                ))}

                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                            ))}
                            <Button
                                // variant="destructive"
                                className="text-xl bg-gold text-black font-bold hover:bg-light-gold mt-3"
                                onClick={() => toggleFilterValue('', '')}
                            >Reset Filters</Button>
                        </div>
                    </Accordion>
                </ScrollArea>
                <SheetFooter />
            </SheetContent>
        </Sheet>
    )
}

