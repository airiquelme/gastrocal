function HomepageSection({title, subtitle, icon, children}){
    return (
        <section className="mt-5 p-5 bg-white rounded-lg shadow max-w-5xl m-auto">
            <div className="mb-5 gap-4 md:justify-between md:flex-row-reverse md:flex">
                <div className="w-100%">
                    <img className="w-40 m-auto" src={icon} alt="" />
                </div>
                <div className="w-full md:max-w-6/10">
                    <h2 className="text-3xl font-bold text-center md:text-start mb-5">{title}</h2>
                    <h4 className="text-center md:text-start">{subtitle}</h4>
                </div>
            </div>
            <div className="grid md:grid-cols-4 gap-1.5 w-full">
                {children}
            </div>
        </section>
    )
}

export default HomepageSection;