import { useState, useEffect } from "react";
import PrimaryButton from "../components/PrimaryButton"
import InputText from "../components/InputText";
import SelectDropdown from "../components/SelectDropdown";
import { calcular_probabilidad_cancer_gastrico } from "../utils/calculadora_cancer_gastrico";

function Calculator(){

    const [edad, setEdad] = useState(20)
    const [sexo, setSexo] = useState(0)
    const [antecedentes, setAntecedentes] = useState(0)
    const [panelSerologico, setPanelSerologico] = useState(0)

    const [resultado, setResultado] = useState(null)

    const [mostrarResultadoPorcentaje, setMostrarResultadoPorcentaje] = useState("N/A")
    const [mostrarResultadoTexto, setMostrarResultadoTexto] = useState("Ingresa valores en la calculadora")

    const handleSubmit = (e) => {
        e.preventDefault();

        const variables = {
            edad,
            sexo,
            antecedentes, 
            panel_serologico: panelSerologico
        }

        try{
            setResultado(calcular_probabilidad_cancer_gastrico(variables))
        }catch{
            setResultado("ERROR")
        }
    }

    useEffect(() => {
        if(resultado === "ERROR"){
            setMostrarResultadoPorcentaje("Error")
            setMostrarResultadoTexto("La edad debe ser entre 18 y 80 años")
        }else{
            setMostrarResultadoPorcentaje(resultado)
        }
    }, [resultado])

    const opciones_edad = [
        {name: "Masculino", value: 0},
        {name: "Femenino", value: 1}
    ]

    const opciones_antecedentes = [
        {name: "Sin antecedentes", value: 0},
        {name: "Con antecedentes", value: 1}
    ]

    const opciones_panel_serologico = [
        {name: "Bajo riesgo", value: 0},
        {name: "Alto riesgo", value: 1}
    ]

    return(
        <main className="bg-slate-100 w-screen min-h-[calc(100vh-64px)] p-10">
            <h2 className="text-2xl font-bold">Calculadora de riesgo de cáncer gastrico</h2>
            <div className="grid md:grid-flow-col md:grid-cols-[3fr_2fr] gap-2 md:gap-3 sm:w-11/12 md:columns-32 m-auto sm:max-w-6xl">
                <div className="mt-5 p-5 bg-white rounded-lg shadow">
                    <form action="" onSubmit={handleSubmit} className="w-full grid gap-4">
                        <div className="grid md:grid-flow-col md:grid-cols-2 gap-4">
                            <InputText name="edad" title="Edad" type="number" value={edad} setValue={setEdad}/>
                            <SelectDropdown name="sexo" title="Sexo" value={sexo} setValue={setSexo} options={opciones_edad}/>
                        </div>
                        <div className="grid md:grid-flow-col md:grid-cols-2 gap-4">
                            <SelectDropdown name="antecedentes" title="Antecedentes familiares de primer grado" value={antecedentes} setValue={setAntecedentes} options={opciones_antecedentes}/>
                            <SelectDropdown name="panel_serologico" title="Panel serologico gastrico" value={panelSerologico} setValue={setPanelSerologico} options={opciones_panel_serologico}/>
                        </div>
                        <PrimaryButton action={undefined} disabled={false}>Calcular</PrimaryButton>
                    </form>
                </div>
                <div className="mt-5 p-5 bg-white rounded-lg shadow">
                    <p className="text-4xl">
                        {mostrarResultadoPorcentaje}
                    </p>
                </div>
            </div>
        </main>
    )
}

export default Calculator;