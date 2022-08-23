//constructores 

class ElementoCarrito {
    constructor(producto, cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
    }
}

class Producto {
    constructor(id, nombre, precio, foto,) {
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.foto = foto
    }
}

//Arrays para catalogo y los elementos del carrito
const productos = [];
const elementosCarrito = [];
const contenedorProductos = document.getElementById('contenedor--productos');
const contenedorCarritoCompras = document.querySelector("#items")


//cargo los productos y carrito
cargarProductos();
cargarCarrito();
dibujarCarrito();


//declaro los productos
function cargarProductos() {
    productos.push(new Producto(001,"Rtx-3060","$80000", "./dasdsadsa.jpg"));
    productos.push(new Producto(002,"Rtx-3070", "$90000" , "./dasdsadsa.jpg"));
    productos.push(new Producto(003, "Rtx-3080", "$100000", "./dasdsadsa.jpg"));
    productos.push(new Producto(004, "Rtx-3090","$ 110000", "./dasdsadsa.jpg"));
    

}


//Ejemplo cargando un producto para ver si funciona
function cargarCarrito(){
    let elementoCarrito = new ElementoCarrito(
        new Producto(001,"Rtx-3060","80000", "./dasdsadsa.jpg"),
         1
    )
    elementosCarrito.push(elementoCarrito);
}

//creacion del interior del carrito ya creado en html (modal)
function dibujarCarrito() {
    let renglonesCarrito = '';

    elementosCarrito.forEach(
        (elemento) => {
            renglonesCarrito+=`
                <tr>
                    <td>${elemento.producto.id}</td>
                    <td>${elemento.producto.nombre}</td>
                    <td>${elemento.cantidad}</td>
                    <td>$ ${elemento.producto.precio}</td>
                </tr>
            `;
        }
    );

    contenedorCarritoCompras.innerHTML = renglonesCarrito;

}






//Creo las carta con todos los productos previamente cargados por js 

let cartas = document.getElementById("cartas");
for(const producto of productos){
    let carta =document.createElement("div");
    carta.className="card col-md-2 ";
    carta.innerHTML=`
            <div class= "card body"> 
            <img src="../dasdsadsa.jpg" alt="">
            <h5 class= "card-title"> ${producto.nombre} </h5> 
            <p class= "card-text"> ${producto.precio} </p> 
            <button class= "btn btn-primary " id="botonAgregar"> Comprar </p> 
        </div>
        
    `;
    cartas.append(carta);
}




//PROBLEMA
//Solo me toma el click de la primer carta, y todo undefined. 
//Producto con minuscula no me hace nada

var agregar = document.getElementById("botonAgregar");

agregar.onclick = () => {

    let elementoCarrito = new ElementoCarrito(productos, 1);
    elementosCarrito.push(elementoCarrito);

    dibujarCarrito();

} 