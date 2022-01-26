/*Argumentos*/
const val_edad = (e) => {
    if (isNaN(e)) 
        throw  "El argumento ingresado NO es un número";
    if ((e)<0 || (e>=130))
        throw "Debes colocar un valor menor a 130";
    return true;
}

const val_txt = (t) => {
    if (!Array.isArray(t))
        t=new Array(t);

    t.forEach(e => {
         if (e.length==0)  
             throw "Debes completar nombre y apellido";
         if (!(/^[A-Za-z]+$/).test(e))
             throw e + " tiene caracteres inválidos";
        });

    return true;
}

let arg = require("yargs")
    .options({'n' :{ 
                alias:'nombre',
                type: 'string',
                describe: 'Nombre de la persona',
                demandOption: true},
              'a' :{
                alias:'apellido',
                type: 'string',
                describe: 'Apellido de la persona',
                demandOption: true},
              'e' :{
                alias:'edad',
                type: 'number',
                describe: 'Edad de la persona',
                demandOption: true},
              'd':{
                alias:'delete',
                type: 'boolean',
                default: false,
                describe: 'Elimina a la persona',
                demandOption: true}
             }) 
    .check( (argv) => { 
        return val_edad(argv.e) && val_txt(argv.n) && val_txt(argv.a); })
    .argv;

module.exports = arg;
