import { useRef } from "react";
import CalculatorRouteButton from "./CalculatorRouteButton";

function CarrouselElement(props){
    const {highlighted, index, setHighlighted, categoryId, setCarrouselScroll, image, title, id} = props;
    const carrouselElement = useRef()

    const posterRoute = `/posters/${id}`
    
    const imageSize = highlighted ? "w-[150px]" : "w-[100px] mt-5"

    const handleImageClick = () => {
        setHighlighted(prev => ({...prev, [categoryId]: index}))
        setCarrouselScroll(getElementPosition())
    }

    const getElementPosition = () => {
        if(carrouselElement && carrouselElement.current){
            const elementPosition = carrouselElement.current.getBoundingClientRect().x
            return elementPosition
        }
    }

    return (
        <div className="w-[200px] min-h-[270px]" ref={carrouselElement}>
            <img src={image} alt="Poster" className={`${imageSize} m-auto transition-all cursor-pointer`} onClick={handleImageClick} />
            {
                highlighted ? (
                    <div className="mt-5">
                        <h4 className="mb-4 text-center font-medium text-bold text-lg">{title}</h4>
                        <CalculatorRouteButton route={posterRoute}>
                            Ver poster
                        </CalculatorRouteButton>
                    </div>
                ) : null
            }
        </div>
    )
}

export default CarrouselElement;