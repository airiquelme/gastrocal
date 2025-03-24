import { useEffect, useState } from "react";

function MathResult({title, values, keys, operation}){

    const [result, setResult] = useState(0)

    useEffect(() => {
        let result_value = undefined;

        if(operation === "division"){
            result_value = values[keys[0]] / values[keys[1]]
            if (isNaN(result_value)|| result_value === Infinity || result_value === undefined) result_value = 0;
        }

        setResult(result_value * 100)
    }, [values])

    return (
        <div>
            <p className="block mb-1">{title}</p>
            <span className="text-3xl font-bold">{(result).toFixed(2).toString()}%</span>
        </div>
    )
}

export default MathResult;