function FormContentSeparator({title, children}){
    return(
        <div className="pb-6 m-2 border-b border-gray-300">
            {title ? (<h3 className="text-xl text-sky-600 font-semibold mb-3">{title}</h3>) : ("")}
            {children}
        </div>
    )
}

export default FormContentSeparator;