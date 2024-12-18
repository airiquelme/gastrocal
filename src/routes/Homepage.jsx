import CalculatorRouteButton from "../components/CalculatorRouteButton";

function Homepage(){
    return (
       <main className="bg-slate-100 w-screen min-h-[calc(100vh-64px)] p-10">
        <h2 className="text-4xl font-bold text-center">Le damos la bienvenida</h2>
        <div className="mt-5 p-5 bg-white rounded-lg shadow sm:grid-flow-col sm:auto-cols-min gap-2.5 grid">
            <CalculatorRouteButton route={"/calculator"} key={1}>
                Calculadora de riesgo de cáncer gastrico
            </CalculatorRouteButton>
            <CalculatorRouteButton route={"/404"} key={1}>Acceder a paper</CalculatorRouteButton>
        </div>
       </main>
    )
}

export default Homepage;
