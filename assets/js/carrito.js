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
  
  tot.textContent = ` ${ Number(tot.textContent)+ Number(data.price*data.cantidad)}`; 
  console.log(data.img)
  data.img = "../"+ data.img.slice(9,40); 
  console.log(data.img)
    const table = document.createElement('tr');
    const html= `
    <td class="table__productos">
       <img src="${data.img}" alt="">
       <h6 class="table__title my-2">${data.name}</h6>
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
      const tbody = e.target.parentElement.parentElement.parentElement;
      const table = e.target.parentElement.parentElement;
      tbody.removeChild(table);
// aca actualizo el precio y borro el elemento
      fetchStorageCarrito();
      let id = e.target.getAttribute('id');
      carrito = carrito.filter(element => element.id != id);
      const tot = document.querySelector('#total');
      console.log(typeof(tot.textContent))
      console.log(typeof(price))
      const price = table.querySelector('.table_price');
      tot.textContent = `${Number(tot.textContent)-Number(price)}`;
      storageCarrito(carrito);

    }

  })