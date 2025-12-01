import { useEffect, useRef, useState } from "react";
import CalculatorRouteButton from "./CalculatorRouteButton";

const posterImages = import.meta.glob('../assets/images/docs/*.{svg,png,jpg}');

function CarrouselElement(props){
    const {highlighted, index, setHighlighted, categoryId, setCarrouselScroll, imageURL, title, id} = props;
    const carrouselElement = useRef()

    const [image, setImage] = useState("")

    useEffect(() => {
        const loadImage = async () => {
            const imagePath = `../assets/images/docs/${imageURL}`;

            if(posterImages[imagePath]){
                const image_url = await posterImages[imagePath]();
                setImage(image_url.default);
            }
        }
        
        loadImage();
    }, [])

    const posterRoute = `/posters/${id}`
    
    const imageSize = highlighted ? "w-[150px]" : "w-[100px] mt-5"
    const titleSize = highlighted ? "text-lg" : "text-sm"

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
                    <div className="mt-5">
                        <h4 className={`mb-4 text-center font-medium text-bold ${titleSize}`}>{title}</h4>
                         {
                             highlighted ? (
                            <CalculatorRouteButton route={posterRoute}>
                                Ver poster
                            </CalculatorRouteButton>
                            ) : null
                        }
                </div>
        </div>
    )
}

export default CarrouselElement;