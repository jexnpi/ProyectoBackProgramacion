import Products from "../models/product.models.js";

export const vistaListado = async(req,res) =>{
    try{
        const respuestaProductos = await Products.selectAllProducts();

        //.render apunta a la plantilla, renderiza la plantilla
        res.render("index", {
            title: "Listado de productos",
            products: respuestaProductos[0]
        });
    } catch (error){

    }
} 

//RUTA DE VISTA CONSULTAR PRODUCTO POR ID
export const vistaConsultarId = async(req,res) =>{
    res.render("consultar",{
        title:"Consultar productos por id"
    });
};

//RUTA DE VISTA CREAR PRODUCTO
export const vistaCrear = (req,res) =>{
    res.render("crear",{
        title:"Crear productos"
    });
};

//RUTA DE VISTA MODIFICAR PRODUCTO
export const vistaModificar = (req,res) =>{
    res.render("modificar",{
        title:"Modificar productos"
    });
};

//RUTA DE VISTA ELIMINAR PRODUCTO
export const vistaEliminar= (req,res) =>{
    res.render("eliminar",{
        title:"Eliminar productos"
    });
};