export const generar_annos = () => {
    const ano = new Date().getFullYear()

    const opciones_anno = [{
        value: -1,
        name: "Año"
    }]

    for (let i = 0; i < 120; i++) {
        opciones_anno.push({name: String(ano-i), value: ano-i});
    }

    return opciones_anno;
}

export const generar_meses = () => {
    const opciones_mes = [
        {name: "Mes", value: -1},
        {name: "Enero", value: 1},
        {name: "Febrero", value: 2},
        {name: "Marzo", value: 3},
        {name: "Abril", value: 4},
        {name: "Mayo", value: 5},
        {name: "Junio", value: 6},
        {name: "Julio", value: 7},
        {name: "Agosto", value: 8},
        {name: "Septiembre", value: 9},
        {name: "Octubre", value: 10},
        {name: "Noviembre", value: 11},
        {name: "Diciembre", value: 12}
    ]

    return opciones_mes;
}

export const generar_dias = () => {
    const opciones_dia = [{
        value: -1,
        name: "Día"
    }]

    for (let i = 1; i < 32; i++) {
        opciones_dia.push({name: String(i), value: i});
    }

    return opciones_dia;
}