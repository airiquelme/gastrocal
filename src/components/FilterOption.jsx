function FilterOption({name, id, title, value, setValue}){
    const text_color = value ? "text-sky-700" : "text-black";
    const text_bold = value ? "font-bold" : "font-normal";

    const handleChange = () => {
        setValue(prev => {
            const newFilters = new Set(prev);
            newFilters.has(id) ? newFilters.delete(id) : newFilters.add(id)
            console.log(newFilters)
            return newFilters;
        })
    }

    return (
        <li className="flex items-center gap-2 p-2">
            <input className="w-6 h-6 block checked:bg-blue-100" id={name} type="checkbox" value={value} checked={value} onChange={handleChange}>
            </input>
            <label htmlFor={name} className={`block mb-1 select-none ${text_color} ${text_bold}`}>{title}</label>
        </li>
    )
}

export default FilterOption;