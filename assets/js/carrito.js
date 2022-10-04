const fetchStorageCarrito   = () => JSON.parse(localStorage.getItem('carrito'));
const tbody = document.querySelector('.tbody');
const tot = document.querySelector('#total');
let carrito = [];
const storageCarrito = (carrito) => {
  const  json = JSON.stringify(carrito);
  localStorage.setItem('carrito',json)
}
if(localStorage.getItem('carrito')){
  carrito = JSON.parse(localStorage.getItem('carrito'));
}

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
  <input type="number" min="1" value="${data.cantidad}">
  <button class="delete btn btn-danger" id="${data.id}">X</button>
  </td>`
  table.innerHTML= html;
  tbody.appendChild(table);
  
  tot.textContent = ` ${ Number(tot.textContent) + Number(data.price*data.cantidad)}`; 
    
  });
    // updatePriceTotal();
  
  // const  updatePriceTotal = () => {
    //   let tot = 0;
    //   const priceTot = document.querySelector('#total');
    //   const cantidad 
    // }
  document.addEventListener('click', e => {
    
    if(e.target.matches('.btn-danger')){
      // aca borro el nodo del carrito
      const tbody = e.target.parentElement.parentElement.parentElement;
      const table = e.target.parentElement.parentElement;
      tbody.removeChild(table);
      // aca actualizo el precio y borro el elemento del storage
      fetchStorageCarrito();
      const id = e.target.getAttribute('id');
      const value = table.querySelector('p').getAttribute('id');
      console.log(`el value es: ${typeof(value)}`)
      console.log(`el id es: ${typeof(id)}`)
      carrito = carrito.filter(element => (Number(element.value != value)) && (Number( element.id != id)));
      const price = table.querySelector('.table__price');
      tot.textContent = `${tot.textContent - price.textContent}`;
      storageCarrito(carrito);
    }
    
  })
  document.addEventListener('change', e => {
    if(e.target.matches('input')){
       const apuntar = e.target;
       const id = apuntar.parentElement.querySelector('.btn-danger').getAttribute("id");
       const value = apuntar.parentElement.parentElement.querySelector('p').getAttribute('id');
       const valueCantidad = apuntar.value; 
       fetchStorageCarrito();
       
       if( carrito.find(element => (element.id ===  id)&&(element.value === value))){
        carrito.forEach(element => {
          if((element.id ===id)&&(element.value === value)){
            // aca utilizo operadores avanzados
            element.cantidad = valueCantidad;
          }
        })
      }
      storageCarrito(carrito);
  }
  })
  



  const btn__comprar = document.querySelector('#btn__comprar');
  
  btn__comprar.addEventListener('click', () => {
    Swal.fire({
      position: 'bottom-center',
      icon: 'success',
      title: 'Tu compra ha sido exitosa',
      showConfirmButton: false,
      timer: 1500
    })
  })