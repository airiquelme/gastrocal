import { Link } from "react-router";

function NotFound(){
    return (
        <main className="bg-slate-100 w-screen h-[calc(100vh-64px)] p-10 grid place-content-center gap-5">
            <h2 className="text-3xl text-center">Página no encontrada</h2>
            <Link to={"/"} className="px-8 py-2 m-auto w-48 block rounded-lg text-white text-center bg-sky-500 hover:bg-sky-400 active:bg-sky-600">Ir al Inicio</Link>
        </main>
    )
}

export default NotFound;