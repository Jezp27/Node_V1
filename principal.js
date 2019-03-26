const { cursos } = require('./cursos');
const fs = require('fs');

const opciones = {
    id:{
      demand: true,
      alias: 'i'      
    },
    nombre:{
      demand: true,
      alias: 'n'  
    },
    cedula:{
      demand: true,
      alias: 'c'  
    }
}

const arg = require('yargs')
            .command('inscribir','Inscribir curso', opciones)
            .argv

let mostrarCurso = (it, callback) => {
  setTimeout(function(){
  callback(it);
  }, 2000*(it+1));
};

let construirString = (curso) => 
    {"El Id del curso disponible es " + curso.id + 
    ", su nombre es " + curso.nombre + 
    ", tiene una duración de " + curso.duracion + 
    " y cuesta " + curso.valor + " pesos."}; 

if (arg.id && arg.n && arg.c){
  let cursoInscrito = cursos.find(cursoI => cursoI.id === arg.id);

  let construirArchivo = () => {
    informacion = "El usuario(a) " + arg.n + ", identificado con cédula " + arg.c + 
    ", ha sido inscrito en el curso " + cursoInscrito.id + ": " + cursoInscrito.nombre + 
    ", el cual tiene una duración de " + cursoInscrito.duracion + " y cuesta " + cursoInscrito.valor + " pesos.";
  
    fs.writeFile('usuarioInscrito.txt', informacion, (error) => {
    if (error) throw(error);
    console.log("El archivo con los datos ingresados fue creado correctamente")});
  }

  if(cursoInscrito !== undefined ){
    console.log("Id curso inscrito: " + cursoInscrito.id + 
    ", nombre:  " + cursoInscrito.nombre + 
    ", tiene una duración de " + cursoInscrito.duracion + 
    " y cuesta " + cursoInscrito.valor + " pesos.")
    construirArchivo();
  }else{
    console.log("***El Id ingresado no corresponde a ninguno de los cursos disponibles. Por favor intente nuevamente***");
  }
}else{
  for (i=0; i < cursos.length; i++){
    mostrarCurso(i, function(i){
      console.log("El Id del curso disponible es " + cursos[i].id + 
      ", su nombre es " + cursos[i].nombre + 
      ", tiene una duración de " + cursos[i].duracion + 
      " y cuesta " + cursos[i].valor + 
      " pesos."
      );
    });
  };
}





