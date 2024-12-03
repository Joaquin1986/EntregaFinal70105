const { fakerES_MX: faker } = require('@faker-js/faker');
const dotenv = require('dotenv').config();
const { Pet, PetDao } = require('../dao/pet.dao');
const { CartDao } = require('../dao/cart.dao');
const { User, UserDao } = require('../dao/user.dao');
const { Product, ProductDao } = require('../dao/product.dao');
const { createUserPasswordHash } = require('../utils/utils');

// Para mayor seguridad, se setea la contraseña para mocking de usuarios en variable de entorno
const USERS_PWD = process.env.USERS_PWD;

class MockServices {

    // Función para generar mocking de mascotas
    static generateFakePets(quantity) {
        console.log(`⌚ Realizando mocking de ${quantity} mascotas...`);
        const mockingPets = [];
        for (let i = 0; i < quantity; i++) {
            const newDate = new Date(faker.date.past({ years: 15 }));
            const fakeDate = new Date(newDate);
            newDate.setUTCHours(0, 0, 0, 0);
            mockingPets.push(new Pet(
                faker.animal.petName(),
                faker.animal.type(),
                newDate,
                false,
                null,
                faker.image.url()
            ));
        }
        return mockingPets;
    }

    // Se reciben 2 argumentos. El primero de ello es la cantidad de usuarios (numérica), el segundo es boolean y
    // se refiere a si la clave se encripta o no, para optimizar el tiempo de respuesta con la función generateData(users, pets)
    static async generateFakeUsers(quantity, encripted) {
        console.log(`⌚ Realizando mocking de ${quantity} usuarios...`);
        const mockingUsers = [];
        for (let i = 0; i < quantity; i++) {
            const firstName = faker.person.firstName();
            const lastName = faker.person.lastName();
            const admin = faker.datatype.boolean();
            let role = '';
            let password = '';
            admin ? role = 'admin' : role = 'user';
            encripted ? password = await createUserPasswordHash(USERS_PWD) : password = USERS_PWD;
            mockingUsers.push({
                first_name: firstName,
                last_name: lastName,
                email: faker.internet.email({ firstName: firstName, lastName: lastName }),
                age: faker.number.int({ min: 18, max: 70 }),
                password: password,
                role: role,
                pets: []
            });
        }
        console.log(`🏁 Finalizó el proceso de mocking!`);
        return mockingUsers;
    }

    // Función para generar mocking de productos
    static generateFakeProducts(quantity) {
        console.log(`⌚ Realizando mocking de ${quantity} productos...`);
        const mockingProducts = [];
        for (let i = 0; i < quantity; i++) {
            mockingProducts.push(new Product(
                faker.commerce.product(),
                faker.commerce.productDescription(),
                faker.commerce.price({ min: 100, max: 5000, dec: 0 }),
                faker.string.uuid(),
                true,
                faker.number.int({ min: 20, max: 500 }),
                faker.commerce.department()
            ));
        }
        console.log(`🏁 Finalizó el proceso de mocking!`);
        return mockingProducts;
    }

    // Función que recibe la cantidad de usuarios y mascotas para realizar el mocking e insertarlos en la BD
    static async generateData(users, pets) {
        const mockingUsers = await this.generateFakeUsers(users, false);
        const usersToDb = [];
        for (let i = 0; i < users; i++) {
            const newCart = await CartDao.addCart();
            usersToDb.push(new User(mockingUsers[i].first_name, mockingUsers[i].last_name,
                mockingUsers[i].email, mockingUsers[i].age, await createUserPasswordHash(mockingUsers[i].password), newCart, mockingUsers[i].role, []));
        }
        console.log(`⌚ Agregando los usuarios a la BD...`);
        const usersResult = await UserDao.addManyUsers(usersToDb);
        const mockingPets = this.generateFakePets(pets);
        console.log(`⌚ Agregando las mascotas a la BD...`);
        const petsResult = await PetDao.addManyPets(mockingPets);
        return { "users": usersResult, "pets": petsResult };
    }

    // Función que recibe la cantidad de productos para realizar el mocking e insertarlos en la BD
    static async generateDataProducts(products) {
        const mockingProducts = this.generateFakeProducts(products);
        console.log(`⌚ Agregando los productos a la BD...`);
        const productsResult = await ProductDao.addManyProducts(mockingProducts);
        return { "products": productsResult };
    }
}

module.exports = { MockServices };