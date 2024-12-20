function SimpleContentSeparator({title, children}){
    return (
        <div className="pb-6 mb-3 border-b border-gray-300">
            <p className="font-md text-slate-600 font-semibold">{title}</p>
            {children}
        </div>
    )
}

export default SimpleContentSeparator;