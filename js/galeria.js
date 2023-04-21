// Funciones para almacenar y traer los datos que se almacenan
function guardarAlmacenamientoLocal(llave, valor_a_guardar) {
    localStorage.setItem(llave, JSON.stringify(valor_a_guardar))
}
function obtenerAlmacenamientoLocal(llave) {
    const datos = JSON.parse(localStorage.getItem(llave))
    return datos
}
function guardarCarritoEnLocalStorage() {
    guardarAlmacenamientoLocal("productos", lista);
  }
  
let productos = obtenerAlmacenamientoLocal('productos') || [];
function ocultarDetalle(){
    document.getElementById('miModal').style.display='none';
}
// Variables que traemos de nuestro html
const informacionCompra = document.getElementById('informacionCompra');
const contenedorCompra = document.getElementById('contenedorCompra');
const productosCompra = document.getElementById('productosCompra');
const contenedor = document.getElementById('contenedor');
const carrito = document.getElementById('carrito');
const numero = document.getElementById("numero");
const header = document.querySelector("#header");
const total = document.getElementById('total');
const body = document.querySelector("body");
const x = document.getElementById('x')


function mostrar(){
    document.getElementById('informacionCompra').style.display='block';
}
function ocultar(){
    document.getElementById('informacionCompra').style.display='none';
}


let lista = []
let valortotal = 0


window.addEventListener("scroll", function () {
    if (contenedor.getBoundingClientRect().top < 10) {
        header.classList.add("scroll")
    }
    else {
        header.classList.remove("scroll")
    }
})


window.addEventListener('load', () => {
    visualizarProductos();
    contenedorCompra.classList.add("none")
})
//agregaesta//////////////////////////////////////////////////////////////////////////
function mostrarModal(indice) {
    const producto = obtenerAlmacenamientoLocal('productos')[indice];
    const modal = document.getElementById('miModal');
    const modalImagen = modal.querySelector('#modalImagen');
    const modalNombre = modal.querySelector('#modalNombre');
    const modalPrecio = modal.querySelector('#modalPrecio');
    const modalExistencia = modal.querySelector('#modalDescripcion');
    const botoncomprar = modal.querySelector('#btncomprar');

    modalImagen.src = producto.urlImagen;
    modalNombre.textContent = producto.nombre;
    modalPrecio.textContent = `$${producto.valor}MX`;
    modalExistencia.textContent = `Descripción: ${producto.descripcion}`;
    botoncomprar.addEventListener('click', function (){comprar(indice); modal.style.display="block" });
    modal.style.display = "block";
    
}
//estatambien//////////////////////////////////////////////////////////////////////////
function visualizarProductos() {
    contenedor.innerHTML = ""
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].existencia > 0) {
            //esta agregar el onclick*/
            contenedor.innerHTML +=  `<div><img  src="${productos[i].urlImagen}" onclick="mostrarModal(${i})"><div class="informacion"><p>${productos[i].nombre}</p><p class="precio">$${productos[i].valor}</p><button onclick=comprar(${i}) >Comprar</button></div></div>`
        }
        else {
            contenedor.innerHTML += `<div><img src="${productos[i].urlImagen}"><div class="informacion"><p>${productos[i].nombre}</p><p class="precio">$${productos[i].valor}</p><p class="soldOut">Sold Out</p></div></div>`
        }
    }
}



function comprar(indice) {
  let productoExistente = false;
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].nombre === productos[indice].nombre) {
      lista[i].cantidad += 1;
      lista[i].precioTotal = lista[i].precio * lista[i].cantidad;
      productoExistente = true;
      break;
    }
  }

  if (!productoExistente) {
    const producto = {
      nombre: productos[indice].nombre,
      precio: productos[indice].valor,
      cantidad: 1,
      precioTotal: productos[indice].valor,
      urlImagen: productos[indice].urlImagen // add the URL here
    }
    lista.push(producto);
  }

  let van = true
  let i = 0
  while (van == true) {
    if (productos[i].nombre == productos[indice].nombre) {
      productos[i].existencia -= 1
      if (productos[i].existencia == 0) {
        visualizarProductos()
      }
      van = false
    }
    guardarAlmacenamientoLocal("productos", productos)
    i += 1
  }
  guardarAlmacenamientoLocal("carrito", lista); // Guardar el carrito en local storage
  numero.innerHTML = lista.reduce((total, item) => total + item.cantidad, 0)
  numero.classList.add("diseñoNumero")
  mostrarElemtrosLista();
}
carrito.addEventListener("click", function(){
    body.style.overflow = "hidden"
    contenedorCompra.classList.remove('none')
    contenedorCompra.classList.add('contenedorCompra')
    informacionCompra.classList.add('informacionCompra')
    mostrarElemtrosLista()
})
function mostrarElemtrosLista() {
  productosCompra.innerHTML = "";
  let valortotal = 0;
  for (let i = 0; i < lista.length; i++) {
      const producto = lista[i];
      const precioTotal = producto.cantidad * producto.precio;
      valortotal += precioTotal;
      productosCompra.innerHTML += `<div><div class="img"><button onclick=eliminar(${i}) class="botonTrash"><img src="./img/trash.png"><img src="${productos[i].urlImagen}"></button><p>${producto.nombre} (x${producto.cantidad})</p></div><p> $${precioTotal.toFixed(2)}</p></div>`;
  }
  total.textContent = `$${valortotal.toFixed(2)}`;
}



function eliminar(indice) {
    lista.splice(indice, 1);
    guardarAlmacenamientoLocal("carrito", lista); // Guardar el carrito en local storage
    mostrarElemtrosLista();
  }
  
x.addEventListener("click", function(){
    body.style.overflow = "auto"
    contenedorCompra.classList.add('none')
    contenedorCompra.classList.remove('contenedorCompra')
    informacionCompra.classList.remove('informacionCompra')
})

window.addEventListener('load', () => {
    productos = obtenerAlmacenamientoLocal('productos') || [];
    lista = obtenerAlmacenamientoLocal('carrito') || []; // Obtener los datos del carrito desde local storage
    visualizarProductos();
    contenedorCompra.classList.add("none")
  });


  const detallesBtn = document.getElementById('detallescompra'); // Reemplaza "detallesBtn" con el ID de tu botón
detallesBtn.addEventListener('click', function() {
  window.location.href = './carrito.html';
});
