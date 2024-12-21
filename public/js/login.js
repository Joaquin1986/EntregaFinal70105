const basicToast = {
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: false,
};

const errorToast = Swal.mixin({ ...basicToast, background: '#bb0606' });
const successToast = Swal.mixin({ ...basicToast, background: '#097e0f' });

const loginButton = document.getElementById('loginButton');
const textEmail = document.getElementById('textEmail');
const textPassword = document.getElementById('textPassword');

let futureUrl = window.location.href.split('=')[1];
if (!futureUrl) futureUrl = '/views/products';

loginButton.addEventListener('click', async () => {
    let bodyContent = new FormData();
    result = {
        email: textEmail.value,
        password: textPassword.value,
    };
    bodyContent.append("email", textEmail.value);
    bodyContent.append("password", textPassword.value);
    await login("/api/sessions/login", result);
});

async function login(url, data) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            const result = await response.json();
            Swal.fire({
                title: "Login exitoso!",
                text: "Se ha iniciado sesión en la App",
                icon: "success"
            }).then(() => {
                window.location.href = futureUrl;
            });
            return true;
        } else {
            const result = await response.json();
            Swal.fire({
                icon: "error",
                title: "Login fallido",
                text: `Error al iniciar sesión: ${result.status} -> ${result.result}`
            });
            return false;
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error de login",
            text: `Ocurrió un error al intentar iniciar sesión: ${error.message}`
        });
        return false;
    }
}
