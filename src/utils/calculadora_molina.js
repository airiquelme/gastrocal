const API_URL = "https://g0t3nx3a21.execute-api.sa-east-1.amazonaws.com/calcular"

export const calculadora_molina = async (variables) => {
    const { sexo, anno, mes, dia, igg_h_pylori, pep1, pep2, hta } = variables

    const missing = Object.entries({ sexo, anno, mes, dia, igg_h_pylori, pep1, pep2, hta })
        .filter(([_, v]) => v === "" || v === -1 || v === null || v === undefined)
        .map(([k]) => k)

    if (missing.length > 0) {
        throw new Error("Parámetro inválido. Verifica si los datos están correctos")
    }

    const birth = new Date(anno, mes, dia)
    const birthStr = birth.toISOString().split("T")[0]

    const payload = {
        sex:   sexo,
        birth: birthStr,
        igg:   igg_h_pylori,
        pep1:  pep1,
        pep2:  pep2,
        gas17: 0,       // not yet in this version of the app
        hta:   hta
    }

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })

    if (!response.ok) throw new Error("Error al conectar con el servidor")

    const { priority } = await response.json()

    return obtener_info_desde_prioridad(priority)
}

const obtener_info_desde_prioridad = (priority) => {
    const label = `Prioridad ${priority}`
    switch (priority) {
        case 1: return { priority: label, info: "Los datos indican un alto riesgo de cáncer y un riesgo de premalignidad", color: "bg-red-500 text-white" }
        case 2: return { priority: label, info: "Los datos indican un alto riesgo de cáncer y un bajo riesgo de premalignidad", color: "bg-red-500 text-white" }
        case 3: return { priority: label, info: "Los datos indican un riesgo medio de cáncer y un riesgo de premalignidad", color: "bg-yellow-500 text-white" }
        case 4: return { priority: label, info: "Los datos indican un riesgo medio de cáncer y un bajo riesgo de premalignidad", color: "bg-yellow-500 text-white" }
        case 5: return { priority: label, info: "Los datos indican un bajo riesgo de cáncer y un riesgo de premalignidad", color: "bg-green-500 text-white" }
        case 6: return { priority: label, info: "Los datos indican un bajo riesgo de cáncer y un bajo riesgo de premalignidad", color: "bg-green-500 text-white" }
        default: return { priority: "Error al calcular riesgo", info: "", color: "bg-black text-white" }
    }
}