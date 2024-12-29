// Se implementan (mediante Chai y Supertest) los Tests Funcionales para los endpoints del módulo Adoptions.
const { fakerES_MX: faker } = require('@faker-js/faker');
const dotenv = require('dotenv').config();
const chai = require('chai');
const supertest = require('supertest');

const TEST_BASE_URL = process.env.TEST_BASE_URL || "http://localhost:";
const PORT = process.env.SERVER_PORT || 8080;
const adoptionsApiURL = `${TEST_BASE_URL}${PORT}/api/adoptions`;
const sessionsApiURL = `${TEST_BASE_URL}${PORT}/api/sessions`;
const petsApiURL = `${TEST_BASE_URL}${PORT}/api/pets`;

const { expect } = chai;
const adoptionsRequester = supertest(adoptionsApiURL);
const sessionsRequester = supertest(sessionsApiURL);
const petsRequester = supertest(petsApiURL);

const mockUser = () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    return {
        "first_name": firstName,
        "last_name": lastName,
        "email": faker.internet.email({ firstName: firstName, lastName: lastName }),
        "age": faker.number.int({ min: 18, max: 70 }),
        "password": faker.internet.password({ memorable: true }),
        "role": "user",
        "pets": []
    }
};

const mockPet = () => {
    const newDate = new Date(faker.date.past({ years: 15 }));
    newDate.setUTCHours(0, 0, 0, 0);
    return {
        "name": faker.animal.petName(),
        "specie": faker.animal.type(),
        "birthDate": newDate,
    }
};

describe('Testing de módulo Adoptions de la API', () => {
    let fakeUser = null;
    let fakeUserId = null;
    let fakePet = null;
    let fakePetId = null;
    let fakeAdoptionId = null;
    describe('Endpoint \'GET /adoptions\'', () => {
        it('Se obtiene el listado paginado de adopciones', async () => {
            const response = await adoptionsRequester.get('/');
            const { _body, statusCode, ok } = response;
            expect(_body.payload).to.be.an('array').that.does.not.include('error');
            expect(statusCode).to.equal(200);
            expect(ok).to.equal(true);
        });
    });
    describe('Endpoint \'POST /adoptions\'', () => {
        it('Se crea un nuevo usuario para la adopción', async () => {
            fakeUser = mockUser();
            const response = await sessionsRequester.post('/register').send(fakeUser);
            const { _body, statusCode, ok } = response;
            expect(_body.payload).to.be.ok;
            expect(statusCode).to.equal(201);
            expect(ok).to.equal(true);
            fakeUserId = _body.payload.newUser;
        });
        it('Se crea una nueva mascota para la adopción', async () => {
            fakePet = mockPet();
            const response = await petsRequester.post('/').send(fakePet);
            const { _body, statusCode, ok } = response;
            expect(_body.payload).to.have.property('newPet');
            expect(statusCode).to.equal(201);
            expect(ok).to.equal(true);
            fakePetId = _body.payload.newPet;
        });
        it('Se crea una nueva adopción, vinculando el ID del usuario y de la mascota previos', async () => {
            const response = await adoptionsRequester.post(`/${fakeUserId}/${fakePetId}`)
            const { _body, statusCode, ok } = response;
            expect(_body.payload.newAdoption).to.be.ok;
            expect(statusCode).to.equal(201);
            expect(ok).to.equal(true);
            fakeAdoptionId = _body.payload.newAdoption;
        });

    });
    describe('Endpoint \'GET /adoptions/:aid\'', () => {
        it('Se obtiene por ID la adopción que fue creada en el paso anterior', async () => {
            const response = await adoptionsRequester.get(`/${fakeAdoptionId}`);
            const { _body, statusCode, ok } = response;
            expect(_body.payload).to.be.ok;
            expect(statusCode).to.equal(200);
            expect(ok).to.equal(true);
        });
    });
});

