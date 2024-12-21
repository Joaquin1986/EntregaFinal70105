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

const logoutButton = document.getElementById('logoutButton');

logoutButton.addEventListener('click', async () => {
  await logout('/api/sessions/logout/');
});

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
  if (currentCartId) {
    cart.innerHTML = '<li id="navCartButton">🛒' + productsCount + '</li>';
    cart.href = '/views/carts/' + currentCartId
  }
  else {
    cart.innerHTML = '<svg id="loginMainButton" width="34px" height="34px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#dbd2d2" stroke-width="2"></path> <path d="M15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10Z" stroke="#ffffff" stroke-width="2"></path> <path d="M6.16406 18.5C6.90074 16.5912 8.56373 16 12.0001 16C15.4661 16 17.128 16.5578 17.855 18.5" stroke="#ffffff" stroke-width="2" stroke-linecap="round"></path> </g></svg>';
    cart.href = '/views/login';
  }
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


async function logout(url) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      Swal.fire({
        title: "Sesión finalizada",
        text: "Su sesión ha sido cerrada exitosamente, vuelva pronto!",
        icon: "success"
      }).then(() => {
        window.location.reload();
      });
    } else {
      const result = await response.json();
      Swal.fire({
        icon: "error",
        title: "No se pudo cerrar la sesión",
        text: `Error al cerrar sesión: ${result.status} -> ${result.result}`
      });
      return false;
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error de logout",
      text: `Ocurrió un error al intentar cerrar sesión: ${error.message}`
    });
    return false;
  }
}