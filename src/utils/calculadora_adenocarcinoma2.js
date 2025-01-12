export const calcular_adenocarcinoma2 = (variables) => {
    const coefs = {sexo:1.62601,igg2:-1.782748,igg3:-0.894485,pg1:-0.018593,pg2:0.0602249,pcr:0.0374072,anticp:-0.0190353,hta:1.39052}
    const cutoff = 0.309283
    let logit = -1.982525

    for (const [key, value] of Object.entries(coefs)) {
        if(variables[key] == undefined) {
            throw new Error("Parámetro inválido. Verifica si los datos están correctos")
        } else {
            logit += value*variables[key]
        }
    }
    //Constante // Hombre, IgG2, IgG3, PgI, PgII, PCR, Anti-CP, HTA
    let probabilidad = Math.exp(logit)/(1+Math.exp(logit))

    if (probabilidad < cutoff) {
        return {result:"Bajo riesgo",odd:probabilidad}
    } else {
        return {result:"Alto riesgo",odd:probabilidad}
    }
}