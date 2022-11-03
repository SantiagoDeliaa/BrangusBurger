const fetchStorageCarrito   = () => JSON.parse(localStorage.getItem('carrito'));
const tbody = document.querySelector('.tbody');
const btn__comprar = document.querySelector('#btn__comprar');
const cartMenuNum = document.getElementById('cart_menu_num');
let carrito = [];

const storageCarrito = (carrito) => {
  const  json = JSON.stringify(carrito);
  localStorage.setItem('carrito',json)
}
if(localStorage.getItem('carrito')){
  carrito = JSON.parse(localStorage.getItem('carrito'));
}
cartMenuNum.textContent = carrito.length;
// esta funcion actualiza el precio total del carrito
const updatePriceTotal = () =>{
  const priceTot = document.querySelector('#total');
  let total = 0;
  carrito.forEach(producto => {
    subTotal = producto.cantidad*producto.price;
    total+= subTotal;
  });
  priceTot.textContent = total;
}

// esta funcion imprime el html dinamico del carrito una vez agregado un producto
carrito.forEach(data => {
  let valueText;
  if(data.value === "1"){
    valueText = "# Una carne";
  }else if(data.value === "2"){
    valueText = "# Dos carnes";
  }else if(data.value === "3"){
    valueText = "# Tres carnes"
  };
  console.log(valueText)
  const table = document.createElement('tr');
  const html= `
  <td class="table__productos">
  <img src="${data.img}" alt="">
  <h6 class="table__title my-2">${data.name}<p class="my-3"id="${data.value}">${valueText}</p></h6>
  </td>
  <td class="table__price m-0 p-3">${data.price}</td>
  <td class="table__cantidad">
  <input id="inputCantidad" type="number" min="1" value="${data.cantidad}">
  <button class="delete btn btn-danger" id="${data.id}">X</button>
  </td>`
  table.innerHTML= html;
  tbody.appendChild(table);
  
  updatePriceTotal();
    
  });

  // esta funcion borra el elemento deseado del carrito y actualiza el precio total.
  document.addEventListener('click', e => {  
    if(e.target.matches('.btn-danger')){
      const tbody = e.target.parentElement.parentElement.parentElement;
      const table = e.target.parentElement.parentElement;
      tbody.removeChild(table);
      // aca actualizo el precio y borro el elemento del storage
      fetchStorageCarrito();
      const id = e.target.getAttribute('id');
      const value = table.querySelector('p').getAttribute('id');
      console.log(`el value es: ${(value)}`)
      console.log(`el id es: ${(id)}`)
      for (let i = 0; i < carrito.length; i++) {
        if((carrito[i].value === value)&&(carrito[i].id === id)){
          carrito.splice(i,1);
        }
      }
      storageCarrito(carrito);
      cartMenuNum.textContent = carrito.length;
      updatePriceTotal();
      }
    });

// esta funcion lo que hace es que podamos agregar o ir quitando productos desde el mismo carrito
  document.addEventListener('change', e => {
    if(e.target.matches('#inputCantidad')){
       const apuntar = e.target;
       const id = apuntar.parentElement.querySelector('.btn-danger').getAttribute("id");
       const value = apuntar.parentElement.parentElement.querySelector('p').getAttribute('id');
       const valueCantidad = apuntar.value; 
       fetchStorageCarrito();
      //  busco el producto que quiero aumentar o disminuir su cantidad desde carrito
       if( carrito.find(element => (element.id ===  id)&&(element.value === value))){
        carrito.forEach(element => {
          if((element.id ===id)&&(element.value === value)){
            // aca utilizo operadores avanzados
            element.cantidad = valueCantidad;
            updatePriceTotal();
          }
        })
      }
      storageCarrito(carrito);
  }
  })
  


// al apretar click en el boton comprar imprime en pantalla una alerta de pago exitoso    
  
  btn__comprar.addEventListener('click', () => {
    Swal.fire({
      position: 'bottom-center',
      icon: 'success',
      title: 'Tu compra ha sido exitosa',
      showConfirmButton: false,
      timer: 1500
    })
  })
  


  document.addEventListener('change', e =>{
    if(e.target.matches('#take_away') || e.target.matches('#home_delivery')){
      const containerNextStep = document.getElementById('container_nextStep');
      console.log(containerNextStep)
      const value = e.target.value;
      if(value == 1){
        console.log('ok 1')
        // funcion que crea una interfas grafica para take away, esta misma debera contener dos opciones.1) interfas grafica que permita recolectar los datos minimos necesarios para el pedido: nombre, apellido, horario que desea el pedido. Una vez listo se guardara la informacion. Se manda la informacion del usuario final + la informacion del carrito del usuario final mediante la api de whatss app a la casa de comida para que puedan prepararle el pedido y asi retirar por el local y pagar.
      }else{
        console.log('ok 2')
        // funcion que crea una interfas grafica para envios. Esta misma debera contener primero un boton desplegable el cual tendra barrios almacenados en un json. ejemplo barrio 1 = 400 pesos. Suma 400 pesos a precio total del pedido. Una vez confirmado el barrio y el precio tot modificado, se pediran datos como nombre, apellido, direccion, horario del pedido y se guarda toda la informacion. pasaremos a elegir entre dos opciones. Efectivo o mercado pago. Si es efectivo se traera toda la informacion final + info carrito y se enviara a travez de la api de whatss app a la cuenta de la empresa (whatss app empresarial de brangus burger) como un pedido. Si es a traves de mercado pago se debera consumir la api de mercado pago. Una vez listo el pago. Se debera traer la info del usuario + la info de carrito y se pasar atraves de la api de wpp como pedido a la cuenta empresarial de BrangusBurger. 
      }
    }
  })