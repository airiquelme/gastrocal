import AMG_logo from "../assets/images/AMG.png";
import UBA_logo from "../assets/images/logo uba.png";
import UColombia_logo from "../assets/images/ucolombia.png";
import UTP_logo from "../assets/images/UTP.jpg";
import UV_logo from "../assets/images/Logo UV.jpg";
import SanPedro_logo from "../assets/images/SanPedro.png";

function LogosContainer(){
    return (
        <div className="bg-zinc-300 p-5">
            <ul className="lg:flex lg:justify-center lg:gap-5">
                <li className="w-full lg:w-auto grid justify-center my-4 lg:my-0">
                    <img src={AMG_logo} alt="AMB" className="h-12 max-w-auto grayscale hover:grayscale-0"/>
                </li>
                <li className="w-full lg:w-auto grid justify-center my-4 lg:my-0">
                    <img src={UBA_logo} alt="UBA" className="h-12 max-w-auto grayscale hover:grayscale-0" />
                </li>
                <li className="w-full lg:w-auto grid justify-center my-4 lg:my-0">
                    <img src={UColombia_logo} alt="UColombia" className="h-12 max-w-auto grayscale hover:grayscale-0" />
                </li>
                <li className="w-full lg:w-auto grid justify-center my-4 lg:my-0">
                    <img src={UTP_logo} alt="UTP" className="h-12 max-w-auto grayscale hover:grayscale-0" />
                </li>
                <li className="w-full lg:w-auto grid justify-center my-4 lg:my-0">
                    <img src={UV_logo} alt="UV" className="h-12 max-w-auto grayscale hover:grayscale-0" />
                </li>
                <li className="w-full lg:w-auto grid justify-center my-4 lg:my-0">
                    <img src={SanPedro_logo} alt="San Pedro" className="h-12 max-w-auto grayscale hover:grayscale-0" />
                </li>
            </ul>
        </div>
    )
}

export default LogosContainer;