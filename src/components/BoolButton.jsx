import { useEffect } from "react";

function BoolButton({name, title, value, setValue}){
    const text_color = value ? "text-sky-700" : "text-black";
    const text_bold = value ? "font-bold" : "font-normal";
    let confirm_msg =  value ? "SÍ" : "NO"

    useEffect(() => {
        confirm_msg = value ? "SÍ" : "NO"
    }, [value])

    const handleChange = (e) => {
        setValue(1)
        if (value == 1) {
            setValue(0)
        } else {
            setValue(1)
        }
    }

    return(
        <>
        <div className="flex items-center gap-2">
            <input className="w-6 h-6 block" id={name} type="checkbox" value={value} checked={value} onChange={handleChange}>
            </input>
            <label htmlFor={name} className={`block mb-1 select-none ${text_color} ${text_bold}`}>{confirm_msg} {title}</label>
        </div>
        </>
    )
}

export default BoolButton;