import productRoutes from "./product.routes.js";
import viewRoutes from "./view.routes.js"

//Este es el "archivo de barril" que contiene todas las rutas
//Es un archivo que exporta varios módulos/rutas desde un solo lugar, para que luego puedas hacer una importación más limpia y centralizada en tu index.js principal.
export{
    productRoutes,
    viewRoutes
}