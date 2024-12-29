// Se implementan (de forma nativa) los Tests Funcionales para los endpoints del módulo Users.
const { fakerES_MX: faker } = require('@faker-js/faker');
const dotenv = require('dotenv').config();
const { describe, test } = require('node:test');
const assert = require('node:assert');

const TEST_BASE_URL = process.env.TEST_BASE_URL || "http://localhost:";
const PORT = process.env.SERVER_PORT || 8080;
const usersApiURL = `${TEST_BASE_URL}${PORT}/api/sessions`;

const fakeUser = (isAdmin) => {
    let role = '';
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    isAdmin ? role = 'admin' : role = 'user';
    return {
        "first_name": firstName,
        "last_name": lastName,
        "email": faker.internet.email({ firstName: firstName, lastName: lastName }),
        "age": faker.number.int({ min: 18, max: 70 }),
        "password": faker.internet.password({ memorable: true }),
        "role": role,
        "pets": []
    }
};

describe('Tests sobre módulo Sessions(Users) de API', () => {
    let userRegister = null;
    let cookieToken = null;
    let newUserId = null;
    const body = fakeUser(false);
    // Se testea el endpoint '/register' (registra usuarios standard)
    test('[/register]', async () => {
        userRegister = {
            email: body.email,
            password: body.password
        };
        const response = await fetch(`${usersApiURL}/register`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        const parsedResponse = await response.json();
        assert.ok(parsedResponse.status === 201, "Respuesta HTTP 201");
        assert.ok(parsedResponse.result === "Usuario creado", "Se creó el usuario exitosamente");
        newUserId = parsedResponse.payload.newUser;
    });
    // Se testea el endpoint '/login' (inicia sesión con una cuenta/email y su respectiva contraseña)
    test('[/login (User)]', async () => {
        const response = await fetch(`${usersApiURL}/login`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userRegister),
            credentials: 'include'
        });
        const responseAPI = await response.json();
        assert.ok(responseAPI, 'token')
        const setCookieHeader = response.headers.get('Set-Cookie');
        assert.ok(setCookieHeader, 'Header Set-Cookie en la respuesta');
        assert.ok(setCookieHeader.includes('token='));
        cookieToken = setCookieHeader.split(';')[0];
    });
    // Se testea el endpoint '/current' (muestra información de la sesión actual
    test('[/current]', async () => {
        const response = await fetch(`${usersApiURL}/current`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieToken
            },
            credentials: 'include'
        });
        const responseAPI = await response.json();
        const { code, ...fakedUser } = responseAPI.payload;
        assert.equal(fakedUser.email, body.email, "Matchea el email");
        assert.equal(fakedUser.first_name, body.first_name, "Matchea el nombre");
        assert.equal(fakedUser.last_name, body.last_name, "Matchea el apellido");
        assert.equal(fakedUser.user_level, body.role, "Matchea el rol");
        assert.ok(responseAPI.status === 200, "Respuesta OK HTTP 200");
    });
    // Se testea el endpoint '/logout' (cierra la sesión actual)
    test('[/logout]', async () => {
        const response = await fetch(`${usersApiURL}/logout`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieToken
            },
            credentials: 'include'
        });
        const responseAPI = await response.json();
        assert.equal(responseAPI.result, 'Sesión Finalizada');
        assert.equal(responseAPI.payload, 'La sesión ha sido finalizada');
        assert.ok(responseAPI.status === 200, "Respuesta OK HTTP 200");
    });
    // Se inicia sesión como Admin. para el resto de las operaciones
    test('[/login (Admin)]', async () => {
        const defaultAdminUsr = process.env.DEFAULT_ADMIN_USR || 'default@admin.com';
        const defaultAdminPwd = process.env.DEFAULT_ADMIN_PWD || 'adminPassword123';
        const defaultAdmin = {
            email: defaultAdminUsr,
            password: defaultAdminPwd
        }
        const response = await fetch(`${usersApiURL}/login`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(defaultAdmin),
            credentials: 'include'
        });
        const responseAPI = await response.json();
        assert.ok(responseAPI, 'token');
        const setCookieHeader = response.headers.get('Set-Cookie');
        assert.ok(setCookieHeader, 'Header Set-Cookie en la respuesta');
        assert.ok(setCookieHeader.includes('token='));
        cookieToken = setCookieHeader.split(';')[0];
    });
    // Se testea el endpoint '/register/admin' (registra usuarios administradores)
    test('[/register/admin]', async () => {
        const adminBody = fakeUser(true);
        userRegister = {
            email: adminBody.email,
            password: adminBody.password
        };
        const response = await fetch(`${usersApiURL}/register/admin`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieToken
            },
            credentials: 'include',
            body: JSON.stringify(adminBody)
        });
        const parsedResponse = await response.json();
        assert.ok(parsedResponse.result === "Administrador creado", "Se creó el admin exitosamente");
        assert.ok(parsedResponse.status === 201, "Respuesta HTTP 201");
    });
    // Se testea el endpoint '/user/:uid' (registra usuarios administradores)
    test('[/user/:uid]', async () => {
        const response = await fetch(`${usersApiURL}/user/${newUserId}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieToken
            },
            credentials: 'include',
        });
        const parsedResponse = await response.json();
        assert.equal(parsedResponse.payload.user.email, body.email, "Matchea el email");
        assert.equal(parsedResponse.payload.user.first_name, body.first_name, "Matchea el nombre");
        assert.equal(parsedResponse.payload.user.last_name, body.last_name, "Matchea el apellido");
        assert.equal(parsedResponse.payload.user.user_level, body.role, "Matchea el rol");
        assert.equal(parsedResponse.payload.user.code, newUserId, "Matchea el código/id de usuario");
        assert.ok(parsedResponse.status === 200, "Respuesta HTTP 200 OK");
    });
});