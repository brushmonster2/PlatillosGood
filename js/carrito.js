function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contenedor = document.getElementById('productos-carrito');
    const total = document.getElementById('total');
    const resumen = document.getElementById('resumen-compra');
  
    contenedor.innerHTML = '';
    total.textContent = '';
    resumen.innerHTML = '';
  
    if (carrito.length === 0) {
      contenedor.innerHTML = '<p>No hay productos en el carrito</p>';
      return;
    }
  
    let totalPrecio = 0;
    let iva = 0;
    let resumenLista = '';
  
    for (let i = 0; i < carrito.length; i++) {
      const producto = carrito[i];
      totalPrecio += producto.precioTotal;
      contenedor.innerHTML += `
        <div>
        <img class="productillo" src="${producto.urlImagen}" alt="">
          <p>Nombre: ${producto.nombre}</p>
          <p>Precio unitario: ${producto.precio}</p>
          <p>Cantidad: <input type="number" min="1" value="${producto.cantidad}" oninput="cambiarCantidad(${i}, this.value)"></p>
          <p>Precio total: $${producto.precioTotal.toFixed(2)}</p>
          <button id="eliminar" onclick="eliminarProducto(${i})">Eliminar</button>
        </div>
      `;
      resumenLista += `<li>${producto.nombre} x ${producto.cantidad}</li>`;
    }
  
    iva = totalPrecio * 0.16;
    totalPrecio += iva;
  
    total.textContent = '$' + totalPrecio.toFixed(2);
  
    resumen.innerHTML = `
  <h2>Resumen de compra</h2>
  <ul>
    ${resumenLista}
    <li>Total: $${totalPrecio.toFixed(2)}</li>
    <li>IVA (16%): $${iva.toFixed(2)}</li>
    <li>Total con IVA: $${(totalPrecio + iva).toFixed(2)}</li>
  </ul>
`;

  }
  
  function cambiarCantidad(index, cantidad) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const producto = carrito[index];
    producto.cantidad = parseInt(cantidad);
    producto.precioTotal = producto.cantidad * producto.precio;
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
  }
  
  function eliminarProducto(index) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
  }
  function vaciarCarrito() {
    localStorage.removeItem('carrito');
    mostrarCarrito();
  }
  
  window.addEventListener('load', mostrarCarrito);
  function generarFactura(nombre, direccion, ciudad, telefono, carrito) {
    const fecha = new Date();
    const numeroFactura = Math.floor(Math.random() * 1000) + 1;
    
    let productos = '';
    let total = 0;
    
    carrito.forEach((producto) => {
      productos += `${producto.nombre} x ${producto.cantidad}: $${producto.precioTotal.toFixed(2)}\n`;
      total += producto.precioTotal;
    });
    
    const iva = total * 0.16;
    const totalConIva = total + iva;
    
    const factura = {
      numeroFactura,
      fecha,
      cliente: {
        nombre,
        direccion,
        ciudad,
        telefono,
      },
      productos,
      total,
      iva,
      totalConIva,
    };
    
    // Imprimir la factura en una nueva ventana
    const facturaWindow = window.open('', 'Factura');
    facturaWindow.document.write(`
      <html>
        <head>
          <title>Factura</title>
        </head>
        <body>
          <h1>Factura #${factura.numeroFactura}</h1>
          <p>Fecha: ${factura.fecha.toLocaleDateString()}</p>
          <p>Cliente:</p>
          <ul>
            <li>Nombre: ${factura.cliente.nombre}</li>
            <li>Dirección: ${factura.cliente.direccion}</li>
            <li>Ciudad: ${factura.cliente.ciudad}</li>
            <li>Teléfono: ${factura.cliente.telefono}</li>
          </ul>
          <p>Productos:</p>
          <pre>${factura.productos}</pre>
          <p>Total: $${factura.total.toFixed(2)}</p>
          <p>IVA (16%): $${factura.iva.toFixed(2)}</p>
          <p>Total con IVA: $${factura.totalConIva.toFixed(2)}</p>
        </body>
      </html>
    `);
  }
  

  const facturaForm = document.getElementById('factura-form');

  facturaForm.addEventListener('submit', (event) => {
    event.preventDefault();
  
    const nombre = document.getElementById('nombre').value;
    const direccion = document.getElementById('direccion').value;
    const ciudad = document.getElementById('ciudad').value;
    const telefono = document.getElementById('telefono').value;
  
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
    generarFactura(nombre, direccion, ciudad, telefono, carrito);
  
    localStorage.removeItem('carrito');
    mostrarCarrito();
  });