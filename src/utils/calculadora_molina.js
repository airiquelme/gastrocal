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

    const info = obtener_informacion_calculo_probabilidad(prob_biom, prob_olga)

    return {prob_biom, info}
}

const verificar_variables_presentes = (variables) => { 
    for(let item in variables){
        if(variables[item] === -1 || variables[item] === ""){
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

const obtener_informacion_calculo_probabilidad = (prob_biom, prob_olga) => {
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
    if (biom == 1 && olga == 1) {
        return "Prioridad 1"
    } else if (biom == 1 && olga == 0) {
        return "Prioridad 2"
    }else if (biom == 2 && olga == 1) {
        return "Prioridad 3"
    }else if (biom == 2 && olga == 0) {
        return "Prioridad 4"
    }else if (biom == 3 && olga == 1) {
        return "Prioridad 5"
    }else if (biom == 3 && olga == 0) {
        return "Prioridad 6"
    }
}