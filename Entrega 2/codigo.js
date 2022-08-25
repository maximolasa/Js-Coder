//constructores 

class ElementoCarrito {
    constructor(producto, cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
    }
}

class Producto {
    constructor(id, nombre, precio, foto, ) {
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
const contenedorFooterCarrito = document.querySelector("#footer")

//cargo los productos y carrito
cargarProductos();
cargarCarrito();
dibujarCarrito();


//declaro los productos
function cargarProductos() {
    productos.push(new Producto(001, "Rtx-2060", 60500, "./dasdsadsa.jpg"));
    productos.push(new Producto(002, "Rtx-2080", 68300, "./dasdsadsa.jpg"));
    productos.push(new Producto(003, "Rtx-3060", 70000, "./dasdsadsa.jpg"));
    productos.push(new Producto(004, "Rtx-3060 ti", 760000, "./dasdsadsa.jpg"));
    productos.push(new Producto(005, "Rtx-3070", 832500, "./dasdsadsa.jpg"));
    productos.push(new Producto(006, "Rtx-3070 ti", 90000, "./dasdsadsa.jpg"));
    productos.push(new Producto(007, "Rtx-3080", 93000, "./dasdsadsa.jpg"));
    productos.push(new Producto(008, "Rtx-3080 ti", 10000, "./dasdsadsa.jpg"));
    productos.push(new Producto(009, "Rtx-3090", 105000, "./dasdsadsa.jpg"));
    productos.push(new Producto(0010, "Rtx-3090 ti", 110000, "./dasdsadsa.jpg"));
   

}


//eliminar

function removerProductoCarrito(elementoAEliminar) {
    const elementosAMantener = elementosCarrito.filter((elemento) => elementoAEliminar.producto.id != elemento.producto.id);
    elementosCarrito.length = 0;

    elementosAMantener.forEach((elemento) => elementosCarrito.push(elemento));
}






//Ejemplo cargando un producto para ver si funciona
function cargarCarrito() {
    let elementoCarrito = new ElementoCarrito(
       
    )

}

//creacion del interior del carrito ya creado en html (modal)
function dibujarCarrito() {
    let renglonesCarrito = '';

    let sumaCarrito = 0;

    elementosCarrito.forEach(
        (elemento) => {
            renglonesCarrito += `
                <tr>
                    <td>${elemento.producto.id}</td>
                    <td>${elemento.producto.nombre}</td>
                    <td><input id="cantidad-producto-${elemento.producto.id}" type="number" value="${elemento.cantidad}" min="1" max="1000" step="1" style="width: 50px;"/></td>
                    <td>${elemento.producto.precio}</td>
                    <td>$ ${elemento.producto.precio*elemento.cantidad}</td>
                    <td><button id="eliminar-producto-${elemento.producto.id}" type="button" class="btn btn-danger"><i class="bi bi-trash-fill"></i></button></td>
                </tr>
            `;
            contenedorCarritoCompras.innerHTML = renglonesCarrito;

            sumaCarrito += elemento.producto.precio * elemento.cantidad;

            let inputCantidadProductos = document.getElementById(`cantidad-producto-${elemento.producto.id}`)

            inputCantidadProductos.addEventListener("change", (ev) => {
                // alert("Estoy agregando");
                let nuevaCantidad = ev.target.value;
                elemento.cantidad = nuevaCantidad;
                dibujarCarrito();
            });

            let borrarProducto = document.getElementById(`eliminar-producto-${elemento.producto.id}`);

            //elimina producto al click

            borrarProducto.addEventListener("click", (e) => {
                removerProductoCarrito(elemento);
                dibujarCarrito();
            });

        }

    );

    if (elementosCarrito.length != 0) {
        contenedorFooterCarrito.innerHTML = `
        <th scope= "row" colspan="5"> Total de la compra: $${sumaCarrito} </th>
        `
    }
}



//Creo las carta con todos los productos previamente cargados por js 

let cartas = document.getElementById("cartas");
for (const producto of productos) {
    let carta = document.createElement("div");
    carta.className = "card col-md-2 m-2 ";
    carta.innerHTML = `
            <div class= "card body border-0"> 
            <img src="../dasdsadsa.jpg" alt="">
            <h5 class= "card-title "> ${producto.nombre} </h5> 
            <p class= "card-text p-1"> $ ${producto.precio} </p> 
            <button class= "btn btn-primary " id="botonAgregar${producto.id}"> Comprar </p> 
            
        </div>
        
    `;
    cartas.append(carta);

    let agregar = document.getElementById(`botonAgregar${producto.id}`);


    //al click agregar 
    agregar.onclick = () => {


        let elementoExistente =
            elementosCarrito.find((elemento) => elemento.producto.id == producto.id);

        if (elementoExistente) {
            elementoExistente.cantidad += 1;
        } else {
            let elementoCarrito = new ElementoCarrito(producto, 1);
            elementosCarrito.push(elementoCarrito);
        }



        dibujarCarrito();
        swal({
            title: "¡Producto agregado!",
            text: `${producto.nombre} agregado al carrito de compra.`,
            icon: "success",
            buttons: {
                cerrar: {
                    text: "Cerrar",
                    value: false
                },
                carrito: {
                    text: "Ir a carrito",
                    value: true
                }
            }
        }).then((irACarrito) => {

            if(irACarrito) {
                //swal("Vamos al carrito!");
                const myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {keyboard: true});
                const modalToggle = document.getElementById('toggleMyModal'); 
                myModal.show(modalToggle);

            }
        });
    }

}

let end = document.getElementById('terminar');

end.onclick = () => {
    alert("Felicidades por su compra")
}


//Pasando a localStorage todos los productos disponibles 

const productosAJSON = JSON.stringify(productos);
localStorage.setItem("productosDisponibles", productosAJSON);


//Traigo del storage al console.log el 

let productosDelStorage = localStorage.getItem("productosDisponibles");
console.log(productosDelStorage);


