function BoolButton({name, title, value, setValue, disabled}){
    const background_color = disabled ? "bg-slate-400" : "bg-sky-500 hover:bg-sky-400 active:bg-sky-600"
    const text_color = disabled ? "text-slate-300" : "text-white"

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
        <div className="grid md:grid-flow-col md:grid-cols-1 gap-4">
            <input className="w-6" id={name} type="checkbox" value={value} onChange={handleChange} disabled={disabled}>
            </input>
            <label htmlFor={name} className="block  mb-1">{title}</label>
        </div>
        </>
    )
}

export default BoolButton;