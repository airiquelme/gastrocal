import { useEffect } from "react";

function BoolButton({name, title, value, setValue}){
    const text_color = value ? "text-sky-700" : "text-black";
    const text_bold = value ? "font-bold" : "font-normal";
    let confirm_msg =  value ? "SÍ" : "NO"

    useEffect(() => {
        confirm_msg = value ? "SÍ" : "NO"
    }, [value])

    const handleChange = (e) => {
        setValue(name, 1)
        if (value == 1) {
            setValue(name, 0)
        } else {
            setValue(name, 1)
        }
    }

    return(
        <div>
            <p className="mb-3">¿Paciente {title}?</p>
            <div className="flex items-center gap-2 p-2">
                <input className="w-6 h-6 block" id={name} type="checkbox" value={value} checked={value} onChange={handleChange}>
                </input>
                <label htmlFor={name} className={`block mb-1 select-none ${text_color} ${text_bold}`}>{confirm_msg} {title}</label>
            </div>
        </div>
    )
}

export default BoolButton;