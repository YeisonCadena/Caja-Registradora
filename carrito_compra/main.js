const tipoProducto = document.getElementById('tipoProducto');
const productoSeleccionado = document.getElementById('productoSeleccionado');
const precioProducto = document.getElementById('precioProducto');
const btnComprar = document.getElementById('btnComprar');
const btnBorrar = document.getElementById('btnBorrar');
const btnFinalizarCompra = document.getElementById('btnFinalizarCompra');
const listaProductos = document.getElementById('listaProductos');
const totalFactura = document.getElementById('totalFactura');
const totalAcumulado = document.getElementById('totalAcumulado');
const factura = document.getElementById('factura');

let total = 0;
let totalFacturado = 0;
let numeroFactura = 1;

tipoProducto.addEventListener('change', function() {
    const producto = this.options[this.selectedIndex].text;
    const precioUnitario = parseFloat(this.options[this.selectedIndex].getAttribute('data-precio'));
    productoSeleccionado.value = producto;
    const cantidad = parseInt(document.getElementById('cantidadProducto').value);
    const precioTotal = precioUnitario * cantidad;
    precioProducto.value = `$${precioTotal.toFixed(2)}`;
});

document.getElementById('cantidadProducto').addEventListener('input', function() {
    const precioUnitario = parseFloat(tipoProducto.options[tipoProducto.selectedIndex].getAttribute('data-precio'));
    const cantidad = parseInt(this.value);
    const precioTotal = precioUnitario * cantidad;
    precioProducto.value = `$${precioTotal.toFixed(2)}`;
});

window.onload = function() {
    const productoInicial = tipoProducto.options[tipoProducto.selectedIndex].text;
    const precioInicial = parseFloat(tipoProducto.options[tipoProducto.selectedIndex].getAttribute('data-precio'));
    productoSeleccionado.value = productoInicial;
    precioProducto.value = `$${precioInicial.toFixed(2)}`;
    document.getElementById('cantidadProducto').value = 0;
};

btnComprar.addEventListener('click', function() {
    const producto = productoSeleccionado.value;
    const cantidad = parseInt(document.getElementById('cantidadProducto').value);
    const precio = parseFloat(precioProducto.value.replace('$', ''));

    if (tipoProducto.value === "nada") {
        Swal.fire({
            icon: 'error',
            title: 'Producto no válido',
            text: 'Por favor, selecciona un producto válido.'
        });
        return;
    }

    if (isNaN(cantidad) || cantidad <= 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Cantidad no válida',
            text: 'La cantidad debe ser mayor a 0.'
        });
        return;
    }

    listaProductos.value += `${producto} - Cantidad: ${cantidad} - Precio Total: $${(precio ).toFixed(2)}\n`;
    total += precio;
    totalFactura.value = `$${total.toFixed(2)}`;

    Swal.fire({
        icon: 'success',
        title: 'Compra realizada',
        text: `¡Has agregado ${producto} al carrito!`
    });

    limpiarCampos();
});

btnBorrar.addEventListener('click', function() {
    limpiarCampos();
    Swal.fire({
        icon: 'info',
        title: 'Campos limpiados',
        text: 'Se han limpiado los campos de producto, cantidad y precio.'
    });
});

function limpiarCampos() {
    productoSeleccionado.value = '';
    precioProducto.value = '';
    document.getElementById('cantidadProducto').value = 0;
    tipoProducto.value = "nada";
}

btnFinalizarCompra.addEventListener('click', function() {
    if (listaProductos.value.trim() === "") {
        Swal.fire({
            icon: 'warning',
            title: 'No hay productos en el carrito',
            text: 'Por favor, agrega productos antes de finalizar la compra.'
        });
        return;
    }

    totalFacturado += total;

    factura.value += `Factura N°: ${numeroFactura}\n` + 
                    `${listaProductos.value}` + 
                    `Total de la factura: $${total.toFixed(2)}\n` + 
                    `Gracias por su compra!\n\n`;

    totalAcumulado.value = `$${totalFacturado.toFixed(2)}`;
    numeroFactura++;

    listaProductos.value = '';
    total = 0;
    totalFactura.value = `$0.00`;

    limpiarCampos();

    Swal.fire({
        icon: 'success',
        title: 'Compra finalizada',
        text: '¡Gracias por tu compra!'
    });
});
