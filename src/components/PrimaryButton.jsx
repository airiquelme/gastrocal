function PrimaryButton({children, action, disabled}){
    const background_color = disabled ? "bg-slate-400" : "bg-sky-500 hover:bg-sky-400 active:bg-sky-600"
    const text_color = disabled ? "text-slate-300" : "text-white"

    return(
        <button type="button" onClick={action} disabled={disabled} className={`px-8 py-2 rounded-lg ${text_color} ${background_color}`}>
            {children}
        </button>
    )
}

export default PrimaryButton;