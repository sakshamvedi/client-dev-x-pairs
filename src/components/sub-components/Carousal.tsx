import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import badges from "../data/userBadges";
type Props = {}

function Carousal({ }: Props) {
    return (
        <div>
            <Carousel className='m-12 w-1/2'>
                <CarouselContent>
                    {
                        badges.items.map((data) => (
                            <>
                                <CarouselItem className='w-1/2'>
                                    <img src={data.img} className='h-1/2 rounded-full'></img>
                                </CarouselItem>
                            </>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

        </div >
    )
}

export default Carousal