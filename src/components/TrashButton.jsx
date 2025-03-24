function TrashButton({children, action, disabled}){
    const background_color = disabled ? "bg-slate-400" : "bg-gray-500 hover:bg-gray-400 active:bg-gray-600"
    const text_color = disabled ? "text-slate-300" : "text-white"

    return(
        <button onClick={action} disabled={disabled} className={`px-8 py-2 rounded-lg ${text_color} ${background_color}`}>
            {children}
        </button>
    )
}

export default TrashButton;