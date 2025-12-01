import { useEffect, useState } from "react";
import InputText from "../components/new/InputText";
import PrimaryButton from "../components/PrimaryButton";
import PosterCarrousel from "../components/PosterCarrousel";

import posterFilters from "../assets/data/posters/poster_filters.json"
import posterCategories from "../assets/data/posters/posters_info.json"
import CarrouselElement from "../components/CarrouselElement";
import FilterOptions from "../components/FilterOptions";
import FilterOption from "../components/FilterOption";

function Posters(){
    const [searchValue, setSearchValue] = useState("")
    const [showFilters, setShowFilters] = useState(false)
    const [filters, setFilters] = useState(new Set(posterFilters))
    const [highlightedPosters, setHighlightedPosters] = useState({})
    const [showingPostersList, setShowingPostersList] = useState({})

    const instanceHiglighted = () => {
        const highlightedIndexes = {}

        for (const category of posterCategories) {
            highlightedIndexes[category.id] = 0
        }

        return highlightedIndexes;
    }

    const instanceshowingPosters = () => {
        const posterIndexes = {}

        for (const category of posterCategories) {
            posterIndexes[category.id] = Array.from({ length: category?.posters?.length }, (v, i) => i)
        }

        return posterIndexes;
    }

    useEffect(() => {
        setShowingPostersList(instanceshowingPosters())
        setHighlightedPosters(instanceHiglighted())
    }, [])

    useEffect(() => {
        setHighlightedPosters(instanceHiglighted())
        setShowingPostersList(modifyPostersShowWhenSearching())
    }, [searchValue])

    const handleSearchValueChange = (_, value) => {
        setSearchValue(value)
    }

    const modifyPostersShowWhenSearching = () => {
        if(searchValue === "") return instanceshowingPosters()

        const highlightedIndexes = {}

        for (const category of posterCategories) {
            highlightedIndexes[category.id] = modifyArrayOfPostersInCategoryWhenSearching(category)
        }

        return highlightedIndexes;
    }

    const modifyArrayOfPostersInCategoryWhenSearching = (category) => {
        const newArray = []

        category.posters.forEach((poster, index) => {
            if(poster.title.toLowerCase().includes(searchValue.toLowerCase())){
                newArray.push(index)
            }
        });

        return newArray;
    }

    const handleShowFilters = () => {
        setShowFilters(prev => (!prev))
    }

    return (
       <main className="bg-slate-100 w-screen min-h-[calc(100vh-64px)] p-10">
            <h2 className="text-4xl font-bold text-center">Posters</h2>
            <div className="md:flex align-center justify-between gap-5 w-full md:w-3/6 mx-auto my-10">
                <div className="w-full">
                    <InputText placeholder="Buscar poster" value={searchValue} setValue={handleSearchValueChange} />
                </div>
                <div className="relative my-4 md:my-0 flex items-center justify-center">
                    <PrimaryButton action={handleShowFilters}>Filtrar</PrimaryButton>
                    {showFilters ? (
                        <FilterOptions>
                            {
                                posterCategories.map((filter, index) => {
                                    return <FilterOption name={`filter_${filter.id}`} id={filter.id} title={filter.title} value={filters.has(filter.id)} setValue={setFilters} key={index}/>
                                })
                            }
                        </FilterOptions>
                    ) : null}
                </div>
            </div>
            <div>
                {
                    posterCategories.map((category, index) => {
                        return (filters.has(category.id)) ?
                            (
                                <PosterCarrousel
                                    id={category.id}
                                    title={category.title}
                                    setHighlighted={setHighlightedPosters}
                                    maxListLength={(showingPostersList && showingPostersList[category.id]) ? showingPostersList[category.id].length : 0}
                                    key={index}
                                >
                                    {
                                        category.posters.map((poster, index) => {
                                            const canShowPoster = showingPostersList[category.id]?.includes(index)

                                            const categoryPostersList = showingPostersList[category.id]
                                            const highlightedPosition = highlightedPosters[category.id]
                                            const highlightedIndex = (categoryPostersList && categoryPostersList[highlightedPosition]) ? categoryPostersList[highlightedPosition] : 0
                                            const isHighlighted = (index === highlightedIndex) 

                                            return (canShowPoster) ? (
                                                <CarrouselElement
                                                    highlighted={isHighlighted}
                                                    setHighlighted={setHighlightedPosters}
                                                    categoryId={category.id}
                                                    imageURL={poster.img}
                                                    title={poster.title}
                                                    id={poster.id}
                                                    index={showingPostersList[category.id].indexOf(index)}
                                                    key={index}
                                                />
                                            ) : null
                                        })
                                    }
                                </PosterCarrousel>
                            ) : null
                    })
                }
                {
                    (filters.size === 0) ? (
                        <p className="text-2xl text-center">No hay categorías que coincidan con los filtros seleccionados</p>
                    ) : null
                }
            </div>
       </main>
    )
}

export default Posters;