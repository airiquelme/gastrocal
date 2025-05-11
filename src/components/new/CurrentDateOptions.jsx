import { generar_annos, generar_meses, generar_dias } from "../../utils/generador_fechas";

import FormContentSeparator from "../FormContentSeparator";
import PrimaryButton from "../PrimaryButton";
import SelectDropdown from "./SelectDropdown";

function CurrentDateOptions(props){
    const {value, setValue, handleChange, error} = props;

    const setCurrentDate = (e) => {
        e.preventDefault();
        const hoy = new Date()

        setValue({
            ...value,
            ["dia_f"]: hoy.getDate(),
            ["mes_f"]: hoy.getMonth()+1,
            ["ano_f"]: hoy.getFullYear(),
        })
    }

    return (
        <FormContentSeparator>
            <div className="pb-3 mb-3">
                <div className="grid md:grid-flow-col md:grid-cols-1 gap-4">
                    <p className="text-xl text-sky-600 font-semibold">Fecha de Evaluación</p>
                    <PrimaryButton action={setCurrentDate}>Fecha de hoy</PrimaryButton>
                </div>
                <div className="grid md:grid-flow-col md:grid-cols-3 gap-4">
                    <SelectDropdown error={error} name="dia_f" title="Día" value={value["dia_f"]} setValue={handleChange} options={generar_dias()}/>
                    <SelectDropdown error={error} name="mes_f" title="Mes" value={value["mes_f"]} setValue={handleChange} options={generar_meses()}/>
                    <SelectDropdown error={error} name="ano_f" title="Año" value={value["ano_f"]} setValue={handleChange} options={generar_annos()}/>
                </div>
            </div>
        </FormContentSeparator>
    )
}

export default CurrentDateOptions;