export function dayOfTheWeek(day) {

    const dias = [
        {
            ingles: "Sunday",
            portugues: "Domingo"
        },
        {
            ingles: "Monday",
            portugues: "Segunda"
        },
        {
            ingles: "Tuesday",
            portugues: "Terça"
        },
        {
            ingles: "Wednesday",
            portugues: "Quarta"
        },
        {
            ingles: "Thursday",
            portugues: "Quinta"
        },
        {
            ingles: "Friday",
            portugues: "Sexta"
        },
        {
            ingles: "Saturday",
            portugues: "Sábado"
        }
    ];

    const dia = dias.find(dia => (
        dia.ingles === day
    ))

    return dia.portugues

}