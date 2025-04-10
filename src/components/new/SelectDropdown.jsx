import { useEffect, useState } from "react";

function SelectDropdown({name, title, error, options, value, setValue, disabled}){
    const handleChange = (e) => {
        setValue(name, e.target.value)
        if(errorHere) setErrorHere(false)
    }

    useEffect(() => {
        if(!error || (value != -1)) setErrorHere(false)
        if(error && value == -1) setErrorHere(true)
    }, [error, value])

    const [errorHere, setErrorHere] = useState(error && value == -1);

    const bg_color = errorHere ? "border-red-700" : "border-slate-500";
    const text_color = errorHere ? "text-red-700" : "text-black";
    const text_italic = errorHere ? "italic" : "not-italic";

    return (
        <div>
            <label htmlFor={name} className="block  mb-1">{title}</label>
            <select
                name={name}
                id={name}
                value={value}
                onChange={handleChange}
                className={`block w-full p-2 border-2 ${bg_color} ${text_color} ${text_italic} rounded-md`}
            >
                {options.map((option, index) => ( <option value={option.value} disabled={option.disabled} key={index}>{option.name}</option> ))}
            </select>
        </div>
    )
}

export default SelectDropdown;