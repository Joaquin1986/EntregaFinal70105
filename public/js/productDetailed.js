// Definición de constantes y variables
const basicToast = {
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: false,
};
const errorToast = Swal.mixin({ ...basicToast, background: '#bb0606' });
const successToast = Swal.mixin({ ...basicToast, background: '#097e0f' });

const removeItemButton = document.getElementById('removeProductDetailDisplay');
const addItemButton = document.getElementById('addProductDetailDisplay');
const itemCount = document.getElementById('productDetailDisplay');
const productId = document.getElementsByClassName('productDetail')[0].id.split('productDetail-')[1];
const productLimit = parseInt(document.getElementById('stock-' + productId).innerText.split("Stock: ")[1]);
const productName = document.getElementsByClassName('hProd')[0].id;

let currentCartId = null;

try {
  fetch('/api/sessions/current/', {
    method: 'GET',
    headers: {
      "Accept": "*/*"
    }
  }).then((data) => {
    data.json().then(parsedResponse => {
      if (parsedResponse.status === 200) {
        currentCartId = parsedResponse.payload.cart;
        getTotalProductsCount('/api/carts/' + currentCartId).then(count => displayCartinNav(count));
      } else {
        displayCartinNav(0);
      }
    });
  });
} catch (error) {
  errorToast.fire({
    icon: "error",
    title: "Error!",
    text: "Ocurrió el siguiente error: " + error.message
  });
}


// Definición de Event Listeners

document.addEventListener('DOMContentLoaded', function () {
  new Splide('#image-carousel', {
    focus: 0,
    heightRatio: 0.9,
    omitEnd: true,
  }).mount();
});

removeItemButton.addEventListener('click', () => {
  let newCount = parseInt(itemCount.innerText) - 1;
  if (newCount > 0) {
    itemCount.innerText = newCount;
  } else {
    errorToast.fire({
      icon: 'error',
      text: `Cantidad mínima ya seleccionada`
    });
  }
});

addItemButton.addEventListener('click', () => {
  let newCount = parseInt(itemCount.innerText) + 1;
  if (newCount <= productLimit) {
    itemCount.innerText = newCount;
  } else {
    errorToast.fire({
      icon: 'error',
      text: `No es posible superar el límite de sock del producto`
    });
  }
});

//Función de agregar un producto a un carrito 
async function addProductToCart(url, quantity) {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "quantity": quantity })
    });
    const result = await response.json();
    if (response.ok) {
      successToast.fire({
        text: `+${quantity} ${productName} al carrito`,
        icon: "success"
      }).then(() => window.location.href = '/views/products');
      return result;
    } else {
      errorToast.fire({
        icon: "error",
        text: "Error al agregar el producto al carrito: " + Object.values(result)[0]
      });
      return false;
    }
  } catch (error) {
    errorToast.fire({
      icon: "error",
      text: "Ocurrió el siguiente error: " + error.message
    });
    return false;
  }
}

// Función para obtener la cantidad total de productos del carrito
async function getTotalProductsCount(url) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        "Accept": "*/*"
      }
    });
    if (response.ok) {
      const parsedResponse = await response.json();
      let productsTotalCount = 0;
      Object.values(parsedResponse.products).forEach(product => {
        productsTotalCount += parseInt(product.quantity);
      })
      return productsTotalCount;
    }
    else {
      errorToast.fire({
        icon: "error",
        text: "Error al obtener detalles del carrito en la BD"
      });
      return 0;
    }
  } catch (error) {
    errorToast.fire({
      icon: "error",
      title: "Error!",
      text: "Ocurrió el siguiente error: " + error.message
    });
    return 0;
  }
}

// Función que muestra la cantidad de ítems
function displayCartinNav(productsCount) {
  const liBeforeCart = document.getElementById('liBeforeCart');
  const cart = document.createElement('a');
  cart.innerHTML = '<li id="navCartButton">🛒' + productsCount + '</li>';
  cart.href = '/views/carts/' + currentCartId;
  liBeforeCart.insertAdjacentElement('afterend', cart);
}

function backToProducts(event) {
  const addToCartButton = document.getElementById('addToCartButton');
  addToCartButton.disabled = true;
  addToCartButton.setAttribute('aria-busy', 'true');
  addToCartButton.innerText = ''
  event.target.disabled = true;
  event.target.setAttribute('aria-busy', 'true');
  event.target.innerText = ''
  window.location.href = '/views/products';
}

async function addToCart(event) {
  const backToProductsButton = document.getElementById('backToProductsButton');
  const removeProductDetailDisplay = document.getElementById('removeProductDetailDisplay');
  const addProductDetailDisplay = document.getElementById('addProductDetailDisplay');
  const url = '/api/carts/' + currentCartId + '/products/' + productId;
  const result = await addProductToCart(url, itemCount.innerText);
  const productsCount = document.getElementById('navCartButton');
  const lastCount = parseInt(productsCount.innerText.split('🛒')[1]);
  if (result) {
    disableButton(event.target);
    disableButton(backToProductsButton);
    disableButton(removeProductDetailDisplay);
    disableButton(addProductDetailDisplay);
    productsCount.innerText = '🛒' + (lastCount + parseInt(result.quantity));
  }
}

function disableButton(button) {
  button.disabled = true;
  button.setAttribute('aria-busy', 'true');
  button.innerText = '';
}