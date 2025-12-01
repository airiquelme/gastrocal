import { Link } from "react-router";
import logo_gastrocal from "../assets/images/logo gastrocal.jpeg";

function Header(){
    return(
        <header className="w-full p-3 flex content-center justify-between sticky top-0 bg-white z-10">
            <div className="flex content-center justify-between">
                <img src={logo_gastrocal} alt="AMB" className="mx-3 h-10 max-w-auto"/>
                <h1 className="text-3xl font-bold text-sky-500 align-baseline">Gastrocalc</h1>
            </div>
            <Link to={"/"} className="px-8 py-2 rounded-lg text-white bg-sky-500 hover:bg-sky-400 active:bg-sky-600">Inicio</Link>
        </header>
    )
}

export default Header;