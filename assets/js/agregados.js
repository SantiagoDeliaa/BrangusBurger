// Declaracion de variables / arrays
let carrito = [];
let extrasCont = document.querySelector('#cont-extras')
let cervezasCont = document.querySelector('#cont-cervezas')
let bebidasSinAlcoholCont = document.querySelector('#cont-bebidasSinAlcohol')


// Traemos el carrito por local storage
const fetchStorageCarrito = () => JSON.parse(localStorage.getItem('carrito'));
if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'));
}

// Hacemos la peticion al JSON de agregados
let res = await fetch('../../data.json')
let products = await res.json()


// Extraemos la variable con la categoria filtrada
let extras = products.filter(el => el.categoria == "extras")
let cervezas = products.filter(el => el.categoria == "cervezas")
let sinAlcohol = products.filter(el => el.categoria == "sinAlcohol")


// Renderizamos las cervezas en su respectivo contenedor
cervezas.forEach(el => {
    cervezasCont.innerHTML += `
    <div class="agregados-row">
        <img class="agregados-image" src="${el.imagen}" width="100" max-height="70px">
            <span class="agregados-title">${el.nombre}</span>
            <span class="agregados-descripcion agregados-column">${el.desc}</span>
        <span class="agregados-price agregados-column">$${el.precio}</span>
        <div class=" agregados-column">
            <button class="btn btn-warning" type="button">Agregar</button>
        </div>
    </div>
    `;
});

// Renderizamos las bebidas sin alcohol en su respectivo contenedor
sinAlcohol.forEach(el => {
    bebidasSinAlcoholCont.innerHTML += `
    <div class="agregados-row">
        <img class="agregados-image" src="${el.imagen}" width="100" max-height="70px">
            <span class="agregados-title">${el.nombre}</span>
            <span class="agregados-descripcion agregados-column">${el.desc}</span>
        <span class="agregados-price agregados-column">$${el.precio}</span>
        <div class=" agregados-column">
            <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#staticBackdrop" type="button">Agregar</button>
        </div>
    </div> 
    `;
});

// Renderizamos los extras en su respectivo contenedor 
extras.forEach( el => {
    extrasCont.innerHTML += `
    <div class="agregados-row">
        <img class="agregados-image" src="${el.imagen}" width="100" max-height="70px">
        <span class="agregados-title">${el.nombre}</span>
        <span class="agregados-descripcion agregados-column">${el.desc}</span>
        <span class="agregados-price agregados-column">$${el.precio}</span>
        <div class=" agregados-column">
            <button class="btn btn-warning" type="button">Agregar</button>
        </div>
    </div>
    `;
});

