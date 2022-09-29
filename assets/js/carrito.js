const fetchStorageCarrito   = () => JSON.parse(localStorage.getItem('carrito'));
let carrito = [];
const storageCarrito = (carrito) => {
  const  json = JSON.stringify(carrito);
  localStorage.setItem('carrito',json)
}
if(localStorage.getItem('carrito')){
  carrito = JSON.parse(localStorage.getItem('carrito'));
}

const tbody = document.querySelector('.tbody');
const tot = document.querySelector('#total');

carrito.forEach(data => {
  let valueText;
  if(data.value === "1"){
    valueText = "una carne";
  }else if(data.value === "2"){
    valueText = "dos carnes";
  }else if(data.value === "3"){
    valueText = "tres carnes"
  };
  console.log(valueText)
  tot.textContent = ` ${ Number(tot.textContent)+ Number(data.price*data.cantidad)}`; 
    const table = document.createElement('tr');
    const html= `
    <td class="table__productos">
       <img src="${data.img}" alt="">
       <h6 class="table__title my-2">${data.name}<p class="my-3">${valueText}</p></h6>
    </td>
    <td class="table__price m-0 p-3">${data.price*data.cantidad}</td>
    <td class="table__cantidad">
      <input type="number" min="1" value="${data.cantidad}">
      <button class="delete btn btn-danger" id="${data.id}">X</button>
    </td>`
    table.innerHTML= html;
    tbody.appendChild(table);
  });

  document.addEventListener('click', e => {
  
    if(e.target.matches('.btn-danger')){
      // aca borro el nodo del carrito
      const tbody = e.target.parentElement.parentElement.parentElement;
      const table = e.target.parentElement.parentElement;
      tbody.removeChild(table);
      // aca actualizo el precio y borro el elemento del storage
      fetchStorageCarrito();
      let id = e.target.getAttribute('id');
      carrito = carrito.filter(element => element.id != id);
      const tot = document.querySelector('#total');
      const price = table.querySelector('.table__price');
      tot.textContent = `${tot.textContent - price.textContent}`;
      storageCarrito(carrito);

    }

  })

  const btn__comprar = document.querySelector('#btn__comprar');

  btn__comprar.addEventListener('click', () => {
    Swal.fire({
      position: 'bottom-center',
      icon: 'success',
      title: 'Tu compra ha sido exitos',
      showConfirmButton: false,
      timer: 1500
    })
  })