const personas = [
    { nombre: "Juan", edad: 25, sexo: "Masculino" },
    { nombre: "María", edad: 30, sexo: "Femenino" },
    { nombre: "Carlos", edad: 22, sexo: "Masculino" },
    { nombre: "Ana", edad: 27, sexo: "Femenino" },
    { nombre: "Luis", edad: 35, sexo: "Masculino" },
    { nombre: "Lucía", edad: 28, sexo: "Femenino" },
    { nombre: "Pedro", edad: 32, sexo: "Masculino" },
    { nombre: "Sofía", edad: 24, sexo: "Femenino" },
    { nombre: "Miguel", edad: 29, sexo: "Masculino" },
    { nombre: "Laura", edad: 26, sexo: "Femenino" }
];
const filtrado = personas.filter((_,index)=>item.nombre!="Ana")
console.log(filtrado);