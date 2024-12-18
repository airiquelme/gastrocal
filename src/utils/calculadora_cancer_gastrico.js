export const calcular_probabilidad_cancer_gastrico = (variables) => {
    const {edad, sexo, antecedentes, panel_serologico} = variables;

    if(edad < 18 || edad > 80){
        throw new Error("Edad debe ser entre 18 y 80")
    }

    const peso_edad = 0.01 * edad;
    const peso_sexo = -0.04 * sexo;
    const peso_antecedentes = 0.11 * antecedentes;
    const peso_panel_serologico = 0.47 * panel_serologico;
    const exponente = -(peso_edad + peso_sexo + peso_antecedentes + peso_panel_serologico - 0.24)
    
    const resultado =  1 / (1 + Math.exp(exponente))
    return resultado;
}

export const interpretar_resultado_cancer_gastrico = (resultado) => {
    return "Hola"
}