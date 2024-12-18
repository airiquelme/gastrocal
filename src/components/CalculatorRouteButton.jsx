import { Link } from "react-router"

function CalculatorRouteButton({route, children}){
    return(
        <Link to={route} className="grid place-items-center p-2 w-full sm:w-48 h-24 rounded-lg text-white bg-sky-500 hover:bg-sky-400 active:bg-sky-600">
            {children}
        </Link>
    )
}

export default CalculatorRouteButton;