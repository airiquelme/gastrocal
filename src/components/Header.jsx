import { Link } from "react-router";

function Header(){
    return(
        <header className="w-full p-3 flex content-center justify-between sticky top-0 bg-white">
            <h1 className="text-3xl font-bold text-sky-500 align-baseline">Gastrocal</h1>
            <Link to={"/"} className="px-8 py-2 rounded-lg text-white bg-sky-500 hover:bg-sky-400 active:bg-sky-600">Inicio</Link>
        </header>
    )
}

export default Header;