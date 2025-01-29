export const calculadora_modelo_clinico = (variables) => {
    const logit = calcular_logit(variables)
    const prob = calcular_probabilidad(logit)
    const info = obtener_informacion_calculo_probabilidad(prob)

    return {prob, info}
}


const calcular_logit = (variables) => {
    const coefs = {
        "constante": -3.14515,
        "sexo": 1.51248,
        "hta": 1.51248
    }

    let logit = 0;
    logit = logit + coefs["constante"]

    for (const [key, value] of Object.entries(coefs)) {
        if(key == "constante") continue;

        logit = logit + value * variables[key]
        // console.log(`[${key}, ${value}] - ${key} (${value}) * ${variables[key]} : ${value * variables[key]} \n  Logit: ${logit}`)
    }

    // console.log(`Logit: ${logit}`)
    return logit
}

const calcular_probabilidad = (logit) => {
    const exponencial = Math.exp(logit)
    const prob = exponencial/(1 + exponencial);
    // console.log(`Prob: ${prob}`)
    return prob
}

const obtener_informacion_calculo_probabilidad = (prob) => {
    if(prob < 0.277771){
        return "Bajo riesgo"
    }else{
        return "Alto riesgo"
    }
}