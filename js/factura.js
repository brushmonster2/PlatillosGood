document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente
    const nombre = document.getElementById('nombre').value;
    const direccion = document.getElementById('direccion').value;
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    // Crea la factura utilizando los valores del formulario y del carrito
    const factura = `
      <h1>Factura</h1>
      <p>Nombre: ${nombre}</p>
      <p>Dirección: ${direccion}</p>
      <h2>Resumen de compra</h2>
      <ul>
        ${resumenLista}
        <li>Total: $${totalPrecio.toFixed(2)}</li>
        <li>IVA (16%): $${iva.toFixed(2)}</li>
        <li>Total con IVA: $${(totalPrecio + iva).toFixed(2)}</li>
      </ul>
    `;
    // Crea un nuevo archivo HTML para mostrar la factura
    const facturaHTML = `<!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Factura</title>
      </head>
      <body>
        ${factura}
      </body>
      </html>`;
    // Crea un objeto Blob con el contenido de la factura HTML
    const facturaBlob = new Blob([facturaHTML], { type: 'text/html' });
    // Crea un objeto URL a partir del Blob
    const facturaURL = URL.createObjectURL(facturaBlob);
    // Abre la factura en una nueva pestaña del navegador
    window.open(facturaURL, '_blank');
    // Limpia el carrito y muestra el carrito vacío en la página
    localStorage.removeItem('carrito');
    mostrarCarrito();
  });
  