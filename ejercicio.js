/*Ejercicio de repaso - Viernes 21ene */

const arg = require("./args");
const {Persona, Txt} = require("./modulo");

let archivo="";
let mensaje="";
let p=new Persona(arg.n, arg.a, arg.e);

//Reglas sobre edad
if (p.edad <18) {
    mensaje= "es menor de edad";
} else 
    if(p.edad<45) { 
        archivo = "menor45.txt" 
        mensaje= "es menor a 45 años";
    } else {
        archivo="MAYOR45.txt"
        mensaje= "es mayor a 45 años";
    };

console.log(`${p} ${mensaje}`);

//Acción según edad
if (archivo!="") {
    let a=new Txt(archivo)
    if (arg.d) 
        a.eliminar(p)
    else
        a.agregar(p);
//    p.edad++;
//    a.agregar(p);
}

