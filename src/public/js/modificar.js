const url = "http://localhost:3000/api";

let getId_lista = document.getElementById("getId-list");
let getProduct_form = document.getElementById("getProduct-form");
let updateForm_container = document.getElementById("updateForm-container");

getProduct_form.addEventListener("submit", async(event) => {

    event.preventDefault();

    try {
        getId_lista.innerHTML = "<p>Cargando producto...</p>";

        let formData = new FormData(event.target);
        let data = Object.fromEntries(formData.entries());

        let idProd = data.idProd.trim();

        if(!idProd) {
            throw new Error("Por favor ingresa un id de producto valido")
        }

        let response = await fetch(`${url}/products/${idProd}`);

        if(!response.ok) {
            throw new Error("Por favor, ingresa un id de producto valido")
        }

        let datos = await response.json();

        if(!datos.payload || datos.payload.length === 0) {
            throw new Error("No se encontro el producto solicitado");
        }

        let producto = datos.payload[0];
        
        mostrarProducto(producto);

    } catch (error) {
        console.error("Error al obtener el producto: ", error);
        getId_lista.innerHTML = `<p>${error.message}</p>`
    }

})

function mostrarProducto(producto) {
    let htmlProductos = `
    <li class="li-listados productos-listados">
        <div class="li-listados_datos">
            <p>Id: ${producto.id} / Nombre: ${producto.nombre} / <strong>Precio: $${producto.precio}</strong></p>
            <img src="${producto.imagen}" alt="${producto.nombre}" class="img-listados">
        </div>
        <div class="li-listados_boton">
            <input class="listados_boton" id="updateProduct_button" type="button" value="Actualizar producto">
        </div>
    </li>
    `;

    getId_lista.innerHTML = htmlProductos;

    let updateProduct_button = document.getElementById("updateProduct_button");

    updateProduct_button.addEventListener("click", function(event) {
        formularioPutProducto(event, producto);
    });
}

function formularioPutProducto(event, producto) {

    event.stopPropagation();

    let updateProduct = `
        <div id="updateProducts-container" class="crudForm-container">
            <h2>Actualizar producto</h2>
            <form id="updateProducts-form" autocomplete="off">

                <label form="idProd">Id</label>
                <input type="number" name="id" id="idProd" value=${producto.id} readonly>
            
                <label for="categoryProd">Categoria</label>
                <select name="categoria" id="categoryProd" required>
                    <option value="consolas" ${producto.categoria === 'consolas' ? 'selected' : ''}>consolas</option>
                    <option value="juegos" ${producto.categoria === 'juegos' ? 'selected' : ''}>juegos</option>
                </select>

                <label for="imagenProd">Imagen</label>
                <input type="text" name="imagen" id="imagenProd" value="${producto.imagen}" required>

                <label for="nombreProd">Nombre</label>
                <input type="text" name="nombre" id="nombreProd" value="${producto.nombre}" required>

                <label for="precioProd">Precio</label>
                <input type="number" name="precio" id="precioProd" value="${producto.precio}" required>

                <label for="estadoProd">Estado</label>
                <select name="activo" id="estadoProd" required> 
                    <option value="1" ${producto.activo == 1 ? 'selected' : ''}>Activo</option>
                    <option value="0" ${producto.activo == 0 ? 'selected' : ''}>Inactivo</option>
                </select>

                <input type="submit" value="Actualizar producto">
            </form>
        </div>
    `;
    
    updateForm_container.innerHTML = updateProduct;
    
    let updateProducts_form = document.getElementById("updateProducts-form");

    updateProducts_form.addEventListener("submit", function (event) {
        actualizarProducto(event);
    });
}

async function actualizarProducto(event) {

    event.preventDefault();

    let formData = new FormData(event.target);
    let data = Object.fromEntries(formData.entries());

    if(!data.nombre || !data.imagen || !data.precio) {
        alert("Todos los campos son obligatorios");
        return;
    }

    try {
        let response = await fetch(`${url}/products`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if(response.ok) {
            let result = await response.json();
            alert(result.message);

            // Vaciamos formularios y listado
            getId_lista.innerHTML = "";
            updateForm_container.innerHTML = "";

            //Redireccion al dashboard
            window.location.href = "/dashboard"; 

        } else {
            let error = await response.json();
            console.log("Error:", error.message);
            alert("Error al actualizar el producto");
        }

    } catch (error) {
        console.log("Error al enviar los datos", error);
        alert("Error al procesar la solicitud");
    }
}
