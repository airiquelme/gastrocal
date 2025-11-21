function FilterOptions({children}){
    return (
        <div className="absolute top-[50px] bg-white w-[250px] p-2 shadow-lg rounded-sm">
            <ul>
                {children}
            </ul>
        </div>
    )
}

export default FilterOptions;