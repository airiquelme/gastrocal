import CalculatorRouteButton from "../components/CalculatorRouteButton";
import HomepageSection from "../components/HomepageSection";

import calculator_icon from "../assets/images/calculator.svg"

function Homepage(){
    return (
       <main className="bg-slate-100 w-screen min-h-[calc(100vh-64px)] p-10">
        <h2 className="text-4xl font-bold text-center">Le damos la bienvenida</h2>
        {/* <div >
            <CalculatorRouteButton route={"/calculator"} key={1}>
                Calculadora de riesgo de cáncer gastrico
            </CalculatorRouteButton>
            <CalculatorRouteButton route={"/calculadora-biomarcador-1"} key={2}>
                Calculadora de Adenocarcinoma (biomarcador 1)
            </CalculatorRouteButton>
            <CalculatorRouteButton route={"/calculadora-biomarcador-2"} key={3}>
                Calculadora de Adenocarcinoma (biomarcador 2)
            </CalculatorRouteButton>
            <CalculatorRouteButton route={"/calculadora-modelo-clinico"} key={4}>
            Calculadora de Adenocarcinoma (modelo clínico)
            </CalculatorRouteButton>
            <CalculatorRouteButton route={"/pdf"} key={5}>Prueba de PDF</CalculatorRouteButton>
            
            <CalculatorRouteButton route={"/404"} key={7}>Acceder a paper</CalculatorRouteButton>
        </div> */}

        <HomepageSection
            title="Calculadoras"
            subtitle="Mide la categoría de prioridad de un paciente para la realización de una endoscopía, calculando el nivel de riesgo de cáncer gástrico y premalignidad."
            icon={calculator_icon}
        >
            <CalculatorRouteButton route={"/calculadora-molina"} key={6}>
                Calculadora de riesgo de cáncer gastrico (Molina)
            </CalculatorRouteButton>
        </HomepageSection>
       </main>
    )
}

export default Homepage;
