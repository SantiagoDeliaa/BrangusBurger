
const items = document.getElementById('items');
const editar = document.querySelector('.editar')
const productos = []



const getData = async () => {
    const response  =  await fetch('http://localhost:8080/admin/');
    const data = await response.json();
    return data;
  }




  console.log(getData().then(result => console.log(result)))
  
  
  // esta funcion asyncrona lo que hace es traer datos y modificar el dom para mostrar en pantalla el producto.
      const printProduct = async() =>{
        const product = await getData();
      
        product.forEach((data)=>{
          const card = document.createElement('div')
          const html = ` <div class="d-flex justify-content-center mb-4">
          <div class="card shadow mb-1 bg-dark rounded" style="width: 20rem;">
          <h5 class="card-title pt-2 text-center text-primary">${data.nombre}</h5>
          <img src="${data.imagen}" class="image image card-img-top" alt="...">
          <div class="card-body">
          <p class="card-text text-white-50 descripription">${data.desc}</p>
          <div class="d-flex">

          <h5 class="d-flex text-primary mx-4 ">$<p id="price">${data.precio}</p></h5>
          </div>
          
          <div class="d-grid gap-2">
          <button type="submit" class="btn btn-primary buttonEditar" id = "http://localhost:8080/admin/${data._id}"><a class="text-white" href="/assets/pages/editarProducto.html">Editar</a></button>
          <form class="form-delete" action="http://localhost:8080/admin/${data._id}/?_method=DELETE" method="post" style="display:inline-block">
            <button type="submit" class="btn btn-danger">Borrar</button>
          </form>

          </div>
          </div>
          </div>
          </div> `;
          card.innerHTML = html;
          items.appendChild(card);
        })
      }


      items.addEventListener('click', e => {
        const id = e.target.getAttribute('id');
        const getEditar = async () => {
            const response  =  await fetch(id);
            const data = await response.json();
            productos.push(data)
            return data;
          }
                    // guarda los datos en el storage del carrito
                    const datosEditar = (productos) => {
                        const  json = JSON.stringify(productos);
                        localStorage.setItem('producto',json)
                    }

                getEditar().then(result => datosEditar(result))

          
        });



      printProduct();




    


