/* const url = "http://localhost:3000/api";
let altaProducts_form = document.getElementById("altaProducts-form");

altaProducts_form.addEventListener("submit", async (event) => {

    event.preventDefault();

    // Extraemos la informacion del formulario HTML en un objeto FormData
    let formData = new FormData(event.target);
    console.log([...formData]);

    // Transformamos nuestro objeto FormData en un objeto normal JS
    let data = Object.fromEntries(formData.entries());
    console.log(data);
    console.table(data);

    if(!data.nombre || !data.imagen || !data.precio) {
        alert("Todos los campos son obligatorios");
        return;
    }

    try {
        let response = await fetch(`${url}/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if(response.ok) {
            console.log(response);

            let result = await response.json();
            console.log(result.message);
            console.log(result.productId);
            alert(result.message);
        
        } else {
            let error = await response.json();
            console.log("Error:", error.message);
        }

    } catch (error) {
        console.log("Error al enviar los datos", error);
        alert("Erorr al procesar la solicitud");
    }

}) */

const url = "http://localhost:3000/api";
let altaProducts_form = document.getElementById("altaProducts-form");

altaProducts_form.addEventListener("submit", async (event) => {

    event.preventDefault();

    // Extraemos la informacion del formulario HTML en un objeto FormData
    let formData = new FormData(event.target);
    console.log([...formData]);

    // Transformamos nuestro objeto FormData en un objeto normal JS
    let data = Object.fromEntries(formData.entries());
    console.log(data);
    console.table(data);

    if(!data.nombre || !data.imagen || !data.precio) {
        alert("Todos los campos son obligatorios");
        return;
    }

    try {
        let response = await fetch(`${url}/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if(response.ok) {
            let result = await response.json();
            alert(result.message);

            // --- REDIRECCIÓN AL DASHBOARD ---
            window.location.href = "/dashboard";  // <- Aquí está el redirect

        } else {
            let error = await response.json();
            console.log("Error:", error.message);
            alert("Error: " + error.message);
        }

    } catch (error) {
        console.log("Error al enviar los datos", error);
        alert("Error al procesar la solicitud");
    }

});

