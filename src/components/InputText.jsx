import { useEffect, useState } from "react"

function InputText({name, title, type, placeholder, error, value, setValue}){
    const handleChange = (e) => {
            setValue(e.target.value)
            if(errorHere) setErrorHere(false)
        }
    
        useEffect(() => {
            if(!error || (value != 0 && value != "")) setErrorHere(false)
            if(error && (value == 0 || value == "")) setErrorHere(true)
        }, [error, value])
    
        const [errorHere, setErrorHere] = useState(error && (value == 0 || value == ""));
    
        const bg_color = errorHere ? "border-red-700" : "border-slate-500";
        const text_color = errorHere ? "text-red-700" : "text-black";
        const text_italic = errorHere ? "italic" : "not-italic";

    return (
        <div>
            <label htmlFor={name} className="block mb-1">{title}</label>
            <input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                min={0}
                className={`block w-full p-2 border-2 ${bg_color} ${text_color} ${text_italic} rounded-md`}
            >
            </input>
        </div>
    )
}

export default InputText;