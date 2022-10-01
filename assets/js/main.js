const items = document.getElementById('items');

let carrito=[]; 

// guardo en un array de objetos todas los productos del ecommerce
// const productos = [
//   {
//         id : 1,
//         nombre: "Burguer 1",
//         descrip: "Medallon de 180gr + Cheddar + Tomate + Lechuga + Pepinos Agridulces + Pan de Papa Casero.",
//         precio : 1200,
//         imagen: './assets/image/burguer1.jpg'
//       },
//       {
//         id : 2,
//         nombre: "Burguer 2",
//         descrip: "Medallon de 180gr + Cheddar + Tomate + Lechuga + Pepinos Agridulces y Pan de papa Casero",
//         precio : 1000,
        
//         imagen: './assets/image/burguer2.jpg'
//       },
//       {
//         id : 3,
//         nombre: "Burguer 3",
//         descrip: "Medallón de 180 gr + Jamón + Muzzarella + Huevo a la Plancha + Morrón asado + Rúcula + Alioli y Pan de papa",
//         precio : 1000,
//         imagen: './assets/image/burguer3.jpg'
//       },
//       {
//         id : 4,
//         nombre: "Burguer 4",
//         descrip: "Medallón de 180 gr + Cebolla caramelizada+ Queso Brie + Pepinos agridulces + Pan de papa Casero.",
//         precio : 1000,
//         imagen: './assets/image/burguer4.jpg'
//     },
//     {
//         id : 5,
//         nombre: "Burguer 5",
//         descrip: "Medallón de 180 gr + Cheddar + Panceta + Salsa de Mostaza DIJON y MIEL + Pan de Papa Casero.",
//         precio : 1000,
//         imagen: './assets/image/burguer5.jpg'
//       },
//       {
//         id : 6,
//         nombre: "Burguer 6",
//         descrip: "Medallón de 180 gr + Queso azul + Panceta + Cebolla caramelizada + Pan de Papa Casero.",
//         precio : 1000,
//         imagen: './assets/image/burguer6.jpg'
//       },
      
//     ];
    const getData = async () => {
      const response  =  await fetch('../../data.json');
      const data = await response.json();
      return data;
    }
    const printProduct = async() =>{
      const product = await getData();
    
      product.forEach((data)=>{
        const card = document.createElement('div')
        const html = ` <div class="d-flex justify-content-center mb-4">
        <div class="card shadow mb-1 bg-dark rounded" style="width: 20rem;">
        <h5 class="card-title pt-2 text-center text-primary">${data.nombre}</h5>
        <img src="${data.imagen}" class="image image card-img-top" alt="...">
        <div class="card-body">
        <p class="card-text   text-white-50 descripription">${data.descrip}</p>
        <div class="d-flex">
        <select id="selectInput" class="tamaño mb-3 form-select form-select-sm" aria-label=".form-select-sm example">
        <option  value="1" ">Una carne</option>
        <option value="2" >Dos carnes</option>
        <option value="3" >Tres carnes</option>
        </select>
        <h5 class="d-flex text-primary mx-4 ">$<p id="price">${data.precio}</p></h5>
        </div>
        
        <div class="d-grid gap-2">
        <button class="btn btn-primary button" id = "${data.id}" ">Añadir a Carrito</a>
        </div>
        </div>
        </div>
        </div> `;
        card.innerHTML = html;
        items.appendChild(card);
      })
    }
    printProduct();
    // esta programa lo que hace es imprimir en pantalla las card de cada producto
    
    
    // esta funcion se encarga de obtener los valores del input seleccionado cuando se escucha el evento click y modifica el precio del producto
    document.addEventListener("change", e => {
      if (e.target.matches("#selectInput")) {
        let card = e.target.parentNode.parentElement;
        console.log(card)
        let id = card.querySelector(".btn").getAttribute("id");
        console.log(`ID : ${id}`);
        const price = card.querySelector("#price");
        const value = e.target.value;
        console.log(`Valor seleccionado ${value}`);
        productos.forEach((element) => {
          if (element.id == id) {
            if (value == 1) {
              price.textContent = `${element.precio}`;
            } else if (value == 2) {
              price.textContent = `${element.precio + 100}`;
              } else if (value == 3) {
                price.textContent = `${element.precio + 200}`;
              }
            }
          });
        }
        e.stopPropagation();
        
      });
  // guarda los datos en el storage del carrito
  const storageCarrito = (carrito) => {
    const  json = JSON.stringify(carrito);
    localStorage.setItem('carrito',json)
  }
  // trae los datos del storage del carrito
  const fetchStorageCarrito   = () => JSON.parse(localStorage.getItem('carrito'));

  const existe = localStorage.getItem('carrito');
  // utilizo el operador ternario
  existe && ( carrito = fetchStorageCarrito() );
 
  // if(localStorage.getItem('carrito')){
  //   carrito = JSON.parse(localStorage.getItem('carrito'))
  // }


// crea un objeto (producto) y se guarda dentro del storage con la clave carrito
  items.addEventListener('click', e => {
    if(e.target.matches('.btn-primary')){
      const card = e.target.parentElement.parentElement.parentElement;
      const id = e.target.id;
      const imgValue = card.querySelector('.image').getAttribute('src');
      const img = imgValue.replace("./assets","..");
      const name = card.querySelector('.card-title').textContent;
      const price = card.querySelector('#price').textContent;
      const value = card.querySelector('#selectInput').value;
      const producto = {
        id: id,
        img: img,
        name: name,
        price: price,
        value : value,
        cantidad: 1
      };
      if(fetchStorageCarrito() === null){
        carrito.push(producto);
        storageCarrito(carrito);
      }else{
        if( carrito.find(element => (element.id === producto.id)&&(element.value === producto.value))){
          carrito.forEach(element => {
            if((element.id ===producto.id)&&(element.value === producto.value)){
              // aca utilizo operadores avanzados
              element.cantidad++;
            }
          })
        }else{
          carrito.push(producto);
        }

          storageCarrito(carrito);
        }
      }
      e.stopPropagation();  
    }); 