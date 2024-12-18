function SelectDropdown({name, title, options, value, setValue}){
    const handleChange = (e) => setValue(e.target.value)

    return (
        <div>
            <label htmlFor={name} className="block  mb-1">{title}</label>
            <select
                name={name}
                id={name}
                value={value}
                onChange={handleChange}
                className="block w-full p-2 border-2 border-slate-500 rounded-md"
            >
                {options.map((option, index) => ( <option value={option.value} key={index}>{option.name}</option> ))}
            </select>
        </div>
    )
}

export default SelectDropdown;