import { useState, useEffect, useRef } from "react";
import { useIsVisible } from "../hooks/useIsVisible";
import PrimaryButton from "../components/PrimaryButton"
import TrashButton from "../components/TrashButton";
import InputText from "../components/InputText";
import SelectDropdown from "../components/SelectDropdown";
import BoolButton from '../components/BoolButton';
import FormContentSeparator from "../components/FormContentSeparator";
import SubContentSeparator from "../components/SubContentSeparator";
import { calcular_probabilidad_cancer_gastrico } from "../utils/calculadora_cancer_gastrico";

function Calculator(){

    const hoy = new Date()

    const [dia_i, setDia_i] = useState(-1) //useState(hoy.getDate())
    const [mes_i, setMes_i] = useState(-1) //useState(hoy.getMonth()+1)
    const [ano_i, setAno_i] = useState(-1) //useState(hoy.getFullYear())
    const [dia_f, setDia_f] = useState(-1) //useState(hoy.getDate())
    const [mes_f, setMes_f] = useState(-1) //useState(hoy.getMonth()+1)
    const [ano_f, setAno_f] = useState(-1) //useState(hoy.getFullYear())
    const [sexo, setSexo] = useState(0)
    const [antecedentes, setAntecedentes] = useState(0)
    const [panelSerologico, setPanelSerologico] = useState(0)

    const [hipertension, setHipertension] = useState(false);
    const [diabetes, setDiabetes] = useState(false);
    const [peso, setPeso] = useState(0)
    const [talla, setTalla] = useState(0)
    const [alcohol, setAlcohol] = useState(false);
    const [tabaco, setTabaco] = useState(false);
    const [pepsi1, setPepsi1] = useState(0);
    const [pepsi2, setPepsi2] = useState(0);
    const [igghpylori, setIgghpylori] = useState(0);
    const [gastrina17, setGastrina17] = useState(0);

    const [resultado, setResultado] = useState(null)
    const [error, setError] = useState(false)

    const [mostrarResultadoPorcentaje, setMostrarResultadoPorcentaje] = useState("N/A")
    const [mostrarResultadoTexto, setMostrarResultadoTexto] = useState("Ingresa valores en la calculadora")

    const form_calcuadora = useRef();
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
            sexo,
            antecedentes, 
            panel_serologico: panelSerologico,
            talla,
            peso,
            hipertension,
            diabetes,
            alcohol,
            tabaco,
            igghpylori,
            gastrina17
        }

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

    const handleReset = (e) => {
        e.preventDefault();
        setDia_i(-1)
        setMes_i(-1)
        setAno_i(-1)
        setDia_f(-1)
        setMes_f(-1)
        setAno_f(-1)
        setSexo(0)
        setAntecedentes(0)
        setPanelSerologico(0)
        setResultado(null)
        setError(false)
        setHipertension(false)
        setDiabetes(false)
        setTabaco(false)
        setAlcohol(false)
        setPeso(0)
        setTalla(0)
        setPepsi1(0)
        setPepsi2(0)
        setIgghpylori(0)
        setGastrina17(0)
        setMostrarResultadoPorcentaje("N/A")
        setMostrarResultadoTexto("Ingresa valores en la calculadora")
    }

    const setCurrentDate = (e) => {
        e.preventDefault();
        setDia_f(hoy.getDate())
        setMes_f(hoy.getMonth()+1)
        setAno_f(hoy.getFullYear())
    }

    useEffect(() => {
        if(!resultado){
            return;
        }

        if(resultado.constructor === Error){
            setMostrarResultadoPorcentaje("Error")
            setMostrarResultadoTexto(resultado.message)
            setError(true)
        }else{
            const resultado_porcentaje = (resultado * 100).toFixed(2)
            setMostrarResultadoPorcentaje(resultado_porcentaje + "%")
            setMostrarResultadoTexto("Agregar resultado aquí")
            setError(false)
        }
    }, [resultado])

    const opciones_sexo = [
        {name: "Masculino", value: 0},
        {name: "Femenino", value: 1}
    ]

    const opciones_dia = [{name: "Dia", value: -1}];
    for (let i = 1; i < 32; i++) {
        opciones_dia.push({name: String(i), value: i});
    }

    const opciones_mes = [
        {name: "Mes", value: -1},
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

    const ano = hoy.getFullYear()
    const opciones_ano = [{name: "Año", value: -1}];
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
            <div className="md:flex gap-2 md:gap-3 sm:w-11/12 md:items-center m-auto sm:max-w-6xl md:justify-between">
                <h2 className="text-2xl font-bold text-center md:text-left">Puntaje de priorización de riesgo de condiciones premalignas y cáncer gástrico</h2>
                <div className="my-4 flex items-center justify-center">
                    <TrashButton action={handleReset}>Borrar Datos</TrashButton>
                </div>
            </div>
            <div className="grid gap-2 md:gap-3 sm:w-11/12 md:columns-32 m-auto sm:max-w-6xl">
                <div className="mt-5 p-5 bg-white rounded-md shadow">
                    <form action="" onSubmit={handleSubmit} className="w-full grid gap-4" ref={form_calcuadora}>

                        <FormContentSeparator>
                            <div className="pb-3 mb-3">
                                <div className="grid md:grid-flow-col md:grid-cols-1 gap-4">
                                    <p className="text-xl text-sky-600 font-semibold">Fecha de Evaluación</p>
                                    <PrimaryButton action={setCurrentDate}>Fecha de hoy</PrimaryButton>
                                </div>
                                <div className="grid md:grid-flow-col md:grid-cols-3 gap-4">
                                    <SelectDropdown error={error} name="dia_f" title="Día" value={dia_f} setValue={setDia_f} options={opciones_dia}/>
                                    <SelectDropdown error={error} name="mes_f" title="Mes" value={mes_f} setValue={setMes_f} options={opciones_mes}/>
                                    <SelectDropdown error={error} name="ano_f" title="Año" value={ano_f} setValue={setAno_f} options={opciones_ano}/>
                                </div>
                            </div>
                        </FormContentSeparator>

                        <FormContentSeparator title={"Datos primarios del paciente"}>
                            <SubContentSeparator title={"Fecha de Nacimiento"}>
                                <div className="grid md:grid-flow-col md:grid-cols-3 gap-4">
                                    <SelectDropdown error={error} name="dia_i" title="Día" value={dia_i} setValue={setDia_i} options={opciones_dia}/>
                                    <SelectDropdown error={error} name="mes_i" title="Mes" value={mes_i} setValue={setMes_i} options={opciones_mes}/>
                                    <SelectDropdown error={error} name="ano_i" title="Año" value={ano_i} setValue={setAno_i} options={opciones_ano}/>
                                </div>
                            </SubContentSeparator>

                            <SubContentSeparator title={"Otros"}>
                                <div className="grid md:grid-flow-col md:grid-cols-3 gap-4">
                                    <SelectDropdown name="sexo" title="Sexo" value={sexo} setValue={setSexo} options={opciones_sexo}/>
                                    <InputText name={"peso"} title={"Peso en Kilogramos"} error={error} type="number" placeholder="Peso (en Kg)" value={peso} setValue={setPeso} />
                                    <InputText name={"talla"} title={"Talla en centímetros"} error={error} type="number" placeholder="Talla (en cm)" value={talla} setValue={setTalla} />
                                </div>
                            </SubContentSeparator>
                        </FormContentSeparator>

                        <FormContentSeparator title={"Antecedentes médicos del paciente"}>

                            <SubContentSeparator title={"Información Médica"}>
                                <div className="grid md:grid-flow-col md:grid-cols-3 gap-4">
                                    <SelectDropdown name="antecedentes" title="Antecedentes familiares de primer grado (Padres y/o hermanos)" value={antecedentes} setValue={setAntecedentes} options={opciones_antecedentes}/>
                                    <BoolButton name={"hipertension"} title={"posee Hipertensión"} value={hipertension} setValue={setHipertension} />
                                    <BoolButton name={"diabetes"} title={"posee Diabetes Mellitus"} value={diabetes} setValue={setDiabetes} />
                                </div>

                                {/* <div className="pb-6 mb-3 border-b border-gray-300 grid gap-4">
                                    <div className="grid md:grid-flow-col md:grid-cols-2 gap-4">
                                       <SelectDropdown name="sexo" title="Sexo" value={sexo} setValue={setSexo} options={opciones_sexo}/>
                                    </div>
                                    <div className="grid md:grid-flow-col md:grid-cols-2 gap-4">
                                        <SelectDropdown name="antecedentes" title="Antecedentes familiares de primer grado (Padres y/o hermanos)" value={antecedentes} setValue={setAntecedentes} options={opciones_antecedentes}/>
                                        <SelectDropdown name="panel_serologico" title="Panel serologico gastrico" value={panelSerologico} setValue={setPanelSerologico} options={opciones_panel_serologico}/>
                                    </div>
                                </div> */} 
                            </SubContentSeparator>
                            <SubContentSeparator title={"Consumo del Paciente"}>
                                <div className="grid md:grid-flow-col md:grid-cols-3 gap-4">
                                    <BoolButton name={"tabaco"} title={"consume Tabaco"} value={tabaco} setValue={setTabaco} />
                                    <BoolButton name={"alcohol"} title={"consume Alcohol"} value={alcohol} setValue={setAlcohol} />
                                </div>
                            </SubContentSeparator>
                        </FormContentSeparator>

                        <FormContentSeparator title={"Resultados Médicos"}>
                            <SubContentSeparator title={"Mediciones de Pepsinogeno"}>
                                <div className="grid md:grid-flow-col md:grid-cols-3 gap-4">
                                    <InputText name={"pepsi1"} title={"Pepsinogeno I"} error={error} type="number" placeholder="" value={pepsi1} setValue={setPepsi1} />
                                    <InputText name={"pepsi2"} title={"Pepsinogeno II"} error={error} type="number" placeholder="" value={pepsi2} setValue={setPepsi2} />
                                    <div>
                                        <p>Ratio Pepsinogeno I/II</p>
                                        <p>{pepsi1/pepsi2}</p>
                                    </div>
                                </div>
                            </SubContentSeparator>
                            <SubContentSeparator title={"Medidas Adicionales"}>
                                <div className="grid md:grid-flow-col md:grid-cols-3 gap-4">
                                    <InputText name={"igghpylori"} title={"IgG H Pylori en la Sangre"} error={error} type="number" placeholder="" value={igghpylori} setValue={setIgghpylori} />
                                    <InputText name={"gastrina17"} title={"Gastrina 17"} error={error} type="number" placeholder="" value={gastrina17} setValue={setGastrina17} />
                                    <SelectDropdown name="panel_serologico" title="Panel Serológico Gástrico" value={panelSerologico} setValue={setPanelSerologico} options={opciones_panel_serologico}/>
                                </div>
                            </SubContentSeparator>
                        </FormContentSeparator>

                        
                        <PrimaryButton action={handleSubmit}>Calcular</PrimaryButton>
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