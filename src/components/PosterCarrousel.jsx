import React, { useRef } from "react"
import PrimaryButton from "./PrimaryButton";

import arrowBack from "../assets/images/arrowBack.svg"
import arrowForward from "../assets/images/arrowForward.svg"

function PosterCarrousel({id, title, children, maxListLength, currHighlighted, setHighlighted}){
    const carrouselContent = useRef(null)

    const moveCarrouselLeft = () => {
        if(currHighlighted === 0) return;

        setHighlighted(prev => ({...prev, [id]: (prev[id] - 1 >= 0) ? prev[id] - 1 : 0}))
        scrollCarrousel(-208)
    }

    const moveCarrouselRight = () => {
        const childrenCount = maxListLength - 1

        if(currHighlighted === childrenCount) return;
        setHighlighted(prev => ({...prev, [id]: (prev[id] + 1 <= childrenCount) ? prev[id] + 1 : childrenCount}))
        scrollCarrousel(208)
    }

    const scrollCarrousel = (quantity) => {
        if(carrouselContent && carrouselContent.current){
            carrouselContent.current.scrollBy({
                top: 0,
                left: quantity,
                behaviour: "smooth"
            })
        }
    }

    const setCarrouselScrollFromElement = (elementPosition) => {
        if(carrouselContent && carrouselContent.current){
            const carrouselContentPosition = carrouselContent.current.getBoundingClientRect().x
            const calculatedPosition = elementPosition - carrouselContentPosition
            carrouselContent.current.scrollTo({
                top: 0,
                left: calculatedPosition,
                behaviour: "smooth"
            })
        }
    }

    return (
        <section className="mt-5 p-5 bg-white rounded-lg shadow max-w-5xl m-auto">
            <h2 className="text-2xl font-bold text-center md:text-start mb-5" >{title}</h2>
            <div className="grid lg:grid-cols-[100px_auto_100px] gap-2">
                <div className="hidden lg:flex w-[80px] h-[150px] m-auto">
                    <PrimaryButton action={moveCarrouselLeft}>
                        <img src={arrowBack} alt="Atrás" />
                    </PrimaryButton>
                </div>
                <div className="overflow-hidden w-full min-h-[280px] scroll-smooth" ref={carrouselContent}>
                    <div className="flex gap-2 items-center w-fit">
                        {React.Children.toArray(children).map((child) =>
                            React.cloneElement(child, { setCarrouselScroll: setCarrouselScrollFromElement })
                        )}
                    </div>
                </div>
                <div className="hidden lg:flex w-[80px] h-[150px] m-auto">
                    <PrimaryButton action={moveCarrouselRight}>
                        <img src={arrowForward} alt="Siguiente" />
                    </PrimaryButton>
                </div>
            </div>

            <div className="grid lg:hidden items-center grid-cols-[repeat(auto-fit,minmax(140px,_1fr))] gap-2 mt-6">
                <PrimaryButton action={moveCarrouselLeft}>
                    <img src={arrowBack} alt="Atrás"  className="m-auto" />
                </PrimaryButton>
                <PrimaryButton action={moveCarrouselRight}>
                    <img src={arrowForward} alt="Siguiente" className="m-auto" />
                </PrimaryButton>
            </div>
        </section>
    )
}

export default PosterCarrousel;