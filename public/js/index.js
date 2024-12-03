// Definición de constantes y variables
const basicToast = {
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: false,
};
const errorToast = Swal.mixin({ ...basicToast, background: '#bb0606' });
const successToast = Swal.mixin({ ...basicToast, background: '#097e0f' });

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
  currentCartId ? cart.href = '/views/carts/' + currentCartId : cart.href = '/views/login';
  liBeforeCart.insertAdjacentElement('afterend', cart);
}


function buyProductButton(event) {
  const buyProductButtons = document.getElementsByClassName('buyProductButton');
  for (let i = 0; i < buyProductButtons.length; i++) {
    buyProductButtons[i].disabled = true;
    buyProductButtons[i].setAttribute('aria-busy', 'true');
    buyProductButtons[i].innerText = '';
  }
  window.location.href = '/views/products/' + event.target.id;
}

function filteredSortedSearch() {
  const sortOption = document.getElementById('sortOption').selectedOptions[0].value;
  const limitOption = parseInt(document.getElementById('limitOption').selectedOptions[0].value);
  const categoryText = document.getElementById('filterText').value;
  let url = '/views/products';
  optionSelected = false;
  if (sortOption !== '' && sortOption !== 'unselected') {
    url += '?sort=' + sortOption;
    optionSelected = true;
  } else if (sortOption === '') optionSelected = true;
  if (optionSelected && (!isNaN(limitOption) && limitOption !== 10 && limitOption !== 'unselected'))
    url += '&limit=' + limitOption
  else if (!optionSelected && (!isNaN(limitOption) && limitOption !== 10 && limitOption !== 'unselected')) {
    url += '?limit=' + limitOption;
    optionSelected = true;
  }
  else if (!optionSelected && limitOption === 10) optionSelected = true;
  if (optionSelected && (sortOption !== '' && sortOption !== 'unselected') && categoryText !== '') {
    url += '&category=' + categoryText;
  }
  else if (!optionSelected && (sortOption === '' || sortOption === 'unselected') && categoryText !== '') {
    url += '?category=' + categoryText;
    optionSelected = true;
  }
  !optionSelected ?
    errorToast.fire({
      icon: "error",
      text: "Opciones de Búsqueda sin parámetros"
    })
    :
    successToast.fire({
      icon: "success",
      text: "Aplicando los parámetros establecidos..."
    }).then(() => window.location.href = url);

}