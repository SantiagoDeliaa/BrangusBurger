const fetchStorageCarrito   = () => JSON.parse(localStorage.getItem('producto'));
const editar = document.querySelector('.editar')

console.log(fetchStorageCarrito()[0].nombre)



const card = document.createElement('div')
        const html = ` <div class="d-flex justify-content-center mb-4">
        <div class="col-6">

        <form action="http://localhost:8080/admin/?_method=PUT" method="post" >
            <div>
                <label for="id" class="form-label">Id</label>
                <input type="text" class="form-control" id="id" name="id" value="${fetchStorageCarrito()[0]._id}">
            </div>
            <div>
                <label for="nombre" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="nombre" name="nombre" value="${fetchStorageCarrito()[0].nombre}"> 
            </div>
            <div>
                <label for="desc" class="form-label">desc</label>
                <textarea type="text" class="form-control" id="desc" name="desc"> "${fetchStorageCarrito()[0].desc}"</textarea>
            </div>
            <div>
                <label for="precio" class="form-label">precio</label>
                <input type="number" class="form-control" id="precio" name="precio" value="${fetchStorageCarrito()[0].precio}">
            </div>
            <div>
                <label for="imagen" class="form-label">Imagen</label>
                <input type="file" class="form-control" id="imagen" name="imagen">
            </div>
            <button type="submit" class="btn btn-primary mt-3">Guardar</button>
            </div>
        </form>
    
        </div>
        </div> `;
        card.innerHTML = html;
        editar.appendChild(card);