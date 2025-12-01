import { useEffect, useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import { useParams } from "react-router";
import postersInfo from "../assets/data/posters/posters_info.json"

function PosterViewPage(){
    const { posterId } = useParams();

    const [title, setTitle] = useState("")
    const [document, setDocument] = useState("")

    useEffect(() => {
        const posters = postersInfo[0].posters
        const thisPoster = posters.find(poster => poster.id == posterId)

        if(thisPoster){
            setTitle(thisPoster.title)
            setDocument(thisPoster.uri)
        }
    }, [posterId])

    const openDocumentInOtherTab = () => {
        window.open(document, "_blank").focus()
    }

    return (
        <main className="bg-slate-100 w-screen min-h-[calc(100vh-64px)] p-10 box-border">
            <div className="md:flex gap-2 md:gap-3 sm:w-11/12 md:items-center m-auto sm:max-w-6xl md:justify-between">
                <h2 className="text-2xl font-bold text-center md:text-left">{title}</h2>
                <div className="my-4 flex items-center justify-center">
                    <PrimaryButton action={openDocumentInOtherTab}>Abrir en otra pestaña</PrimaryButton>
                </div>
            </div>
            <div className="grid gap-2 md:gap-3 sm:w-11/12 md:columns-32 m-auto sm:max-w-6xl">
                <object data={document} type="application/pdf" className="w-full aspect-[9/16]"></object>
            </div>
        </main>
    )
}

export default PosterViewPage;