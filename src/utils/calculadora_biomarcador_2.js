export const calculadora_biomarcador_2 = (variables) => {
    if(verificar_variables_presentes(variables)) throw new Error("Parámetro inválido. Verifica si los datos están correctos")

    const logit = calcular_logit(variables)
    const prob = calcular_probabilidad(logit)
    const info = obtener_informacion_calculo_probabilidad(prob)

    return {prob, info}
}

const verificar_variables_presentes = (variables) => { 
    for(let item in variables){
        if(variables[item] === -1 || variables[item] === ""){
            return true
        }
    };

    return false
}

const calcular_logit = (variables) => {
    const coefs = {
        "constante": -1.982525,
        "sexo": 1.62601,
        "igg_h_pylori_2_decil": -1.782748,
        "igg_h_pylori_3_decil": -0.894485,
        "pep1": -0.018593,
        "pep2": 0.0602249,
        "pcr": 0.0374072,
        "anticp": -0.0190353,
        "hta": 1.39052
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
    if(prob < 0.309283){
        return "Bajo riesgo"
    }else{
        return "Alto riesgo"
    }
}