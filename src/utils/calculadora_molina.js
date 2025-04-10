export const calculadora_molina = (variables) => {
    if(verificar_variables_presentes(variables)) throw new Error("Parámetro inválido. Verifica si los datos están correctos")

    let coefs_biom = {
        "constante": -3.223523,
        "sexo": 1.728493,
        "edad": 0.0145009,
        "igg_h_pylori": -0.4923541,
        "pep1": -0.0165863,
        "pep2": 0.049396,
        "hta": 1.7833541
    }
    const logit_biom = calcular_logit(variables, coefs_biom)
    const prob_biom = calcular_probabilidad(logit_biom)

    let coefs_olga = {
        "constante": -2.98717,
        "sexo": -0.4485155,
        "edad": 0.0372106,
        "igg_h_pylori": -0.1581263,
        "pep1": -0.0045152,
        "pep2": 0.0040796,
        "hta": 0.0389121
    }
    const logit_olga = calcular_logit(variables, coefs_olga)
    const prob_olga = calcular_probabilidad(logit_olga)

    const {priority, info, color} = obtener_informacion_calculo_probabilidad(prob_biom, prob_olga)

    return {prob_biom, priority, info, color}
}

const verificar_variables_presentes = (variables) => { 
    for(let item in variables){
        if(variables[item] == -1 || variables[item] == ""){
            return true
        }
    };

    return false
}

const calcular_logit = (variables, coefs) => {
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

const obtener_resultados_por_probabilidad = (prob_biom, prob_olga) => {
    let biom = 0
    if(prob_biom < 0.04434){
        biom = 3
    }else if (prob_biom < 0.281462){
        biom = 2
    } else {
        biom = 1
    }
    let olga = 0
    if(prob_olga < 0.226254){
        olga = 0
    } else {
        olga = 1
    }

    return {biom, olga}
}

const obtener_informacion_calculo_probabilidad = (prob_biom, prob_olga) => {
    let priority, info, color
    const {biom, olga} = obtener_resultados_por_probabilidad(prob_biom, prob_olga)

    if (biom == 1 && olga == 1) {
        priority = "Prioridad 1"
        info = "Los datos indican un alto riesgo de cáncer y alto riesgo en premalignidad"
        color = "text-red-500"
    } else if (biom == 1 && olga == 0) {
        priority = "Prioridad 2"
        info = "Los datos indican un alto riesgo de cáncer y bajo en premalignidad"
        color = "text-orange-500"
    }else if (biom == 2 && olga == 1) {
        priority = "Prioridad 3"
        info = "Los datos indican un riesgo medio de cáncer y alto en premalignidad"
        color = "text-amber-500"
    }else if (biom == 2 && olga == 0) {
        priority = "Prioridad 4"
        info = "Los datos indican un riesgo medio de cáncer y bajo en premalignidad"
        color = "text-yellow-500"
    }else if (biom == 3 && olga == 1) {
        priority = "Prioridad 5"
        info = "Los datos indican un bajo riesgo de cáncer y alto en premalignidad"
        color = "text-green-500"
    }else if (biom == 3 && olga == 0) {
        priority = "Prioridad 6"
        info = "Los datos indican un bajo riesgo de cáncer y bajo en premalignidad"
        color = "text-cyan-500"
    }

    return {priority, info, color}
}