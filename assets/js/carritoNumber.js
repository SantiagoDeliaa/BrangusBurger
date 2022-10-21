const cartMenuNum = document.getElementById('cart_menu_num');
let carrito = [];
const fetchStorageCarrito   = () => JSON.parse(localStorage.getItem('carrito'));
if(localStorage.getItem('carrito')){
    carrito = JSON.parse(localStorage.getItem('carrito'));
  }
cartMenuNum.textContent = carrito.length;
