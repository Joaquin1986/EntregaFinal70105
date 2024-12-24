const mongoose = require('mongoose');
const userModel = require('./models/user.model');

// Clase User para la autenticación mediante Passport + JWT
class User {
    constructor(first_name, last_name, email, age, password, cart, role, pets = []) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.age = age;
        this.password = password;
        this.cart = cart;
        this.role = role;
        this.pets = pets
    }
}

class UserDao {

    // Agrega un usuario a la BD
    static async addUser(user) {
        try {
            const newUser = await userModel.create(user);
            if (newUser) {
                console.log(`✅ Usuario #'${newUser._id}' agregado exitosamente a la BD`);
                return newUser._id;
            }
            return false;
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo crear el usuario en la BD => error: ${error.message}`);
        }
    }

    // Agrega un array de usuarios a la BD
    static async addManyUsers(users) {
        try {
            const result = await userModel.create(users);
            if (result) {
                console.log(`✅ ${users.length} usuarios agregados exitosamente a la BD`);
                return result;
            }
            return false;
        } catch (error) {
            throw new Error(`⛔ Error: No se pudieron crear ${users.length} usuarios en la BD => error: ${error.message}`);
        }
    }

    // Consulta usuario por email
    static async getUserByEmail(email) {
        try {
            return await userModel.findOne({ "email": { "$regex": email, $options: 'i' } }).lean();
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo verificar si existe el usuario por email '${email}' => error: ${error.message}`)
        }
    }

    // Consulta usuario por id
    static async getUserById(id) {
        try {
            if (mongoose.isValidObjectId(id)) {
                return await userModel.findById(id).lean();
            }
            return undefined;
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo verificar si existe el usuario por id '${id}' => error: ${error.message}`)
        }
    }

    // Agrega una mascota (pid) a la lista de un dueño (oid)
    static async addPetToOwnersList(oid, pid) {
        try {
            if (mongoose.isValidObjectId(oid) && mongoose.isValidObjectId(pid)) {
                const user = await userModel.findById(oid);
                user.pets.push(pid);
                await user.save();
                return true;
            }
            return false;
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo agregar la mascota a la lista del dueño => error: ${error.message}`)
        }
    }

}

module.exports = { User, UserDao };