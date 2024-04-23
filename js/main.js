// PRODUCTOS

const productos = [
    {
        id: "clones-01",
        titulo: "DON JUAN RESERVE",
        imagen: "./img/djreserve.png.png",
        categoria: {
            nombre: "Clones",
            id: "clones"
        },
        precio: 8000
    },
    {
        id: "iceline-01",
        titulo: "PEACH",
        imagen: "./img/peach.png.png",
        categoria: {
            nombre: "Iceline",
            id: "iceline"
        },
        precio: 8000
    },
    {
        id: "iceline-02",
        titulo: "PINEAPPLE",
        imagen: "./img/pineapple.png.png",
        categoria: {
            nombre: "Iceline",
            id: "iceline"
        },
        precio: 8000
    },
    {
        id: "tabaquiles-01",
        titulo: "SWEET TOBACCO",
        imagen: "./img/sweettobaco.png.png",
        categoria: {
            nombre: "Tabaquiles",
            id: "tabaquiles"
        },
        precio: 8000
    },
    {
        id: "tabaquiles-02",
        titulo: "TOBACCO COFFEE",
        imagen: "./img/tobaccocoffee.png.png",
        categoria: {
            nombre: "Tabaquiles",
            id: "tabaquiles"
        },
        precio: 8000
    },
    {
        id: "clones-02",
        titulo: "TRIBECA",
        imagen: "./img/tribeca.png.png",
        categoria: {
            nombre: "Clones",
            id: "clones"
        },
        precio: 8000
    },
    {
        id: "clones-03",
        titulo: "UNICORN MILK",
        imagen: "./img/unicornmilk.png.png",
        categoria: {
            nombre: "Clones",
            id: "clones"
        },
        precio: 8000
    },
    {
        id: "clones-04",
        titulo: "USA MIX",
        imagen: "./img/usamix.png.png",
        categoria: {
            nombre: "Clones",
            id: "clones"
        },
        precio: 8000
    },
];




const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");




function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h2 class="producto-titulo">${producto.titulo}</h2>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar al carrito</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos); 


botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            cargarProductos(productos);
        }

    })
});



function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}




function agregarAlCarrito(e) {
    
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}