import { Link } from "react-router"

function CalculatorRouteButton({route, children}){
    return(
        <Link to={route} className="grid place-items-center w-100% sm:max-w-72 p-3 w-full rounded-lg text-white bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-center"> {/* h-32 */}
            {children}
        </Link>
    )
}

export default CalculatorRouteButton;