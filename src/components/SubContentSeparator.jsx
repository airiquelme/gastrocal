function SubContentSeparator({title, children}){
    return (
        <div className="pb-3 mb-2 mt-4 my-3">
            <p className="font-md text-slate-600 font-semibold mb-1">{title}</p>
            {children}
        </div>
    )
}

export default SubContentSeparator;