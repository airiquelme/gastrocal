function InputText({name, title, type, placeholder, value, setValue}){
    const handleChange = (e) => setValue(e.target.value)

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
                className="block w-full p-2 border-2 border-slate-500 rounded-md"
            >
            </input>
        </div>
    )
}

export default InputText;