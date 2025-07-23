import { useEffect, useState, useRef } from "react";
import { useIsVisible } from "../hooks/useIsVisible";
import TrashButton from "../components/TrashButton";
import PrimaryButton from "../components/PrimaryButton";

import FormContentSeparator from "../components/FormContentSeparator";
import SubContentSeparator from "../components/SubContentSeparator";

import InputText from "../components/new/InputText";
import BoolButton from "../components/new/BoolButton";
import SelectDropdown from "../components/new/SelectDropdown";
import CurrentDateOptions from "../components/new/CurrentDateOptions";
import MathResult from "../components/new/MathResult";

import { generar_annos, generar_meses, generar_dias } from "../utils/generador_fechas";

function NewCalculator(props){
    const {calculator: {title, uses_current_date, form}, calculator_function, default_values} = props;
    
    const [values, setValues] = useState(default_values)
    const [error, setError] = useState(false)
    const [resultado, setResultado] = useState(null)
    // const [mostrarResultadoPorcentaje, setMostrarResultadoPorcentaje] = useState("N/A")
    const [mostrarResultadoPrioridad, setMostrarResultadoPrioridad] = useState("Ingresa valores en la calculadora")
    const [mostrarResultadoTexto, setMostrarResultadoTexto] = useState("Ingresa valores en la calculadora")
    const [resultadoColor, setResultadoColor] = useState("bg-white")
    
    const card_resultados = useRef();
    let resultados_en_pantalla = useIsVisible(card_resultados);

    useEffect(() => {
        if(!resultado){
            return;
        }

        if(resultado.constructor === Error){
            // setMostrarResultadoPorcentaje("Error")
            setMostrarResultadoPrioridad(resultado.message)
            setMostrarResultadoTexto(resultado.message)
            setError(true)
        }else{
            // const resultado_porcentaje = (resultado["prob"] * 100).toFixed(2)
            // setMostrarResultadoPorcentaje(resultado_porcentaje + "%")
            setMostrarResultadoPrioridad(resultado.priority ? resultado.priority  : resultado.info)
            setMostrarResultadoTexto(resultado.info)
            setResultadoColor(resultado.color || "bg-white")
            setError(false)
        }
    }, [resultado])

    const handleChange = (name, value) => {
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleReset = () => {
        setValues(default_values)
        setMostrarResultadoPorcentaje("N/A")
        setResultadoColor("text-black")
        setMostrarResultadoPrioridad("Ingresa valores en la calculadora")
        setMostrarResultadoTexto("Ingresa valores en la calculadora")
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!resultados_en_pantalla){
            window.scrollTo({
                top: card_resultados.current.getBoundingClientRect().top - document.body.getBoundingClientRect().top,
                behavior: 'smooth'
            })
        }
        
        try{
            setResultado(calculator_function(values))
        }catch(error){
            setResultado(error)
        }
    }

    const reorderFields = (fields) => {
        const new_array = []

        for (let i= 0; i < fields.length; i += 3) {
            new_array.push(fields.slice(i, i+3));
        }

        return new_array;
    }

    const generateDropdownOptions = (item) => {
        if(item.use_date_field === "Año") return generar_annos();
        if(item.use_date_field === "Mes") return generar_meses();
        if(item.use_date_field === "Dia") return generar_dias();
        return item.options;
    }

    const generateField = (item, index) => {
        switch (item.field) {
            case "input":
                return (<InputText name={item.name} title={item.title} type={item.type} placeholder={item.placeholder} error={error} value={values[item.name]} setValue={handleChange} key={index} />)
            case "bool":
                return ( <BoolButton name={item.name} title={item.title} value={values[item.name]} setValue={handleChange} key={index}  /> )
            case "dropdown":
                const options = generateDropdownOptions(item);
                return ( <SelectDropdown name={item.name} title={item.title} options={options} error={error} value={values[item.name]} setValue={handleChange} key={index} /> )
            case "result":
                return <MathResult title={item.title} values={values} keys={item.keys} operation={item.operation} key={index} />
            default:
                break;
        }
    }

    return (
        <main className="bg-slate-100 w-screen min-h-[calc(100vh-64px)] p-10">
            <div className="md:flex gap-2 md:gap-3 sm:w-11/12 md:items-center m-auto sm:max-w-6xl md:justify-between">
                <h2 className="text-2xl font-bold text-center md:text-left">{title}</h2>
                <div className="my-4 flex items-center justify-center">
                    <TrashButton action={handleReset}>Borrar Datos</TrashButton>
                </div>
            </div>
            <div className="grid gap-2 md:gap-3 sm:w-11/12 md:columns-32 m-auto sm:max-w-6xl">
                <div className="mt-5 p-5 bg-white rounded-md shadow">
                    <form action="" onSubmit={handleSubmit} className="w-full grid gap-4">
                        {
                            uses_current_date ? ( <CurrentDateOptions value={values} setValue={setValues} handleChange={handleChange} error={error} /> ) : null
                        }
                        {
                            form.map((category, index) => {
                                return (
                                    <FormContentSeparator title={category.category} key={index}>
                                        {category.subcategories.map((subcategory, index) => {
                                            return (
                                                <SubContentSeparator title={subcategory.subcategory} key={index} >
                                                    {
                                                        reorderFields(subcategory.fields).map((sub_array, index) => {
                                                            return (
                                                                <div className="grid md:grid-flow-col md:grid-cols-3 gap-4" key={index}>
                                                                    {sub_array.map((item, index) => {
                                                                        return generateField(item, index)
                                                                    } )}
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </SubContentSeparator>
                                            )
                                        }
                                    )}
                                    </FormContentSeparator>
                                )
                            })
                        }
                        <PrimaryButton action={handleSubmit}>Calcular</PrimaryButton>
                    </form>
                </div>
                <div className={`mt-5 p-5 bg-white rounded-md shadow text-center ${resultadoColor}`}>
                    <p className="text-5xl mb-2 font-bold">
                        {/* {mostrarResultadoPorcentaje} */}
                        {mostrarResultadoPrioridad}
                    </p>
                    <p className="text-slate-700" ref={card_resultados}>{mostrarResultadoTexto}</p>
                </div>
            </div>
        </main>
    )
}

export default NewCalculator;