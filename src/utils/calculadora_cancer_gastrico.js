export const calcular_probabilidad_cancer_gastrico = (variables) => {
    const {dia_i, dia_f, mes_i, mes_f, ano_i, ano_f, sexo, antecedentes, panel_serologico} = variables;

    const date_i = new Date()
    date_i.setDate(dia_i)
    date_i.setMonth(mes_i-1)
    date_i.setFullYear(ano_i)
    const date_f = new Date()
    date_f.setDate(dia_f)
    date_f.setMonth(mes_f-1)
    date_f.setFullYear(ano_f)
    const edad = new Date(date_f-date_i).getFullYear()-1970

    console.log(edad)

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