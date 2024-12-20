import { useState, useEffect, useRef } from "react";
import { useIsVisible } from "../hooks/useIsVisible";
import PrimaryButton from "../components/PrimaryButton"
import InputText from "../components/InputText";
import SelectDropdown from "../components/SelectDropdown";
// import BoolButton from "../components/BoolButton";
import { calcular_probabilidad_cancer_gastrico } from "../utils/calculadora_cancer_gastrico";
import { use } from "react";

function Calculator(){

    const [edad, setEdad] = useState(18)
    const [dia_i, setDia_i] = useState(0)
    const [mes_i, setMes_i] = useState(0)
    const [ano_i, setAno_i] = useState(0)
    const [dia_f, setDia_f] = useState(0)
    const [mes_f, setMes_f] = useState(0)
    const [ano_f, setAno_f] = useState(0)
    const [sexo, setSexo] = useState(0)
    const [antecedentes, setAntecedentes] = useState(0)
    const [panelSerologico, setPanelSerologico] = useState(0)

    const [resultado, setResultado] = useState(null)

    const [mostrarResultadoPorcentaje, setMostrarResultadoPorcentaje] = useState("N/A")
    const [mostrarResultadoTexto, setMostrarResultadoTexto] = useState("Ingresa valores en la calculadora")

    const card_resultados = useRef();
    let resultados_en_pantalla = useIsVisible(card_resultados);

    const handleSubmit = (e) => {
        e.preventDefault();

        const variables = {
            dia_i,
            dia_f,
            mes_i,
            mes_f,
            ano_i,
            ano_f,
            edad,
            sexo,
            antecedentes, 
            panel_serologico: panelSerologico
        }

        // alert(resultados_en_pantalla)
        // alert(card_resultados.current.getBoundingClientRect().top)

        //Realizar scroll tras resultados
        if(!resultados_en_pantalla){
            window.scrollTo({
                top: card_resultados.current.getBoundingClientRect().top - document.body.getBoundingClientRect().top,
                behavior: 'smooth'
            })
        }

        try{
            setResultado(calcular_probabilidad_cancer_gastrico(variables))
        }catch(error){
            setResultado(error)
        }
    }

    useEffect(() => {
        if(!resultado){
            return;
        }

        if(resultado.constructor === Error){
            setMostrarResultadoPorcentaje("Error")
            setMostrarResultadoTexto(resultado.message)
        }else{
            const resultado_porcentaje = (resultado * 100).toFixed(2)
            setMostrarResultadoPorcentaje(resultado_porcentaje + "%")
            setMostrarResultadoTexto("Agregar resultado aquí")
        }
    }, [resultado])

    const opciones_edad = [
        {name: "Masculino", value: 0},
        {name: "Femenino", value: 1}
    ]

    const opciones_dia = [];
    for (let i = 1; i < 32; i++) {
        opciones_dia.push({name: String(i), value: i});
    }

    const opciones_mes = [
        {name: "Enero", value: 1},
        {name: "Febrero", value: 2},
        {name: "Marzo", value: 3},
        {name: "Abril", value: 4},
        {name: "Mayo", value: 5},
        {name: "Junio", value: 6},
        {name: "Julio", value: 7},
        {name: "Agosto", value: 8},
        {name: "Septiembre", value: 9},
        {name: "Octubre", value: 10},
        {name: "Noviembre", value: 11},
        {name: "Diciembre", value: 12}
    ]

    const ano = 2024
    const opciones_ano = [];
    for (let i = 0; i < 120; i++) {
        opciones_ano.push({name: String(ano-i), value: ano-i});
    }

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
            <h2 className="text-2xl font-bold text-center">Calculadora de riesgo de cáncer gastrico</h2>
            <div className="grid gap-2 md:gap-3 sm:w-11/12 md:columns-32 m-auto sm:max-w-6xl">
                <div className="mt-5 p-5 bg-white rounded-md shadow">
                    <form action="" onSubmit={handleSubmit} className="w-full grid gap-4">
                    <p>Fecha de Nacimiento</p>
                        <div className="grid md:grid-flow-col md:grid-cols-3 gap-4">
                            <SelectDropdown name="dia_i" title="Día" value={dia_i} setValue={setDia_i} options={opciones_dia}/>
                            <SelectDropdown name="mes_i" title="Mes" value={mes_i} setValue={setMes_i} options={opciones_mes}/>
                            <SelectDropdown name="ano_i" title="Año" value={ano_i} setValue={setAno_i} options={opciones_ano}/>
                        </div>
                        <div className="grid md:grid-flow-col md:grid-cols-1 gap-4">
                            <p>Fecha de Evaluación</p>
                            <p>Hoy</p>
                        </div>
                        <div className="grid md:grid-flow-col md:grid-cols-3 gap-4">
                            <SelectDropdown name="dia_f" title="Día" value={dia_f} setValue={setDia_f} options={opciones_dia}/>
                            <SelectDropdown name="mes_f" title="Mes" value={mes_f} setValue={setMes_f} options={opciones_mes}/>
                            <SelectDropdown name="ano_f" title="Año" value={ano_f} setValue={setAno_f} options={opciones_ano}/>
                        </div>
                        <div className="grid md:grid-flow-col md:grid-cols-2 gap-4">
                            <InputText name="edad" title="Edad" type="number" value={edad} setValue={setEdad}/>
                            <SelectDropdown name="sexo" title="Sexo" value={sexo} setValue={setSexo} options={opciones_edad}/>
                        </div>
                        <div className="grid md:grid-flow-col md:grid-cols-2 gap-4">
                            <SelectDropdown name="antecedentes" title="Antecedentes familiares de primer grado" value={antecedentes} setValue={setAntecedentes} options={opciones_antecedentes}/>
                            <SelectDropdown name="panel_serologico" title="Panel serologico gastrico" value={panelSerologico} setValue={setPanelSerologico} options={opciones_panel_serologico}/>
                            {/* <BoolButton name="antecedentes" title="Antecedentes familiares de primer grado" value={antecedentes} setValue={setAntecedentes}/>
                            <BoolButton name="panel_serologico" title="Panel serologico gastrico" value={panelSerologico} setValue={setPanelSerologico}/> */}
                        </div>
                        <PrimaryButton action={undefined} disabled={false}>Calcular</PrimaryButton>
                    </form>
                </div>
                <div className="mt-5 p-5 bg-white rounded-md shadow text-center" ref={card_resultados}>
                    <p className="text-5xl mb-2 font-bold">
                        {mostrarResultadoPorcentaje}
                    </p>
                    <p className="text-slate-700">{mostrarResultadoTexto}</p>
                </div>
            </div>
        </main>
    )
}

export default Calculator;