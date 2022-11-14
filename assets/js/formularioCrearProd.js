// Declaracion de variables

const formulario = document.querySelector('#formulario')
const id = document.querySelector('#id')
const nombre = document.querySelector('#nombre')
const desc = document.querySelector('#desc')
const precio = document.querySelector('#precio')
const imagen = document.querySelector('#imagen')
const botonEnviar = document.querySelector('#boton-enviar')

// Objeto que su valor se va a usar para rellenar inputs mediande un evento
const datos = {
    id :'',
    nombre :'',
    desc :'',
    precio :'',
    imagen : ''
}

// Funcion para leer el input y detectar cambios en tiempo real
const leerTexto = (e) => {
    // el valor de las propiedades del objeto va a ser el mismo al valor del input , por eso llevan el mismo nombre
    datos[e.target.id] = e.target.value 

    console.log(datos)
}

// Aplicando el evento a los campos
id.addEventListener('input', leerTexto)
nombre.addEventListener('input', leerTexto)
desc.addEventListener('input', leerTexto)
precio.addEventListener('input', leerTexto)
imagen.addEventListener('input', leerTexto)




formulario.addEventListener('submit',() => {
  
    // Validar el formulario mediante un destructuring
    // Los rellena el evento ya declarado
    const {id, nombre, desc,precio, imagen} = datos;

    // en caso de cumplir dicha condicion, el error pasa a ser true
    if( id == '' || nombre == '' || desc == '' || precio == '' || imagen == ''){
        mostrarAlerta('Todos los campos son obligatorios',true)
        return;
    }
    // Alerta que se ejecuta en caso de haber completado todos los campos
    mostrarAlerta('¡Elemento creado correctamente!')

})

// Funcion con 2 parametros que crea la alerta al momento de subir la informacion
 const mostrarAlerta = (msj, error = null) => {
    const alerta = document.createElement('P');
    alerta.textContent = msj;

    // condicional en caso de que error sea true se ejecuta la alerta de incorrecto , en caso contrario se crea la alerta de exito
    if(error){
        alerta.classList.add('error')
    }else{
        alerta.classList.add('correcto')
    }
    // Agregamos la alerta al formulario
    formulario.appendChild(alerta)

    // Evento para que al hacer click en cualquier parte del formulario desaparezca la alerta y evitar que esta misma se multiplique una por debajo de la otra 
    formulario.addEventListener('click',() => alerta.remove());

    // Desaparecer alerta despues de cierto tiempo
    setTimeout( () =>{
        alerta.remove()
    },5000)
 }


