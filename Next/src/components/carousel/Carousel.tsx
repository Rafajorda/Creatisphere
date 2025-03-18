import React from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import getCarousel from "@/actions/getCarousel"
import Image from "next/image"
import Link from "next/link"

const CarouselHome = async () => {
    const carouselSlides = await getCarousel();

    return (
        <div className="relative">
            <Carousel>
                <CarouselContent>
                    {carouselSlides.carousels.map((slide) => (
                        <CarouselItem key={slide.id} className="relative group">
                            <Link href={slide.href}>
                                <Image src={`/assets/carousel/${slide.image}`} alt={slide.title} width={1900} height={700} />
                                <div className="absolute bottom-0 left-0 right-0 h-2/3">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="absolute bottom-10 left-40 right-0 p-6 text-white font-serif italic text-shadow-xl select-none">
                                        <h3 className="text-4xl md:text-8xl font-bold opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                                            {slide.title}
                                        </h3>
                                        <p className="ml-20 md:text-4xl mt-2 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                                            {slide.description}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 shadow-lg z-10" />
                <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 shadow-lg z-10" />
            </Carousel>
            <div className="absolute bottom-0 left-0 right-0 h-3 bg-teal-400 drop-shadow-xl"></div>
        </div>
    )
}

export default CarouselHome

