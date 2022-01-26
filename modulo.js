/* Función que genera txt con Tabla de Multiplicar*/

let fs = require('fs');
let colors = require('colors');

let revisar_txt = function(t) { 
    return ((Array.isArray(t))?t.join(' '):t).trim();
    };

class Persona {

    constructor(nom, ape, edad) {
        this.nombre=revisar_txt(nom).toUpperCase();
        this.apellido=revisar_txt(ape).toUpperCase();
        this.edad=edad;
    }

    datos_completo(){
        return `Nombre: ${this.nombre} Apellido:${this.apellido} Edad:${this.edad}`;
    }

};

Persona.prototype.toString = function(){
    return `${this.nombre} ${this.apellido}`;
}

class Txt {

    constructor(a) {
        this.archivo=a;
        this.archivo_full=__dirname+'/'+this.archivo;
    }

    abrir() {
        return new Promise((res, rej) => {
            fs.open(this.archivo_full, 
                    'a+' ,'666', 
                    (e,d) => {return (e)?rej(e):res(d);
                    });
        });
    }

    agregar(p) {
        //this.p=Object.assign({}, p);
        this.nom=p.datos_completo();

        this.abrir().then( res => {
            fs.write(res,
                     this.nom+'\n', 0,
                     (e, w, b) => {
                        if (e)
                            throw e
                        else
                            console.log(colors.green('Agregando')+` >> ${this.nom} a >> `+colors.green(this.archivo));
                     });
            }
        ).catch( rej => {
            console.log(colors.bgRed("ERROR:")+rej.message);
            }
        );
    };

    cargar() {
        let resultado="";
        if (fs.existsSync(this.archivo_full))
            resultado=fs.readFileSync(this.archivo_full);
        return resultado;
    }

    eliminar(p) {
        
        this.nom=p.datos_completo();

        let r=this.cargar();
        if (typeof(r)!='string')
            r=r.toString();

        if (r.indexOf(this.nom)>=0) {

            let nuevo=r.replaceAll(p.datos_completo()+'\n','');

            try {
                fs.writeFileSync(this.archivo_full, nuevo)
                console.log(colors.yellow('Eliminando')+` >> ${this.nom} de >> `+colors.yellow(this.archivo));
            } catch (e) {
                console.log(colors.bgRed("ERROR:")+e.message);
            }
        } else {
            console.log(colors.bgMagenta(this.nom)+' no se encuentra!');
        }
    }

};

module.exports = { Persona, Txt} ;
